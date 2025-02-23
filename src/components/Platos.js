import React, { useEffect, useState } from 'react'
import { getPlatos } from '../services/platosService';

const Platos = () => {
const menuId = localStorage.getItem('menuId');
const [platos, setPlatos] = useState([]);

useEffect(() => {
    const fetchPlatos = async () => {
        try {
            const platosData = await getPlatos(menuId);
            setPlatos(platosData);
        } catch (error) {
            console.error('Error al cargar los platos:', error);
        }
    };
    fetchPlatos();
}, [menuId]);

  return (
    <div className="menu-container">
          <h2 className="menu-title">Menú</h2>
          <div className="platos-list">
            {platos.map((plato) => (
              <div key={plato.id} className="plato-item">
                <h3 className="plato-nombre">{plato.nombre}</h3>
                <p className="plato-descripcion">{plato.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
    
  )
}

export default Platos