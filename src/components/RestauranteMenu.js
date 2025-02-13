import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const { id } = useParams();

  const restaurant = {
    id: id,
    name: "ZUUZ",
    menu: ["Plato 1", "Plato 2", "Plato 3"],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900 font-semibold">
            🔙 Volver al Inicio
          </Link>
          <div className="space-x-6">
            <Link to={`/restaurant/${id}`} className="text-gray-700 hover:text-blue-500 font-semibold">
              Menú
            </Link>
            <Link to={`/restaurant/${id}/reservations`} className="text-gray-700 hover:text-blue-500 font-semibold">
              Reservaciones
            </Link>
            <Link to={`/restaurant/${id}/comments`} className="text-gray-700 hover:text-blue-500 font-semibold">
              Comentarios
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 w-full"></div>
      </nav>

      {/* Contenido Principal */}
      <div className="pt-24 text-center">
        <h1 className="text-4xl font-bold text-gray-800">{restaurant.name}</h1>

        {/* Menú */}
        {window.location.pathname === `/restaurant/${id}` && (
          <div className="mt-6 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🍽️ Menú</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.menu.map((item, index) => (
                <li key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="font-semibold text-lg">{item}</h3>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Secciones Anidadas */}
        <Outlet />
      </div>
    </div>
  );
};
export default RestaurantMenu;
