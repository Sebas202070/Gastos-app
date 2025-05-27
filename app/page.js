// app/page.js
import { prisma } from '@/lib/prisma'
import GastoCard from '../components/GastoCard';
import Alertas from '../components/Alertas';

export default async function Home() {
  let gastos = [];

  try {
    gastos = await prisma.gasto.findMany({
      orderBy: { fecha: 'desc' }
    });
  } catch (err) {
    console.error('Error cargando gastos:', err);
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gastos del Mes</h1>

      <Alertas gastos={gastos} />

      {gastos.length === 0 ? (
        <p className="text-gray-500">No hay gastos registrados.</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {gastos.map((gasto) => (
            <GastoCard key={gasto.id} gasto={gasto} />
          ))}
        </div>
      )}
    </main>
  );
}
