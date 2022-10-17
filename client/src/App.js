import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Customer, Login, Register, Admin } from './Routes/index';
import './styles/Styles.css'
import Profile from "./Routes/Profile";
import Farmer from "./Routes/Farmer/Farmer";
import Main from "./Routes/Main";

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Main/>}>
          <Route index element={<Home/>}/>
          <Route path='/customers' element={<Customer/>}/>
          <Route path='/farmers/*' element={<Farmer/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
    </>
  );
};

export default App;
