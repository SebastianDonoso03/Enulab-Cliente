import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { getMenu } from "../services/menuService.js";
import EnuLaba1 from "../images/EnuLaba 1.png";

const { Meta } = Card;

const RestaurantMenu = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
/*   const [selectedMenu, setSelectedMenu] = useState(null);
  const [showModal, setShowModal] = useState(false); */
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

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

  const handleManage = (id) => {
    localStorage.setItem("selectedMenuId", id);
    navigate(`/Platos`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#EAEAEA]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#9D9D9D] ">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 font-semibold"
          >
            <img src={EnuLaba1} alt="Logo" className="h-10" />
          </Link>
          <div className="space-x-6">
            <Link className="text-white font-semibold">Menús</Link>
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
        { menus.map((menu) => (
         <Card key={menu.id} hoverable className="shadow-lg rounded-lg">
            <Meta title={menu.name} description={menu.description} />
            <div className="mt-4">
              <Button
                type="primary"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                onClick={() => handleManage(menu.id)}
              >
                <i className="bi bi-people"></i> Visualizar platos
              </Button>
            </div>
          </Card>  ))}
        </div>
      </div>

      {/* Footer con Horarios */}
      <footer className="py-6 bg-gray-900 text-white text-center">
        <p>© 2025 Enulab. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default RestaurantMenu;
