import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Customer, Login, Register, Admin, Farmer } from './Routes/index';
import './styles/Styles.css'
import Profile from "./Routes/Profile";
import Main from "./Routes/Main";
import ProtectedRoute from "./utils/ProtectedRoutes";
import AuthService from "./services/auth.service";
import NotFound from "./Routes/NotFound";
const user = AuthService.getCurrentUser();

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Main/>}>
          <Route index element={<Home/>}/>
        
          <Route 
            path="customers/*" 
            element={
            <ProtectedRoute isAllowed={!!user && user.role === "customer"}>
              <Customer/>
              </ProtectedRoute>
            }>
          </Route>

          <Route 
            path='/farmers/*'
            element={
            <ProtectedRoute isAllowed={!!user && user.role === "farmer"}>
              <Farmer/>
              </ProtectedRoute>
            }>
          </Route>

          <Route 
            path="admin" 
            element={
            <ProtectedRoute isAllowed={!!user && user.role === "admin"}>
              <Admin/>
              </ProtectedRoute>
            }>
          </Route>

          <Route 
            path="profile" 
            element={
            <ProtectedRoute isAllowed={!!user}>
              <Profile/>
              </ProtectedRoute>
            }>
          </Route>

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </>
  );
};

export default App;
