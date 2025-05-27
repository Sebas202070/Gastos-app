import GastoForm from "@/components/GastoForm";
import { prisma } from "@/lib/prisma";

export default async function EditGastoPage({ params }) {
  // Accede directamente a params.id
  const id = parseInt(params.id);

  // Verificación para asegurar que 'id' es un número válido.
  // Esto es una buena práctica aunque Next.js resuelva params.id
  if (isNaN(id)) {
    return <p>ID inválido</p>;
  }

  const gasto = await prisma.gasto.findUnique({
    where: { id },
  });

  if (!gasto) {
    return <p>Gasto no encontrado</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Editar Gasto</h1>
      <GastoForm gasto={gasto} isEdit={true} />
    </div>
  );
}