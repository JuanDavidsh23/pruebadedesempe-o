// Detalle de producto (ruta dinámica): muestra datos extendidos no visibles en el listado.
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct } from "@/services/products/productService";
import { addToCart } from "@/services/cart/cartService";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/types/product";

export default function ProductDetailPage() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProduct(id).then((result) => {
      if (result.error) setError(result.error);
      else setProduct(result.data);
      setLoading(false);
    });
  }, [id]);

  // Agrega al carrito; si el usuario no está autenticado (401) lo envía a login.
  const handleAddToCart = async () => {
    const result = await addToCart(id);
    if (result.code === 401) {
      router.push("/auth/login");
      return;
    }
    if (result.error) {
      setMessage(result.error);
      return;
    }
    setMessage(t("product.added"));
  };

  if (loading) return <main className="mx-auto max-w-5xl px-6 py-10 text-slate-500">{t("common.loading")}</main>;
  if (error || !product) return <main className="mx-auto max-w-5xl px-6 py-10 text-rose-600">{error || t("product.notFound")}</main>;

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-6 py-10 md:grid-cols-2">
      <img
        src={product.imagen}
        alt={product.nombre}
        className="h-96 w-full rounded-2xl object-cover"
      />

      <div className="space-y-5">
        <h1 className="text-3xl font-bold text-slate-900">{product.nombre}</h1>
        <p className="text-2xl font-bold text-sky-600">${product.precio.toLocaleString()}</p>

        <p className="text-slate-600">{product.descripcionExtendida || product.descripcion}</p>

        {product.especificaciones && product.especificaciones.length > 0 && (
          <div>
            <h2 className="mb-2 font-semibold text-slate-900">{t("product.specs")}</h2>
            <ul className="list-inside list-disc space-y-1 text-slate-600">
              {product.especificaciones.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-sm text-slate-500">
          {t("product.stock")} <span className="font-semibold">{product.stock ?? 0}</span>
        </p>

        <button
          onClick={handleAddToCart}
          className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
        >
          {t("product.addToCart")}
        </button>

        {message && <p className="text-sm text-sky-600">{message}</p>}
      </div>
    </main>
  );
}
