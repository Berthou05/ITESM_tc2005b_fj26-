const tasks = [
  { id: 1, title: "Revisar Base de datos", dueDate: "2026-03-01" },
  { id: 2, title: "Hacer prototipo", dueDate: "2026-02-28" },
];

module.exports = class Task {
  constructor(id, title, dueDate) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
  }

  save() {
    const nextId = tasks.length
      ? Math.max(...tasks.map((t) => t.id || 0)) + 1
      : 1;
    this.id = nextId;
    tasks.push(this);
  }

  static fetchAll() {
    return tasks;
  }

  static deleteById(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    return false;
  }
};
