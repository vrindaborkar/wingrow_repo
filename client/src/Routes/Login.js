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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    if (data.password && data.phone) {
      setLoading(true)
      AuthService.login(data.phone, data.password).then(
        (res) => {
          if(res.role === "farmer"){
            toast.success('Login successful!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              setTimeout(() => {
                navigate("/farmers");
                window.location.reload()
              }, 1000);
          }
          if(res.role === "admin"){
            toast.success('Login successful!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              setTimeout(() => {
                navigate("/admin");
                window.location.reload()
              }, 1000);
          }
          if(res.role === "customer")
          {
            toast.success('Login successful!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              setTimeout(() => {
                navigate("/customers");
                window.location.reload()
              }, 1000);
          }
          setLoading(false)
        },
        (error) => {
          toast.warn('Login failed', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setData({
            phone:'',
            password:''
          })
          setLoading(false)
        }
      );
    } else {
      toast.warn('data invalid', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return (
    <div className='authContainer'>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          {/* Same as */}
          <ToastContainer />
          {!Loading?<div className='authbox'>
            <img className='login_image' src="./images/slidestall2.webp" alt="logo"/>
            <form onSubmit={handleLogin} className='login_details'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
            <TextField
            InputLabelProps={{ style: { fontSize: 16, fontFamily: "monospace" } }}
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
            InputLabelProps={{ style: { fontSize: 16, fontFamily: "monospace" } }}
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