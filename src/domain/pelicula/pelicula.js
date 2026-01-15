import mongoose from 'mongoose';

const peliculaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  generos: {
    type: [String],
    required: [true, 'Los géneros son obligatorios'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Debe haber al menos un género'
    }
  },
  anioEstreno: {
    type: Number,
    required: [true, 'El año de estreno es obligatorio']
  }
}, {
  timestamps: true,
  collection: 'peliculas'
});

export const Pelicula = mongoose.model('Pelicula', peliculaSchema);
