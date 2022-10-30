import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Farmer.css'

const FarmerNav = () => {
    const [close, setClose] = useState(false)

    useEffect(() => {
      const handleResize = () => {
        if(window.innerWidth < 778){
        setClose(false)
        }else{
            setClose(true)
        }
    }

      window.addEventListener("resize" , handleResize)

      return(
        window.removeEventListener("resize" , handleResize)
      )
    },[])

    useEffect(()=>{
        if(window.innerWidth < 778){
            setClose(false)
          }
    },[])
    

  return (
    <div className={close?'farmers_close_navigate':'farmers_navigate'}>
        {
            close?
            <img className='close_btn' onClick={()=>setClose(!close)} src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png" alt='logo'/>
            :
            <img className='close_btn' onClick={()=>setClose(!close)} src="https://as2.ftcdn.net/v2/jpg/04/20/10/99/1000_F_420109963_Ykw6qJNRq0dwj8kry6ytLTZtg9w3GJlf.jpg" alt='logo'/>
        }
        {!close?<>
            <Link className='links_farmersdata' to="./">
                Book Stall
            </Link>
            <Link className='links_farmersdata' to="./mybookings">
                My Bookings
            </Link>
            <Link className='links_farmersdata' to="./inward">
                Fill Inward Data
            </Link>
            <Link className='links_farmersdata' to="./outward">
                Fill Outward Data
            </Link>
        </>:<></>}
</div>
  )
}

export default FarmerNav