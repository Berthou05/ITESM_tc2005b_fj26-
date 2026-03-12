const Task = require("../models/task.model");

exports.get_new = (_request, response) => {
  response.render("tasks/new", {
    pageTitle: "Nueva tarea | Lab 14",
  });
};

exports.post_new = (request, response) => {
  const title = (request.body.title || "").trim();
  const dueDate = (request.body.dueDate || "").trim();

  if (!title) {
    return response.redirect("/tasks/new");
  }

  const task = new Task(null, title, dueDate);
  task.save();

  return response.redirect("/tasks");
};

exports.get_list = (_request, response) => {
  response.render("tasks/list", {
    pageTitle: "Tareas | Lab 14",
    tasks: Task.fetchAll(),
  });
};

exports.post_delete = (request, response) => {
  const id = parseInt(request.body.id, 10);
  Task.deleteById(id);
  return response.redirect("/tasks");
};
