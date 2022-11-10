import React , {useState , useEffect , useRef} from "react";
import authHeader from "../services/auth.headers";
import '../styles/Profile.css'
import axios from 'axios'
import UserService from "../services/user.service";
import Spinner from '../components/Spinner'
import AuthService from "../services/auth.service";

const Profile = () => {
  const [user , setuser] = useState();
  const [Loading, setLoading] = useState(false)
  const [path, setpath] = useState()
  const [toggleImage, settoggleImage] = useState(false)
  const [toggleAddress, settoggleAddress] = useState(false)
  let addressText = useRef("")
  const [newPic, setNewPic] = useState(
    {
        photo: '',
    }
);

let data = undefined;
let contentType = undefined;
let base64String = undefined;

useEffect(() => {
  setpath(user?.pic)
}, [user])


if(path){
  data = path.data;
  contentType = path.contentType;
  base64String = data && btoa(String.fromCharCode(...new Uint8Array(data.data)));
}

useEffect(() => {
  UserService.getAllUsers().then(res=>{
    const response = res?.data
    setuser(response[0])
  })
}, [])

const handleSubmitAddress = (e) => {
  e.preventDefault();
  setLoading(true);
  let address = addressText.current.value;

  if(address && address.length!==0){
    AuthService.addAddress(address).then(res=>{
      setuser(res);
      window.location.reload();
      setLoading(false);
    })
  }
  settoggleAddress(!toggleAddress)
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('photo', newPic.photo);

    axios.put('https://wingrowagritech.herokuapp.com/auth/user', formData , {headers:authHeader()})
         .then(res => {
          const resp = res?.data;
            setuser(resp);
            window.location.reload();
            setLoading(false);
         })
         .catch(err => {
            console.log(err);
         });
    settoggleImage(!toggleImage)
}

const handlePhoto = (e) => {
  setNewPic({...newPic, photo: e.target.files[0]});
}

const handleAddresstoggle = () => {
  settoggleAddress(!toggleAddress)
}

const handleImagetoggle = () => {
  settoggleImage(!toggleImage)
}


  return (
    <div>
      {!Loading && user ? <div className="profile">
        <img className="profile_img" src={path ? `data:${contentType};base64,${base64String}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile"/>
        <div>
          <div>
          Mobile No : {user.phone}
          </div>
          <div>
          Name : {user.firstname} {user.lastname}
          </div>
          {user.address && <div>
            Address : {user.address}
          </div>}
        </div>
        <div>
        {
        toggleImage ? 
        <form className="form_uploaddata" onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />
                    <input 
                type="submit"
            />
        </form>
        :
        <button onClick={handleImagetoggle}>Upload Profile</button>
        }
       {
       toggleAddress?
       <form className="form_uploaddata" onSubmit={handleSubmitAddress}>
            <input 
                type="text" 
                name="address"
                ref={addressText}
                
            />
                    <input 
                type="submit"
            />
        </form>
        :
            <button onClick={handleAddresstoggle}>{user.address?"Update Address":"Add Address"}</button>
        }
        </div>
        </div>:<Spinner/>}
    </div>
  );
};

export default Profile;
