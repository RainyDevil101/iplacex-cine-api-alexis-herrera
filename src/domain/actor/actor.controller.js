import { Actor } from './actor.js';
import { Pelicula } from '../pelicula/pelicula.js';

export const handleInsertActorRequest = async (req, res) => {
    try {
        const { idPelicula } = req.body;

        const peliculaExists = await Pelicula.findById(idPelicula);

        if (!peliculaExists) {
            return res.status(404).json({ 
                error: 'Movie not found' 
            });
        }

        const actor = new Actor(req.body);
        await actor.save();

        res.status(201).json(actor);
    } catch (error) {
        console.error('Error inserting actor:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Validation error', 
                details: Object.values(error.errors).map(err => err.message)
            });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid idPelicula format' });
        }
        
        res.status(500).json({ error: 'Error inserting actor' });
    }
}

export const handleGetActorsRequest = async (req, res) => {
    try {
        const actors = await Actor.find().populate('idPelicula', 'nombre generos anioEstreno');
        res.status(200).json(actors);
    } catch (error) {
        console.error('Error getting actors:', error);
        res.status(500).json({ error: 'Error getting actors' });
    }
}

export const handleGetActorByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const actor = await Actor.findById(id).populate('idPelicula', 'nombre generos anioEstreno');
        
        if(!actor) {
            return res.status(404).json({ error: 'Actor no encontrado' });
        }
        
        res.status(200).json(actor);
    } catch (error) {
        console.error('Error getting actor by id:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid id format' });
        }
        
        res.status(500).json({ error: 'Error getting actor by id' });
    }
}

export const handleUpdateActorByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData.idPelicula) {
            const peliculaExists = await Pelicula.findById(updateData.idPelicula);

            if (!peliculaExists) {
                return res.status(404).json({ 
                    error: 'Película no encontrada' 
                });
            }
        }

        delete updateData._id;
        
        const actorActualizado = await Actor.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('idPelicula', 'nombre generos anioEstreno');
        
        if(!actorActualizado) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        res.status(200).json(actorActualizado);
    } catch (error) {
        console.error('Error updating actor by id:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid id format' });
        }
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Error de validación', 
                details: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({ error: 'Error updating actor by id' });
    }
}

export const handleDeleteActorByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const actor = await Actor.findByIdAndDelete(id);
        
        if(!actor) {
            return res.status(404).json({ error: 'Actor not found' });
        }

        res.status(200).json({ message: 'Actor deleted successfully', id });
    } catch (error) {
        console.error('Error deleting actor by id:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid id format' });
        }
        
        res.status(500).json({ error: 'Error deleting actor by id' });
    }
}