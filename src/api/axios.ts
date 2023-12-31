import axios from 'axios'

const api = axios.create({
  baseURL: 'https://thuonghanluan-be.vercel.app/api/',
})

api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;