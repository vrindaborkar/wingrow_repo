import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home, Customer, Login, Register, Admin } from './Routes/index';
import './styles/Styles.css'
import Profile from "./Routes/Profile";
import Farmer from "./Routes/Farmer/Farmer";

const App = () => {
  return (
    <>
    <Navbar/>
    <div className="main_container">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/customers' element={<Customer/>}/>
      <Route path='/farmers/*' element={<Farmer/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </div>
    </>
  );
};

export default App;
