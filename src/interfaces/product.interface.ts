export interface Product {
    id: number
    nombre: string
    descripcion: string
    categoria: string
    cantidadEnStock: number
    precioVenta: number
    stockMinimo: number
    detalleVentas?: unknown | null
    detalleReabastecimientos?: unknown | null
    alertas?: unknown | null
    historialesInventario?: unknown | null
}

