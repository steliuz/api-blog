# RESTful API Node Typescript Server Boilerplate

## Requisitos

- **Node.js** v18
- **MongoDB**

## Instalación Rápida

1. Clona el repositorio:

```bash
git clone --depth 1 https://github.com/user/node-express-typescrypt-examn.git
cd node-express-typescrypt-examn
```

2. Instala las dependencias:

```bash
yarn install
```

3. Configura las variables de entorno:

```bash
cp .env.example .env
```

Asegúrate de que la variable `MONGODB_URL` en `.env` esté configurada con la URL de tu base de datos MongoDB.

4. Inicia el servidor en modo desarrollo:

```bash
yarn dev
```

## Características

- **ES9**: Soporte para las últimas características de ECMAScript
- **TypeScript**: Tipado estático
- **Hot Reloading**: Recarga en caliente con Concurrently
- **MongoDB**: Modelado de datos con Mongoose
- **Autenticación y autorización**: Utilizando Passport y JWT
- **Validación de solicitudes**: Con Joi
- **Manejo de errores**: Mecanismo centralizado de manejo de errores
- **Documentación de API**: Con Swagger
- **Pruebas**: Pruebas unitarias e integrales con Jest
- **Docker**: Soporte para Docker
- **Integración continua**: Con GitHub CI
- **Linting**: Con ESLint y Prettier

## Variables de Entorno

Las variables de entorno se encuentran en el archivo `.env`. Aquí tienes un ejemplo:

```bash
# Número de puerto
PORT=3000

# URL de la base de datos MongoDB
MONGODB_URL=mongodb://127.0.0.1:27017/NombreDeTuBaseDeDatos

# URL de la aplicación cliente
CLIENT_URL=http://localhost:8089
```

## Estructura del Proyecto

```bash
.
├── src                       # Archivos fuente
│   ├── app.ts                # Aplicación Express
│   ├── config                # Variables de entorno y otras configuraciones
│   ├── custom.d.ts           # Archivo para extender tipos de módulos de node
│   ├── declaration.d.ts      # Archivo para declarar módulos sin tipos
│   ├── index.ts              # Archivo de entrada de la aplicación
│   ├── modules               # Módulos como modelos, controladores, servicios 
│   └── routes                # Rutas
├── package.json
└── README.md
```

## Documentación de la API

Para ver la lista de APIs disponibles y sus especificaciones, ejecuta el servidor y ve a `http://localhost:3000/v1/docs` en tu navegador. Esta página de documentación se genera automáticamente usando Swagger.

## Comandos

- **Desarrollo**: `yarn dev`
- **Producción**: `yarn start`
- **Compilar TypeScript**: `yarn compile`
- **Pruebas**: `yarn test`
- **Linting**: `yarn lint`
- **Docker en desarrollo**: `yarn docker:dev`
