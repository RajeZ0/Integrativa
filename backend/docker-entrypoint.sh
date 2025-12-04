#!/bin/bash

# Copiar archivo .env si no existe
if [ ! -f .env ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
fi

# Generar clave de aplicación si no existe
if grep -q "APP_KEY=$" .env; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Crear base de datos SQLite si no existe
if [ ! -f database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch database/database.sqlite
    chmod 664 database/database.sqlite
fi

# Ejecutar migraciones y seeders
echo "Running migrations and seeders..."
php artisan migrate --force
php artisan db:seed --force

# Ejecutar el comando pasado al contenedor
exec "$@"
