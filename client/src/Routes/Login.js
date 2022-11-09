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
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
const user = AuthService.getCurrentUser();

const theme = createTheme();

export default function SignIn() {

  useEffect(() => {
    if(!!user){
      AuthService.logout();
      window.location.reload()
    }
  }, [])
  

  const navigate = useNavigate()
  const [data, setData] = useState({
    phone:'',
    password:''
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

  const handleLogin = (e) => {
    e.preventDefault();

    if (data.password && data.phone) {
      AuthService.login(data.phone, data.password).then(
        (res) => {
          if(res.role === "farmer"){
            navigate("/farmers");
            window.location.reload()
          }
          if(res.role === "admin"){
            navigate("/admin");
            window.location.reload()
          }
          if(res.role === "customer")
          {
            navigate("/customers");
            window.location.reload()
          }
          alert("login successful!")
        },
        (error) => {
          alert("login failed")
          console.log(error)
          setData({
            phone:'',
            password:''
          })
          navigate('/login')
        }
      );
    } else {
      alert("data invalid")
    }
  };

  return (
    <div className='authContainer'>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",padding:"1rem"}}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Mobile Number"
              name="phone"
              value={data.phone}
              autoComplete="phone"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={data.password}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type='submit'
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Register"}
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