// models/Gasto.js

import mongoose from 'mongoose';

const GastoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false, // '?' en Prisma se traduce a required: false en Mongoose
  },
  monto: {
    type: Number, // Float en Prisma es Number en Mongoose
    required: true,
  },
  fecha: {
    type: Date, // DateTime en Prisma es Date en Mongoose
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  pagado: {
    type: Boolean,
    default: false,
  },
  // createdAt y updatedAt son manejados por Mongoose automáticamente con timestamps
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'gastos', // Asegúrate de que la colección en DB se llame 'gastos'
});

// Comprueba si el modelo ya existe para evitar errores en hot-reloading
export default mongoose.models.Gasto || mongoose.model('Gasto', GastoSchema);