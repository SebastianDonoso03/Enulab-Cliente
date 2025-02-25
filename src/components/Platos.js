import React, { useEffect, useState } from "react";
import { getDishes } from "../services/platosService";
import { Link } from "react-router-dom";
import EnuLaba1 from "../images/EnuLaba 1.png";

const Platos = () => {
  const [platos, setPlatos] = useState([]);
  const menuId = localStorage.getItem("selectedMenuId");
  
  useEffect(() => {
      const fetchPlatos = async () => {
          if(menuId){
            try {
              const platosData = await getDishes(menuId)
              setPlatos(platosData)
            } catch (error) {
              console.log('Error al cargar los platos:', error)
            }
          }
      };
      fetchPlatos();
  }, [menuId]);

  return (
    <div className="min-h-screen bg-[#EAEAEA] flex flex-col">
      <nav className="fixed top-0 w-full bg-[#9D9D9D] z-50 py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-gray-700 hover:text-gray-900 font-semibold">
          <img src={EnuLaba1} alt="Logo" className="h-10" />
        </Link>
        <div className="space-x-6">
          <Link to="/restaurant" className="text-white font-semibold">Menús</Link>
          <Link to="/reserva" className="text-white hover:text-white font-semibold">Reservaciones</Link>
          <Link to="/comentario" className="text-white hover:text-white font-semibold">Comentarios</Link>
        </div>
      </nav>

      <div className="pt-24 px-6 max-w-5xl mx-auto flex-grow">
        <Link to="/restaurant" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <span className="text-2xl mr-2">←</span>
          <span className="font-semibold">Volver a los menús</span>
        </Link>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">📜 Menú del Restaurante</h1>

        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Descripción</th>
              <th className="py-2 px-4">Precio</th>
            </tr>
          </thead>
          <tbody>
            {platos.map((plato) => (
              <tr key={plato.id} className="border-b">
                <td className="py-2 px-4">{plato.name}</td>
                <td className="py-2 px-4">{plato.description}</td>
                <td className="py-2 px-4 font-bold">${plato.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-auto py-6 bg-gray-900 text-white text-center">
        <p>© 2025 Enulab. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Platos;
