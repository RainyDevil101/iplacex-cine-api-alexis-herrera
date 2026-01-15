import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
    idPelicula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pelicula',
        required: [true, 'El ID de la película es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: [0, 'La edad no puede ser negativa']
    },
    estaRetirado: {
        type: Boolean,
        required: [true, 'El estado de retiro es obligatorio'],
        default: false
    },
    premios: {
        type: [String],
        required: [true, 'Los premios son obligatorios'],
        default: []
    }
}, {
    timestamps: true,
    collection: 'actores'
});

export const Actor = mongoose.model('Actor', actorSchema);