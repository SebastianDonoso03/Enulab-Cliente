import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll"; // Para el desplazamiento suave
import { useNavigate } from "react-router-dom"; // Para la navegación entre páginas
import { Button, Card } from "antd";
import backgroundImage from "../images/fondo.jpg";
import EnuLaba1 from "../images/EnuLaba 1.png";
import { getRestaurant } from "../services/restaurantService";
import { UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "ENULAB";
    fetRestaurantes();
  }, []);
  const [restaurantes, setRestaurantes] = useState([]);
  const fetRestaurantes = async () => {
    try {
      const data = await getRestaurant();
      setRestaurantes(data);
    } catch (error) {
      console.error("Error al obtener", error.message);
    }
  };

  const handleGestionClick = (restaurante) => {
    localStorage.setItem("selectedRestaurantId", restaurante.id);
    navigate("/restaurant");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#9D9D9D] shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center py-2 px-4">
          <img src={EnuLaba1} alt="Logo" className="h-12" />
          <div className="space-x-4">
            <ScrollLink
              to="Restaurantes"
              smooth={true}
              duration={500}
              className="cursor-pointer text-black hover:text-gray-900 text-sm"
            >
              Restaurantes
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer text-black hover:text-gray-900 text-sm"
            >
              Conócenos
            </ScrollLink>
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <section
          className="relative h-[70vh] bg-cover bg-center flex justify-center items-center text-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          <div className="relative z-10 text-white">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              ¡Explora los Mejores Restaurantes con Enulab!
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Reserva tu mesa y disfruta de la mejor gastronomía.
            </p>
            <div className="mt-6 flex space-x-4 justify-center">
              <Button type="primary" size="large" className="px-6 py-3">
                <ScrollLink to="Restaurantes" smooth={true} duration={500}>
                  Ver Restaurantes 🍽️
                </ScrollLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
      {/* Restaurantes Asociados */}
      <section
        id="Restaurantes"
        className="py-16 px-6  bg-[#EAEAEA] text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          🍽️ Nuestros Restaurantes Asociados
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantes.length === 0 ? (
            <p className="text-gray-500">No hay restaurantes disponibles.</p>
          ) : (
            restaurantes.map((rest) => (
              <Card
                key={rest.id}
                hoverable
                cover={
                  <img
                    alt={rest.name}
                    src={`http://localhost:4200/img/usuario/${rest.logo}`}
                    className="h-56 object-cover w-full transition-transform duration-300 hover:scale-105"
                  />
                }
                className="rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {rest.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {rest.descripcion}
                </p>
                <Button
                  type="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  onClick={() => handleGestionClick(rest)}
                >
                  Ver Menú
                  <span className="text-xl">→</span>
                </Button>
              </Card>
            ))
          )}
        </div>
      </section>
      {/* Sobre nosotros */}
      <section id="about" className="py-16 px-6 bg-[#EAEAEA] text-center">
        <h2 className="text-3xl font-bold text-gray-800 text-center md:text-center">
          Sobre Nosotros
        </h2>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-8 px-4">
          <p className="text-gray-600 max-w-xl text-center md:text-left">
            Enulab es un servicio diseñado para gestionar una amplia variedad de
            restaurantes, permitiendo a los establecimientos registrar sus
            servicios y presentarlos de manera atractiva a los clientes.
          </p>
          <img src={EnuLaba1} alt="Enulab Logo" className="w-64 h-auto" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-8">
          Equipo de Trabajo
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <UserOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">David Quiroga</h3>
              <p className="text-gray-600">Backend Developer</p>
              <p className="text-gray-600">0969009547</p>
            </div>
          </Card>
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <UserOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Bryan Latacumba
              </h3>
              <p className="text-gray-600">Backend Developer</p>
              <p className="text-gray-600">0969009547</p>
            </div>
          </Card>
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <UserOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Sebastian Donoso
              </h3>
              <p className="text-gray-600">UI/UX Designer</p>
              <p className="text-gray-600">0969009547</p>
            </div>
          </Card>
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <UserOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Lenin Montalvo
              </h3>
              <p className="text-gray-600">UI/UX Designer</p>
              <p className="text-gray-600">0969009547</p>
            </div>
          </Card>
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <UserOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Israel Miño</h3>
              <p className="text-gray-600">UI/UX Designer</p>
              <p className="text-gray-600">0969009547</p>
            </div>
          </Card>
        </div>
      </section>{" "}
      {/* Reservaciones */}{" "}
      <section
        id="reservations"
        className="py-16 px-6  bg-[#EAEAEA] text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">Haz tu Reservación</h2>
        <p className="mt-4 text-gray-600">
          Para poder realizar una reservación, debes elegir a un restaurante y
          podras reservarlo ahi.
        </p>
      </section>
      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-white text-center">
        <p>© 2025 Enulab. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
export default Dashboard;
