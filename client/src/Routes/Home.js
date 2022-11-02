import React ,{useEffect}from 'react'
import '../styles/Home.css'
// import CountUp from 'react-countup';
// import CardTravelIcon from '@mui/icons-material/CardTravel';
// import ContactsIcon from '@mui/icons-material/Contacts';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import LabelImportantIcon from '@mui/icons-material/LabelImportant';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Location from '../components/Location';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
// import {BsArrowReturnLeft} from 'react-icons/bs';
// import {BsArrow90DegDown} from 'react-icons/bs';
// import {BsArrowRight} from 'react-icons/bs'

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='home_container'>

      <div className="firstdata">
        <div className='homeanm'>
          <div className='animate'>
          <img class='anmimg' src="../images/anmbook.jpg" alt="img"/>
          </div>
          <div className='animatedata' >
              <h4>Revolutionizing the Stall</h4>
              <h4>Booking for Direct Sell</h4>
              <a  href="https://www.wingrowagritech.com/"><button className='winbutton'>Learn More</button></a>
          </div>

        </div>

        <div className='imgadd11'>
          <img class='imgadd' src="../images/images3.jpg" alt="img"/>


        </div>


    <div className="restinfo">
        <div className="title_info">
          <h1>OUR MARKETS</h1>
          <p className="fontsize">We organize weekly markets at key locations in Pune which allows farmers to sell fresh produce directly to the customers, cutting out middlemen in the process. This allows customers to buy farm fresh goods at affordable rates, while the farmers who grow the produce get a fair price for it.</p>
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


    </div>
  </div>

    <Footer/>
  </div>
  )
}

export default Home