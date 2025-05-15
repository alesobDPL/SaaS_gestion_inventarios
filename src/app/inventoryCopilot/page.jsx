'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import LoadingThreeDotsPulse from '@/components/LoadingThreeDotsPulse';

export default function InventoryCopilot() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    setResults([]);
    try {
  const res = await fetch('/api/ai/filterProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Error al buscar productos', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] mt-16">
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-3xl w-full p-10 bg-white rounded-3xl shadow-xl border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🤖 Copilot de Inventario</h1>

          <label htmlFor="query" className="block text-gray-600 font-medium mb-2">
            Describe lo que necesitas buscar
          </label>
          <textarea
            id="query"
            rows={4}
            placeholder="Ej: Mostrar productos de la categoría Electrónica con menos de 10 unidades disponibles"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex justify-center mt-6">
            <button
              onClick={fetchFilteredProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />

              ) : (
                <Sparkles className="w-6 h-6" />
              )}
              Search with AI
            </button>
          </div>

          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <LoadingThreeDotsPulse />
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">🔍 Resultados:</h2>
              {results.map((product) => (
                <div
                  key={product.id}
                  className="p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <p className="text-xl font-medium text-gray-900">{product.name}</p>
                  <p className="text-gray-500">Stock: {product.stock}</p>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && input && (
            <p className="mt-6 text-center text-gray-400 text-lg">
              No se encontraron productos con ese criterio.
            </p>
          )}
        </div>
      </div>
    </div>
  );

}
