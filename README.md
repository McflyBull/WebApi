# WebApi

API REST desarrollada con Express.js, utilizando TypeScript y TypeORM como ORM.

## Requisitos Previos

- Node.js
- mysql

## Configuración Inicial

1. **Instalación de Dependencias**

   ```bash
   npm ci
   ```

2. **Configuración del Entorno**
   - Duplicar el archivo `.env.template` y renombrarlo a `.env`
   - Actualizar las variables de entorno en el archivo `.env` con tus configuraciones

3. **Configuración de la Base de Datos**

   a. Generar Migraciones:

   ```bash
   npm run migration:generate src/migrations/NombreDeMigracion

   ```

   b. Ejecutar migraciones:

   ```bash
   npm run migration:run
   ```

   c. Ejecutar Seeders:

   ```bash
   npm run seed
   ```

## Ejecución del Proyecto

### Desarrollo

```bash
npm run dev
```

### Producción

1. Configurar `NODE_ENV="production"` en el archivo `.env`
2. Ejecutar:

   ```bash
   npm run build && npm run start
   ```

## Docker (Opcional)

Para ejecutar la aplicación en un contenedor Docker:

1. **Construir la imagen**

   ```bash
   docker build -t CineAhoraAPI .
   ```

2. **Ejecutar el contenedor**

   ```bash
   docker run -p 8080:8080 CineAhoraAPI
   ```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run build`: Compila el proyecto
- `npm run start`: Inicia el servidor en modo producción
- `npm run seed`: Ejecuta los seeders de la base de datos
