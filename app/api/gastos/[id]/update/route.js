import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'; // Importa NextResponse

export async function POST(req, { params }) {
  // Acceso directo a params.id aquí también
  const { id } = params;
  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  try { // Añade un try-catch para manejar errores de Prisma
    const gasto = await prisma.gasto.update({
      // Asegúrate de que `id` sea un número para Prisma
      where: { id: parseInt(id) },
      data: {
        titulo,
        descripcion,
        monto: parseFloat(monto),
        fecha: new Date(fecha),
        categoria,
        pagado,
      },
    });
    return NextResponse.json(gasto, { status: 200 }); // Usa NextResponse.json
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    return NextResponse.json({ error: "Error al actualizar el gasto" }, { status: 500 });
  }
}