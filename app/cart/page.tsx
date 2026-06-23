// Vista del carrito: lista los productos agregados, permite quitarlos y registrar la compra.
"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart, checkout } from "@/services/cart/cartService";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/types/product";

type CartItem = { product: Product; cantidad: number };

export default function CartPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadCart = () => {
    getCart().then((result) => {
      if (result.data) setItems(result.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id: string) => {
    await removeFromCart(id);
    setItems((prev) => prev.filter((i) => i.product._id !== id));
  };

  const handleCheckout = async () => {
    const result = await checkout();
    if (result.error) {
      setMessage(result.error);
      return;
    }
    setItems([]);
    setMessage(t("cart.success"));
  };

  const total = items.reduce((sum, i) => sum + i.product.precio * i.cantidad, 0);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">{t("cart.title")}</h1>

      {message && <p className="mb-6 text-sky-600">{message}</p>}

      {loading ? (
        <p className="text-slate-500">{t("common.loading")}</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500">{t("cart.empty")}</p>
      ) : (
        <div className="space-y-4">
          {items.map(({ product, cantidad }) => (
            <div
              key={product._id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <img
                src={product.imagen}
                alt={product.nombre}
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{product.nombre}</p>
                <p className="text-sm text-slate-500">{t("cart.quantity")} {cantidad}</p>
                <p className="font-bold text-sky-600">
                  ${(product.precio * cantidad).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleRemove(product._id)}
                className="text-rose-600 hover:text-rose-700"
              >
                {t("cart.remove")}
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <p className="text-xl font-bold text-slate-900">
              {t("cart.total")} ${total.toLocaleString()}
            </p>
            <button
              onClick={handleCheckout}
              className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
            >
              {t("cart.buy")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
