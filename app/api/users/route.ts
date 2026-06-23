import User from "@/database/model";
import conection from "@/lib/db";

export async function GET(){
    await conection()
    const users = await User.find()
     return Response.json({data: users, code: 200})
}

