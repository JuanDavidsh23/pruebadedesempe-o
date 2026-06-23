import api from "@/lib/axios"
import axios from "axios"

export const getrecetas = async () => {
    try {
        const { data } = await api.get("/recetas")
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al obtener los recetaos" }
    }
}

export const getreceta = async (id: string) => {
    try {
        const { data } = await api.get(`/recetas/${id}`)
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al obtener el recetao" }
    }
}
