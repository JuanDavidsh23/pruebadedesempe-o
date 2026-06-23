// Tarjeta reutilizable de recetao (props): muestra imagen, nombre, precio y estrella de favorito.
"use client";

import Link from "next/link";
import { Card, buttonVariants } from "@heroui/react";
import type { receta } from "@/types/receta";

type Props = {
    receta: receta;
    isFavorite?: boolean;
    onToggleFavorite?: (id: string) => void;
};

export default function recetaCard({ receta, isFavorite = false, onToggleFavorite }: Props) {
    return (
        <Card className="relative overflow-hidden">
            <button
                type="button"
                onClick={() => onToggleFavorite?.(receta._id)}
                aria-label="Marcar como favorito"
                className="absolute right-3 top-3 z-10 text-2xl leading-none drop-shadow"
            >
                <span className={isFavorite ? "text-amber-400" : "text-white/80"}>
                    {isFavorite ? "★" : "☆"}
                </span>
            </button>

            <img
                src={receta.imagen}
                alt={receta.time}
                className="h-48 w-full object-cover"
            />

            <Card.Content className="space-y-2 p-4">
                <Card.Title className="text-base font-semibold text-slate-900">
                    {receta.nombre}
                </Card.Title>
                <p className="text-sm text-slate-500">
                    {receta.time}
                </p>
                <p className="text-sm text-slate-500">
                    Dificultad: {receta.dificultad}
                </p>
            </Card.Content>

            <Card.Footer className="p-4 pt-0">
                <Link href={`/recetas/${receta._id}`} className={buttonVariants({ fullWidth: true })}>
                    Ver detalle
                </Link>
            </Card.Footer>
        </Card>
    );
}
