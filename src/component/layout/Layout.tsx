import { Outlet, Link } from 'react-router-dom';
import { FaBox, FaChartPie, FaCog, FaFacebookF, FaInstagram, FaSignOutAlt, FaTwitter } from "react-icons/fa";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-300 to-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="src/component/layout/imagenes/logo inventario.png"
                            alt="EasyInventory Logo"
                            className="w-10 h-10"
                        />
                        <h1 className="text-3xl font-bold tracking-wide">EasyInventory</h1>
                    </div>
                    {/* Navigation */}
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link
                                    to="/products"
                                    className="flex items-center space-x-2 hover:underline"
                                >
                                    <FaBox className="text-xl" />
                                    <span>Products</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/analytics"
                                    className="flex items-center space-x-2 hover:underline"
                                >
                                    <FaChartPie className="text-xl" />
                                    <span>Analytics</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/settings"
                                    className="flex items-center space-x-2 hover:underline"
                                >
                                    <FaCog className="text-xl" />
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/logout"
                                    className="flex items-center space-x-2 hover:underline"
                                >
                                    <FaSignOutAlt className="text-xl" />
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-200 to-gray-400 p-4 mt-6">
                <div className="container mx-auto text-center flex flex-col space-y-3">
                    <p className="text-gray-800">
                        © 2024 EasyInventory. All rights reserved.
                    </p>
                    {/* Redes Sociales */}
                    <div className="flex justify-center space-x-4 text-gray-600">
                        <a
                            href="#"
                            className="hover:text-emerald-600 text-2xl transition-transform transform hover:scale-110"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="hover:text-emerald-400 text-2xl transition-transform transform hover:scale-110"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="hover:text-pink-600 text-2xl transition-transform transform hover:scale-110"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Layout;

