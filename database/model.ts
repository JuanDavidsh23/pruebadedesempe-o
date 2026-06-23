import { Schema, model, Model } from "mongoose";

const userSchema = new Schema({
  nombre: { type: String, required: true },
  cc: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

let User: Model<any>;
try {
  User = model("users");
} catch {
  User = model("users", userSchema);
}



const recetaSchema = new Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  time: { type: String, required: true },
  dificultad: { type: String, required: true },
  descripcion: { type: String, required: true },
  ingredientes: { type: [String], default: [] },
  pasos: { type: [String], default: [] },
  porciones: { type: Number, default: 1 },
}, { timestamps: true });

let receta: Model<any>;
try {
  receta = model("recetas");
} catch {
  receta = model("recetas", recetaSchema);
}

const favoriteSchema = new Schema({
  userId: { type: String, required: true },
  recetaId: { type: String, required: true },
}, { timestamps: true });

let Favorite: Model<any>;
try {
  Favorite = model("favorites");
} catch {
  Favorite = model("favorites", favoriteSchema);
}


export { receta, Favorite };
export default User;