// Backend de favoritos: lista los favoritos del usuario (GET) y alterna agregar/quitar (POST).
import { Product, Favorite } from "@/database/model";
import conection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const favorites = await Favorite.find({ userId });
    const productIds = favorites.map((f) => f.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    return NextResponse.json({ data: products, code: 200 });
}

export async function POST(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const { productId } = await request.json();
    const existing = await Favorite.findOne({ userId, productId });

    if (existing) {
        await Favorite.deleteOne({ _id: existing._id });
        return NextResponse.json({ favorited: false, code: 200 });
    }

    await Favorite.create({ userId, productId });
    return NextResponse.json({ favorited: true, code: 201 });
}
