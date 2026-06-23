// Tarjeta reutilizable de producto (props): muestra imagen, nombre, precio y estrella de favorito.
"use client";

import Link from "next/link";
import { Card, buttonVariants } from "@heroui/react";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/types/product";

type Props = {
    product: Product;
    isFavorite?: boolean;
    onToggleFavorite?: (id: string) => void;
};

export default function ProductCard({ product, isFavorite = false, onToggleFavorite }: Props) {
    const { t } = useI18n();
    return (
        <Card className="relative overflow-hidden">
            <button
                type="button"
                onClick={() => onToggleFavorite?.(product._id)}
                aria-label={t("card.favAria")}
                className="absolute right-3 top-3 z-10 text-2xl leading-none drop-shadow"
            >
                <span className={isFavorite ? "text-amber-400" : "text-white/80"}>
                    {isFavorite ? "★" : "☆"}
                </span>
            </button>

            <img
                src={product.imagen}
                alt={product.nombre}
                className="h-48 w-full object-cover"
            />

            <Card.Content className="space-y-2 p-4">
                <Card.Title className="text-base font-semibold text-slate-900">
                    {product.nombre}
                </Card.Title>
                <p className="text-lg font-bold text-sky-600">
                    ${product.precio.toLocaleString()}
                </p>
            </Card.Content>

            <Card.Footer className="p-4 pt-0">
                <Link href={`/products/${product._id}`} className={buttonVariants({ fullWidth: true })}>
                    {t("card.detail")}
                </Link>
            </Card.Footer>
        </Card>
    );
}
