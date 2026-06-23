// Página principal: lista el catálogo de productos con scroll (visible sin iniciar sesión).
"use client";

import { useEffect, useState } from "react";
import { getrecetas } from "@/services/receta/recetaService";
import { getFavorites, toggleFavorite as toggleFavoriteService } from "@/services/favorites/favoriteService";
import ProductCard from "@/components/recetaCard";
import type { receta } from "@/types/receta";

export default function Home() {
  const [products, setProducts] = useState<receta[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getrecetas().then((result) => {
      if (result.data) setProducts(result.data);
      setLoading(false);
    });
    getFavorites().then((result) => {
      if (result.data) setFavorites(result.data.map((p: receta) => p._id));
    });
  }, []);

  const toggleFavorite = async (id: string) => {
    const result = await toggleFavoriteService(id);
    if (result.favorited) setFavorites((prev) => [...prev, id]);
    else setFavorites((prev) => prev.filter((f) => f !== id));
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Menú de Recetas</h1>

      {loading ? (
        <p className="text-slate-500">Cargando productos...</p>
      ) : products.length === 0 ? (
        <p className="text-slate-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              receta={product}
              isFavorite={favorites.includes(product._id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
