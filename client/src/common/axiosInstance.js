import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Base URL for your API
});

export default axiosInstance;
