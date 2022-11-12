import '../../styles/Admin.css'
import Card from '../../components/Card'
import Spinner from '../../components/Spinner'
import FilterModal from '../../components/FilterModal';
import { Link } from 'react-router-dom';

const AdminHome = ({
  handleChangeMarket,fromDate,setfromDate,toDate,settoDate,value,setValue,handleSearch,market,farmersMarket,
  open,setOpen,handleClose,handleOpen,handleSearchmarkets,handleSearchDate,filteredInData,filteredOutData,
  purchaseQty,purchaseAmount,salesQty,salesAmount,noOfBookedStalls,totalFarmers,farmers,Farmers
}) => {

  const FarmersObj = [];
  const farmersData = new Map();
  Farmers && Farmers.forEach((e)=>{
    if(farmersData.has(e.farmertype)){
      farmersData.set(e.farmertype , farmersData.get(e.farmertype)+1)
    }else{
      farmersData.set(e.farmertype, 0);
    }
  })

  farmersData.forEach((value, key) => {
    FarmersObj.push({farmertype : key , count : value})
  })

  return (
    <>
    <div className='admin_main_component'>
        <div>
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
        <h2 className='overalldata_header'>Farmers Statistics</h2>
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
        </div>
    

        <div>
        <h2 className='overalldata_header'>Types of Farmers</h2>
        {FarmersObj &&
          <div className='cards_container'>
          {FarmersObj.map((e,i)=>{
            return(
              <Card key={i} header={e.farmertype} value={e.count}/>
            )
          })}
          </div>}
        </div>

        <div className='links_container'>
          <h2 className='overalldata_header'>Navigation Links</h2>
          <div className='admin_links'>
            <Link className='admin_links_details' to="../listoffarmers">Get list of Farmers</Link>
            <Link className='admin_links_details' to="../listofCustomers">Get list of Customers</Link>
            <Link className='admin_links_details' to="../cancelledstalls">Get list of Cancelled Stalls</Link>
          </div>
        </div>

  </div>
  {!filteredInData && !filteredOutData && !Farmers &&<Spinner/>}
  </>
  )
}

export default AdminHome
