import React , {useState , useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Spinner from '../components/Spinner'
const user = AuthService.getCurrentUser();

export default function SignIn() {

  useEffect(() => {
    if(!!user){
      AuthService.logout();
      window.location.reload()
    }
  }, [])
  

  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false);
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
    setLoading(true)

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
          setLoading(false)
          alert("login successful!")
        },
        (error) => {
          alert("login failed")
          console.log(error)
          setData({
            phone:'',
            password:''
          })
          setLoading(false)
          navigate('/login')
        }
      );
    } else {
      alert("data invalid")
    }
  };

  return (
    <div className='authContainer'>
          {!Loading?<div className='authbox'>
            <img className='login_image' src="./images/slidestall2.jpeg" alt="logo"/>
            <form onSubmit={handleLogin} className='login_details'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
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
              </form>
            </div>:<Spinner/>}
         </div>
  );
}