import axios from "axios";
import authHeader from "./auth.headers";

// const API_URL = "https://wingrowagritech.herokuapp.com/auth/";
const API_URL = "http://localhost:4000/auth/";

const register = (phone , password , firstname , lastname , type , farmertype , address , tags) => {
  return axios.post(API_URL + "signup", {
    phone,
    password,
    firstname,
    lastname,
    type,
    farmertype,
    address,
    tags
  });
};

const login = (phone, password) => {
  return axios
    .post(API_URL + "signin", {
      phone,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const addAddress = (address) => {
  return axios
    .post(API_URL + "address", {address} , {headers:authHeader()})
    .then((response) => {
      return response.data;
    });
};

const addimage = (formData) => {
  return axios
    .put(API_URL + "image", formData , {headers:authHeader()})
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  addAddress,
  addimage
};

export default AuthService;
