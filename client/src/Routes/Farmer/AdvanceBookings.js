import React , {useState , useEffect} from 'react'
import Datepicker from '../../components/Datepicker'
import '../../styles/AdvanceBookings.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import Stall from './Stall';
import authHeader from '../../services/auth.headers';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import ConfirmModal from '../../components/ConfirmModal';
import FarmerService from '../../services/farmer.service';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectSeatModal from '../../components/SelectSeatModal'
// import Spinner from '../../components/Spinner';
const userCurr = AuthService.getCurrentUser();

const locations = [
    {location:"Hadapsar"},
    {location:"Karve Nagar"},
    {location:"Kharadi"},
    {location:"Wanawadi"},
    {location:"Magarpatta"},
    {location:"Amanora City"},
    {location:"Bramhasun City"}
  ]

const AdvanceBookings = ({setbookingDetails}) => {
    const [location, setlocation] = useState("")
    const navigate = useNavigate()
    const [data, setdata] = useState()
    const [UpdatedData, setUpdatedData] = useState()
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const [bookedStalls , setBookedStalls] = useState([])
    const [value, setvalue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
    const [alreadyBooked, setAlreadyBooked] = useState()
    const [open, setOpen] = useState()

      useEffect(() => {
        FarmerService.getMyStalls()
        .then((response)=>{
            setdata(response.data);
        })

        FarmerService.getBookedStalls()
        .then((response)=>{
            setAlreadyBooked(response.data)
        })
        handleOpen(true)
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
        const res = data && data.filter(e=> e.location === `${location}`)
        setUpdatedData(res)
      }, [location , data , value])

      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


      const confirmBooking = async(e) => {

        const price = bookedStalls.reduce((total, item) => item.stallPrice + total, 0);
    
        if(bookedStalls.length === 0){
          toast.warn('Failed to book stalls!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            return;
        }
        try {
          const orderUrl = "http://localhost:4000/order";
          const {data} = await axios.post(orderUrl,{amount:price*100},{headers:authHeader()})
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
                  
    
                  const responseData = {
                    location:location,
                    bookedStalls:bookedStalls,
                    bookedBy:userCurr.id,
                    bookedAt:dayjs(value).format("YYYY-MM-DD"),
                    isBooked:true
                }

                const stallsBooked = []
                  bookedStalls.forEach(e => {
                    stallsBooked.push(e.stallName)
                  });
        
                const price = bookedStalls.reduce((total, item) => item.stallPrice + total, 0);
                const Url = "http://localhost:4000/bookedstalls";
                      
                      axios.post(Url , responseData , {headers:authHeader()})
                      .then(response => {
                        const {data} = response
                        if(data){
                          setbookingDetails({
                            farmer:userCurr.firstname + " " + userCurr.lastname,
                            phone:userCurr.phone,
                            paymentDetails:orderId,
                            BookedStalls:stallsBooked,
                            stallsBooked:bookedStalls.length,
                            totalAmount:price
                        })
                    }
                      toast.success('stalls booked successfully!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                          setTimeout(() => {
                            navigate('../ticket')
                          }, 1000);
                      })
                      .catch(error => {
                        toast.warn('Failed to book stalls!', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          });
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
    <div className='advance_main_container'>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
         <Link to="../" className='advancebookinglinkback'>Go Back to stalls!</Link>
            <div className='advance_component'>
                <div className='advance_date'>
                    <Datepicker value={value} setValue={setvalue}/>
                </div>

                <Grid item xs={12}>
                    <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Market</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={location}
                    onChange={(e)=>{setlocation(e.target.value)}}
                    label="address"
                    name='address'
                    required
                    >
                    {
                        locations.map((e,i)=>{
                        return(
                            <MenuItem key={i} value={e.location}>{e.location}</MenuItem>
                        )
                        })
                    }
                    </Select>
                    </FormControl>
                </Grid>
        </div>
        <div className='secondary_container_stalls'>
        {
               UpdatedData && location!==""? 
               <div className='main_container_stalls'>
                           <div style={{display:"flex" , alignItems:"center" , justifyContent:"space-around" , width:"200px"}}>
                              <SelectSeatModal handleClose={handleClose} handleOpen={handleOpen} open={open} setNumberOfSeats={setNumberOfSeats}/>
                              <span style={{display:"flex" , alignItems:"center" , justifyContent:"center", fontSize:"15px" ,marginTop:"10px"}}><b>: {numberOfSeats}</b></span>
                            </div>
              <div className='stall_wrapper'>
                <div className='StallsContainer'>
                <Stall data={UpdatedData.slice(0,16)} handleClick={handleClick} bookedStalls={bookedStalls} alreadyBooked={alreadyBooked} date={dayjs(value).format("YYYY-MM-DD")}/>
                <Stall data={UpdatedData.slice(16,17)} handleClick={handleClick} bookedStalls={bookedStalls} alreadyBooked={alreadyBooked} date={dayjs(value).format("YYYY-MM-DD")}/> 
                <Stall data={UpdatedData.slice(17,18)} handleClick={handleClick} bookedStalls={bookedStalls} alreadyBooked={alreadyBooked} date={dayjs(value).format("YYYY-MM-DD")}/> 
                <Stall data={UpdatedData.slice(18,34)} handleClick={handleClick} bookedStalls={bookedStalls} alreadyBooked={alreadyBooked} date={dayjs(value).format("YYYY-MM-DD")}/>  
                </div>
              </div>
              </div>
              :
              <div className='select_market'>
                 <h2>Please select the market</h2>
              </div>
            }
            <div className='modal_btn'>
                <ConfirmModal confirmBooking={confirmBooking}/>
            </div>
        </div>
    </div>
  )
}

export default AdvanceBookings