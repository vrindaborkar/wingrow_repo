import React , {useState , useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { WithContext as ReactTags } from 'react-tag-input';
import Spinner from '../components/Spinner';
const user = AuthService.getCurrentUser()


const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Register() {

  useEffect(() => {
    if(!!user){
      AuthService.logout();
      window.location.reload()
    }
  }, [])

  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false)
  const [data, setData] = useState({
    phone:'',
    password:'',
    firstname:'',
    lastname:'',
    type:'',
    farmertype:"",
    address:""
  });

  const [tags, setTags] = React.useState([]);
  const [error, seterror] = useState("")

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

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
    seterror("")
    event.preventDefault()
    const {phone , firstname , lastname , farmertype , type , password} = data;

    if( !(phone.match('[0-9]{10}')) )
      {
        seterror('Please provide valid phone number')
      }
    else if(firstname.length === 0 && lastname.length === 0)
      {
        seterror('Please provide valid first and last name')
      }
    else if(type.length === 0)
      {
        seterror('Please select type')
      }
    else if(password.length < 6){
      seterror("password must be greater than 6 characters")
    }
    else if(type === "farmer" && farmertype.length === 0){
      seterror("select producer type")
    }
    else if(type === "farmer" && tags.length === 0){
      seterror("select atleast one commodity and press enter")
    }
    else{
      seterror("no error")
      setLoading(true)
      AuthService.register(data.phone, data.password , data.firstname , data.lastname , data.type , data.farmertype , data.address , tags).then(
        () => {
            navigate('/login')
            setLoading(false)
            alert("login successful!")
          },
        (error) => {
          alert("Registration failed")
          setData({
            phone:'',
            password:'',
            firstname:'',
            lastname:'',
            type:'',
            farmertype:"",
            address:""
          })
          setTags([])
          setLoading(false)
        }
      )
    }
  };

  return (
    <>
    {!Loading?
      <div className='authContainer_register'>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className='register_details' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                InputLabelProps={{ style: { fontSize: 14, fontFamily: "monospace" } }}
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
                InputLabelProps={{ style: { fontSize: 14, fontFamily: "monospace" } }}
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
                InputLabelProps={{ style: { fontSize: 14, fontFamily: "monospace" } }}
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
              <FormControl sx={{ width:"100%" , fontSize:14}}>
                <InputLabel InputLabelProps={{ style: { fontSize: 14, fontFamily: "monospace" } }} id="demo-simple-select-helper-label">Type</InputLabel>
                <Select
                  sx={{fontSize: '1.2rem'}}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={data.type}
                  label="Type"
                  name='type'
                  onChange={handleChange}
                >
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}}  value={"farmer"}>Producer</MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"customer"}>Customer</MenuItem>
                </Select>
              </FormControl>
              </Grid>

              {data.type === "farmer" && <Grid item xs={12}>
              <FormControl sx={{ width:"100%" }}>
                <InputLabel
                 id="demo-simple-select-helper-label">Producer Type</InputLabel>
                <Select
                  sx={{fontSize: '1.3rem'}}
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
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"farmers"}>farmers</MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"Organic farmers"}>Organic farmers</MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"FPO/FPC"}>FPO/FPC</MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"Retailer"}>Retailer</MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"Wholesaler"}>Wholesaler</MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"Start-up"}>Start-up</MenuItem>
                  <MenuItem sx={{fontSize: '1.3rem' , fontFamily: "monospace"}} value={"Vocal for local producers"}>Vocal for local producers</MenuItem>
                </Select>
              </FormControl>
              </Grid>}

              <Grid item xs={12}>
                <TextField
                InputLabelProps={{ style: { fontSize: 14, fontFamily: "monospace" } }}
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
                <TextField
                InputLabelProps={{ style: { fontSize: 14, fontFamily: "monospace" } }}
                  fullWidth
                  name="address"
                  label="address (optional)"
                  type="address"
                  id="address"
                  value={data.address}
                  onChange={handleChange}
                  autoComplete="new-address"
                />
              </Grid>
              {data.type === "farmer" && <Grid item xs={12}>
              <ReactTags
              InputProps={{style: {fontSize: 15}}}
              InputLabelProps={{style: {fontSize: 15}}}
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
                placeholder="Add Selling Products Names and press enter"
              />
              </Grid>}
            </Grid>
            {error !== "no error" && <h3 style={{alignSelf:"center" , color:"red" , marginTop:"10px"}}>{error}</h3>}
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
        </form>
    </div>:<Spinner/>}
    </>
  );
}