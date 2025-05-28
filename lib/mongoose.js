// lib/mongoose.js
import mongoose from 'mongoose';

// Variable para almacenar la conexión en caché (para Serverless Functions)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('✅ Usando conexión de base de datos cacheada.');
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL; // Intenta con ambos nombres

    if (!MONGODB_URI) {
      throw new Error(
        'Por favor, define la variable de entorno MONGODB_URI o DATABASE_URL'
      );
    }

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // Desactiva el buffering de comandos para Serverless
      // Más opciones para compatibilidad con MongoDB Atlas si es necesario:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log('✨ Conexión a MongoDB establecida con éxito.');
      return mongoose;
    }).catch((error) => {
      console.error('❌ Error al conectar a MongoDB:', error);
      cached.promise = null; // Reset promise on error
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;