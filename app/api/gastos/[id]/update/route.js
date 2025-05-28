// app/api/gastos/[id]/update/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Gasto from '@/models/Gasto';
import { revalidatePath } from 'next/cache'; // <-- ¡IMPORTA ESTO!

export async function POST(req, props) {
  await connectDB();

  const { id } = await props.params;
  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  try {
    const gastoActualizado = await Gasto.findByIdAndUpdate(
      id,
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

    // --- ¡ESTO ES CLAVE! Revalida la ruta donde se listan los gastos ---
    revalidatePath('/'); // Revalida la caché de la ruta raíz (donde se listan los gastos)
    // Si tu lista de gastos estuviera en '/gastos', usarías revalidatePath('/gastos');
    // ------------------------------------------------------------------

    return NextResponse.json(gastoActualizado, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    return NextResponse.json({ error: "Error al actualizar el gasto", details: error.message }, { status: 500 });
  }
}