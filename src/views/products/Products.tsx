import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductsService } from "../../api/services/product.service.ts"
import type { Product } from '../../interfaces/product.interface'

export default function Products() {
    const queryClient = useQueryClient()
    const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'detalleVentas' | 'detalleReabastecimientos' | 'alertas' | 'historialesInventario'>>({
        nombre: '',
        descripcion: '',
        categoria: '',
        cantidadEnStock: 0,
        precioVenta: 0,
        stockMinimo: 0,
    })

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await ProductsService.getAll()
            return response.data
        }
    })

    const createProduct = useMutation({
        mutationFn: ProductsService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            setNewProduct({
                nombre: '',
                descripcion: '',
                categoria: '',
                cantidadEnStock: 0,
                precioVenta: 0,
                stockMinimo: 0,
            })
            setIsNewProductModalOpen(false)
        }
    })

    const updateProduct = useMutation({
        mutationFn: ({ id, product }: { id: number, product: Partial<Product> }) =>
            ProductsService.update(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            setEditingProduct(null)
        }
    })

    const deleteProduct = useMutation({
        mutationFn: ProductsService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                <button
                    onClick={() => setIsNewProductModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    + Nuevo Producto
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map(product => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.descripcion}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.categoria}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.cantidadEnStock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${product.precioVenta.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteProduct.mutate(product.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* New Product Modal */}
            {isNewProductModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="new-product-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">+ Nuevo Producto</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                createProduct.mutate(newProduct)
                            }} className="space-y-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        value={newProduct.nombre}
                                        onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        id="descripcion"
                                        type="text"
                                        value={newProduct.descripcion}
                                        onChange={(e) => setNewProduct({...newProduct, descripcion: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        id="categoria"
                                        type="text"
                                        value={newProduct.categoria}
                                        onChange={(e) => setNewProduct({...newProduct, categoria: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cantidadEnStock" className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        id="cantidadEnStock"
                                        type="number"
                                        value={newProduct.cantidadEnStock}
                                        onChange={(e) => setNewProduct({...newProduct, cantidadEnStock: parseInt(e.target.value)})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="precioVenta" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        id="precioVenta"
                                        type="number"
                                        value={newProduct.precioVenta}
                                        onChange={(e) => setNewProduct({...newProduct, precioVenta: parseFloat(e.target.value)})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stockMinimo" className="block text-sm font-medium text-gray-700">Minimum Stock</label>
                                    <input
                                        id="stockMinimo"
                                        type="number"
                                        value={newProduct.stockMinimo}
                                        onChange={(e) => setNewProduct({...newProduct, stockMinimo: parseInt(e.target.value)})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsNewProductModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="edit-product-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Product</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                updateProduct.mutate({ id: editingProduct.id, product: editingProduct })
                            }} className="space-y-4">
                                <div>
                                    <label htmlFor="edit-nombre" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        id="edit-nombre"
                                        type="text"
                                        value={editingProduct.nombre}
                                        onChange={(e) => setEditingProduct({...editingProduct, nombre: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-descripcion" className="block text-sm font-medium text-gray-700">Descripcion</label>
                                    <input
                                        id="edit-descripcion"
                                        type="text"
                                        value={editingProduct.descripcion}
                                        onChange={(e) => setEditingProduct({...editingProduct, descripcion: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-categoria" className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        id="edit-categoria"
                                        type="text"
                                        value={editingProduct.categoria}
                                        onChange={(e) => setEditingProduct({...editingProduct, categoria: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-cantidadEnStock" className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        id="edit-cantidadEnStock"
                                        type="number"
                                        value={editingProduct.cantidadEnStock}
                                        onChange={(e) => setEditingProduct({...editingProduct, cantidadEnStock: parseInt(e.target.value)})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-precioVenta" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        id="edit-precioVenta"
                                        type="number"
                                        value={editingProduct.precioVenta}
                                        onChange={(e) => setEditingProduct({...editingProduct, precioVenta: parseFloat(e.target.value)})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-stockMinimo" className="block text-sm font-medium text-gray-700">Minimum Stock</label>
                                    <input
                                        id="edit-stockMinimo"
                                        type="number"
                                        value={editingProduct.stockMinimo}
                                        onChange={(e) => setEditingProduct({...editingProduct, stockMinimo: parseInt(e.target.value)})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditingProduct(null)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

