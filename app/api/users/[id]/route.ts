import User from "@/database/model";
import conection from "@/lib/db";

export async function PUT(
    req: Request,
    {params}:{params: Promise<{id: string}>}
){
    await conection;

    const {id} = await params
    const body = await req.json()

    const updateUser = await User.findByIdAndUpdate(
        id,
        body,
        {new: true}
    )
    return Response.json({data: updateUser, code: 200})

}

export async function DELETE(
    req:Request,
    {params}:{params:{id:string}}
){
    await conection;

    const {id} = await params

    const deleteUser = await  User.findByIdAndDelete(id)
    return Response.json({data: deleteUser, code: 200})
}