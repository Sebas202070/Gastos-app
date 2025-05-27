import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Aquí también cambiamos el parámetro para que sea un objeto 'props' completo
// y luego hacemos 'await props.params'
export async function POST(req, props) {
  // Accedemos a 'params' de forma explícita después de un 'await'
  const { id } = await props.params;
  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  try {
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
    return NextResponse.json(gasto, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    return NextResponse.json({ error: "Error al actualizar el gasto" }, { status: 500 });
  }
}