import React from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css'

const Footer = () => {
return (
	<div className="Box">
	<div className="Container">
		<div className="row">
		<div className="Column">
			<p className="Heading">Wingrow Agritech</p>
            <Link className="FooterLink" to="#">Wingrow agritech Producer Company Ltd., Sn 637,b/2, Omkarnagar, Pmt colony, Pokale Wasti, Bibwewadi, Pune-411037<br></br>
            </Link>
			<Link className="FooterLink" to="mailto:connect@wingrowagritech.com" >connect@wingrowagritech.com</Link>
			<Link className="FooterLink" to="#">+91 777 600 3700</Link>


		</div>
		<div className="Column">
			<p className="Heading">Services</p>
			<Link className="FooterLink" to="/">Home</Link>
			{/* <Link className="FooterLink" to="/customers">Customers</Link> */}
			<Link className="FooterLink" to="/farmers">Farmers</Link>
			{/* <Link className="FooterLink" to="/register">Register</Link> */}
			{/* <Link className="FooterLink" to="/cart">Cart</Link> */}
			<Link className="FooterLink" to="/bookings">Stall Bookings</Link>
			
			
			
		</div>
		<div className="Column">
			<p className="Heading">Contact Us</p>
			<Link className="FooterLink" to="mailto:connect@wingrowagritech.com">Contact </Link>
            			<Link className="FooterLink" to="/customers">Customers</Link>

		</div>

        <div className="Column">
			<p className="Heading">Legal</p>
			<Link className="FooterLink" to="/terms">Terms and Conditions </Link>
		</div>

		<div className="Column">
			<p className="Heading">Social Media</p>
			<Link className="FooterLink" to="https://www.facebook.com/Wingrow-Agritech-Producer-Company-Limited-4">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</Link>
			<Link className="FooterLink" to="https://instagram.com/wingrowagritech?utm_medium=copy_link">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</Link>
			<Link className="FooterLink" to="https://www.linkedin.com/company/31488381">
				<span style={{ marginLeft: "10px" }}>
				Linkedin
				</span>
			</Link>
		</div>
		</div>
	</div>

    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)',textAlign:'center' , padding:"4px" }}>
    &copy; 2022 Copyright:
        <a style={{fontWeight:"bold"}} href='https://www.wingrowagritech.com/'>
         Wingrow Agritech. Developed by<span > Wingrow Agritech</span>. All rights reserved.
        </a>
      </div>
	</div>
);
};
export default Footer;
