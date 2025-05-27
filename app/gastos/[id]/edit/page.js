import GastoForm from "@/components/GastoForm";
import { prisma } from "@/lib/prisma";

// Aquí cambiamos el parámetro para que sea un objeto 'props' completo
// y luego hacemos 'await props.params'
export default async function EditGastoPage(props) {
  // Accedemos a 'params' de forma explícita después de un 'await'
  const { id } = await props.params;

  const numericId = Number(id); // Convertimos la cadena 'id' a un número

  // Verificación para asegurar que 'id' es un número válido.
  if (isNaN(numericId)) {
    return <p>ID inválido</p>;
  }

  const gasto = await prisma.gasto.findUnique({
    where: { id: numericId },
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