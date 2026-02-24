// HTML and css done with the help of copilot, the rest is all me :D
// Well, I did get help with some things, but credit is due where needed

const http = require("http");
const fs = require("fs");
const path = require("path");

// Archivo donde se guardan las tareas (texto en el servidor)
const DATA_DIR = path.join(__dirname, "data");
const TASKS_FILE = path.join(DATA_DIR, "tasks.txt");

// HTML base para las páginas
const html_header = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>To Do</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
        <section class="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-amber-50 px-4 py-8 font-sans sm:px-6 sm:py-12">
        <div class="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8">
`;

const html_footer = `
            </div>
        </section>
    </body>
</html>
`;

// Formulario HTML que envía POST a /new
const html_form = `
    <header class="mb-5">
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">My To-Do List</h1>
        <p class="mt-2 text-slate-500">Add a task and a due date.</p>
    </header>

    <form action="/new" method="POST" class="space-y-4">
        <div class="grid gap-4 sm:grid-cols-2">
            <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-slate-700">Task</span>
                <input name="task" type="text" placeholder="Finish lab report..." required
                class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100" />
            </label>

            <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-slate-700">Due Date</span>
                <input name="date" type="date" required
                class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100" />
            </label>
        </div>

        <button type="submit"
            class="w-full rounded-xl bg-gradient-to-r from-teal-700 to-teal-500 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-900/20 transition hover:from-teal-800 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-100">
            Add Task
        </button>
    </form>

  <hr class="my-5 border-slate-200" />
`;

// Escapa caracteres HTML especiales para prevenir XSS
// Aportacion de https://stackoverflow.com/a/6234804/12347616
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Copilot me ayudo con el formato de fecha y parsing del formulario
// Formato YYYY-MM-DD a DD/MM/YYYY
function formatDate(dateString) {
    if (!dateString) return "No date";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

// Parse tasks
function parseFormUrlEncoded(body) {
    const out = {};
    const pairs = body.split("&").filter(Boolean);

    for (const pair of pairs) {
        const [rawKey, rawValue] = pair.split("=");
        const key = decodeURIComponent((rawKey || "").replaceAll("+", " "));
        const value = decodeURIComponent((rawValue || "").replaceAll("+", " "));
        out[key] = value;
    }

    return out;
}

async function ensureDataDir() {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
}

// Lee el archivo tasks.txt y regresa un arreglo de tasks en Json
async function readTasksFromFile() {
    await ensureDataDir();

    if (!fs.existsSync(TASKS_FILE)) {
        return [];
    }

    const content = await fs.promises.readFile(TASKS_FILE, "utf-8");
    const lines = content.split("\n").filter(Boolean);

    const tasks = [];
    for (const line of lines) {
        try {
            tasks.push(JSON.parse(line));
        } 
            catch (err) {
        }
    }

    tasks.sort((a, b) => (b.id || 0) - (a.id || 0));
    return tasks;
}

// Agrega una task al archivo
async function appendTaskToFile(task) {
    await ensureDataDir();
    await fs.promises.appendFile(TASKS_FILE, JSON.stringify(task) + "\n", "utf-8");
}

// Renderiza la lista de tasks como HTML
function renderTasksList(tasks) {
    if (tasks.length === 0) {
        return `
            <ul class="space-y-3">
                <li class="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm italic text-slate-500">
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
                    <span class="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold">
                    ${escapeHtml(formatDate(t.dueDate || ""))}
                    </span>
                </li>
            `)
        .join("");

    return `<ul class="space-y-3">${items}</ul>`;
}

// Respuesta 404
function send404(response) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(
        html_header +
            `<h1 class="text-2xl font-bold text-slate-800">404</h1>
            <p class="mt-2 text-slate-600">Route not found.</p>
            <p class="mt-4">
                <a class="text-teal-700 font-semibold underline" href="/">Go back</a>
            </p>
            ` + html_footer
    );
}



// Get para enseñar formulario y lista /
const server = http.createServer(async (request, response) => {
    if (request.url === "/" && request.method === "GET") {
        try {
            const tasks = await readTasksFromFile();
            const html_list = renderTasksList(tasks);
            
            // 200 significa OK, la petición fue exitosa
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(html_header + html_form + html_list + html_footer);
        } 
        catch (err) {

            response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            response.end("500 Error reading tasks");
        }
        return;
      } 

    // GET para mostrar solo el formulario en /new
    if (request.url === "/new" && request.method === "GET") {
        
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(
        html_header +
            html_form +
            `<p class="mt-5 text-sm text-slate-600"><a class="text-teal-700 font-semibold underline" href="/">View tasks</a></p>` +
            html_footer
        );
        return;
    }

    // POST /new para recibir el formulario y guardar la nueva tarea
    if (request.url === "/new" && request.method === "POST") {
        const chunks = [];

        request.on("data", (chunk) => {
        chunks.push(chunk);
        });

        request.on("end", async () => {
            try {
                const body = Buffer.concat(chunks).toString("utf-8");
                const data = parseFormUrlEncoded(body);

            const title = String(data.task || "").trim();
            const dueDate = String(data.date || "").trim();

            // Validación básica
            // 400 significa Bad Request osea el cliente envió algo mal
            if (!title || !dueDate) {
                response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
                response.end("400 Bad Request: missing task or date");
                return;
            }

                const newTask = { id: Date.now(), title, dueDate };
                await appendTaskToFile(newTask);

                // Mostrar la lista actualizada "/"
                // 3xx significa redirección, 302 significa Found 
                response.writeHead(302, { Location: "/" });
                response.end();
            } catch (err) {
                response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                response.end("500 Error saving task");
            }
        });

        // 500 significa Internal Server Error, osea algo salió mal en el servidor
        // Osea mande mal el formulario o algo pasó al recibir los datos
        request.on("error", () => {
            response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            response.end("500 Error receiving data");
        });

        return;
    }

    // 404: cualquier otra ruta
    send404(response);
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});