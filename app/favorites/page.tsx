// Vista de favoritos: muestra solo los productos marcados como favoritos por el usuario.
"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/services/favorites/favoriteService";
import ProductCard from "@/components/recetaCard";
import type { receta } from "@/types/receta";

export default function FavoritesPage() {
  const [products, setProducts] = useState<receta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites().then((result) => {
      if (result.data) setProducts(result.data);
      setLoading(false);
    });
  }, []);

  const handleToggle = async (id: string) => {
    await toggleFavorite(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Mis favoritos</h1>

      {loading ? (
        <p className="text-slate-500">Cargando...</p>
      ) : products.length === 0 ? (
        <p className="text-slate-500">Aún no tienes productos favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              receta={product}
              isFavorite={true}
              onToggleFavorite={handleToggle}
            />
          ))}
        </div>
      )}
    </main>
  );
}
