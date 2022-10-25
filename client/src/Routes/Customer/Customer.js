import React  from "react";
import { Routes, Route } from "react-router-dom";
import CustomersHome from "./CustomersHome";
import Cartspage from "./Cartspage";
import GlobalState from "../../cartContext/GlobalState";
import Checkout from "./Checkout";

const Customer = () => {
  return (
      <GlobalState>
        <Routes>
            <Route path='/' element={<CustomersHome/>}/>
            <Route path='/cartspage' element={<Cartspage/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </GlobalState>
  )
}

export default Customer