const express = require("express");
const router = express.Router();

const tasks = [
  { id: 2, title: "Buy groceries", dueDate: "2026-03-01" },
  { id: 1, title: "Do homework", dueDate: "2026-02-28" },
];

// ===============================================
// Middleware
router.use((request, response, next) => {
  console.log("Middleware!");
  next();
});

router.get("/", (request, response, next) => {
  const sortedTasks = [...tasks].sort((a, b) => (b.id || 0) - (a.id || 0));
  response.render("list", { tasks: sortedTasks });
});

router.get('/new', (request, response, next) => {
  response.render('new');
});

router.post("/new", (request, response, next) => {
  const title = (request.body.title || "").trim();
  const dueDate = (request.body.dueDate || "").trim();

  if (!title) {
    return response.redirect("/tasks/new");
  }

  const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id || 0)) + 1 : 1;
  tasks.push({ id: nextId, title, dueDate });

  return response.redirect("/tasks");
});

router.use((request, response, next) => {
  response.status(404).send("Task route not found");
});

module.exports = router;
