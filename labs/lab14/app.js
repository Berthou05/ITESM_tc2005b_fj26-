const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const loginRoutes = require("./routes/login.routes");
const taskRoutes = require("./routes/task.routes");

app.use("/tasks", taskRoutes);
app.use("/", loginRoutes);

app.use((request, response) => {
  response.status(404).send("<h1>404 - Not Found</h1>");
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;