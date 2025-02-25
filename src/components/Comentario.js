import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createComment } from "../services/comentarioService";
import { Form, Input, Button, Rate, Card } from "antd";
import EnuLaba1 from "../images/EnuLaba 1.png";
import Swal from "sweetalert2";

const Comments = () => {
  const navigate = useNavigate();
  const [restauranteId, setRestaurantId] = useState(null);
  const [form] = Form.useForm(); // 🎯 Agregamos una referencia al formulario

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId");
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    } else {
      console.error("No se encontró el restaurante");
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    if (!restauranteId) {
      console.error("No se encontró el restaurante");
      return;
    }

    try {
      await createComment(restauranteId, values);
      Swal.fire({
        icon: "success",
        title: "Comentario enviado",
        text: "¡Gracias por compartir tu opinión!",
      });

      form.resetFields(); // ✅ Limpia todos los campos del formulario

      navigate("/comentario");
    } catch (error) {
      console.log(
        "Error al crear el comentario",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar tu comentario.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#9D9D9D] shadow-md z-50 py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-gray-700 hover:text-gray-900 font-semibold">
          <img src={EnuLaba1} alt="Logo" className="h-10" />
        </Link>
        <div className="space-x-6">
          <Link to="/restaurant" className="text-white font-semibold">Menú</Link>
          <Link to="/reserva" className="text-white hover:text-white font-semibold">Reservaciones</Link>
          <Link to="/comentario" className="text-white hover:text-white font-semibold">Comentarios</Link>
        </div>
      </nav>

      {/* Formulario de Comentario */}
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            💬 Comparte tu Opinión
          </h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
              label="¿Cómo calificarías tu experiencia?"
              name="rating"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Input placeholder="Escribe tu nombre" />
            </Form.Item>
            <Form.Item
              label="Escribe tu opiníon"
              name="content"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Input.TextArea placeholder="Escribe tu comentario aquí" />
            </Form.Item>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Input type="date" className="w-full" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Enviar Comentario
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Comments;
