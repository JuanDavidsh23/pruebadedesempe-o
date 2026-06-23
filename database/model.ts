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

const productSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  descripcion: { type: String, required: true },
  descripcionExtendida: { type: String },
  especificaciones: { type: [String], default: [] },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

let Product: Model<any>;
try {
  Product = model("products");
} catch {
  Product = model("products", productSchema);
}

const favoriteSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
}, { timestamps: true });

let Favorite: Model<any>;
try {
  Favorite = model("favorites");
} catch {
  Favorite = model("favorites", favoriteSchema);
}

const cartSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  cantidad: { type: Number, default: 1 },
}, { timestamps: true });

let Cart: Model<any>;
try {
  Cart = model("cart");
} catch {
  Cart = model("cart", cartSchema);
}

const saleSchema = new Schema({
  userId: { type: String, required: true },
  items: [{
    productId: String,
    nombre: String,
    precio: Number,
    cantidad: Number,
  }],
  total: { type: Number, required: true },
}, { timestamps: true });

let Sale: Model<any>;
try {
  Sale = model("sales");
} catch {
  Sale = model("sales", saleSchema);
}

export { Product, Favorite, Cart, Sale };
export default User;