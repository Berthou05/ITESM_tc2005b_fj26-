const express = require("express");
const router = express.Router();

const path = require("path");

const { html_header, html_footer, html_form } = require("../html/tasks");

// ===============================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(dateString) {
  if (!dateString) return "No date";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

// ===============================================
function renderTasksList(tasks) {
  if (tasks.length === 0) {
    return `
      <ul class="space-y-3">
        <li class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm italic text-slate-500">
          No tasks yet. Add your first one.
        </li>
      </ul>
    `;
  }

  const items = tasks
    .map(
      (t) => `
        <li class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <span class="font-semibold text-slate-800">${escapeHtml(t.title || "")}</span>
          <span class="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
            ${escapeHtml(formatDate(t.dueDate || ""))}
          </span>
        </li>
      `
    )
    .join("");

  return `<ul class="space-y-3">${items}</ul>`;
}


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

router.get("/new", (request, response, next) => {
  response.send(html_header + html_form + html_footer);
});

router.post("/new", (request, response, next) => {
  const title = (request.body.title || "").trim();
  const dueDate = (request.body.dueDate || "").trim();

  const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id || 0)) + 1 : 1;
  tasks.push({ id: nextId, title, dueDate });

  next();
});

router.use((request, response, next) => {
  console.log("Otro middleware!");

  const sorted = [...tasks].sort((a, b) => (b.id || 0) - (a.id || 0));

  let html_index = `
    <div class="mb-4 flex items-center justify-between">
      <a href="/tasks/new">
        <button class="rounded-xl bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700">
          Nueva task
        </button>
      </a>
      <span class="text-sm text-slate-500">Total: ${sorted.length}</span>
    </div>
    ${renderTasksList(sorted)}
  `;

  response.send(html_header + html_index + html_footer);
});

module.exports = router;