// components/GastoCard.js
'use client';

import { useRouter } from 'next/navigation';

export default function GastoCard({ gasto }) {
  const router = useRouter();

  const eliminar = async () => {
    await fetch(`/api/gastos/${gasto.id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="p-4 border rounded-lg shadow flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{gasto.titulo}</h2>
        <p className="text-sm text-gray-600">{new Date(gasto.fecha).toLocaleDateString()}</p>
        <p className="text-lg font-bold">${gasto.monto.toFixed(2)}</p>
        <p className="text-sm">{gasto.categoria}</p>
        <span className={`text-xs px-2 py-1 rounded ${gasto.pagado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {gasto.pagado ? 'Pagado' : 'Pendiente'}
        </span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => router.push(`/gastos/${gasto.id}/edit`)} className="text-blue-500 hover:underline">Editar</button>
        <button onClick={eliminar} className="text-red-500 hover:underline">Eliminar</button>
      </div>
    </div>
  );
}
