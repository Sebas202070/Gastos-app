'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GastoForm({ gasto = {}, isEdit = false }) {
  const [titulo, setTitulo] = useState(gasto.titulo || '');
  const [descripcion, setDescripcion] = useState(gasto.descripcion || '');
  const [monto, setMonto] = useState(gasto.monto || '');
  const [fecha, setFecha] = useState(
    gasto.fecha ? new Date(gasto.fecha).toISOString().slice(0, 10) : ''
  );
  const [categoria, setCategoria] = useState(gasto.categoria || '');
  const [pagado, setPagado] = useState(gasto.pagado || false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { titulo, descripcion, monto, fecha, categoria, pagado };

    const endpoint = isEdit
      ? `/api/gastos/${gasto.id}/update`
      : '/api/gastos';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      console.error('Error al guardar el gasto');
    }
  };

  // ✅ Este return ahora está bien ubicado:
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        placeholder="Categoría"
        className="w-full border p-2 rounded"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={pagado}
          onChange={(e) => setPagado(e.target.checked)}
        />
        <span>Pagado</span>
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isEdit ? 'Actualizar Gasto' : 'Agregar Gasto'}
      </button>
    </form>
  );
}
