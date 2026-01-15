import { Pelicula } from './pelicula.js';
import { Actor } from '../actor/actor.js';

export const handleInsertPeliculaRequest = async (req, res) => {
  try {
    const pelicula = new Pelicula(req.body);
    await pelicula.save();
    
    res.status(201).json(pelicula);
  } catch (error) {
    console.error('Error al insertar película:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Error de validación', 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ error: 'Error al insertar película' });
  }
};

export const handleGetPeliculasRequest = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.status(200).json(peliculas);
  } catch (error) {
    console.error('Error al obtener películas:', error);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};

export const handleGetPeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const pelicula = await Pelicula.findById(id);

    if (!pelicula) {
      return res.status(404).json({ error: 'Pelicula not found' });
    }

    res.status(200).json(pelicula);
  } catch (error) {
    console.error('Error getting pelicula by id:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid id format' });
    }
    
    res.status(500).json({ error: 'Error getting pelicula by id' });
  }
};

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    delete updateData._id;

    const peliculaActualizada = await Pelicula.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!peliculaActualizada) {
      return res.status(404).json({ error: 'Pelicula not found' });
    }

    res.status(200).json(peliculaActualizada);
  } catch (error) {
    console.error('Error al actualizar película:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid id format' });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Error de validación', 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ error: 'Error al actualizar película' });
  }
};

export const handleDeletePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const actoresAsociados = await Actor.countDocuments({ idPelicula: id });

    if (actoresAsociados > 0) {
      return res.status(409).json({ 
        error: `No se puede eliminar la película porque tiene ${actoresAsociados} actor(es) asociado(s). Elimina primero los actores.` 
      });
    }

    const pelicula = await Pelicula.findByIdAndDelete(id);

    if (!pelicula) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    res.status(200).json({ message: 'Película eliminada correctamente', id });
  } catch (error) {
    console.error('Error al eliminar película:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Id mal formado' });
    }
    
    res.status(500).json({ error: 'Error al eliminar película' });
  }
};
