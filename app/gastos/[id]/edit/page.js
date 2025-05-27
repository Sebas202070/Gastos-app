// app/gastos/[id]/edit/page.js
import { prisma } from '@/lib/prisma';
import GastoForm from '@/components/GastoForm';

export default async function EditGastoPage({ params }) {
  const gasto = await prisma.gasto.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!gasto) return <p>Gasto no encontrado</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Editar Gasto</h1>
      <GastoForm gasto={gasto} isEdit={true} />
    </div>
  );
}
