import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home, Customer, Login, Register, Admin , FarmersHome , InwardData , OutwardData } from './Routes/index';
import './styles/Styles.css'
import Profile from "./Routes/Profile";
import StallBooking from "./Routes/Farmer/StallBooking";

const App = () => {
  return (
    <>
    <Navbar/>
    <div className="main_container">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/customers' element={<Customer/>}/>
      <Route path='/farmers' element={<FarmersHome/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/inward' element={<InwardData/>}/>
      <Route path='/outward' element={<OutwardData/>}/>
      <Route path='/stalls' element={<StallBooking/>}/>
    </Routes>
    </div>
    </>
  );
};

export default App;
