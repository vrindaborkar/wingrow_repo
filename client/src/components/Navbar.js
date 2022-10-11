import React, { useState , useEffect} from "react";
import '../styles/Styles.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCustomerBoard, setshowCustomerBoard] = useState(false);
  const [showFarmersBoard, setshowFarmersBoard] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(undefined);

  const handleLogout = () => {
    alert("logged out successfully")
    setShowMediaIcons(false);
    AuthService.logout();
    setCurrentUser(undefined)
    setshowFarmersBoard(false)
    setshowCustomerBoard(false)
    setShowAdminBoard(false)
  }
      
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if(user.role === "admin"){
        setShowAdminBoard(true);
      }
      else if(user.role === "farmer"){
        setshowFarmersBoard(true)
      }else{
        setshowCustomerBoard(true)
      }
    }
  }, []);

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>W</span>ingrow
            <span>A</span>gritech
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>

            <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/">Home</Link>
            </li>

            {showCustomerBoard && 
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/customers">Customers</Link>
            </li>
            }

            {showFarmersBoard &&
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/farmers">Farmers</Link>
            </li>
            }

            {showAdminBoard &&
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/admin">Admin</Link>
            </li>
            }

            {CurrentUser?
            <>
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/profile">{CurrentUser.firstname}</Link>
              </li>
              <li className="medialinks">
              <Link onClick={handleLogout} to="/login">Logout</Link>
              </li>
            </> : 
            <>
              <li className="medialinks">
                <Link onClick={()=>{setShowMediaIcons(false)}} to="/login">Login</Link>
              </li>

              <li className="medialinks">
                <Link onClick={()=>{setShowMediaIcons(false)}} to="/register">Register</Link>
              </li>
            </>
            }
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <span onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons?<TiDeleteOutline />:<GiHamburgerMenu />}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
