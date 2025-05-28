// components/DeleteButton.js
'use client'; // ¡MUY IMPORTANTE! Indica que es un Client Component

import { useRouter } from 'next/navigation';

export default function DeleteButton({ gastoId }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Confirmación al usuario antes de eliminar
    if (!confirm('¿Estás seguro de que quieres eliminar este gasto? Esta acción es irreversible.')) {
      return;
    }

    try {
      const response = await fetch(`/api/gastos/${gastoId}/delete`, {
        method: 'DELETE', // Usamos el método HTTP DELETE
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.statusText}`);
      }

      alert('Gasto eliminado con éxito.');
      router.push('/'); // Redirige a la página principal de gastos
      router.refresh(); // Refresca los datos en la página de listado
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
      alert('Error al eliminar el gasto.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Eliminar Gasto
    </button>
  );
}