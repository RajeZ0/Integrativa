# Meztli Ocelotl

## Descripción
Plataforma de gestión de videojuegos con autenticación basada en roles (admin / usuario). El backend está implementado con **Laravel 11** y **Sanctum**; el frontend con **Next.js 14**, **React**, **TypeScript** y **Tailwind CSS** (estilo glassmorphism).

## Tecnologías
- **Backend:** Laravel 11, SQLite (dev), Sanctum, PHP 8.2
- **Frontend:** Next.js 14, React 19, TypeScript, Tailwind CSS, lucide‑react
- **Gestión de proyectos:** CRUD de proyectos con subida de imágenes.

## Estructura de carpetas
```
METZLI/
├─ cliente/        # aplicación Next.js (frontend)
├─ backend/        # aplicación Laravel (API)
├─ docs/           # documentación del proyecto
└─ README.md       # este archivo
```

## 🐳 Instalación Rápida con Docker (Recomendado)

### Requisitos previos
- **Docker Desktop** instalado y corriendo

### Ejecutar con un solo comando
```bash
docker-compose up --build
```

Eso es todo! 🎉 El proyecto estará disponible en:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000

Para detener los servicios:
```bash
docker-compose down
```

---

## 📦 Instalación Manual (Alternativa)

### Requisitos previos
- **PHP 8.2** o superior
- **Composer** (gestor de dependencias de PHP)
- **Node.js** y **npm** (para el frontend)
- **SQLite** (ya viene incluido con PHP)

### 1. Backend (Laravel)
Abre una terminal y ejecuta:
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve   # http://127.0.0.1:8000
```

### 2. Frontend (Next.js)
Abre **otra terminal** y ejecuta:
```bash
cd cliente
npm install
npm run dev        # http://localhost:3000
```

> **Nota:** Ambos servicios (backend y frontend) deben estar corriendo simultáneamente en terminales separadas.

## Scripts npm (en `cliente`)
- `dev` – inicia el servidor de desarrollo.
- `build` – genera la versión de producción.
- `lint` – ejecuta ESLint.

## API (Laravel)
- **Auth**
  - `POST /api/login` → token + datos de usuario
  - `POST /api/logout`
  - `GET /api/me`
- **Projects** (protected, admin)
  - `GET /api/projects` (público)
  - `POST /api/projects`
  - `PUT /api/projects/{id}`
  - `DELETE /api/projects/{id}`

## Uso
1. Acceder a `http://localhost:3000`.
2. Iniciar sesión con:
   - Admin: `admin@metzli.com` / `password`
   - Usuario: `user@metzli.com` / `password`
3. En el panel admin se pueden crear, editar y eliminar proyectos.
4. En la página principal se listan los proyectos con botón **Ver Detalles** que abre un modal.

## Contribuir
1. Fork del repositorio.
2. Crear una rama `feature/tu‑feature`.
3. Ejecutar pruebas (`php artisan test`).
4. Abrir Pull Request.

---
*Documentado el 23‑Nov‑2025*
