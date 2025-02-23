import React, { useEffect, useState } from 'react'
import { getDishes } from '../services/platosService';

const Platos = () => {
//const menuId = localStorage.getItem('menuId');
const [platos, setPlatos] = useState([]);
const menuId = localStorage.getItem("selectedMenuId");

useEffect(() => {
    const fetchPlatos = async () => {
        if(menuId){
          try {
            const platosData = await getDishes(menuId)
            setPlatos(platosData)
          } catch (error) {
            console.log('Error al cargar los platos:', error)
          }
        }
    };
    fetchPlatos();
}, [menuId]);

  return (
    <table className="table table-dark table-hover text-center">
          <thead>
            <tr className="text-warning">
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {platos.map((plato) => (
              <tr key={plato.id}>
                <td>{plato.name}</td>
                <td>{plato.description}</td>
                <td>{plato.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default Platos