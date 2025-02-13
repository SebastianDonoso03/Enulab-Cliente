import axios from 'axios';

const BASE_URL = "http://localhost:4200/api/restaurante";

export const getMenu = async (restaurantId) =>{
    try {
        const response = await axios.get(`${BASE_URL}/${restaurantId}/menus`);
        return response.data; 
      } catch (error) {
        console.error("Error al obtener los menús:", error);
        throw error;
      }
}