import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your machine's IP address for physical device testing (Expo Go)
// This IP was detected from your Expo start logs
const BASE_URL = 'http://192.168.1.19:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 15s timeout to avoid hanging too long in mobile networks
  timeout: 15000,
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
