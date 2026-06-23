// Backend de ventas: registra la compra (checkout) tomando el carrito actual del usuario y lo vacía.
import { Product, Cart, Sale } from "@/database/model";
import conection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await conection();
    const userId = request.cookies.get("session")?.value;

    if (!userId) {
        return NextResponse.json({ error: "No autenticado", code: 401 }, { status: 401 });
    }

    const cartItems = await Cart.find({ userId });
    if (cartItems.length === 0) {
        return NextResponse.json({ error: "El carrito está vacío", code: 400 }, { status: 400 });
    }

    const productIds = cartItems.map((c) => c.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Arma los items de la venta y calcula el total.
    let total = 0;
    const items = cartItems.map((c) => {
        const product = products.find((p) => String(p._id) === c.productId);
        const precio = product?.precio ?? 0;
        total += precio * c.cantidad;
        return {
            productId: c.productId,
            nombre: product?.nombre ?? "",
            precio,
            cantidad: c.cantidad,
        };
    });

    const sale = await Sale.create({ userId, items, total });
    await Cart.deleteMany({ userId });

    return NextResponse.json({ data: sale, code: 201 }, { status: 201 });
}
