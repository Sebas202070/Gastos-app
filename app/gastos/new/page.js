// app/gastos/new/page.js
'use client';

import GastoForm from '../../../components/GastoForm';
import { useRouter } from 'next/navigation';

export default function CrearGasto() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    await fetch('/api/gastos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    router.push('/');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo Gasto</h1>
      <GastoForm onSubmit={handleSubmit} />
    </div>
  );
}
