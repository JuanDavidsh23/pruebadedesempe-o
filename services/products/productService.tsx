// Capa de servicios de productos: obtiene el catálogo y el detalle desde el backend.
import api from "@/lib/axios"
import axios from "axios"

export const getProducts = async () => {
    try {
        const { data } = await api.get("/products")
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al obtener los productos" }
    }
}

export const getProduct = async (id: string) => {
    try {
        const { data } = await api.get(`/products/${id}`)
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al obtener el producto" }
    }
}
