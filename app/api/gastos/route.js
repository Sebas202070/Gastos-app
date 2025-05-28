// app/api/gastos/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose'; // Importa la conexión
import Gasto from '@/models/Gasto';    // Importa el modelo

export async function POST(req) {
  await connectDB(); // Conecta a la base de datos

  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  try {
    const nuevoGasto = await Gasto.create({
      titulo,
      descripcion,
      monto: parseFloat(monto), // Asegúrate de que monto sea un número
      fecha: new Date(fecha),   // Asegúrate de que fecha sea un objeto Date
      categoria,
      pagado: pagado,
    });
    return NextResponse.json(nuevoGasto, { status: 201 });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    return NextResponse.json({ error: "Error al crear el gasto", details: error.message }, { status: 500 });
  }
}