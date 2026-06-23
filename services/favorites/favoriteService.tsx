// Capa de servicios de favoritos: lista y alterna (agregar/quitar) los favoritos del usuario.
import api from "@/lib/axios"
import axios from "axios"

export const getFavorites = async () => {
    try {
        const { data } = await api.get("/favorites")
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al obtener los favoritos" }
    }
}

export const toggleFavorite = async (productId: string) => {
    try {
        const { data } = await api.post("/favorites", { productId })
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al actualizar el favorito" }
    }
}
