const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.showHome = (request, response) => {
  response.render('home', { 
    title: 'Inicio', 
  });
}

exports.showLogin = (request, response) => {
  response.render('login', { 
    title: 'Iniciar sesion',
    error: null,
    formData: { loginValue: '' }
  });
}

exports.login = (request, response) => {
  const loginValue = (request.body.loginValue || '').trim();
  const password = (request.body.password || '').trim();

  if (!loginValue || !password) {
    console.warn(`Failed login attempt: missing credentials for "${loginValue || 'empty'}".`);
    return response.status(400).render('login', {
      title: 'Iniciar sesion',
      error: 'Completa usuario/correo y password.',
      formData: { loginValue }
    });
  }

  userModel.findLogin(loginValue)
    .then((user) => {
      if (!user) {
        console.warn(`Failed login attempt: user not found for "${loginValue}".`);
        return response.status(401).render('login', {
          title: 'Iniciar sesion',
          error: 'Credenciales invalidas.',
          formData: { loginValue }
        });
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          console.warn(`Failed login attempt: invalid password for "${loginValue}".`);
          return response.status(401).render('login', {
            title: 'Iniciar sesion',
            error: 'Credenciales invalidas.',
            formData: { loginValue }
          });
        }

        return userModel.getPrivileges(user.username).then(([privileges]) => {
          request.session.user = {
            id: user.user_id,
            username: user.username,
            email: user.email,
            privileges: privileges.map((p) => p.privilege)
          };

          return request.session.save(() => {
            response.redirect('/recipes');
          });
        });
      });
    })
    .catch((error) => {
      const dbConnectionErrors = new Set([
        'ER_ACCESS_DENIED_ERROR',
        'ER_BAD_DB_ERROR',
        'ECONNREFUSED',
        'ETIMEDOUT'
      ]);

      if (error && dbConnectionErrors.has(error.code)) {
        console.error('DB connection error during login:', error);
        return response.status(500).render('login', {
          title: 'Iniciar sesion',
          error: 'No se pudo conectar a la base de datos. Revisa tu archivo .env y la configuracion de MySQL.',
          formData: { loginValue }
        });
      }

      console.error('Unexpected login error:', error);
      return response.status(500).render('login', {
        title: 'Iniciar sesion',
        error: 'Error interno al iniciar sesion.',
        formData: { loginValue }
      });
    });
};


exports.showsignup = (request, response) => {
  response.render('signup', {
    title: 'Signup',
    error: null,
    formData: { username: '', email: '' }
  });
}

exports.signup = (request, response) => {
  const username = (request.body.username || '').trim();
  const email = (request.body.email || '').trim().toLowerCase();
  const password = (request.body.password || '').trim();
  const confirmPassword = (request.body.confirmPassword || '').trim();

  if (password !== confirmPassword) {
    return response.status(400).render('signup', {
      title: 'Signup',
      error: 'Las contraseñas no coinciden.',
      formData: { username, email }
    });
  }

  if (!username || !email || !password) {
    return response.status(400).render('signup', {
      title: 'Signup',
      error: 'Todos los campos son obligatorios.',
      formData: { username, email }
    });
  }

  userModel
    .validateSignup(username, email)
    .then((existingUser) => {
      if (existingUser) {
        return response.status(409).render('signup', {
          title: 'Signup',
          error: 'El username o email ya existe.',
          formData: { username, email }
        });
      }

      return userModel.createUser({ username, email, password })
        .then(() => {
          request.session.flash = {
            type: 'success',
            message: 'Signup completado. Ahora puedes iniciar sesion.'
          };

          return response.redirect('/login');
        });
    })
    .catch(() => {
      return response.status(500).render('signup', {
        title: 'Signup',
        error: 'Error interno al registrar usuario.',
        formData: { username, email }
      });
    });
}

exports.logout = (request, response) => {
  request.session.destroy(() => {
    response.clearCookie('recipe_sid');
    response.redirect('/');
  });
}
