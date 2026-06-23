// Backend de logout: elimina la cookie de sesión para cerrar la sesión del usuario.
import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ code: 200 });
    response.cookies.delete("session");
    return response;
}
