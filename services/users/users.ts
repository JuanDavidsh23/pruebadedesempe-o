import api from "@/lib/axios"
import axios from "axios"

export const getUser = async () => {
    try{
        const {data} = await api.get("/users")
        return data
    }catch(error){
        if(axios.isAxiosError(error)){
            return error.response?.data||{error: error.message}
        }
        return {error:"error inesperado al obtener los usuarios"}
    }
}

export const deleteUser = async (id: string) => {
    try{
        const {data} = await api.delete(`/users/${id}`)
        return data
    }catch(error){
        if(axios.isAxiosError(error)){
            return error.response?.data || {error: error.message}
        }
        return {error: "error inesperado al obtener los usuaerios "}
    }
}

export const updateUser = async (id: string, form: any) => {
    try{
        const {data} = await api.put(`/users/${id}`, form)
        return data
    }catch(error){
        if(axios.isAxiosError(error)){
            return error.response?.data || {error: error.message}
        }
        return {error: "error inesperado al actualizar el usuario"}
    }
}