import axios from 'axios';
const token = JSON.parse(localStorage.getItem('token'));
const instanse = axios.create({
  baseURL: 'https://portfolio-service-iuee.onrender.com/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instanse;
