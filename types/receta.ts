// Tipo de un producto del catálogo, compartido entre front y servicios.
export type receta = {
  _id: string;
  imagen: string;
  nombre: string;
  time: string;
  dificultad: string;
  descripcion: string;
  ingredientes?: string[];
  pasos?: string[];
  porciones?: number;
}
