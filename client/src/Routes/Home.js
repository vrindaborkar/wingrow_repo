import React ,{useEffect}from 'react'
import '../styles/Home.css'
import CountUp from 'react-countup';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import ContactsIcon from '@mui/icons-material/Contacts';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Location from '../components/Location';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Footer from '../components/Footer';

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='home_container'>
        <div className='dash'>
        <figure className='dash_img img1'>
          <img className='image_dash ' src="./images/6.jpg" alt="img"/>
        </figure>
        <figure className='dash_img img2'>
          <img className='image_dash' src="./images/3.jpg" alt="img"/>
        </figure>
        <figure className='dash_img img3'>
          <img className='image_dash' src="./images/4.jpg" alt="img"/>
        </figure>
        <figure className='dash_img img4'>
          <img className='image_dash' src="./images/5.jpg" alt="img"/>
        </figure>
        <figure className='dash_img img5'>
          <img className='image_dash' src="./images/img.jpg" alt="img"/>
        </figure>
        <figure className='dash_img img6'>
          <img className='image_dash' src="./images/7.jpg" alt="img"/>
        </figure>
      </div>

      <div className="grid_info">
          <h1 className="grid_head heading_tertiary">
            Products before Covid 19
          </h1>
          <div className='gridinfo_container'>
          <div className="grid_countinfo">
              <CountUp className="count" start={0} end={1200} duration={2.75}/>
              <p style={{textAlign:"center"}}>Farmers</p>
          </div>
          <div className="grid_countinfo" >
              <CountUp className="count" start={0} end={12} duration={2.75}/>
              <p style={{textAlign:"center"}}>Farmers Market</p>
          </div>
          <div className="grid_countinfo">
              <CountUp className="count" start={0} end={11000} duration={2.75}/>
              <p style={{textAlign:"center"}}>Consumers Served</p>
          </div>
          </div>
        </div>

        <div className="grid_info">
          <h1>Our Response to Covid 19</h1>
            <div>
                During the lockdown situation, we started delivering fruits and vegetables at home following all the safety norms.
            </div>
            <div>
            We also set up fruit and vegetable stalls in collaboration with government to help farmers and citizens.
            </div>
        </div>

        <div className="iconsgrp">
          <div className="icons">
            <CardTravelIcon fontSize="large"/>
            <div className='iconscontent'>
              <p>Total No. of Deliveries</p>
              <h3>99450</h3>
            </div>  
          </div>
          <div className="icons">
            <ContactsIcon fontSize="large"/>
            <div className='iconscontent'>
              <p>Total Quantity Delivered</p>
              <h3>1002 Tons</h3>
            </div>  
          </div>
          <div className="icons">
            <ThumbUpIcon fontSize="large"/>
            <div className='iconscontent'>
              <p>Total Revenue</p>
              <h3>Rs 1.96 Cr</h3>
            </div>
          </div>
          <div className="icons">
            <LabelImportantIcon fontSize="large"/>
            <div className='iconscontent'>
              <p>Number of Farmers</p>
              <h3>210</h3>
            </div>  
          </div>
          <div className="icons">
            <SupervisorAccountIcon fontSize="large"/>
            <div className='iconscontent'>
              <p>Number of Customers</p>
              <h3>29100</h3>
            </div>
          </div>
          <div className="icons">
            <AirplanemodeActiveIcon fontSize="large"/>
            <div className='iconscontent'>
              <p>India Air force Pune</p>
              <h3>25000</h3>
            </div>
        </div>
    </div>

    <div className="restinfo">
        <div className="title_info">
          <h1>OUR MARKETS</h1>
          <p>We organize weekly markets at key locations in Pune which allows farmers to sell fresh produce directly to the customers, cutting out middlemen in the process. This allows customers to buy farm fresh goods at affordable rates, while the farmers who grow the produce get a fair price for it.</p>
        </div>
          <div className='location_component'>
              <Location/>
          </div>

          <div className="slider_container">
            <h1>Cutting the middleman out</h1>
            <br/>
            <div className="info_scroll" >
              <img className="product-img" data-aos="fade-right" alt="XYZ" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2019/10/fresh-farm-produce_compressed-1.jpg" />
              <p className="pinfo" data-aos="fade-left">We at Wingrow Agritech facilitate direct interaction between consumers and farmers.</p>
            </div>
          </div>


          <div className="awards_container">
            <h1>Awards and Accolades</h1>

          <div className="awards">
            <div className="sub_awards">
              <img className="awards_img" src="https://tse1.mm.bing.net/th?id=OIP.KrAOSP4q6rZREEnmLCBwUwHaHa&pid=Api&P=0&w=160&h=160" alt="img" />
              <h1>Youth Inspiration Award 2018</h1>
              <p className='p_secondary'>Wingrow Agritech founder Mr Mayur Pawar was awarded with the Youth Inspiratiuon Award 2018</p>
            </div>

            <div className="sub_awards">
              <img className="awards_img" src="https://tse1.mm.bing.net/th?id=OIP.KrAOSP4q6rZREEnmLCBwUwHaHa&pid=Api&P=0&w=160&h=160" alt="img" />
              <h1>Certified Organizer (Ayojak) of MSMB</h1>
              <p className='p_secondary'>Wingrow Agritech Pvt. Ltd is a Certified Organizer (Ayojak) of MSMB</p>
            </div>

            <div className="sub_awards">
              <img className="awards_img" src="https://tse1.mm.bing.net/th?id=OIP.KrAOSP4q6rZREEnmLCBwUwHaHa&pid=Api&P=0&w=160&h=160" alt="img" />
              <h1>GSEA (Global Student Entrepreneur Award)</h1>
              <p className='p_secondary'>The Global Student Entrepreneur Awards (GSEA) for students operate a business while in university.</p>
            </div>
            </div>
          </div>

          <h1>Supported By</h1>
          <div className="awards">
            <div className="sub_awards">
              <img className="awards_img" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2020/04/unlimited-india_edit.png" alt="img" />
              <br/>
              <h2>UnLtd India</h2>
            </div>
            <div className="sub_awards">
              <img className="awards_img" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2020/04/Digital-Impact-Square.png" alt="img" />
              <br/>
              <h2>Digital Impact Square</h2>
            </div>
            <div className="sub_awards">
              <img className="awards_img" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2020/04/Entrepreneurs_Organization_edit.png" alt="img" />
              <br/>
              <h2>Entrepreneurs' Organization</h2>
            </div>
          </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Home