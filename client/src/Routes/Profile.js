import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      {currentUser && <div className="profile">
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile"/>
        <div>
          <div>
          Mobile No : {currentUser.phone}
          </div>
          <div>
          Name : {currentUser.firstname} {currentUser.lastname}
          </div>
        </div>
        </div>}
    </div>
  );
};

export default Profile;
