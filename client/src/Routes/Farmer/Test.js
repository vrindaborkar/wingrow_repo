import './Test.css';
import React , {useState , useEffect } from 'react'
import axios from 'axios'
import Stall from './Stall';
import Dropdown from './Dropdown';
import authHeader from '../../services/auth.headers';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import ConfirmModal from '../../components/ConfirmModal';
import FarmerService from '../../services/farmer.service';
const userCurr = AuthService.getCurrentUser();

function Test({setbookingDetails}) {
const navigate = useNavigate()
  const [data, setdata] = useState()
  const [UpdatedData, setUpdatedData] = useState()
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls , setBookedStalls] = useState([])
  const [Loading, setLoading] = useState()
  const [Id, setId] = useState("")
  const user = AuthService.getCurrentUser()

  useEffect(() => {
    setLoading(true)
    FarmerService.getMyStalls()
    .then((response)=>{
        setLoading(false)
        setdata(response.data);
    })
  }, [])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    const res = data && data.filter(e=> e.location === Id)
    setUpdatedData(res)
  }, [Id , data])

  const confirmBooking = async() => {
    const price = bookedStalls.reduce((total, item) => item.stallPrice + total, 0);

    if(bookedStalls.length === 0){
        alert("failed to book seats")
        return;
    }
    try {
      const orderUrl = "http://localhost:4000/order";
      const {data} = await axios.post(orderUrl,{amount:price},{headers:authHeader()})
      initPayment(data.data)
    } catch (error) {
      console.log(error)
    }
  };

  const initPayment = (data) => 
{
  let bookedStats = bookedStalls.toString()
     const options = { 
      key:process.env.KEY_ID,
      amount:data.amount,
      currency:data.currency,
      order_id:data.id,
      bookedStalls:bookedStats,
      description:"Wingrow Agritech",
      
      handler:async(response) =>{
          try {
              const verifyUrl = "http://localhost:4000/verify";
              const {data} = await axios.post(verifyUrl,response,{headers:authHeader()})
              const orderId = data.orderId

                  const stallsUrl = "http://localhost:4000/stalls";
                  const price = bookedStalls.reduce((total, item) => item.stallPrice + total, 0);
                  const idArr = []
                  const stallsBooked = []
                  bookedStalls.forEach(e => {
                    idArr.push(e._id)
                    stallsBooked.push(e.stallName)
                  });
                  axios.put(stallsUrl , {data : idArr , user : userCurr.id , time: Date.now().toLocaleString()} , {headers:authHeader()})
                  .then(response => {
                    const {data} = response
                    if(data){
                      setbookingDetails({
                        farmer:user.firstname + " " + user.lastname,
                        phone:user.phone,
                        stallAddress:data[0].address,
                        paymentDetails:orderId,
                        BookedStalls:stallsBooked,
                        stallsBooked:bookedStalls.length,
                        totalAmount:price
                    })}
                    alert("Stalls booked succesfully")
                    navigate('../ticket')
                  })
                  .catch(error => {
                      console.log(error)
                      alert("Stall booking failed")
                      setBookedStalls([])
                      setNumberOfSeats(0)
                  });
          } catch (error) {
              console.log(error)
              setBookedStalls([])
              setNumberOfSeats(0)
          }
      },
      theme:{
          color:"#3399cc"
      }
     };
     const rzp = new window.Razorpay(options);
      rzp.open();
  } 


  const handleClickDrop = (e) =>
  {
    setId(e.target.innerText)
  }

  const handleClick = (ev) => {
      if(numberOfSeats && ev.target.className !== 'booked') {
          const seatsToBook = parseInt(numberOfSeats, 20);
        if(bookedStalls.length <= seatsToBook) {
            if (bookedStalls.includes(ev.target.id)) {
                const newAvailable = bookedStalls.filter(seat => seat !== ev.target.id);
                setBookedStalls(newAvailable);
            } else if(bookedStalls.length < numberOfSeats) {
              const item = UpdatedData.filter(e=>e._id === ev.target.id)
                setBookedStalls([...bookedStalls, item[0]]);
            } else if (bookedStalls.length === seatsToBook) {
              const item = UpdatedData.filter(e=>e._id === ev.target.id)
                bookedStalls.shift();
                setBookedStalls([...bookedStalls, item[0]]);
            }
        }
      }
  }


  return (
    <>
    {!Loading ? <div className="Test">
        <div className="dropdown">
          <Dropdown data={data} handleClickDrop={handleClickDrop}/>
        </div>
      <div className='main_container'>
        <p className='seatsinput'>How Many Stalls Would You Like to Book?</p>
            <input className='seatsinput' value={numberOfSeats} onChange={(ev) => setNumberOfSeats(ev.target.value)}/>
            {
              UpdatedData && Id ? 
             <div className='StallsContainer'>
              <Stall data={UpdatedData.slice(0,16)} handleClick={handleClick} bookedStalls={bookedStalls}/>
              <Stall data={UpdatedData.slice(16,17)} handleClick={handleClick} bookedStalls={bookedStalls}/> 
              <Stall data={UpdatedData.slice(17,18)} handleClick={handleClick} bookedStalls={bookedStalls}/> 
              <Stall data={UpdatedData.slice(18,34)} handleClick={handleClick} bookedStalls={bookedStalls}/>  
             </div>
              :
              <div className='select_market'>
                 <h2>Please select the market</h2>
              </div>
            }
            <ConfirmModal confirmBooking={confirmBooking}/>
      </div>
    </div>
    :<div className='spin'>
        <div className="spinner"></div>
      </div>}
    </>
  );
}

export default Test;
