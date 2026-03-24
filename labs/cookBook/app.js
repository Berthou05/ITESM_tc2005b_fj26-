require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const csrf = require('csurf');
const csrfProtection = csrf();

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());



app.use(
  session({
    name: 'recipe_sid',
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.session.flash || null;
  res.locals.csrfToken = null;
  
  const visits = Number(req.cookies.visits || 0) + 1;
  res.cookie('visits', visits, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: false });
  res.locals.visits = visits;
  
  next();
});

app.use((req, res, next) => {
  if (req.is('multipart/form-data')) return next(); // handled at route level
  return csrfProtection(req, res, next);
});

app.use((req, res, next) => {
  // req.csrfToken exists only if csrfProtection ran
  res.locals.csrfToken = typeof req.csrfToken === 'function' ? req.csrfToken() : null;
  delete req.session.flash;
  next();
});

app.use('/', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use((error, req, res, next) => {
  console.error(error);

  if (error.code === 'EBADCSRFTOKEN') {
    return res.status(403).render('404', {
      title: 'Solicitud invalida',
      errorCode: 403,
      heading: 'Solicitud invalida',
      message: 'El formulario expiro o el token CSRF no es valido. Recarga la pagina e intenta de nuevo.'
    });
  }

  return res.status(500).render('404', {
    title: 'Error interno',
    errorCode: 500,
    heading: 'Error interno',
    message: 'Ocurrio un error inesperado al procesar la solicitud.'
  });
});

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Pagina no encontrada',
    errorCode: 404,
    heading: 'Pagina no encontrada',
    message: 'La ruta que buscas no existe o no esta disponible.'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
