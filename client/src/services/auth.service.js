import axios from "axios";

const API_URL = "https://wingrowagritech.herokuapp.com/auth/";

const register = (phone , password , firstname , lastname , type , farmertype) => {
  return axios.post(API_URL + "signup", {
    phone,
    password,
    firstname,
    lastname,
    type,
    farmertype
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
  getCurrentUser
};

export default AuthService;
