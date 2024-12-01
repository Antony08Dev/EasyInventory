import { axiosInstance } from '../axios.config'
import type { Product } from '../../interfaces/product.interface'

export const ProductsService = {
    getAll: () =>
        axiosInstance.get<Product[]>('/products'),

    getById: (id: number) =>
        axiosInstance.get<Product>(`/products/${id}`),

    create: (product: Omit<Product, 'id'>) =>
        axiosInstance.post<Product>('/products', product),

    update: (id: number, product: Partial<Product>) =>
        axiosInstance.put<Product>(`/products/${id}`, product),

    delete: (id: number) =>
        axiosInstance.delete(`/products/${id}`),
}

