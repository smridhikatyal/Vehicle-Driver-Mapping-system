import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/', // Your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
