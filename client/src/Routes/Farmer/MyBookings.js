import React , {useState , useEffect} from 'react'
import AuthService from '../../services/auth.service'
import FarmerService from '../../services/farmer.service'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './MyBookings.css'
const user = AuthService.getCurrentUser()

const MyBookings = () => {

    const [MyStalls, setMyStalls] = useState()

    useEffect(() => {
      
        FarmerService.getMyStalls().then((res)=>{
            const {data} = res;
            setMyStalls(data.filter(e=>e.bookedBy === user.id))
        })

    }, [])

    const handleDelete = () => {
       alert("deleted successfully")
    }

  return (
    <>
    {MyStalls?<div className='bookings_container'>
        <div className='booking_content'>
            <div className='booking_cards'> 
                <h1 className='booking_header'>Stall Bookings</h1>
                <p className='booking_para'>List of booked stalls</p>
            </div>

            <div className='card_booking'>
                {
                    MyStalls.map((e,i)=>{
                        return(
                            <div key={i} className='cards_section'>
                                <div className='card'>
                                    <div className='card_content'>
                                        <h2 className='card_header'><span>Stall No : {i+1}</span><span onClick={handleDelete} style={{cursor:"pointer"}}><DeleteOutlineIcon/></span></h2>
                                        <p className='card_para'>{e.location}</p>
                                        <p className='card_para'>{e.address}</p>
                                        <p className='card_para'>{e.stallName}</p>
                                        <p className='card_para'>{e.bookedAt}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    </div>:<div className='spin'>
        <div className="spinner"></div>
      </div>}
    </>
  )
}

export default MyBookings