import axios from 'axios';

const API_URL = 'http://localhost:4200/api/restaurante';

export const createReserve = async (restaurantId, reserveData) => {
    try {
        const response = await axios.post(
            `${API_URL}/${restaurantId}/reservations`,
            reserveData
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear la reserva', error.response ? error.response.data : error.message);
        throw error;
    }
};
