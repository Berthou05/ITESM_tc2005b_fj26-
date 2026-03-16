const Users = require("../models/users.model");

function getCookieValue(request, cookieName) {
  const allCookies = request.get("Cookie") || "";
  const cookie = allCookies
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`));

  if (!cookie) {
    return "";
  }

  return cookie.split("=")[1] || "";
}

const MODE_CONFIG = {
  login: {
    heading: "Iniciar sesion",
    submitLabel: "Entrar",
    formAction: "/login",
    alternateLabel: "Registrarse",
    alternateHref: "/signup",
    alternateText: "No tienes cuenta?",
  },
  signup: {
    heading: "Crear cuenta",
    submitLabel: "Crear cuenta",
    formAction: "/signup",
    alternateLabel: "Iniciar sesion",
    alternateHref: "/login",
    alternateText: "Ya tienes cuenta?",
  },
};

function renderAuthPage(response, mode, options = {}) {
  const config = MODE_CONFIG[mode];
  const error = options.error || null;
  const username = options.username || "";

  return response.render("auth/index", {
    pageTitle: `${config.heading} | Lab 14`,
    mode,
    heading: config.heading,
    formAction: config.formAction,
    submitLabel: config.submitLabel,
    alternateLabel: config.alternateLabel,
    alternateHref: config.alternateHref,
    alternateText: config.alternateText,
    error,
    username,
  });
}

exports.get_entry = (_request, response) => {
  return response.render("auth/entry", {
    pageTitle: "Acceso | Lab 14",
  });
};

exports.get_login = (request, response) => {
  const username = getCookieValue(request, "ultimo_usuario");
  return renderAuthPage(response, "login", { username });
};

exports.post_login = (request, response) => {
  const username = (request.body.username || "").trim();
  const password = (request.body.password || "").trim();

  if (!username || !password) {
    return renderAuthPage(response.status(400), "login", {
      error: "Usuario y contrasena son obligatorios.",
      username,
    });
  }

  const isValid = Users.validateUser(username, password);
  if (!isValid) {
    return renderAuthPage(response.status(401), "login", {
      error: "Usuario o contrasena incorrectos.",
      username,
    });
  }

  request.session.isLoggedIn = true;
  request.session.username = username;
  response.setHeader("Set-Cookie", `ultimo_usuario=${username}; HttpOnly`);

  return response.render("welcome", {
    pageTitle: "Bienvenido | Lab 14",
    username,
  });
};

exports.get_signup = (_request, response) => {
  return renderAuthPage(response, "signup");
};

exports.post_signup = (request, response) => {
  const username = (request.body.username || "").trim();
  const password = (request.body.password || "").trim();
  const password2 = (request.body.password2 || "").trim();

  if (!username) {
    return renderAuthPage(response.status(400), "signup", {
      error: "El usuario es obligatorio.",
      username,
    });
  }

  if (password.length < 8) {
    return renderAuthPage(response.status(400), "signup", {
      error: "La contrasena debe tener al menos 8 caracteres.",
      username,
    });
  }

  if (password !== password2) {
    return renderAuthPage(response.status(400), "signup", {
      error: "Las contrasenas no coinciden.",
      username,
    });
  }

  const created = Users.createUser(username, password);
  if (!created) {
    return renderAuthPage(response.status(400), "signup", {
      error: "El usuario ya existe.",
      username,
    });
  }

  request.session.isLoggedIn = true;
  request.session.username = username;
  response.setHeader("Set-Cookie", `ultimo_usuario=${username}; HttpOnly`);

  return response.render("welcome", {
    pageTitle: "Bienvenido | Lab 14",
    username,
  });
};

exports.logout = (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
};
