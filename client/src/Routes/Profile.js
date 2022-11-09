import React , {useState , useEffect} from "react";
import authHeader from "../services/auth.headers";
import AuthService from "../services/auth.service";
import '../styles/Profile.css'
import axios from 'axios'
import UserService from "../services/user.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [user , setuser] = useState();
  const [newPic, setNewPic] = useState(
    {
        photo: '',
    }
);
const path = user && user[0]?.pic

useEffect(() => {
  UserService.getFarmers().then(res=>{
    const user = res?.data;
    const userFilter = user.filter(e => e._id === currentUser.id)
    setuser(userFilter)
  })//eslint-disable-next-line
}, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', newPic.photo);

    axios.put('https://wingrowagritech.herokuapp.com/auth/user', formData , {headers:authHeader()})
         .then(res => {
            setuser(res?.data)
            window.location.reload()
         })
         .catch(err => {
            console.log(err);
         });
}

const handlePhoto = (e) => {
  setNewPic({...newPic, photo: e.target.files[0]});
}
  return (
    <div>
      {user && <div className="profile">
        <img className="profile_img" src={path ? `data:image/jpeg;base64,${path.data}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile"/>
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
        </div>}
    </div>
  );
};

export default Profile;
