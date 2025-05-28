// app/api/gastos/[id]/update/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Gasto from '@/models/Gasto';

export async function POST(req, props) {
  await connectDB(); // Conecta a la base de datos

  const { id } = await props.params; // ID de MongoDB es un String
  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  try {
    const gastoActualizado = await Gasto.findByIdAndUpdate(
      id, // Busca por _id
      {
        titulo,
        descripcion,
        monto: parseFloat(monto),
        fecha: new Date(fecha),
        categoria,
        pagado,
      },
      { new: true } // Retorna el documento actualizado
    );

    if (!gastoActualizado) {
      return NextResponse.json({ error: "Gasto no encontrado." }, { status: 404 });
    }

    return NextResponse.json(gastoActualizado, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    return NextResponse.json({ error: "Error al actualizar el gasto", details: error.message }, { status: 500 });
  }
}