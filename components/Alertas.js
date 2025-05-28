// components/Alertas.js
export default function Alertas({ gastos }) {
  // Filtra *todos* los gastos que no estén marcados como pagados
  const pendientes = gastos.filter(gasto => !gasto.pagado);

  if (pendientes.length === 0) return null; // Si no hay pendientes, no muestra nada

  // Función auxiliar para formatear a pesos argentinos
  const formatArgentinianPeso = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 rounded">
      <h2 className="font-semibold mb-2">Gastos Pendientes</h2>
      <ul className="list-disc ml-4">
        {pendientes.map(gasto => (
          <li key={gasto._id} className="mb-1">
            <span className="font-bold">Pendiente:</span> {gasto.titulo} – {formatArgentinianPeso(gasto.monto)} (Vence el {new Date(gasto.fecha).toLocaleDateString('es-AR')})
          </li>
        ))}
      </ul>
    </div>
  );
}