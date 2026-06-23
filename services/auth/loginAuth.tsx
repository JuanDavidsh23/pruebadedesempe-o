import api from "@/lib/axios"
import axios from "axios"

export const login = async (email: string, password: string)=>{
    try{
        const {data} = await api.post("/auth/login", {
            email,
            password
        })
        return data
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al iniciar sesión" }
    }
}

export const logout = async () => {
    try {
        await api.post("/auth/logout")
    } catch {
        return { error: "Error al cerrar sesión" }
    }
}
