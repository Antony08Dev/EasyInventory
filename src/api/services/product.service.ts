import { axiosInstance } from '../axios.config'
import type { Product } from '../../interfaces/product.interface'

export const ProductsService = {
    getAll: () =>
        axiosInstance.get<Product[]>('/Producto'),

    getById: (id: number) =>
        axiosInstance.get<Product>(`/Producto/${id}`),

    create: (product: Omit<Product, 'id'>) =>
        axiosInstance.post<Product>('/Producto', product),

    update: (id: number, product: Partial<Product>) =>
        axiosInstance.put<Product>(`/Producto/${id}`, product),

    delete: (id: number) =>
        axiosInstance.delete(`/Producto/${id}`),
}

