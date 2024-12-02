import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">EasyInventory</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/products" className="hover:underline">Products</Link></li>
                            {/* Add more navigation items here as needed */}
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-200 p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; Hola Buenas tardes.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;

