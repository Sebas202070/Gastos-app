// app/api/gastos/[id]/delete/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Gasto from '@/models/Gasto';

export async function DELETE(req, props) {
  await connectDB(); // Conecta a la base de datos

  const { id } = await props.params; // ID de MongoDB es un String

  if (!id) {
    return NextResponse.json({ error: "ID de gasto no proporcionado." }, { status: 400 });
  }

  try {
    const deletedGasto = await Gasto.findByIdAndDelete(id); // Elimina por _id

    if (!deletedGasto) {
      return NextResponse.json({ error: "Gasto no encontrado." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Gasto eliminado con éxito", gasto: deletedGasto },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    return NextResponse.json({ error: "Error interno del servidor al eliminar el gasto", details: error.message }, { status: 500 });
  }
}