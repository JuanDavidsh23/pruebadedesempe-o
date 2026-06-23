import User from "@/database/model";
import conection from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function GET(){
    await conection();
    const users = await User.find({}, {password: 0})
    return Response.json({data: users, code: 200 })
}

export async function POST(request: NextRequest){
    await conection();
    const body = await request.json()

    const existingUser = await User.findOne({email: body.email})

    if(existingUser){
        return Response.json(
            {error: "El correo ya se encuentra registrado", code : 409},
            {status: 409}
        )
    }

    try{
        const plainPassword = body.password
        const hashedPassword = await bcrypt.hash(plainPassword, 10)

        const newUser = await User.create({...body, password: hashedPassword})

        sendEmail({nombre: body.nombre, email: body.email, password: plainPassword}).catch(console.error)

        const {password:_, ...userWithoutPassword} = newUser.toObject()

        return Response.json(
            {data: userWithoutPassword, code : 201},
            {status: 201}
        )
    }catch{
        return Response.json(
            {error: "Error al crear el usuario", code:500},
            {status: 500}
        )
    }
}