Paso a paso:

1: 
npm ci

2:
Cambiar nombre a .env.template to .env
Actualizar los datos de .env

3:
Development: npm run dev
Building: npm run build
Production: Set .env to NODE_ENV="production" y despues npm run build && npm run start
