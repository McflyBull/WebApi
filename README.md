# Paso a paso

1:
npm ci

2:
Cambiar nombre a .env.template a .env
Actualizar los datos de .env

3:
Development: npm run dev

Building: npm run build

Production: Set .env to NODE_ENV="production" y despues npm run build && npm run start

4(Docker, opcional):
Buildear imagen: docker build -t nombre-de-la-imagen .
Iniciar imagen: docker run -p 8080:8080 nombre-de-la-imagen
