import React , {useState , useEffect} from "react";
import authHeader from "../services/auth.headers";
import AuthService from "../services/auth.service";
import '../styles/Profile.css'
import axios from 'axios'
import UserService from "../services/user.service";
import Spinner from '../components/Spinner'

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [user , setuser] = useState();
  const [Loading, setLoading] = useState(false)
  const [path, setpath] = useState()
  const [newPic, setNewPic] = useState(
    {
        photo: '',
    }
);

useEffect(() => {
  setpath(user?.pic)
}, [user])

var data = undefined;
var contentType = undefined;
var base64String = undefined;

if(path){
  data = path.data;
  contentType = path.contentType;
  base64String = data && btoa(String.fromCharCode(...new Uint8Array(data.data)));
}

useEffect(() => {
  UserService.getFarmers().then(res=>{
    const user = res?.data;
    const userFilter = user.filter(e => e._id === currentUser.id)
    setuser(userFilter[0])
  })//eslint-disable-next-line
}, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('photo', newPic.photo);

    axios.put('https://wingrowagritech.herokuapp.com/auth/user', formData , {headers:authHeader()})
         .then(res => {
          const resp = res?.data;
            setuser(resp)
            console.log(resp.pic)
            setpath(resp.pic)
            setLoading(false)
         })
         .catch(err => {
            console.log(err);
         });
      setTimeout(() => {
        window.location.reload()
      }, 500);
}

const handlePhoto = (e) => {
  setNewPic({...newPic, photo: e.target.files[0]});
}
  return (
    <div>
      {!Loading && user ? <div className="profile">
        <img className="profile_img" src={data ? `data:${contentType};base64,${base64String}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile"/>
        <div>
          <div>
          Mobile No : {currentUser.phone}
          </div>
          <div>
          Name : {currentUser.firstname} {currentUser.lastname}
          </div>
        </div>
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
        </div>:<Spinner/>}
    </div>
  );
};

export default Profile;
