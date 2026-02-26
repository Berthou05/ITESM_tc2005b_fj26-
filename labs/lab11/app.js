const express = require("express");
const app = express();

// Usar carpeta estatica
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar body-parser para manejar datos de formularios
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Importar rutas de tareas
const taskRoutes = require("./routes/task.routes");
app.use('/tasks', taskRoutes);

// Manejo de rutas no encontradas
app.use((request, response, next) => {
  response.status(404).send(`
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">404 - Not Found</h1>
    <p class="mt-1 text-slate-600">La página que buscas no existe.</p>
  `);
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/tasks");
});