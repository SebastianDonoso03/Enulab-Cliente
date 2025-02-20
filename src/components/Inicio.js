import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll"; // Para el desplazamiento suave
import { useNavigate } from "react-router-dom"; // Para la navegación entre páginas
import { Button } from "antd";
import backgroundImage from "../images/restaurante.jpg";
import logo from "../images/logo.png";
import { getRestaurant } from "../services/restaurantService";

const Dashboard = () => {
  const navigate = useNavigate()
    useEffect(() => {
    document.title = "ENULAB";
    fetRestaurantes()
  }, []);
  const [restaurantes, setRestaurantes] = useState([]);
  const fetRestaurantes = async ()=>{
    try{
      const data = await getRestaurant();
      setRestaurantes(data)
    }
    catch(error){
      console.error('Error al obtener', error.message)
    }
  }

  const handleGestionClick = (restaurante) => {
    // Guardamos el restaurantId en localStorage
    localStorage.setItem("selectedRestaurantId", restaurante.id);
    // Redirigimos a la página de empleados
    navigate("/restaurant");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <div className="space-x-4">
            <ScrollLink
              to="Restaurantes"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-gray-900"
            >
              Restaurantes
            </ScrollLink>
          </div>
        </div>
      </nav>

      {/* Botones de navegación */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl font-bold">Bienvenidos a Enulab</h1>
          <p className="mt-4 text-lg">
            Distribuidora de Software para restaurantes
          </p>
          <div className="mt-6 space-x-4">
            <Button type="default" size="large">
              <ScrollLink to="Restaurantes" smooth={true} duration={500}>
                Conoce nuestros Restaurantes
              </ScrollLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section id="about" className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800">Sobre Nosotros</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Enulab es un servicio diseñado para gestionar una amplia variedad de
          restaurantes, permitiendo a los establecimientos registrar sus
          servicios y presentarlos de manera atractiva a los clientes.
        </p>
      </section>

      {/* Restaurantes Asociados */}
      <section id="Restaurantes" className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Nuestros restaurantes Asociados
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
            {restaurantes.length === 0 ? (
              <p>No hay restaurantes</p>
            ): (
              restaurantes.map((rest) => (
                <div key={rest.id} className="bg-white p-4 shadow-lg">
                  <img
                    src={`http://localhost:4200/img/usuario/${rest.logo}`}
                    alt="enulab"
                    className="w-full h-48 object-cover rounded-md"
                  />
                    <h3 className="mt-2 font-bold">{rest.name}</h3>
                    <p className="text-gray-600">{rest.descripcion}</p>
                    <button
                      onClick={() => handleGestionClick(rest)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                    Ver Menú
                  </button>
          </div>
              ))
            )}
        </div>
      </section>

      {/* Reservaciones */}
      <section id="reservations" className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800">Haz tu Reservación</h2>
        <p className="mt-4 text-gray-600">
          Para poder realizar una reservación, debes elegir a un restaurante y
          podras reservarlo ahi.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-white text-center">
        <p>&copy; 2025 Enulab. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
