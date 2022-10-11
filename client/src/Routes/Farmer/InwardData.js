import React,{useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import './Farmer.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs'
import FarmerService from '../../services/farmer.service'

const options = [
  // Leaves
  { title: "Amaranthus" },
  { title: "Beet Root"},
  { title: "Chukka- sorrel Leaves" },
  { title: "Colocasia Leaves" },
  { title: "Coriander"},
  { title: "Curry Leaves" },
  { title: "Dill" },
  { title: "Fenugreek Leaves"},
  { title: "Green Amaranth" },
  { title: "Spinach" },
  { title: "Spring Onion"},
  { title: "Sufflower" },
// Wild-Antic
  { title: "Apple Gourd"},
  { title: "Ashgourd" },
  { title: "Chilli" },
  { title: " Colocasia Roots" },
  { title: "Cucumber Madras" },
  { title: "Kohlrabi" },
  { title: "Onion White-Pandhara Kanda" },
  { title: "Pointed Gourd" },
  { title: "Pumpkin" },
  { title: "Raw Jackfruit" },
  { title: "Raw Papaya" },
  { title: "Sambhar Kanda" },
  { title: "Snake Gourd"  },
  { title: "Spiny Gourd" },
  { title: "Sweet Potato" },
  { title: "Water Chestnuts" },
  { title: "Yam" },
// Exotic
  { title: "Asparagus" },
  { title: "Avocado" },
  { title: "Baby Corn" },
  { title: "Baby Potato" },
  { title: "Basil" },
  { title: "Broccoli" },
  { title: "Celery" },
  { title: "Cherry Tomato" },
  { title: "chinese Cabbage" },
  { title: "Coccinia" },
  { title: "Green Zucchini" },
  { title: "Iceberg Lettuce" },
  { title: "Parsley" },
  { title: "Red Cabbage" },
  { title: "Red Capsicum" },
  { title: "Romaine Lettuce" },
  { title: "Yellow Capsicum" },
  { title: "Yellow Zucchini" },
  { title: "Mushroom" },
  { title: "Sweet Corn" },
  { title: "Sweet Corn Grains" },
// Special stall
  { title: "Cabbage" },
  { title: "Cauliflower" },
  { title: "Onion" },
  { title: "Potato (Agra)" },
  { title: "Potato (Indore)" },
  { title: "Potato (Talegav)" },
  // Fruit Vegetables
  { title: "Apple Gourd" },
  { title: "Beans Double" },
  { title: "Bitter Gourd" },
  { title: "Brinjal Big" },
  { title: "Brinjal Green" },
  { title: "Brinjal Long Green" },
  { title: "Brinjal Purple" },
  { title: "Carrot" },
  { title: "Cauliflower" },
  { title: "Chavali Beans" },
  { title: "Chickpeas - Chana sprouts" },
  { title: "chilli - Bhavgagari Mirchi" },
  { title: "Chilli Green" },
  { title: "chilli Simple" },
  { title: "Cluster Beans" },
  { title: "Coccinia" },
  { title: "Coconut" },
  { title: "Colocasia Roots" },
  { title: "Coriander" },
  { title: "Cucumber" },
  { title: "Cucumder Madras" },
  { title: "Cucumber Madras- Sambar Kakadi" },
  { title: "Cucumber Polyhouse- English Kakadi" },
  { title: "Curry Leaves" },
  { title: "Drum Sticks" },
  { title: "Elaichi Banana" },
  { title: "Field Beans" },
  { title: "Fresh Peeled Green Peas" },
  { title: "Garlic" },
  { title: "Ginger" },
  { title: "Green Capsicum" },
  { title: "Green Mango" },
  { title: "Green Peas" },
  { title: "Groundnut Pods" },
  { title: "Tamarind" },
  { title: "Lady Finger" },
  { title: "Lemon" },
  { title: "Lemon Grass" },
  { title: "Mint" },
  { title: "Onion" },
  { title: "Onion Sambhar" },
  { title: "Lima Beans" },
  { title: "Peeled Garlic" },
  { title: "Potato" },
  { title: "Radish" },
  { title: "Ridgegourd" },
  { title: "Sponge Gourd" },
  { title: "Spring Onion" },
  { title: "Tomato" },
  { title: "Wal" },
  { title: "Wal Broad" },
  { title: "Wal surati" },
  { title: "Water Chestnuts" },
  // Fruit Export
  { title: "Apple Fuji" },
  { title: "Apple Green" },
  { title: "Apple Kinnaur" },
  { title: "Apple Red Delicious" },
  { title: "Apple Shimla Big" },
  { title: "Kiwi" },
  { title: "Litchi" },
  { title: "Strawberry" },
  // Fruit Summer
  { title: "Grapes Black" },
  { title: "Grapes Green" },
  { title: "Jambhul" },
  { title: "Mango Badami (For Juice)" },
  { title: "Mango Devgad Hapus" },
  { title: "Mango Keshar" },
  { title: "Mango Lalbag" },
  { title: "Mango Payri" },
  { title: "Mango Ratnagiri Hapus" },
  { title: "Mango Totapuri" },
  { title: "Muskmelon" },
  { title: "Watermelon Kiran" },
  { title: "Watermelon Regular" },
  // Fruit
  { title: "Amla" },
  { title: "Apple Gourd" },
  { title: "Ashgourd" },
  { title: "Banana" },
  { title: "Beet Root" },
  { title: "Custard-apple" },
  { title: "Elaichi Banana" },
  { title: "Figs" },
  { title: "Guava" },
  { title: "Jackfruit Peeled" },
  { title: "Jujube - Ber" },
  { title: "Lemon" },
  { title: "Orange Small" },
  { title: "Orange Kinnow" },
  { title: "Papaya" },
  { title: "Pear Imported" },
  { title: "Pomogranate" },
  { title: "Raw Banana" },
  { title: "Sapodilla" },
  { title: "Sugarcane" },
  { title: "Sweet Lime" },
  { title: "Tender" },
];

const theme = createTheme();
export default function InwardData() {
  const navigate  = useNavigate()
  const [Data, setData] = useState({
    commodity:"",
    purchase_quantity:0,
    purchase_rate:0,
    market:""
  })

  const handleData = (e)=>{
    const {name , value} = e.target
    setData(prevState => ({
      ...prevState,
      [name]:value
  }))
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = dayjs(Date.now()).toISOString()
    
    if (Data.commodity && Data.purchase_quantity && Data.purchase_rate && Data.market && time) {
      FarmerService.postInward(Data.commodity , Data.purchase_quantity , Data.purchase_rate , Data.market , time).then(
        () => {
          alert("Data added successfully")
          navigate("/farmers");
        },
        (error) => {
          console.log(error)
          alert("Failed to add data")
          setData({
            commodity:"",
            market:'',
            purchase_rate:0,
            purchase_quantity:0
          })
          navigate('/farmers')
        }
      );
    } else {
      alert("data invalid")
    }
  }

  return (
    <div className='data_container'>
    <Link to="/farmers" className='goback_btn'>Go Back</Link>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
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
           Farmer Inward Data
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{padding:5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="market"
                  label="Farmers Market"
                  value={Data.market}
                  onChange={handleData}
                  type="text"
                  id="farmers_market"
                  autoComplete="new-farmers market"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 250 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Commodity</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={Data.commodity}
                  onChange={handleData}
                  label="commodity"
                  name='commodity'
                  required
                >
                  {
                    options.map((e,i)=>{
                      return(
                        <MenuItem key={i} value={e.title}>{e.title}</MenuItem>
                      )
                    })
                  }
                </Select>
                </FormControl>
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