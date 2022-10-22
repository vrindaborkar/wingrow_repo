import React , {useState , useEffect}  from "react";
import { Routes, Route } from "react-router-dom";
import CustomersHome from "./CustomersHome";
import ProductsPage from "./ProductsPage";
import FarmerService from '../../services/farmer.service'
import UserService from '../../services/user.service'
import Cartspage from "./Cartspage";

const Customer = () => {

  const [stalls, setStalls] = useState();
  const [Data, setData] = useState();
  const [Id, setId] = useState();
  const [stallsData, setstallsData] = useState()

  const set = new Set();
  const places = [];

  if(stalls)
    {
      for(let item of stalls){
      set.add(item.location)
    }
  }

  for(let key of set) places.push(key)

  useEffect(() => {
    FarmerService.getMyStalls()
    .then(res => setStalls(res.data))

    UserService.getInOutdata()
    .then(res => setData(res.data))

  }, [])

  useEffect(() => {
    const res = Data && Data.filter(e=>e.market === `${Id}`);
    setstallsData(res)
  }, [Data , Id])
  


  return (
    <Routes>
        <Route path='/' element={<CustomersHome places={places} setId={setId}/>}/>
        <Route path='/productspage' element={<ProductsPage Data={stallsData}/>}/>
        <Route path='/cartspage' element={<Cartspage/>}/>
    </Routes>
  )
}

export default Customer