import axios from 'axios';
const token = JSON.parse(localStorage.getItem('token'));
const instanse = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instanse;
