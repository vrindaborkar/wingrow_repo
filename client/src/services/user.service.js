import axios from 'axios';
import authHeader from './auth.headers';

const API_URL = 'http://localhost:4000/';

 const getPublicContent = () => {
    return axios.get(API_URL + 'all');
  }

  const getStallsData = () => {
    return axios.get(API_URL + 'stalls', { headers: authHeader() });
  }

  const getAdminData = () => {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }


const UserService = {
    getPublicContent,
    getStallsData,
    getAdminData
  };
  
  export default UserService;


