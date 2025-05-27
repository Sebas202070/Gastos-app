
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req, props) {
  const { id } = await props.params; // 'id' es ahora el ObjectId como String
  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  try {
    const gasto = await prisma.gasto.update({
      where: { id: id }, // Asegúrate de que `id` se use directamente como String
      data: {
        titulo,
        descripcion,
        monto: parseFloat(monto),
        fecha: new Date(fecha),
        categoria,
        pagado,
      },
    });
    return NextResponse.json(gasto, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    return NextResponse.json({ error: "Error al actualizar el gasto" }, { status: 500 });
  }
}