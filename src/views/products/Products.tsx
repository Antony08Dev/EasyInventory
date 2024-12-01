import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {ProductsService} from "../../api/services/product.service.ts";
// import { ProductsService } from '../../api/services/products.service'
import type { Product } from '../../interfaces/product.interface'

export default function Products() {
    const queryClient = useQueryClient()
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'detalleVentas' | 'detalleReabastecimientos' | 'alertas' | 'historialesInventario'>>({
        nombre: '',
        descripcion: '',
        categoria: '',
        cantidadEnStock: 0,
        precioVenta: 0,
        stockMinimo: 0,
    })

    // Get all products
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await ProductsService.getAll()
            return response.data
        }
    })

    // Create product mutation
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
        }
    })

    // Update product mutation
    const updateProduct = useMutation({
        mutationFn: ({ id, product }: { id: number, product: Partial<Product> }) =>
            ProductsService.update(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            setEditingProduct(null)
        }
    })

    // Delete product mutation
    const deleteProduct = useMutation({
        mutationFn: ProductsService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })

    if (isLoading) return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Products</h2>

            {/* New Product Form */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    createProduct.mutate(newProduct)
                }} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.nombre}
                        onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newProduct.descripcion}
                        onChange={(e) => setNewProduct({...newProduct, descripcion: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newProduct.categoria}
                        onChange={(e) => setNewProduct({...newProduct, categoria: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={newProduct.cantidadEnStock}
                        onChange={(e) => setNewProduct({...newProduct, cantidadEnStock: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.precioVenta}
                        onChange={(e) => setNewProduct({...newProduct, precioVenta: parseFloat(e.target.value)})}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Minimum Stock"
                        value={newProduct.stockMinimo}
                        onChange={(e) => setNewProduct({...newProduct, stockMinimo: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add Product
                    </button>
                </form>
            </div>

            {/* Product List */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
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
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteProduct.mutate(product.id || 0)}
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

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Product</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                updateProduct.mutate({ id: editingProduct.id, product: editingProduct })
                            }} className="mt-2 space-y-4">
                                <input
                                    type="text"
                                    value={editingProduct.nombre}
                                    onChange={(e) => setEditingProduct({...editingProduct, nombre: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    value={editingProduct.descripcion}
                                    onChange={(e) => setEditingProduct({...editingProduct, descripcion: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    value={editingProduct.categoria}
                                    onChange={(e) => setEditingProduct({...editingProduct, categoria: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    value={editingProduct.cantidadEnStock}
                                    onChange={(e) => setEditingProduct({...editingProduct, cantidadEnStock: parseInt(e.target.value)})}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    value={editingProduct.precioVenta}
                                    onChange={(e) => setEditingProduct({...editingProduct, precioVenta: parseFloat(e.target.value)})}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    value={editingProduct.stockMinimo}
                                    onChange={(e) => setEditingProduct({...editingProduct, stockMinimo: parseInt(e.target.value)})}
                                    className="w-full p-2 border rounded"
                                />
                                <div className="items-center px-4 py-3">
                                    <button
                                        id="ok-btn"
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

