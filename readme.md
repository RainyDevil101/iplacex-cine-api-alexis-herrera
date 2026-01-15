# API Cine IPLACEX

API REST para gestión de películas y actores usando Node.js, Express y MongoDB con Mongoose.

## Requisitos

- Node.js
- MongoDB Atlas

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm start
```

El servidor iniciará en `http://localhost:3000`

## Endpoints

### Películas
- `POST /api/pelicula` - Crear película
- `GET /api/peliculas` - Listar todas
- `GET /api/pelicula/:id` - Obtener por ID
- `PUT /api/pelicula/:id` - Actualizar
- `DELETE /api/pelicula/:id` - Eliminar

### Actores
- `POST /api/actor` - Crear actor
- `GET /api/actores` - Listar todos
- `GET /api/actor/:id` - Obtener por ID
- `PUT /api/actor/:id` - Actualizar
- `DELETE /api/actor/:id` - Eliminar

## Colección Insomnia

Importar `toImportInsomnia.json` en Insomnia para probar los endpoints.

# Alumno:

- Alexis Herrera

# Asignatura:

- Programación Web Services