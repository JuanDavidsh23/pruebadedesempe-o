// Backend de detalle: devuelve un único producto por su id (incluye campos extendidos).
import { receta } from "@/database/model";
import conection from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await conection();
    const { id } = await params;

    const product = await receta.findById(id);

    if (!product) {
        return Response.json(
            { error: "Producto no encontrado", code: 404 },
            { status: 404 }
        );
    }

    return Response.json({ data: product, code: 200 });
}
