import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createReserve } from "../services/reserveService";
import { Form, Input, Button, DatePicker, TimePicker, Card } from "antd";
import EnuLaba1 from "../images/EnuLaba 1.png";

const Reservations = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId");
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    } else {
      console.error("No se encontró el restauranteId");
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    if (!restaurantId) {
      console.error("No se puede crear sin la ID del restaurante");
      return;
    }

    const randomCode = Math.random()
      .toString(36)
      .substring(2, 12)
      .toUpperCase();
    const newFormData = { ...values, code: randomCode };

    try {
      await createReserve(restaurantId, newFormData);
      navigate("/restaurant");
    } catch (error) {
      console.error(
        "Error al crear la reserva",
        error.response?.data || error.message
      );
    }
  };

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

      {/* Formulario de Reserva */}
      <div className="pt-24 pb-8 flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            📅 Reservaciones
          </h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Nombre Completo"
              name="name"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Input placeholder="Ingrese su nombre" />
            </Form.Item>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item
              label="Hora"
              name="hour"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>
            <Form.Item
              label="Teléfono"
              name="numcontact"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Input placeholder="Número de contacto" />
            </Form.Item>
            <Form.Item
              label="Número de personas"
              name="guests"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item label="Notas adicionales" name="note">
              <Input.TextArea placeholder="Escriba cualquier requerimiento especial" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Confirmar Reserva
            </Button>
          </Form>
        </Card>
      </div>
      <footer className="py-6 bg-gray-900 text-white text-center">
        <p>© 2025 Enulab. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Reservations;
