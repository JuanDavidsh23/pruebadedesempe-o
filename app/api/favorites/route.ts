// Backend de favoritos: lista los favoritos del usuario (GET) y alterna agregar/quitar (POST).
import { receta, Favorite } from "@/database/model";
import conection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const favorites = await Favorite.find({ userId });
    const recetaIds = favorites.map((f) => f.recetaId);
    const products = await receta.find({ _id: { $in: recetaIds } });

    return NextResponse.json({ data: products, code: 200 });
}

export async function POST(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const { recetaId } = await request.json();
    const existing = await Favorite.findOne({ userId, recetaId });

    if (existing) {
        await Favorite.deleteOne({ _id: existing._id });
        return NextResponse.json({ favorited: false, code: 200 });
    }

    await Favorite.create({ userId, recetaId });
    return NextResponse.json({ favorited: true, code: 201 });
}
