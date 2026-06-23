// Backend del carrito: lista (GET), agrega/incrementa (POST) y quita (DELETE) productos del usuario.
import { Product, Cart } from "@/database/model";
import conection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const cartItems = await Cart.find({ userId });
    const productIds = cartItems.map((c) => c.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Une cada producto con la cantidad guardada en el carrito.
    const items = cartItems.map((c) => {
        const product = products.find((p) => String(p._id) === c.productId);
        return { product, cantidad: c.cantidad };
    }).filter((i) => i.product);

    return NextResponse.json({ data: items, code: 200 });
}

export async function POST(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const { productId } = await request.json();
    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
        existing.cantidad += 1;
        await existing.save();
        return NextResponse.json({ data: existing, code: 200 });
    }

    const item = await Cart.create({ userId, productId, cantidad: 1 });
    return NextResponse.json({ data: item, code: 201 }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const { productId } = await request.json();
    await Cart.deleteOne({ userId, productId });

    return NextResponse.json({ code: 200 });
}
