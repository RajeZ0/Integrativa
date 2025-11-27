# METZLI – Documentación Exhaustiva

= Introducción

Este documento describe en profundidad el proyecto **METZLI**, cubriendo su propósito, arquitectura, decisiones de herramientas, estructura del repositorio, componentes del backend, esquema de base de datos, configuración, pruebas, despliegue, CI/CD y flujo de contribución.

== Propósito del proyecto

METZLI es una aplicación web orientada a la gestión de proyectos personales y colaborativos. Permite a los usuarios crear, editar y eliminar proyectos, asociar descripciones y visualizar un listado de sus proyectos. La API está diseñada para ser consumida por un frontend (por ejemplo, Next.js) y está construida con Laravel, aprovechando su ecosistema robusto y su arquitectura MVC.

== Decisiones de herramientas y entorno de desarrollo

=== Visual Studio Code (VS Code)
* **Por qué VS Code**: editor ligero, multiplataforma, con gran ecosistema de extensiones que facilitan el desarrollo en PHP, JavaScript y Typst.
* **Extensiones recomendadas**:
  * *PHP Intelephense* – autocompletado, análisis estático y refactorizaciones.
  * *Laravel Blade Snippets* – soporte para plantillas Blade.
  * *GitLens* – visualización de historial, blame y gestión de ramas.
  * *Prettier* – formateo consistente de código.
  * *Typst Language Support* – resaltado de sintaxis y vista previa para archivos `.typ`.

=== Backend – PHP 8.1+ con Laravel 10
* **PHP**: lenguaje de scripting del lado del servidor, con amplio soporte y comunidad.
* **Laravel**: framework MVC que aporta routing, ORM (Eloquent), migraciones, middleware, colas y pruebas integradas.
* **Laravel Sanctum**: gestión sencilla de tokens API para autenticación de usuarios.

=== Frontend (potencial)
Aunque el repositorio actual no contiene código de frontend, se prevé un cliente **Next.js** que consumiría la API. En conversaciones anteriores se acordó ubicarlo bajo la carpeta `cliente`.

=== Base de datos – MySQL / MariaDB
* Motor relacional robusto, bien soportado por Laravel.
* Utiliza migraciones para versionar el esquema.

=== Otros requisitos
* **Composer** – gestor de dependencias de PHP.
* **Node.js (v18+) y npm** – para compilar assets front‑end (Tailwind, Vite, etc.) si el frontend está presente.
* **Git** – control de versiones.

== Estructura del repositorio
```
METZLI/
├─ backend/                 # Código del servidor Laravel
│   ├─ app/
│   │   ├─ Http/Controllers/Api/ProjectController.php   # Lógica de la API
│   │   └─ Models/Project.php, User.php                # Eloquent models
│   ├─ config/               # Configuraciones (app, database, cors, sanctum…)
│   ├─ database/
│   │   └─ migrations/2025_11_23_184550_create_projects_table.php
│   ├─ routes/
│   │   └─ api.php           # Definición de rutas API
│   └─ .env.example         # Plantilla de variables de entorno
├─ README.md                # Documentación básica del proyecto
└─ (cliente/)               # Frontend Next.js (aún por crear)
```

== Detalle de los componentes del backend

=== Modelos Eloquent
* **User.php** – representa la tabla `users`. Incluye relaciones `hasMany(Project::class)`.
* **Project.php** – representa la tabla `projects`. Define `belongsTo(User::class)` y campos rellenables (`title`, `description`).

=== Controlador API – ProjectController.php
| Acción | Método HTTP | Ruta | Descripción |
|--------|-------------|------|-------------|
| `index` | GET | `/api/projects` | Lista todos los proyectos del usuario autenticado.
| `store` | POST | `/api/projects` | Crea un nuevo proyecto.
| `show` | GET | `/api/projects/{id}` | Obtiene los detalles de un proyecto.
| `update` | PUT/PATCH | `/api/projects/{id}` | Actualiza los campos de un proyecto.
| `destroy` | DELETE | `/api/projects/{id}` | Elimina el proyecto.

Todas las rutas están protegidas por el middleware `auth:sanctum`.

=== Rutas – api.php
```php
use App\Http\Controllers\Api\ProjectController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('projects', ProjectController::class);
});
```

=== Migración – 2025_11_23_184550_create_projects_table.php
```php
Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('description')->nullable();
    $table->timestamps();
});
```

=== Configuración CORS – cors.php
Permite que el frontend (por ejemplo `http://localhost:3000`) acceda a la API.
```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // Cambiar a dominios específicos en producción
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

== Diagrama ER de la base de datos
![](C:/Users/poopj/.gemini/antigravity/brain/c55056b6-095c-4852-b34b-5f87a140f781/project_er_diagram_1763990257947.png)

=== Tablas principales
* **users** – `id`, `name`, `email`, `password`, `created_at`, `updated_at`.
* **projects** – `id`, `user_id` (FK → `users.id`), `title`, `description`, `created_at`, `updated_at`.

== Instalación del entorno paso a paso

=== Prerrequisitos
1. **PHP >= 8.1** – versión mínima requerida por Laravel 10.
2. **Composer** – gestor de paquetes PHP.
3. **Node.js (v18+) y npm** – solo si el frontend está presente.
4. **MySQL / MariaDB** – servidor de base de datos.
5. **Git** – control de versiones.

=== Procedimiento de instalación
1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd METZLI
   ```
   *Por qué*: Obtiene el código fuente y posiciona el directorio de trabajo.
2. **Instalar dependencias PHP**
   ```bash
   composer install
   ```
   *Por qué*: Composer descarga Laravel y sus paquetes en `vendor/`.
3. **Crear archivo de entorno**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Por qué*: `.env` almacena variables sensibles (DB, APP_KEY). `key:generate` crea una clave de cifrado usada por Laravel.
4. **Configurar la base de datos**
   Edita `.env` y asigna los valores correctos:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=metzli
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```
5. **Crear la base de datos**
   ```bash
   mysql -u tu_usuario -p -e "CREATE DATABASE IF NOT EXISTS metzli;"
   ```
6. **Ejecutar migraciones y seeders**
   ```bash
   php artisan migrate --seed
   ```
   *Por qué*: Crea las tablas y, opcionalmente, inserta datos de prueba.
7. **Instalar dependencias front‑end (si existen)**
   ```bash
   npm install
   npm run dev
   ```
   *Por qué*: Compila CSS/JS (por ejemplo Tailwind) y habilita hot‑reloading.
8. **Iniciar servidor de desarrollo**
   ```bash
   php artisan serve
   ```
   *Por qué*: Levanta un servidor HTTP en `http://127.0.0.1:8000`.

=== Verificación rápida
Abre el navegador y visita `http://127.0.0.1:8000/api/user` (requiere token) o `http://127.0.0.1:8000/api/projects` tras autenticación.

== Pruebas automatizadas
Laravel incluye PHPUnit. Los tests están en `tests/Feature` y `tests/Unit`.
```bash
php artisan test
```
*Por qué*: Garantiza que la lógica de controladores, modelos y rutas funciona correctamente.

== CI/CD (ejemplo con GitHub Actions)
```yaml
name: CI
on: [push, pull_request]
jobs:
  php-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
      - name: Install Composer dependencies
        run: composer install --prefer-dist --no-progress --no-suggest
      - name: Run tests
        run: php artisan test
```
*Por qué*: Ejecuta pruebas en cada push, asegurando que no se introduzcan regresiones.

== Flujo de contribución
1. **Fork** del repositorio.
2. **Crear rama** descriptiva: `git checkout -b feature/descripcion`.
3. **Desarrollar** la funcionalidad, ejecutar pruebas y asegurarse de que pasen.
4. **Commit** siguiendo Conventional Commits (e.g., `feat: add project creation endpoint`).
5. **Push** y abrir un Pull Request describiendo los cambios.
6. **Revisión** por mantenedores; después de aprobar, se mergea.

== Licencia
Este proyecto está bajo la licencia MIT.

---

*Documento generado automáticamente por Antigravity.*
