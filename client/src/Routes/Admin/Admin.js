import React,{useState , useEffect} from 'react'
import Datepicker from '../../components/Datepicker'
import FarmerService from '../../services/farmer.service'
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Admin.css'
import Card from '../../components/Card'
import Spinner from '../../components/Spinner'

const Admin = () => {
  const [Inward, setInward] = useState()
  const [Outward, setOutward] = useState()
  const [value, setValue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  const [filteredInData, setfilteredInData] = useState()
  const [filteredOutData, setfilteredOutData] = useState()
  const [fromDate, setfromDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
  const [toDate, settoDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
  const [market, setMarket] = React.useState('');

  const handleChangeMarket = (event) => {
    setMarket(event.target.value);
  };

  useEffect(() => {
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
  }, [])

  const totalFarmers = new Set();
  const farmers = new Set();
  const marketsData = new Set();
  const farmersMarket = []
  let purchaseQty = 0;
  let purchaseAmount = 0;
  let salesQty = 0;
  let salesAmount = 0;

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


  useEffect(() => {
    const inData = Inward && Inward.filter((e)=>{
      const [date] = e.time.split("T");
      return date === dayjs(value).format("YYYY-MM-DD")
    })

    const outData = Outward && Outward.filter((e)=>{
      const [date] = e.time.split("T");
      return date === dayjs(value).format("YYYY-MM-DD")
    })

    setfilteredInData(inData)
    setfilteredOutData(outData)//eslint-disable-next-line
  }, [value])


  useEffect(() => {
    const marketresponse = Inward && Inward.filter(e => e.market === market);
    setfilteredInData(marketresponse) //eslint-disable-next-line
  }, [market])
  

  const handleSearch = () => {
    const filterIn = Inward && Inward.filter((e)=>{
      const [date] = e.time.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })

    const filterOut = Outward && Outward.filter((e)=>{
      const [date] = e.time.split("T");
      return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
    })
    setfilteredInData(filterIn);
    setfilteredOutData(filterOut)
  }

  
  for(let item of marketsData){
    farmersMarket.push(item)
  }

  return (
    <div className='admin_main_component'>
      <div className='admin_secondary_header'>
        <div className='header_items'>
          <span>Filter by date :</span>
          <div className='date_picker'>
            <Datepicker setValue={setValue} value={value}/>
          </div>
        </div>

        <div className='header_items_center'>
          <div className='header_items_filter'>
            <span className='date_picker_label'>Filter between dates from :</span>
            <div className='date_picker'>
              <Datepicker setValue={setfromDate} value={fromDate}/>
            </div>
          </div>
          <div className='header_items_filter'>
            <span className='date_picker_label'>Filter between dates to :</span>
            <div className='date_picker'>
              <Datepicker setValue={settoDate} value={toDate}/>
            </div>
          </div>
          <button className='filter_btn' onClick={handleSearch}>Search</button>
      </div>

      <div className='header_items'>
        <span>Filter market wise :</span>
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-select-small">Market</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={market}
            label="Market"
            onChange={handleChangeMarket}
          >
            {
              farmersMarket.length!==0 && farmersMarket.map((e , i)=>{
                return(
                  <MenuItem key={i} value={e}>{e}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>
    </div>

    {filteredInData && filteredOutData && <div className='cards_container'>
      <Card header={"Total farmers market :"} value={totalFarmers.size}/>
      <Card header={"Total farmers :"} value={farmers.size}/>
      <Card header={"Purchase Quantity :"} value={purchaseQty}/>
      <Card header={"Purchase Amount :"} value={purchaseAmount}/>
      <Card header={"Sales Quantity :"} value={salesQty}/>
      <Card header={"Sales Amount :"} value={salesAmount}/>
      <Card header={"Profit of farmers :"} value={salesQty - purchaseQty}/>
    </div>}
    {!filteredInData && !filteredOutData && <Spinner/>}
  </div>
  )
}

export default Admin
