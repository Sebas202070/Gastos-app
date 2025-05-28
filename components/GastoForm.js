// components/GastoForm.js
'use client'; // ¡MUY IMPORTANTE! Indica que es un Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GastoForm({ gasto, isEdit }) {
  const router = useRouter();

  // Usamos un único objeto de estado para formData, más limpio y escalable
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    monto: '',
    fecha: '', // Se espera 'YYYY-MM-DD' para input type="date"
    categoria: '',
    pagado: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // useEffect para inicializar el formulario si estamos en modo edición
  useEffect(() => {
    if (isEdit && gasto) {
      // Aseguramos que el ID esté en string
      const idString = gasto.id ? gasto.id : (gasto._id ? gasto._id.toString() : '');
      
      // Formateamos la fecha a 'YYYY-MM-DD' para el input type="date"
      const formattedDate = gasto.fecha ? new Date(gasto.fecha).toISOString().split('T')[0] : '';

      setFormData({
        titulo: gasto.titulo || '',
        descripcion: gasto.descripcion || '',
        monto: gasto.monto != null ? gasto.monto.toString() : '', // Convertir a string para el input
        fecha: formattedDate,
        categoria: gasto.categoria || '',
        pagado: gasto.pagado || false,
        // No necesitamos guardar el ID en formData si se obtiene de props.params
        // pero lo mantenemos para claridad si se decidiera usarlo internamente
        id: idString // Esto asegura que el ID sea un string si viene de _id de Mongoose
      });
    }
  }, [isEdit, gasto]);

  // Manejador genérico para todos los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Función para formatear el monto en el input (permite 100.000)
  const formatMontoInput = (value) => {
    // Elimina caracteres no numéricos excepto el punto decimal
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    // Permite solo un punto decimal
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      parts.pop();
    }
    return parts.join('.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Determina el endpoint basado en si estamos editando o creando
      const url = isEdit ? `/api/gastos/${gasto.id || gasto._id.toString()}/update` : '/api/gastos';
      const method = 'POST'; // Next.js API Routes para updates también suelen usar POST

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          monto: parseFloat(formData.monto), // ¡IMPORTANTE! Convierte a número antes de enviar a la API
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el gasto');
      }

      setSuccess(true);
      alert(isEdit ? 'Gasto actualizado con éxito!' : 'Gasto agregado con éxito!');
      router.push('/'); // Redirigir a la página principal
      router.refresh(); // Refrescar los datos en la página principal para que se vean los cambios

    } catch (err) {
      console.error('Error al guardar el gasto:', err);
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4">
      {error && <div className="p-3 mb-4 bg-red-100 text-red-700 border border-red-400 rounded">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-100 text-green-700 border border-green-400 rounded">¡Guardado con éxito!</div>}

      <div className="mb-4">
        <label htmlFor="titulo" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo" // Importante para el handleChange genérico
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título del gasto"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion" // Importante para el handleChange genérico
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Breve descripción del gasto (opcional)"
          rows="3"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="monto" className="block text-gray-700 text-sm font-bold mb-2">Monto (ej. 100000.50):</label>
        <input
          type="text" // Cambiado a 'text' para permitir el formato libre
          id="monto"
          name="monto" // Importante para el handleChange genérico
          value={formData.monto}
          onChange={(e) => {
            // Usa la función de formateo para el monto
            const formattedValue = formatMontoInput(e.target.value);
            handleChange({ target: { name: e.target.name, value: formattedValue } });
          }}
          placeholder="Ej: 100000.00"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fecha" className="block text-gray-700 text-sm font-bold mb-2">Fecha:</label>
        <input
          type="date" // <--- Este es el input de fecha
          id="fecha"
          name="fecha" // Importante para el handleChange genérico
          value={formData.fecha}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="categoria" className="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
        <input
          type="text"
          id="categoria"
          name="categoria" // Importante para el handleChange genérico
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Ej: Alimentos, Transporte, Ocio"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="pagado"
          name="pagado" // Importante para el handleChange genérico
          checked={formData.pagado}
          onChange={handleChange}
          className="mr-2 leading-tight h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" // Clases para mejor visibilidad del checkbox
        />
        <label htmlFor="pagado" className="text-gray-700 text-sm font-bold">Pagado</label>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loading ? 'Guardando...' : (isEdit ? 'Actualizar Gasto' : 'Agregar Gasto')}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}