import axios from 'axios';

const API_URL = 'http://localhost:4200'; // Cambia esto según tu configuración

// Crear una instancia de axios con la configuración necesaria
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRestaurant = async () => {
    try {
        const response = await api.get(`/api/restaurante`)
        return response.data
    } catch (error) {
        console.error('Error', error)
    }
}