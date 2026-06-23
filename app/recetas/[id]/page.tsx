// Detalle de recetao (ruta dinámica): muestra datos extendidos no visibles en el listado.
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { receta } from "@/types/receta";
import { getreceta } from "@/services/receta/recetaService";

export default function recetaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [receta, setreceta] = useState<receta | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getreceta(id).then((result) => {
      if (result.error) setError(result.error);
      else setreceta(result.data);
      setLoading(false);
    });
  }, [id]);



  if (loading) return <main className="mx-auto max-w-5xl px-6 py-10 text-slate-500">Cargando...</main>;
  if (error || !receta) return <main className="mx-auto max-w-5xl px-6 py-10 text-rose-600">{error || "Receta no encontrada"}</main>;

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-6 py-10 md:grid-cols-2">
      <img
        src={receta.imagen}
        alt={receta.nombre}
        className="h-96 w-full rounded-2xl object-cover"
      />

      <div className="space-y-5">
        <h1 className="text-3xl font-bold text-slate-900">{receta.nombre}</h1>
        <p className="text-slate-600"><span className="mb-2 font-semibold text-slate-900">descripcion: </span>{receta.descripcion}</p>

        {receta.ingredientes && receta.ingredientes.length > 0 && (
          <div>
            <h2 className="mb-2 font-semibold text-slate-900">Ingredientes</h2>
            <ul className="list-inside list-disc space-y-1 text-slate-600">
              {receta.ingredientes.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-sm text-slate-500">
          Tiempo: <span className="font-semibold">{receta.time}</span>
        </p>
        <p className="text-sm text-slate-500">
          Dificultad: <span className="font-semibold">{receta.dificultad}</span>
        </p>
        <p className="text-sm text-slate-500">
          Porciones: <span className="font-semibold">{receta.porciones}</span>
        </p>

        {receta.pasos && receta.pasos.length > 0 && (
          <div>
            <h2 className="mb-2 font-semibold text-slate-900">Pasos</h2>
            <ol className="list-inside list-decimal space-y-1 text-slate-600">
              {receta.pasos.map((paso, i) => (
                <li key={i}>{paso}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </main>
  );
}
