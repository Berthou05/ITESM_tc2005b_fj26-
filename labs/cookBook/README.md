# CookBook MVC App

Aplicacion web de recetas con Node.js, Express, EJS, MySQL y Tailwind CSS.

## 1) Requisitos

- Node.js 18+
- MySQL 8+

## 2) Instalacion

```bash
npm install
```

## 3) Configurar variables de entorno

Crea tu archivo `.env` a partir de `.env.example`.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=recipe_app
SESSION_SECRET=super_secret_change_me
PORT=3000
```

## 4) Crear base de datos y tablas

Ejecuta los scripts SQL:

- `database/schema.sql`
- (Opcional) `database/seed.sql`

## 5) Compilar Tailwind CSS

```bash
npm run build:css
```

Para desarrollo CSS en vivo:

```bash
npm run watch:css
```

## 6) Correr la app

Desarrollo:

```bash
npm run dev
```

Produccion:

```bash
npm start
```

## 7) Rutas principales

- `GET /`
- `GET /login`
- `POST /login`
- `GET /register`
- `POST /register`
- `POST /logout`
- `GET /recipes`
- `GET /recipes/new` (protegida)
- `POST /recipes` (protegida)
- `GET /recipes/:id`

## Notas de esta etapa

- Password sin hash (intencional para esta fase).
- Sin RBAC.
- Sin subida de archivos.
- Sin AJAX.
- Imagen guardada por URL externa (`image_url`).
