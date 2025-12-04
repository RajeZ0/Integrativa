FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de la aplicación
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev"]
