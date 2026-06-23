import mongoose from 'mongoose';

const conection = async () => {
    try{
        const conect = process.env.MONGO
        await mongoose.connect(`${conect}`)
        console.log("BASE DE DATOS CONECTADA")

    }catch(error){
        console.error(error)
        throw error
    }
}

export default conection