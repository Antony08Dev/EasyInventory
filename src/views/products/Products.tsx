import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductsService } from "../../api/services/product.service.ts"
import type { Product } from '../../interfaces/product.interface'
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react'

const Products = () => {
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
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                <button
                    onClick={() => setIsNewProductModalOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    <PlusIcon className="h-5 w-5 mr-2" /> Nuevo Producto
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {["Nombre", "Descripcion", "Categoria", "Stock", "Precio", "Actions"].map((head) => (
                            <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {head}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.descripcion}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.categoria}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.cantidadEnStock}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.precioVenta.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => deleteProduct.mutate(product.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isNewProductModalOpen && (
                <ProductModal
                    title="Agregar Nuevo Producto"
                    product={newProduct}
                    setProduct={setNewProduct}
                    onSubmit={(e) => {
                        e.preventDefault()
                        createProduct.mutate(newProduct)
                    }}
                    onClose={() => setIsNewProductModalOpen(false)}
                    submitText="Guardar"
                />
            )}

            {editingProduct && (
                <ProductModal
                    title="Edit Product"
                    product={editingProduct}
                    setProduct={setEditingProduct}
                    onSubmit={(e) => {
                        e.preventDefault()
                        updateProduct.mutate({ id: editingProduct.id, product: editingProduct })
                    }}
                    onClose={() => setEditingProduct(null)}
                    submitText="Actualizar"
                />
            )}
        </div>
    )
}

interface ProductModalProps {
    title: string;
    product: Partial<Product>;
    setProduct: React.Dispatch<React.SetStateAction<any>>;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    submitText: string;
}

function ProductModal({ title, product, setProduct, onSubmit, onClose, submitText }: ProductModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex justify-center items-center" id="my-modal">
            <div className="relative p-5 border w-[30vw] md:w-[30vw] shadow-lg rounded-md bg-white">
                <div className="text-center">
                    <h3 className="text-xl leading-6 font-semibold text-gray-900">{title}</h3>
                    <form onSubmit={onSubmit} className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={product.nombre}
                                    onChange={(e) => setProduct({...product, nombre: e.target.value})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categoria" className="block text-gray-700 text-sm font-bold mb-2">
                                    Categoria
                                </label>
                                <input
                                    type="text"
                                    id="categoria"
                                    value={product.categoria}
                                    onChange={(e) => setProduct({...product, categoria: e.target.value})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                        </div>
                            <div className="mb-4">
                                <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                                    Descripcion
                                </label>
                                <textarea
                                    id="descripcion"
                                    rows={3}
                                    value={product.descripcion}
                                    onChange={(e) => setProduct({...product, descripcion: e.target.value})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="cantidadEnStock"
                                           className="block text-gray-700 text-sm font-bold mb-2">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        id="cantidadEnStock"
                                        value={product.cantidadEnStock}
                                        onChange={(e) => setProduct({
                                            ...product,
                                            cantidadEnStock: parseInt(e.target.value)
                                        })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="precioVenta" className="block text-gray-700 text-sm font-bold mb-2">
                                        Precio
                                    </label>
                                    <input
                                        type="number"
                                        id="precioVenta"
                                        value={product.precioVenta}
                                        onChange={(e) => setProduct({
                                            ...product,
                                            precioVenta: parseFloat(e.target.value)
                                        })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stockMinimo" className="block text-gray-700 text-sm font-bold mb-2">
                                        Stock Minimo
                                    </label>
                                    <input
                                        type="number"
                                        id="stockMinimo"
                                        value={product.stockMinimo}
                                        onChange={(e) => setProduct({
                                            ...product,
                                            stockMinimo: parseInt(e.target.value)
                                        })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                >
                                    {submitText}
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Products;

