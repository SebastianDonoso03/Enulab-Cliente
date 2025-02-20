import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createReserve } from '../services/reserveService'

const Reservations = () => {

  const navigate = useNavigate()
  const [restaurantId, setRestaurantId] = useState(null)

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId")
    console.log("ID del restaurante", storedRestaurantId)
    
    if(storedRestaurantId){
      setRestaurantId(storedRestaurantId)
    } else {
      console.error('No se encontro el restauranteId')
      navigate('/')
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    hour: "",
    numcontact: "",
    guests: "",
    note: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurantId) {
      console.error("No se puede crear sin la ID del restaurante");
      return;
    }
    
    console.log("Datos enviados al backend:", formData);
    for (const key in formData) {
      if (!formData[key]) {
        console.error(`El campo ${key} está vacío`);
        return;
      }
    }

    try {
      const createdReserve = await createReserve(restaurantId, formData);
      console.log("Reserva creada", createdReserve);
      navigate("/restaurant");
    } catch (error) {
      console.error("Error al crear la reserva", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">📅 Reservaciones</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <p>Nombre Completo</p>
          <input type="text" name="name" placeholder="Nombre completo" onChange={handleChange} />
          <p>Fecha</p>
          <input name="date" type="date" onChange={handleChange} />
          <p>Hora</p>
          <input name="hour" type="time" onChange={handleChange} />
          <p>Telefono</p>
          <input name="numcontact" placeholder="Teléfono" onChange={handleChange} />
          <p>Numero de personas</p>
          <input name="guests" type="number" min={1} onChange={handleChange} />
          <p>Notas</p>
          <input name="note" placeholder="Notas adicionales" onChange={handleChange} /> <br></br>
          <button type="submit">
            Confirmar Reserva
          </button>
      </div>
      </form>
    </div>
  );
};

export default Reservations;
