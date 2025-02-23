import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../services/comentarioService";
import Swal from 'sweetalert2'; // Importar SweetAlert2

const Comments = () => {
  const navigate = useNavigate();
  const [restauranteId, setRestaurantId] = useState(null);
  const [formData, setFormData] = useState({
    rating: 0,
    date: "",
    content: "",
  });

  useEffect(()=> {
    const storedRestaurantId = localStorage.getItem('selectedRestaurantId')
    console.log('Id del restaurante', storedRestaurantId)

    if(storedRestaurantId){
      setRestaurantId(storedRestaurantId)
    }else{
      console.error('No se encontro el restaurante')
      navigate('/')
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restauranteId) {
      console.error("No se encontró el restaurante");
      return;
    }

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

    try {
      const createdComment = await createComment(restauranteId, formData);
      console.log("Comentario Creado", createdComment);
      navigate('/restaurant')
    } catch (error) {
      console.log("Error al crear el comentario", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">💬 Comentarios</h2>
      <p className="text-gray-600 text-center mb-4">
        Comparte tu experiencia y ayúdanos a mejorar.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Calificación:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  formData.rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Comentario:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Ingresa tu comentario"
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha:</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Enviar Comentario
        </button>
      </form>
    </div>
  );
};

export default Comments;
