import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createReserve } from "../services/reserveService";
import { Form, Input, Button, DatePicker, TimePicker, Card } from "antd";
import EnuLaba1 from "../images/EnuLaba 1.png";
import Swal from "sweetalert2";

const Reservations = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [form] = Form.useForm(); // 🎯 Se crea una referencia al formulario

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

    // Convertir la hora a formato "HH:mm:ss"
    const formattedTime = values.hour.format("HH:mm:ss");

    const newFormData = {
      ...values,
      hour: formattedTime, // Reemplazar la hora formateada
    };

    try {
      await createReserve(restaurantId, newFormData);
      Swal.fire({
        icon: "success",
        title: "Reserva confirmada",
        text: "Tu reserva ha sido creada con éxito.",
      });

      form.resetFields(); // ✅ Limpia todos los campos del formulario

      navigate("/reserva");
    } catch (error) {
      console.error(
        "Error al crear la reserva",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear la reserva.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#9D9D9D] z-50 py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-gray-700 hover:text-gray-900 font-semibold">
          <img src={EnuLaba1} alt="Logo" className="h-10" />
        </Link>
        <div className="space-x-6">
          <Link to="/restaurant" className="text-white font-semibold">Menú</Link>
          <Link to="/reserva" className="text-white hover:text-white font-semibold">Reservaciones</Link>
          <Link to="/comentario" className="text-white hover:text-white font-semibold">Comentarios</Link>
        </div>
      </nav>

      {/* Formulario de Reserva */}
      <div className="pt-24 pb-8 flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">📅 Reservaciones</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Nombre Completo" name="name" rules={[{ required: true, message: "Campo obligatorio" }]}>
              <Input placeholder="Ingrese su nombre" />
            </Form.Item>
            <Form.Item label="Fecha" name="date" rules={[{ required: true, message: "Campo obligatorio" }]}>
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Hora" name="hour" rules={[{ required: true, message: "Campo obligatorio" }]}>
              <TimePicker className="w-full" format="HH:mm" />
            </Form.Item>
            <Form.Item label="Teléfono" name="numcontact" rules={[{ required: true, message: "Campo obligatorio" }]}>
              <Input placeholder="Número de contacto" />
            </Form.Item>
            <Form.Item label="Número de personas" name="guests" rules={[{ required: true, message: "Campo obligatorio" }]}>
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
    </div>
  );
};

export default Reservations;
