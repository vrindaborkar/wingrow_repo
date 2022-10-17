import './Test.css';
import React , {useState , useEffect } from 'react'
import axios from 'axios'
import Stall from './Stall';
import Dropdown from './Dropdown';
import authHeader from '../../services/auth.headers';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import ConfirmModal from '../../components/ConfirmModal';
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
    axios.get('http://localhost:4000/trial')
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
    if(bookedStalls.length === 0){
        alert("failed to book seats")
        return;
    }
    try {
      const orderUrl = "http://localhost:4000/order";
      const {data} = await axios.post(orderUrl,{amount:100},{headers:authHeader()})
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

                  const stallsUrl = "http://localhost:4000/trial";
                  axios.put(stallsUrl , {data : bookedStalls , user : userCurr.id , time: Date.now().toLocaleString()} , {headers:authHeader()})
                  .then(response => {
                    const {data} = response
                    setbookingDetails({
                        farmer:user.firstname + user.lastname,
                        phone:user.phone,
                        stallAddress:data ? data[0].address : "address",
                        paymentDetails:orderId,
                        BookedStalls:data ? data[0].stallName : "stalls",
                        StallFare:data ? data[0].stallFare : "fare"
                    })
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
                setBookedStalls([...bookedStalls, ev.target.id]);
            } else if (bookedStalls.length === seatsToBook) {
                bookedStalls.shift();
                setBookedStalls([...bookedStalls, ev.target.id]);
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
              <h2>Please select the market</h2>
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
