require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
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
  delete req.session.flash;

  const visits = Number(req.cookies.visits || 0) + 1;
  res.cookie('visits', visits, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: false });
  res.locals.visits = visits;

  next();
});

app.use('/', authRoutes);
app.use('/recipes', recipeRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('404', { title: 'Error interno' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Pagina no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
