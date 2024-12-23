# WebApi

API REST desarrollada con Express.js, utilizando TypeScript y TypeORM como ORM.

## Requisitos Previos

- Node.js
- mysql (si estan usando xamp que este arriba el servicio de mysql)
- Crear base de datos manualmente con los siguientes datos:
  Nombre: "cinema_db"
  charset: "utf8mb4"
  collation: "utf8mb4_general"

  -Ejemplo:
  
 ![image](https://github.com/user-attachments/assets/f51bab7c-e576-46a3-b971-6ff206a746d8)


## Configuración Inicial

1. **Instalación de Dependencias**

   ```bash
   npm ci
   ```

2. **Configuración del Entorno**
   - Duplicar el archivo `.env.template` y renombrarlo a `.env`
   - Actualizar las variables de entorno en el archivo `.env` con tus configuraciones
   - Ejemplo:
     
   ```bash
      # Environment Configuration
      NODE_ENV="development" # Options: 'development', 'production'
      PORT="8080"            # The port your server will listen on
      HOST="localhost"       # Hostname for the server
      
      # CORS Settings
      CORS_ORIGIN="http://localhost:*" # Allowed CORS origin, adjust as necessary
      
      # Rate Limiting
      COMMON_RATE_LIMIT_WINDOW_MS="1000" # Window size for rate limiting (ms)
      COMMON_RATE_LIMIT_MAX_REQUESTS="20" # Max number of requests per window per IP
      
      DB_HOST=localhost
      DB_PORT=3306
      DB_USERNAME=root
      DB_PASSWORD=
      DB_DATABASE=cinema_db
   ```

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
