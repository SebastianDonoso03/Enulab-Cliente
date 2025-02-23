import axios from "axios";

const API_URL = 'http://localhost:4200/api/restaurante'

export const createComment = async (restaurantId, commentData) =>{
    try {
        const response = await axios.post(
            `${API_URL}/${restaurantId}/comments`,
            commentData
        )
        return response.data
    } catch (error) {
        console.error('Error al crear el comentario', error.response ? error.response.data : error.message)
        throw error
    }
}