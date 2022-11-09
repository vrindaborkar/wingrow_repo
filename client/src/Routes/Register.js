import React , {useState , useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
const user = AuthService.getCurrentUser()


const theme = createTheme();

export default function Register() {

  useEffect(() => {
    if(!!user){
      AuthService.logout();
      window.location.reload()
    }
  }, [])

  const navigate = useNavigate()

  const [data, setData] = useState({
    phone:'',
    password:'',
    firstname:'',
    lastname:'',
    type:'',
    farmertype:""
  });

  const handleChange = (e) => {
    const {name , value} = e.target;
    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    if (data.password && data.phone && data.type && data.firstname && data.lastname ) {
      AuthService.register(data.phone, data.password , data.firstname , data.lastname , data.type , data.farmertype).then(
        () => {
          alert("Registration successful")
          navigate("/login");
        },
        (error) => {
          alert("Registration failed")
          setData({
            phone:'',
            password:'',
            firstname:'',
            lastname:'',
            type:'',
            farmertype:""
          })
        }
      );
    } else {
      alert("data invalid")
    }
  };

  return (
    <div className='authContainer'>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"  sx={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",padding:"1rem"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl sx={{ width:"100%" }}>
                <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={data.type}
                  label="Type"
                  name='type'
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"farmer"}>Farmer</MenuItem>
                  <MenuItem value={"customer"}>Customer</MenuItem>
                </Select>
              </FormControl>
              </Grid>

              {data.type === "farmer" && <Grid item xs={12}>
              <FormControl sx={{ width:"100%" }}>
                <InputLabel id="demo-simple-select-helper-label">Farmer Type</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={data.farmertype}
                  label="farmertype"
                  name='farmertype'
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"farmers"}>farmers</MenuItem>
                  <MenuItem value={"Organic farmers"}>Organic farmers</MenuItem>
                  <MenuItem value={"FPO/FPC"}>FPO/FPC</MenuItem>
                  <MenuItem value={"Retailer"}>Retailer</MenuItem>
                  <MenuItem value={"Wholesaler"}>Wholesaler</MenuItem>
                  <MenuItem value={"Start-up"}>Start-up</MenuItem>
                  <MenuItem value={"Vocal for local producers"}>Vocal for local producers</MenuItem>
                </Select>
              </FormControl>
              </Grid>}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}