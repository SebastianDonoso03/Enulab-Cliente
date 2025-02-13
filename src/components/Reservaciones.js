import React, { useState } from "react";
import { Button, Input, message } from "antd";

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    notas: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReservation = () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      message.error("Por favor, complete todos los campos.");
      return;
    }
    message.success("Reserva realizada con éxito. ¡Te esperamos!");
    console.log("Reserva enviada:", formData);
    setFormData({ name: "", phone: "", date: "", time: "", guests: 1 });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">📅 Reservaciones</h2>
      <p className="text-gray-600 text-center mb-4">
        El valor de reserva es de <strong>$20</strong> para asegurar tu mesa.
      </p>
      <div className="space-y-4">
        <Input name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} />
        <Input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} />
        <Input name="date" type="date" value={formData.date} onChange={handleChange} />
        <Input name="time" type="time" value={formData.time} onChange={handleChange} />
        <Input name="guests" type="number" min={1} value={formData.guests} onChange={handleChange} />
        <Input name="notas" placeholder="Notas adicionales" value={formData.notas} onChange={handleChange} />
        <Button type="primary" block onClick={handleReservation}>
          Confirmar Reserva
        </Button>
      </div>
    </div>
  );
};

export default Reservations;
