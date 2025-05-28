// app/gastos/[id]/edit/page.js
import GastoForm from "@/components/GastoForm";
import connectDB from '@/lib/mongoose';
import Gasto from '@/models/Gasto';
import DeleteButton from '@/components/DeleteButton';

export default async function EditGastoPage(props) {
  const { id } = await props.params;

  await connectDB();

  // Obtenemos el gasto usando .lean() para un objeto JS más simple
  const gasto = await Gasto.findById(id).lean();

  if (!gasto) {
    return <p className="text-center text-red-500 mt-10">Gasto no encontrado</p>;
  }

  // --- ¡ESTE ES EL CAMBIO CLAVE! ---
  // Convertimos el objeto Mongoose (incluso si es .lean()) a una cadena JSON,
  // y luego lo parseamos de nuevo a un objeto JavaScript completamente plano.
  // Esto serializa correctamente los ObjectIds y Dates.
  const serializedGasto = JSON.parse(JSON.stringify(gasto));

  // Formateamos la fecha para el input HTML type="date"
  // y aseguramos que el 'id' sea un string para el Client Component.
  const formattedGasto = {
    ...serializedGasto, // Usamos el objeto ya serializado
    id: serializedGasto._id, // _id ya es un string después de JSON.stringify
    fecha: new Date(serializedGasto.fecha).toISOString().split('T')[0], // Aseguramos el formato de fecha
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Gasto</h1>
      <GastoForm gasto={formattedGasto} isEdit={true} />
      <DeleteButton gastoId={formattedGasto.id} />
    </div>
  );
}