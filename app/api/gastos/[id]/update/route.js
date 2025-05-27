import { prisma } from '@/lib/prisma';

export async function POST(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { titulo, descripcion, monto, fecha, categoria, pagado } = body;

  const gasto = await prisma.gasto.update({
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

  return new Response(JSON.stringify(gasto), { status: 200 });
}
