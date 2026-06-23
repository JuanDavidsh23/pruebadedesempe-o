// Backend de productos: lista todo el catálogo (GET) y permite crear productos (POST).
import { receta } from "@/database/model";
import conection from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
    await conection();
    const products = await receta.find();
    return Response.json({ data: products, code: 200 });
}

export async function POST(request: NextRequest) {
    await conection();
    const body = await request.json();

    try {
        const newProduct = await receta.create(body);
        return Response.json({ data: newProduct, code: 201 }, { status: 201 });
    } catch {
        return Response.json(
            { error: "Error al crear el producto", code: 500 },
            { status: 500 }
        );
    }
}
