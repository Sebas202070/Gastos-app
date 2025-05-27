// app/api/gastos/route.js
import { prisma } from '@/lib/prisma'



export async function POST(req) {
  const data = await req.json();
  const gasto = await prisma.gasto.create({
    data: {
      titulo: data.titulo,
     monto: parseFloat(data.monto),
descripcion:data.descripcion,
      fecha: new Date(data.fecha),
      categoria: data.categoria,
      pagado: data.pagado
    }
  });
  return new Response(JSON.stringify(gasto), { status: 201 });
}
