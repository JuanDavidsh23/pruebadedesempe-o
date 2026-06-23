import api from "@/lib/axios"
import axios from "axios"



export const CreateUser = async (userData: object) =>{
    try{
        const {data} = await api.post("/auth/register", userData)
        return data
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data || { error: err.message }
        }
        return { error: "Error inesperado al crear el usuario" }
    }
}





