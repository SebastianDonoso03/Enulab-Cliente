import axios from 'axios';

const BASE_URL = "http://localhost:4200/api/menus";

export const getDishes = async (menuId) =>{
    try {
            const response = await axios.get(`${BASE_URL}/${menuId}/dishes`);
            return response.data; 
        } catch (error) {
            console.error("Error al obtener los platos:", error);
            throw error;
        }
}