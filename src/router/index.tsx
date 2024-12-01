import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

// Lazy load pages
const Login = lazy(() => import('../views/auth/Login'))
const Products = lazy(() => import('../views/products/Products'))
const Layout = lazy(() => import('../component/layout/Layout'))

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = localStorage.getItem('token')
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return children
}

const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<div>Loading...</div>}>
                    <Layout />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'products',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Products />
                    </Suspense>
                ),
            },
            {
                path: '',
                element: <Navigate to="/products" replace />,
            },
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}

