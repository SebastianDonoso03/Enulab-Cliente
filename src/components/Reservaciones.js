import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createReserve } from '../services/reserveService';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const Reservations = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId");
    console.log("ID del restaurante", storedRestaurantId);
    
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    } else {
      console.error('No se encontró el restauranteId');
      navigate('/');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    hour: "",
    numcontact: "",
    guests: "",
    note: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurantId) {
      console.error("No se puede crear sin la ID del restaurante");
      return;
    }
    
    // Validación de campos vacíos
    for (const key in formData) {
      if (!formData[key]) {
        // Mostrar alerta con SweetAlert2 en español
        Swal.fire({
          title: 'Campo vacío',
          text: `Procura llenar todos los campos del formulario`  // Primera letra en mayúscula
        });
        return;
      }
    }

    console.log("Datos enviados al backend:", formData);
    
    try {
      const createdReserve = await createReserve(restaurantId, formData);
      console.log("Reserva creada", createdReserve);
      // Mostrar alerta de éxito en español
      Swal.fire({
        icon: 'success',
        title: 'Reserva confirmada',
        text: 'Tu reserva ha sido creada con éxito.'
      });
      navigate("/restaurant");
    } catch (error) {
      console.error("Error al crear la reserva", error.response?.data || error.message);
      // Mostrar alerta de error en español
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la reserva. Intenta de nuevo.'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">📅 Reservaciones</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <p>Full Name</p>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
          <p>Date</p>
          <input name="date" type="date" onChange={handleChange} />
          <p>Hour</p>
          <input name="hour" type="time" onChange={handleChange} />
          <p>Phone Number</p>
          <input name="numcontact" placeholder="Phone Number" onChange={handleChange} />
          <p>Number of Guests</p>
          <input name="guests" type="number" min={1} onChange={handleChange} />
          <p>Notes</p>
          <input name="note" placeholder="Additional Notes" onChange={handleChange} /> <br></br>
          <button type="submit">Confirm Reservation</button>
        </div>
      </form>
    </div>
  );
};

export default Reservations;
