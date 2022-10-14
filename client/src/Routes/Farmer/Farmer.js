import React , {useState}  from "react";
import { Routes, Route } from "react-router-dom";
import FarmersHome from "./FarmersHome";
import InwardData from "./InwardData";
import OutwardData from "./OutwardData";
import Test from './Test'
import Ticket from "./Ticket";

const Farmer = () => {
    const [bookingDetails, setbookingDetails] = useState({
        farmer:"",
        phone:"",
        stallAddress:'',
        paymentDetails:'',
        BookedStalls:"",
        StallFare:""
    })

    console.log(bookingDetails)
  return (
    <Routes>
        <Route path='/' element={<FarmersHome/>}/>
        <Route path='/inward' element={<InwardData/>}/>
        <Route path='/outward' element={<OutwardData/>}/>
        <Route path='/stalls' element={<Test setbookingDetails={setbookingDetails}/>}/>
        {/* <Route path='/stalls' element={<StallBooking setbookingDetails={setbookingDetails}/>}/> */}
        <Route path='/ticket' element={<Ticket bookingDetails={bookingDetails}/>}/>
    </Routes>
  )
}

export default Farmer