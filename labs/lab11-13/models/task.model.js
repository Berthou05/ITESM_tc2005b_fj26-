tasks = [
    { id: 2, title: "Revisar Base de datos", dueDate: "2026-03-01" },
    { id: 1, title: "Hacer prototipo", dueDate: "2026-02-28" },
];


module.exports = class Task {
    constructor(id, title, dueDate) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
    }

    save() {
        tasks.push(this);
    }

    static fetchAll() {
        return tasks;
    }
}