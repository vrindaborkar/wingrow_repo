import React,{useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import './Farmer.css'


const theme = createTheme();

export default function OutwardData() {
  // const navigate  = useNavigate()
  const [Data, setData] = useState({
    commodity:"",
    sales_quantity:"",
    sales_rate:"",
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
    console.log(Data)
  }



  return (
    <div className='data_container'>
    <Link to='/farmers' className='goback_btn'>Go Back</Link>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:"30px",
            overflowX:"hidden"
          }}
        >
          <Typography component="h1" variant="h5">
           Farmer Outward Data!!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{padding:5}}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="commodity"
                  value={Data.commodity}
                  onChange={handleData}
                  label="Commodity"
                  type="text"
                  id="commodity"
                  autoComplete="new-commodity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sales_quantity"
                  value={Data.sales_quantity}
                  onChange={handleData}
                  label="Sales Quantity"
                  type="number"
                  id="sales quantity"
                  autoComplete="new-sales quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sales_rate"
                  value={Data.sales_rate}
                  onChange={handleData}
                  label="Sales Rate"
                  type="number"
                  id="sales rate"
                  autoComplete="new-sales rate"
                />
              </Grid>
            </Grid>
            <Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ m:2 }}
            >Add</Button>
            </Grid>   
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}