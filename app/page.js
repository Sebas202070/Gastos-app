// app/page.js
import Link from 'next/link';
import connectDB from '@/lib/mongoose';
import Gasto from '@/models/Gasto';
import Alertas from '@/components/Alertas'; // Asegúrate de que esta ruta sea correcta

export default async function Home() {
  let gastos = [];
  try {
    await connectDB(); // Conecta a la base de datos
    // Obtén los gastos, ordenados por fecha de forma descendente, y conviértelos a objetos planos
    gastos = await Gasto.find().sort({ fecha: -1 }).lean();

    // Mapea los gastos para asegurar que _id sea un string y la fecha sea un objeto Date
    // Esto es crucial para que Alertas y el resto de la interfaz funcionen correctamente
    gastos = gastos.map(gasto => ({
      ...gasto,
      _id: gasto._id.toString(), // Convierte ObjectId a string para usar como key y pasar a componentes cliente
      fecha: new Date(gasto.fecha) // Asegura que la fecha sea un objeto Date para manipulaciones y comparaciones
    }));

  } catch (err) {
    console.error("Error cargando gastos:", err);
    // Puedes aquí añadir una lógica para mostrar un mensaje de error en la UI si lo deseas
  }

  // --- Función auxiliar para formatear a pesos argentinos ---
  // Esta función también está en Alertas.js. Para evitar duplicidad,
  // podrías moverla a un archivo de utilidades (ej. lib/utils.js) y luego importarla.
  const formatArgentinianPeso = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  // --------------------------------------------------------

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Gastos</h1>
      <div className="text-right mb-4">
        <Link href="/gastos/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Gasto
        </Link>
      </div>

      {/* --- Componente de Alertas --- */}
      {/* Pasa la lista de gastos al componente Alertas para que pueda procesarlos */}
      <Alertas gastos={gastos} />
      {/* --------------------------- */}

      <div className="bg-white shadow-md rounded-lg p-4">
        {gastos.length === 0 ? (
          <p className="text-center text-gray-500">No hay gastos registrados. ¡Agrega uno!</p>
        ) : (
          <ul>
            {gastos.map((gasto) => (
              <li key={gasto._id} className="border-b last:border-b-0 py-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{gasto.titulo}</h2>
                  <p className="text-gray-600">{gasto.descripcion}</p>
                  {/* --- Formateo de Monto a Pesos Argentinos --- */}
                  <p className="text-gray-700">Monto: {formatArgentinianPeso(gasto.monto)}</p>
                  {/* ------------------------------------------ */}
                  <p className="text-gray-700">Fecha: {gasto.fecha.toLocaleDateString('es-AR')}</p>
                  <p className="text-gray-700">Categoría: {gasto.categoria}</p>
                  <p className={`font-semibold ${gasto.pagado ? 'text-green-600' : 'text-red-600'}`}>
                    Estado: {gasto.pagado ? 'Pagado' : 'Pendiente'}
                  </p>
                </div>
                <Link href={`/gastos/${gasto._id}/edit`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Editar
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}