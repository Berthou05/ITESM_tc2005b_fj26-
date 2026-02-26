const html_header = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tasks</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-50">
    <main class="mx-auto max-w-2xl p-6">
      <header class="mb-6">
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Tasks</h1>
        <p class="mt-1 text-slate-600">Laboratorio 11 - Express</p>
      </header>
`;

const html_footer = `
    </main>
  </body>
</html>
`;

const html_form = `
<form action="/tasks/new" method="POST" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div class="grid gap-4 sm:grid-cols-2">
    <div class="sm:col-span-2">
      <label for="title" class="block text-sm font-semibold text-slate-700">Title</label>
      <input id="title" name="title"
        class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
        type="text" placeholder="e.g. Finish homework" required>
    </div>

    <div>
      <label for="dueDate" class="block text-sm font-semibold text-slate-700">Due date</label>
      <input id="dueDate" name="dueDate"
        class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
        type="date">
    </div>

    <div class="flex items-end gap-2">
      <input class="w-full cursor-pointer rounded-xl bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700"
        type="submit" value="Guardar">
    </div>
  </div>
</form>
`;

module.exports = {
  html_header,
  html_footer,
  html_form
};