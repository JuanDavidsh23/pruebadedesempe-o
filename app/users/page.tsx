"use client"

import { deleteUser, getUser, updateUser } from "@/services/users/users"
import { User } from "@/types/user"
import { set } from "mongoose"
import { use, useState } from "react"
import { useEffect } from "react"

export default function UserList(){
    const [users,setUsers] = useState<User[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [editId, setEditId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState({ nombre: "", email: "" })

    useEffect(()=>{
        const fetch = async () =>{
            const res = await getUser()

            setUsers(res.data || [])
            setLoading(false)
                    console.log("RES:", res);
        }

        fetch()
    },[])

    async function handleDelete(id: string) {
    const res = await deleteUser(id)

    if(res?.error){
        console.log(res.error)
        return
    }
    setUsers((prev)=> prev.filter((user)=>user._id !== id))
}

    function handleEdit(user: User) {
        setEditId(user._id)
        setEditForm({ nombre: user.nombre, email: user.email })
    }

    async function handleUpdate(id: string) {
        const res = await updateUser(id, editForm)

        if(res?.error){
            console.log(res.error)
            return
        }
        setUsers((prev)=> prev.map((user)=> user._id === id ? res.data : user))
        setEditId(null)
    }

    const filterUsers = users.filter((user)=>user.email?.toLowerCase().includes(search.toLowerCase()))


     return (
        <div style={{ padding: "20px" }}>
            
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "10px",
                    width: "100%",
                    marginBottom: "20px"
                }}
            />

            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                filterUsers.map((user) => (
                    <div
                        key={user._id}
                        style={{
                            padding: "10px",
                            borderBottom: "1px solid #ccc"
                        }}
                    >
                        {editId === user._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editForm.nombre}
                                    onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                                    style={{ padding: "5px", marginRight: "5px" }}
                                />
                                <input
                                    type="text"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    style={{ padding: "5px", marginRight: "5px" }}
                                />
                                <button
                                style={{ background: "green", color: "white", padding: "5px 10px" }}
                                onClick={()=>handleUpdate(user._id)}
                                >SAVE</button>
                            </div>
                        ) : (
                            <>
                                <strong>{user.nombre}</strong>
                                <p>{user.email}</p>
                                <button
                                style={{ background: "blue", color: "white", padding: "5px 10px", marginRight: "5px" }}
                                onClick={()=>handleEdit(user)}
                                >EDIT</button>
                                <button
                                style={{ background: "red", color: "white", padding: "5px 10px" }}
                                onClick={()=>handleDelete(user._id)}
                                >DELETE</button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}