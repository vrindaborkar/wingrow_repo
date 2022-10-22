import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Farmer.css'
import FarmerService from '../../services/farmer.service'
import Spinner from '../../components/Spinner'

const FarmersHome = () => {

    const [InwardData, setInwardData] = useState()
    const [OutwardData, setOutwardData] = useState()

    useEffect(() => {
      
        FarmerService.getInward().then((res)=>{
            setInwardData(res.data)
        })

        FarmerService.getOutward().then((res)=>{
            setOutwardData(res.data)
        })

    }, [])
    

  return (
    <div className='farmers_page'>
        <div className='farmers_navigate'>
            <Link className='links_farmersdata' to="./inward">
                Fill Inward Data
            </Link>
            <Link className='links_farmersdata' to="./outward">
                Fill Outward Data
            </Link>
            <Link className='links_farmersdata' to="./stalls">
                Book Stall
            </Link>
            <Link className='links_farmersdata' to="./mybookings">
                My Bookings
            </Link>
        </div>
        {InwardData && OutwardData && InwardData.length === 0 && OutwardData.length === 0 && 
        <div className='farmers_data'>
            <div className='inwardData'>
                <h3 style={{padding:"1rem 0"}}>Inward Data</h3>
                <div className='farmersdata_container'>
                    No Inward Data available!
                </div>
            </div>

            <div className='outwardData'>
            <h3 style={{padding:"1rem 0"}}>Outward Data</h3>
            <div className='farmersdata_container'>
                No Outward Data available!
            </div>
            </div>
        </div>}

        {InwardData && OutwardData && InwardData.length !== 0 && OutwardData.length !== 0 && <div className='farmers_data'>
            <div className='inwardData'>
                <h3 style={{padding:"1rem 0"}}>Inward Data</h3>
                <div className='farmersdata_container'>
                {
                    InwardData.map((e,i)=>{
                        return(
                            <div key={i} className="farmerdata_items">
                                    <span>Market : {e.market}</span>
                                    <span>Commodity : {e.commodity}</span>
                                    <span>Time : {e.time}</span>
                                    <span>Purchase rate : {e.purchase_rate}</span>
                                    <span>Purchase quantity : {e.purchase_quantity}</span>
                            </div>
                        )
                    })
                }
                </div>
            </div>

            <div className='outwardData'>
            <h3 style={{padding:"1rem 0"}}>Outward Data</h3>
            <div className='farmersdata_container'>
            {
                    OutwardData.map((e,i)=>{
                        return(
                            <div key={i} className="farmerdata_items">
                                    <span>Market : {e.market}</span>
                                    <span>Commodity : {e.commodity}</span>
                                    <span>Time : {e.time}</span>
                                    <span>Sales rate : {e.sales_rate}</span>
                                    <span>Sales quantity : {e.sales_quantity}</span>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>}
        {!InwardData && !OutwardData &&
        <Spinner/>
        }
    </div>
  )
}

export default FarmersHome