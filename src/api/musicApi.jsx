import axios from 'axios';

const BASE_URL = 'http://18.139.20.145:8080';

export const fetchAllMusic = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/music/all`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch music data:', error);
    throw error;
  }
};