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
  const [Itemcount, setItemcount] = useState(0)
  const [cartsData, setcartsData] = useState([])
  const [Counter, setCounter] = useState({})

  console.log(Counter)
  
  const handleClick = (ev) => {
    const id = ev.target.id;
    if(cartsData && cartsData.filter(e=> e._id === `${id}`).length !== 0)
    {
        setItemcount((prev) => {return prev + 1})
        setCounter((prev)=>{
          return{
            ...prev,
            [id]: prev[id]+1
          }
        })
        console.log("from 1")
        alert("Added to Cart!!")
    }
    if(cartsData && cartsData.filter(e=>e._id === `${ev.target.id}`).length === 0)
    {
      const res = stallsData && stallsData.filter(e=>e._id === `${ev.target.id}`)
          const arr = [...cartsData];
          arr.push(...res)
          setcartsData(arr);
          setItemcount(prev => prev + 1)
          setCounter((prev)=>{
            return{
              ...prev,
              [ev.target.id] : 1
            }
          })
          console.log("from 2")
      alert("Added to Cart!!")
    }
  }

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
        <Route path='/productspage' element={<ProductsPage stallsData={stallsData} Itemcount={Itemcount} handleClick={handleClick}/>}/>
        <Route path='/cartspage' element={<Cartspage Itemcount={Itemcount} Counter={Counter} cartsData={cartsData}/>}/>
    </Routes>
  )
}

export default Customer