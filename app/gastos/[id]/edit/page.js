import GastoForm from "@/components/GastoForm";
import { prisma } from "@/lib/prisma";

export default async function EditGastoPage(props) {
  const { id } = await props.params; // 'id' es ahora el ObjectId como String

  // console.log('ID recibido:', id); // Puedes descomentar esto para verificar en la consola

  // --- ELIMINA LAS SIGUIENTES LÍNEAS YA QUE NO SON NECESARIAS PARA MONGODB ---
  // const numericId = Number(id);
  // if (isNaN(numericId)) {
  //   return <p>ID inválido</p>;
  // }
  // -------------------------------------------------------------------------

  const gasto = await prisma.gasto.findUnique({
    where: { id: id }, // Prisma para MongoDB espera el ID como String
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