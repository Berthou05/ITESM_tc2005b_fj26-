const Tasks = require("../models/task.model");

const path = require("path");

exports.get_new = (request, response, next) => {
    response.render('new');
};

exports.post_new = (request, response, next) => {
  const title = (request.body.title || "").trim();
  const dueDate = (request.body.dueDate || "").trim();

  if (!title) {
    return response.redirect("/tasks/new");
  }

  const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id || 0)) + 1 : 1;
  tasks.push({ id: nextId, title, dueDate });

  return response.redirect("/tasks");
};

exports.get_list = (request, response, next) => {
    response.render('list', {tasks: Tasks.fetchAll()});
};

exports.post_list = (request, response, next) => {
    const id = parseInt(request.body.id, 10);
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    return response.redirect("/tasks");
};