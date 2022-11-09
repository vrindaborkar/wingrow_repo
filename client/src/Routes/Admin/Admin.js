import React,{useState , useEffect} from 'react'
import FarmerService from '../../services/farmer.service'
import dayjs from 'dayjs';
import '../../styles/Admin.css'
import Card from '../../components/Card'
import Spinner from '../../components/Spinner'
import FilterModal from '../../components/FilterModal';
import UserService from '../../services/user.service';
import axios from 'axios';
import authHeader from '../../services/auth.headers';

const Admin = () => {
  const [Inward, setInward] = useState()
  const [Outward, setOutward] = useState()
  const [value, setValue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  const [filteredInData, setfilteredInData] = useState()
  const [filteredOutData, setfilteredOutData] = useState()
  const [fromDate, setfromDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
  const [toDate, settoDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
  const [market, setMarket] = React.useState('');
  const [CancelledStalls, setCancelledStalls] = useState()
  const [stallsBooked, setstallsBooked] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Farmers, setFarmers] = useState()

  const handleChangeMarket = (event) => {
    setMarket(event.target.value);
  };

  useEffect(() => {
    FarmerService.getMyStalls().then(res => {
      const data = res?.data;
      const resp = data.filter(e => e.isBooked === true)
      setstallsBooked(resp)
    })
    FarmerService.getInwardData().then(res => 
      {
        setInward(res?.data);
        setfilteredInData(res?.data)
      })
    FarmerService.getOutwardData().then(res => 
      {
        setOutward(res?.data);
        setfilteredOutData(res?.data)
      })

    FarmerService.getcancelledStalls().then(res=>{
      setCancelledStalls(res?.data)
    })

      UserService.getFarmers().then(res=>{
        setFarmers(res?.data)
      })
  }, [])


  const totalFarmers = new Set();
  const farmers = new Set();
  const marketsData = new Set();
  const farmersMarket = []
  let purchaseQty = 0;
  let purchaseAmount = 0;
  let salesQty = 0;
  let salesAmount = 0;
  let noOfBookedStalls = stallsBooked?.length;

  Inward && Inward.forEach((e)=>{
    marketsData.add(e.market)
  })

  filteredInData && filteredInData.forEach(e => {
    totalFarmers.add(e.market)
    farmers.add(e.userId)

    purchaseQty += e.purchase_quantity
    purchaseAmount += e.purchase_rate
  });

  filteredOutData && filteredOutData.forEach(e => {
    salesQty += e.sales_quantity
    salesAmount += e.sales_rate
  });


  const handleSearchmarkets = () => {
    const marketresponse = Inward && Inward.filter(e => e.market === market);
    setfilteredInData(marketresponse)
    handleClose()
  }

  const handleSearchDate = () => {
    const inData = Inward && Inward.filter((e)=>{
      const [date] = e.time.split("T");
      return date === dayjs(value).format("YYYY-MM-DD")
    })

    const outData = Outward && Outward.filter((e)=>{
      const [date] = e.time.split("T");
      return date === dayjs(value).format("YYYY-MM-DD")
    })

    const stallsData = stallsBooked && stallsBooked.filter((e)=>{
      const [date] = e.bookedAt.split("T");
      return date === dayjs(value).format("YYYY-MM-DD")
    })

    setstallsBooked(stallsData)
    setfilteredInData(inData)
    setfilteredOutData(outData)
    handleClose()
  }
  

  const handleSearch = () => {
    const filterIn = Inward && Inward.filter((e)=>{
      const [date] = e.time.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })

    const filterOut = Outward && Outward.filter((e)=>{
      const [date] = e.time.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })

    const stallsData = stallsBooked && stallsBooked.filter((e)=>{
      const [date] = e.bookedAt.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })

    setstallsBooked(stallsData)
    setfilteredInData(filterIn);
    setfilteredOutData(filterOut)
    handleClose()
  }
  
  for(let item of marketsData){
    farmersMarket.push(item)
  }

  const handleRefundDelete = (e) => {
    const id = e.target.id;
    const response = window.confirm("Confirm Refunded?")
    if(response === true){
      axios.delete("https://wingrowagritech.herokuapp.com/cancelledstalls" , { headers: authHeader()  , data:{id: id}}).then(res=>{
        const data = res?.data;
        const filter = CancelledStalls.filter(e=>e._id !== data._id);
        setCancelledStalls(filter)
      })
    }
  }

  return (
    <div className='admin_main_component'>

      {/* Farmers Entry Data */}

      <div className='farmers_data_entries'>
        <div className='farmers_entries'>
            <div className='farmers_entries_nav'>
              <span className='farmers_entries_nav_srno'>
                Sr. No
              </span>
              <span className='farmers_entries_nav_farmername'>
                Farmers Name
              </span>
              <span  className='farmers_entries_nav_farmerstype'>
                Farmers Type
              </span>
            </div>

            <div className='farmers_entries_body'>
                {
                  Farmers && Farmers.map((e,i)=>{
                    return(
                      <div key={i} className='farmers_entries_section'>
                          <span className='farmers_entries_nav_srno'>
                            {i+1}
                          </span>
                          <span className='farmers_entries_nav_farmername'>
                            {e.firstname} {e.lastname}
                          </span>
                          <span  className='farmers_entries_nav_farmerstype'>
                            {e.farmertype}
                          </span>
                      </div>
                    )
                  })
                }
            </div>
        </div>
      </div>

      {/* Farmers Entry Data */}

      {/* Farmers Statistics */}
      <div className='admin_secondary_header'>
        <h2 className='overalldata_header'>Farmers Statistics</h2>
        <FilterModal 
        handleChangeMarket={handleChangeMarket}
        fromDate={fromDate}
        setfromDate={setfromDate}
        toDate={toDate}
        settoDate={settoDate}
        value={value}
        setValue={setValue}
        handleSearch={handleSearch}
        market={market}
        farmersMarket={farmersMarket}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleSearchmarkets={handleSearchmarkets}
        handleSearchDate={handleSearchDate}
        />
    </div>

    {filteredInData && filteredOutData && <div className='cards_container'>
      <Card header={"Total farmers market :"} value={totalFarmers.size}/>
      <Card header={"Total farmers :"} value={farmers.size}/>
      <Card header={"Purchase Quantity :"} value={purchaseQty}/>
      <Card header={"Purchase Amount :"} value={purchaseAmount}/>
      <Card header={"Sales Quantity :"} value={salesQty}/>
      <Card header={"Sales Amount :"} value={salesAmount}/>
      <Card header={"Profit of farmers :"} value={salesQty - purchaseQty}/>
      <Card header={"Stalls Booked :"} value={noOfBookedStalls}/>
    </div>}
     {/* Farmers Statistics */}


     {/* Cancellation Feed */}

     <div className='cancellation_feed'>
      <div className='cancellation_feed_container'>
          <h2 className='cancellation_header'>Cancellation Data</h2>
          <div className='cancellation_body'>
              {
                 CancelledStalls && CancelledStalls.length !== 0 && CancelledStalls.map((e,i)=>{
                  const [user] = Farmers.filter( ele => ele._id === e.bookedBy)
                  const {firstname , lastname , phone} = user;
                  return(
                      <div key={i} className='cancellation_card'>
                          <h2 style={{textAlign:"center",padding:"0.5rem",textTransform:"capitalize"}}>{firstname+" "+lastname}</h2>
                          <div><b>Phone No : </b>{phone}</div>
                          <div><b>Stall Address : </b>{e.address}</div>
                          <div><b>Cancellation Date : </b>{e.cancelledAt}</div>
                          <div><b>Booked Date : </b>{e.bookedAt}</div>
                          <div><b>Stall Name :</b>{e.stallName}</div>
                          <div><b>Refund Status :</b>Not Refunded</div>
                          <div className='refund_btn_wrapper'>
                            <button className='refund_btn' id={e._id} onClick={handleRefundDelete}>Mark as Refunded</button>
                          </div>
                      </div>
                  )
                })
              }
              {
                CancelledStalls && CancelledStalls.length === 0 && <h2 style={{margin:"auto"}}>No Cancelled Data!</h2>
              }
              {
                !CancelledStalls && <Spinner/>
              }
          </div>
      </div>
     </div>

     {/* Cancellation Feed */}

    {!filteredInData && !filteredOutData && <Spinner/>}
  </div>
  )
}

export default Admin
