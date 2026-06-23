// Capa de servicios del carrito: lista, agrega, quita productos y registra la compra (checkout).
import api from "@/lib/axios"
import axios from "axios"

export const getCart = async () => {
    try {
        const { data } = await api.get("/cart")
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al obtener el carrito" }
    }
}

export const addToCart = async (productId: string) => {
    try {
        const { data } = await api.post("/cart", { productId })
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al agregar al carrito" }
    }
}

export const removeFromCart = async (productId: string) => {
    try {
        const { data } = await api.delete("/cart", { data: { productId } })
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al quitar del carrito" }
    }
}

export const checkout = async () => {
    try {
        const { data } = await api.post("/sales")
        return data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al realizar la compra" }
    }
}
