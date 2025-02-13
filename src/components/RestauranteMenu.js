import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMenu } from '../services/menuService.js'

const RestaurantMenu = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
/*   const [selectedMenu, setSelectedMenu] = useState(null);
  const [showModal, setShowModal] = useState(false); */
  const [menus, setMenus] = useState([]);
  
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusData = await getMenu(restaurantId);
        setMenus(menusData);
      } catch (error) {
        console.error("Error al cargar los menús:", error);
      }
    };
    fetchMenus();
  }, [restaurantId]);



  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900 font-semibold">
            🔙 Volver al Inicio
          </Link>
          <div className="space-x-6">
            <Link  className="text-gray-700 hover:text-blue-500 font-semibold">
              Menú
            </Link>
            <Link to="/reserva" className="text-gray-700 hover:text-blue-500 font-semibold">
              Reservaciones
            </Link>
            <Link  className="text-gray-700 hover:text-blue-500 font-semibold">
              Comentarios
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 w-full"></div>
      </nav>

      {/* Contenido Principal */}
      <div className="pt-24 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Aqui va el menu</h1>
        {/* Menú */}
        <br></br>
        {menus.map((menu) => (
        <div className="menu-item d-flex mb-3" key={menu.id}>
          <div className="menu-description flex-grow-1">
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
export default RestaurantMenu;
