import React,{useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../styles/Farmer.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs'
import FarmerService from '../../services/farmer.service'
import Autocomplete from '@mui/material/Autocomplete';

const locations = [
  {location:"Hadapsar"},
  {location:"Karve Nagar"},
  {location:"Kharadi"},
  {location:"Wanawadi"},
  {location:"Magarpatta"},
  {location:"Amanora City"},
  {location:"Bramhasun City"}
]

const options = [
  // Leaves
  { label: "Amaranthus" },
  { label: "Beet Root"},
  { label: "Chukka- sorrel Leaves" },
  { label: "Colocasia Leaves" },
  { label: "Curry Leaves" },
  { label: "Dill" },
  { label: "Fenugreek Leaves"},
  { label: "Green Amaranth" },
  { label: "Spinach" },
  { label: "Spring Onion"},
  { label: "Sufflower" },
// Wild-Antic
  { label: "Chilli" },
  { label: " Colocasia Roots" },
  { label: "Cucumber Madras" },
  { label: "Kohlrabi" },
  { label: "Onion White-Pandhara Kanda" },
  { label: "Pointed Gourd" },
  { label: "Pumpkin" },
  { label: "Raw Jackfruit" },
  { label: "Raw Papaya" },
  { label: "Sambhar Kanda" },
  { label: "Snake Gourd"  },
  { label: "Spiny Gourd" },
  { label: "Sweet Potato" },
  { label: "Yam" },
// Exotic
  { label: "Asparagus" },
  { label: "Avocado" },
  { label: "Baby Corn" },
  { label: "Baby Potato" },
  { label: "Basil" },
  { label: "Broccoli" },
  { label: "Celery" },
  { label: "Cherry Tomato" },
  { label: "chinese Cabbage" },
  { label: "Coccinia" },
  { label: "Green Zucchini" },
  { label: "Iceberg Lettuce" },
  { label: "Parsley" },
  { label: "Red Cabbage" },
  { label: "Red Capsicum" },
  { label: "Romaine Lettuce" },
  { label: "Yellow Capsicum" },
  { label: "Yellow Zucchini" },
  { label: "Mushroom" },
  { label: "Sweet Corn" },
  { label: "Sweet Corn Grains" },
// Special stall
  { label: "Cabbage" },
  { label: "Potato (Agra)" },
  { label: "Potato (Indore)" },
  { label: "Potato (Talegav)" },
  // Fruit Vegetables
  { label: "Beans Double" },
  { label: "Bitter Gourd" },
  { label: "Brinjal Big" },
  { label: "Brinjal Green" },
  { label: "Brinjal Long Green" },
  { label: "Brinjal Purple" },
  { label: "Carrot" },
  { label: "Cauliflower" },
  { label: "Chavali Beans" },
  { label: "Chickpeas - Chana sprouts" },
  { label: "chilli - Bhavgagari Mirchi" },
  { label: "Chilli Green" },
  { label: "chilli Simple" },
  { label: "Cluster Beans" },
  { label: "Coconut" },
  { label: "Colocasia Roots" },
  { label: "Coriander" },
  { label: "Cucumber" },
  { label: "Cucumder Madras" },
  { label: "Cucumber Madras- Sambar Kakadi" },
  { label: "Cucumber Polyhouse- English Kakadi" },
  { label: "Drum Sticks" },
  { label: "Field Beans" },
  { label: "Fresh Peeled Green Peas" },
  { label: "Garlic" },
  { label: "Ginger" },
  { label: "Green Capsicum" },
  { label: "Green Mango" },
  { label: "Green Peas" },
  { label: "Groundnut Pods" },
  { label: "Tamarind" },
  { label: "Lady Finger" },
  { label: "Lemon Grass" },
  { label: "Mint" },
  { label: "Onion" },
  { label: "Onion Sambhar" },
  { label: "Lima Beans" },
  { label: "Peeled Garlic" },
  { label: "Potato" },
  { label: "Radish" },
  { label: "Ridgegourd" },
  { label: "Sponge Gourd" },
  { label: "Tomato" },
  { label: "Wal" },
  { label: "Wal Broad" },
  { label: "Wal surati" },
  { label: "Water Chestnuts" },
  // Fruit Export
  { label: "Apple Fuji" },
  { label: "Apple Green" },
  { label: "Apple Kinnaur" },
  { label: "Apple Red Delicious" },
  { label: "Apple Shimla Big" },
  { label: "Kiwi" },
  { label: "Litchi" },
  { label: "Strawberry" },
  // Fruit Summer
  { label: "Grapes Black" },
  { label: "Grapes Green" },
  { label: "Jambhul" },
  { label: "Mango Badami (For Juice)" },
  { label: "Mango Devgad Hapus" },
  { label: "Mango Keshar" },
  { label: "Mango Lalbag" },
  { label: "Mango Payri" },
  { label: "Mango Ratnagiri Hapus" },
  { label: "Mango Totapuri" },
  { label: "Muskmelon" },
  { label: "Watermelon Kiran" },
  { label: "Watermelon Regular" },
  // Fruit
  { label: "Amla" },
  { label: "Apple Gourd" },
  { label: "Ashgourd" },
  { label: "Banana" },
  { label: "Custard-apple" },
  { label: "Elaichi Banana" },
  { label: "Figs" },
  { label: "Guava" },
  { label: "Jackfruit Peeled" },
  { label: "Jujube - Ber" },
  { label: "Orange Small" },
  { label: "Orange Kinnow" },
  { label: "Papaya" },
  { label: "Pear Imported" },
  { label: "Pomogranate" },
  { label: "Raw Banana" },
  { label: "Sapodilla" },
  { label: "Sugarcane" },
  { label: "Sweet Lime" },
  { label: "Tender" },
];


const theme = createTheme();
export default function InwardData() {
  const [Data, setData] = useState({
    purchase_quantity:undefined,
    purchase_rate:undefined,
    market:""
  })
  const [commodity, setcommodity] = useState("")


  const handleData = (e)=>{
    const {name , value} = e.target
    setData(prevState => ({
      ...prevState,
      [name]:value
  }))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const time = dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss')
    
    if (commodity && Data.purchase_quantity && Data.purchase_rate && Data.market && time) {
      FarmerService.postInward(commodity , Data.purchase_quantity , Data.purchase_rate , Data.market , time).then(
        () => {
          alert("Inward data has been added successfully")
          window.location.reload();
        },
        (error) => {
          console.log(error)
          alert("Failed to add data")
          setData({
            market:'',
            purchase_rate:0,
            purchase_quantity:0
          })
          setcommodity("")
        }
      );
    } else {
      alert("data invalid")
    }
  }

  return (
    <div className='data_container'>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding:2,
            height:'87vh',
            width:'100%'
          }}
        >
          <Typography component="h1" variant="h4">
           Farmer Inward Data !!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{padding:5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 250 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Market</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={Data.market}
                  onChange={handleData}
                  label="market"
                  name='market'
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
              <Grid item xs={12}>
                    <Autocomplete
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      disablePortal
                      id="combo-box-demo"
                      onChange={(event , value) => setcommodity(value?.label)}
                      options={options}
                      sx={{ width: 250 }}
                      renderInput={(params) => <TextField name="commodity" {...params} label="commodities" />}
                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="purchase_quantity"
                  value={Data.purchase_quantity}
                  onChange={handleData}
                  label="Purchase Quantity"
                  type="number"
                  id="purchase quantity"
                  autoComplete="new-purchase quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="purchase_rate"
                  value={Data.purchase_rate}
                  onChange={handleData}
                  label="Purchase Rate"
                  type="number"
                  id="purchase rate"
                  autoComplete="new-purchase rate"
                />
              </Grid>
            </Grid>
            <Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ m:2 }}
            >
              Add
            </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}