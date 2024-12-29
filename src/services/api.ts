import axios from 'axios';

const BASE_URL = 'https://resume-builder-backend-ab1h.onrender.com/api/v1';

export const fetchUserInfo = async (email: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/user-info?email=${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};