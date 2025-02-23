import axios from 'axios';

const API_URL = "http://localhost:4200/api"

export const getDishes = async (menuId) =>{
    try {
        const response = await axios.get(`${API_URL}/menus/${menuId}/dishes`);
        return response.data;
      } catch (error) {
        console.error("Error al obtener los platos:", error);
        throw error;
      }
}