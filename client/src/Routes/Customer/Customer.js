import React , {useState}  from "react";
import { Routes, Route } from "react-router-dom";
import CustomersHome from "./CustomersHome";
import ProductsPage from "./ProductsPage";

const Customer = () => {
  return (
    <Routes>
        <Route path='/' element={<CustomersHome/>}/>
        <Route path='/productspage' element={<ProductsPage/>}/>
    </Routes>
  )
}

export default Customer