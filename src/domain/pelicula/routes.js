import express from 'express';
import {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest
} from './pelicula.controller.js';
import { validateBody } from '../../common/middlewares.js';

const peliculaRoutes = express.Router();

peliculaRoutes.post('/pelicula', validateBody, handleInsertPeliculaRequest);
peliculaRoutes.get('/peliculas', handleGetPeliculasRequest);
peliculaRoutes.get('/pelicula/:id', handleGetPeliculaByIdRequest);
peliculaRoutes.put('/pelicula/:id', validateBody, handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete('/pelicula/:id', handleDeletePeliculaByIdRequest);

export default peliculaRoutes;