import express from 'express';
import {
    handleInsertActorRequest,
    handleGetActorsRequest,
    handleGetActorByIdRequest,
    handleUpdateActorByIdRequest,
    handleDeleteActorByIdRequest
} from './actor.controller.js';
import { validateBody } from '../../common/middlewares.js';

const actorRoutes = express.Router();

actorRoutes.post('/actor', validateBody, handleInsertActorRequest);
actorRoutes.get('/actores', handleGetActorsRequest);
actorRoutes.get('/actor/:id', handleGetActorByIdRequest);
actorRoutes.put('/actor/:id', validateBody, handleUpdateActorByIdRequest);
actorRoutes.delete('/actor/:id', handleDeleteActorByIdRequest);

export default actorRoutes;