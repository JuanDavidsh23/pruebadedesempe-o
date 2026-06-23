// Backend de login: valida credenciales y crea la cookie de sesión que usa el middleware.
import User from "@/database/model";
import conection from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await conection();

    const { email, password } = await request.json()
    const user = await User.findOne({ email })

    if (!user) {
        return NextResponse.json(
            { error: "Email o contraseña incorrectos.", code: 404 },
            { status: 401 }
        )
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return NextResponse.json(
            { error: "El correo o la contraseña son incorrectos" },
            { status: 401 }
        )
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    const response = NextResponse.json({ data: userWithoutPassword, code: 200 });
    response.cookies.set("session", String(user._id), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    return response;
}
