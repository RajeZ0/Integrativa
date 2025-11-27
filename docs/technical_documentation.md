# Documentación Técnica

## Visión General
- **Backend:** Laravel 11 + Sanctum (API REST)
- **Frontend:** Next.js 14 (React, TypeScript, Tailwind CSS)
- **Base de datos:** SQLite (desarrollo) – migraciones para `users`, `roles`, `projects`.
- **Estructura de carpetas**
  - `cliente/` – aplicación Next.js (frontend)
  - `backend/` – aplicación Laravel (API)
  - `docs/` – documentación del proyecto.

## Arquitectura
- El frontend consume la API en `http://127.0.0.1:8000/api`.
- Autenticación mediante tokens Sanctum almacenados en cookies.
- Roles (`admin`, `user`) controlan acceso a rutas protegidas.
- Gestión de proyectos (CRUD) con subida de imágenes a `storage/app/public/projects`.

## Modelo de Datos
| Tabla | Campos principales |
|-------|--------------------|
| `users` | `id`, `name`, `email`, `password`, `role_id` |
| `roles` | `id`, `name`, `slug` |
| `projects` | `id`, `title`, `description`, `price`, `image_path`, `is_active` |

## Endpoints API
- **Auth**
  - `POST /api/login` – devuelve `token` y datos de usuario.
  - `POST /api/logout` – revoca token.
  - `GET /api/me` – datos del usuario autenticado.
- **Projects** (protected, `auth:sanctum` + `role:admin` para crear/editar/borrar)
  - `GET /api/projects` – listado público.
  - `POST /api/projects` – crear proyecto.
  - `PUT /api/projects/{id}` – actualizar.
  - `DELETE /api/projects/{id}` – eliminar.

## Frontend
- **Componentes clave**
  - `ProjectForm` – formulario de creación/edición.
  - `ProjectList` – tabla de proyectos en admin.
  - `Dialog` – modal de detalle de proyecto.
  - `LoginForm`, `ProtectedRoute` – autenticación y protección de rutas.
- **Hooks**
  - `useAuth` – gestiona estado de usuario y token.
- **Estilos** – Glassmorphism, animaciones, Tailwind utilities.

## Configuración y despliegue
1. **Instalar dependencias**
   ```bash
   cd backend && composer install && cp .env.example .env && php artisan key:generate
   cd ../cliente && npm install
   ```
2. **Migrar base de datos**
   ```bash
   php artisan migrate --seed
   ```
3. **Ejecutar servidores**
   ```bash
   # Backend
   php artisan serve   # http://127.0.0.1:8000
   # Frontend
   cd cliente && npm run dev   # http://localhost:3000
   ```
4. **Producción**
   - Compilar frontend: `npm run build` y servir con Nginx.
   - Deploy Laravel en servidor PHP con `php artisan serve` o Apache/Nginx.
   - Configurar CORS y HTTPS.

## Seguridad
- Tokens Sanctum con `httpOnly` cookies.
- Middleware `CheckRole` protege rutas por rol.
- Validaciones de entrada en controladores.
- `storage:link` para servir imágenes.

## Pruebas
- Laravel: `php artisan test` (cubre auth y CRUD).
- Frontend: pruebas manuales de login, flujo admin, CRUD de proyectos.

---
*Documentado el 23‑Nov‑2025*
