import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { getMenu } from "../services/menuService.js";
import EnuLab3 from "../images/EnuLab3.png";

const { Meta } = Card;

const RestaurantMenu = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
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
    <div className="min-h-screen flex flex-col bg-[#EAEAEA]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#9D9D9D] z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 font-semibold"
          >
            <img src={EnuLab3} alt="Logo" className="h-10" />
          </Link>
          <div className="space-x-6">
            <Link className="text-white font-semibold">Menú</Link>
            <Link
              to="/reserva"
              className="text-white hover:text-white font-semibold"
            >
              Reservaciones
            </Link>
            <Link
              to="/comentario"
              className="text-white hover:text-white font-semibold"
            >
              Comentarios
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 w-full"></div>
      </nav>

      {/* Contenido Principal */}
      <div className="pt-24 container mx-auto px-6 flex-grow">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🍽️ Menú
        </h1>

        {/* Grid de Menús */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <Link to={`/platos/${menu.id}`} key={menu.id}>
              <Card hoverable className="shadow-lg rounded-lg">
                <Meta title={menu.name} description={menu.description} />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer con Horarios */}
      <footer className=" py-6 shadow-md mt-auto">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-semibold">🕒 Horarios de Atención</h3>
          <p>Lunes a Viernes: 10:00 AM - 10:00 PM</p>
          <p>Sábados y Domingos: 12:00 PM - 11:00 PM</p>
        </div>
      </footer>
    </div>
  );
};
export default RestaurantMenu;
