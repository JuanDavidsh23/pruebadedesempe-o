// Tipo de un producto del catálogo, compartido entre front y servicios.
export interface Product {
  _id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  descripcionExtendida?: string;
  especificaciones?: string[];
  stock?: number;
}
