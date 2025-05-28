// app/api/gastos/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Gasto from '@/models/Gasto';
import { revalidatePath } from 'next/cache'; // <-- ¡IMPORTA ESTO!

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  try {
    const nuevoGasto = await Gasto.create({
      titulo,
      descripcion,
      monto: parseFloat(monto),
      fecha: new Date(fecha),
      categoria,
      pagado: pagado,
    });

    // --- ¡ESTO ES CLAVE! Revalida la ruta raíz después de crear ---
    revalidatePath('/');
    // -------------------------------------------------------------

    return NextResponse.json(nuevoGasto, { status: 201 });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    return NextResponse.json({ error: "Error al crear el gasto", details: error.message }, { status: 500 });
  }
}