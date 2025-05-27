// components/Alertas.js
export default function Alertas({ gastos }) {
  const pendientes = gastos.filter(g =>
    !g.pagado &&
    new Date(g.fecha).getMonth() === new Date().getMonth() &&
    new Date(g.fecha).getFullYear() === new Date().getFullYear()
  );

  if (pendientes.length === 0) return null;

  return (
    <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 rounded">
      <h2 className="font-semibold mb-2">Pagos Pendientes</h2>
      <ul className="list-disc ml-4">
        {pendientes.map(g => (
          <li key={g.id}>{g.titulo} – ${g.monto.toFixed(2)} (vence {new Date(g.fecha).toLocaleDateString()})</li>
        ))}
      </ul>
    </div>
  );
}
