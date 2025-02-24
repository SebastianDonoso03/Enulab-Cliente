import React, { useEffect, useState } from "react";
import { getDishes } from "../services/platosService";
import { Link } from "react-router-dom";
import EnuLaba1 from "../images/EnuLaba 1.png";

const Platos = () => {
  const [platos, setPlatos] = useState([]);
  const menuId = localStorage.getItem("selectedMenuId");

  useEffect(() => {
    const fetchPlatos = async () => {
      if (menuId) {
        try {
          const platosData = await getDishes(menuId);
          setPlatos(platosData);
        } catch (error) {
          console.log("Error al cargar los platos:", error);
        }
      }
    };
    fetchPlatos();
  }, [menuId]);

  // Agrupar platos por categoría
  const categorias = [...new Set(platos.map((plato) => plato.category))];

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#9D9D9D] z-50 py-4 px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 font-semibold"
        >
          <img src={EnuLaba1} alt="Logo" className="h-10" />
        </Link>
        <div className="space-x-6">
          <Link to="/restaurant" className="text-white font-semibold">
            Menús
          </Link>
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
      </nav>

      {/* Contenido */}
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <Link to="/restaurant" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <span className="text-2xl mr-2">←</span>
          <span className="font-semibold">Volver a los menús</span>
        </Link>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          📜 Menú del Restaurante
        </h1>

        {categorias.map((categoria) => (
          <div key={categoria} className="mb-10">
            <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
              {categoria}
            </h2>
            <div className="space-y-6">
              {platos
                .filter((plato) => plato.category === categoria)
                .map((plato) => (
                  <div
                    key={plato.id}
                    className="flex justify-between items-start bg-white p-6 rounded-lg shadow-md"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{plato.name}</h3>
                      <p className="text-gray-600">{plato.description}</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      ${plato.price}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Platos;