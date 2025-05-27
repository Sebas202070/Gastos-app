// lib/gastos.js
import { prisma } from './prisma';

export async function obtenerGastoPorId(id) {
  const gasto = await prisma.gasto.findUnique({
    where: { id: parseInt(id) },
  });

  return gasto;
}
