import React ,{useState,useEffect}from 'react'
import '../styles/Home.css'
import Location from '../components/Location';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
import useWindowDimensions from '../components/useWindowDimensions'
import Slider from '../components/Slider';

const Home = () => {
  const [mobile, setmobile] = useState(false)
  useEffect(() => {
    AOS.init({
      once:true
    });
  }, [])

  const {width} = useWindowDimensions()
  
  useEffect(() => {
    if(width<800){
      setmobile(true)
    }else{
      setmobile(false)
    }
  }, [width])


  return (
    <div className='home_container'>
      <div className='first_section'>
        <div className='first_section_component'>
          <h2 className='first_section_header'>
            <span  data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine"  className='first_section_text'>
              Revolutionizing the stall
            </span>
            <span  data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine"  className='first_section_text'>
              Booking for direct sell
            </span>
              <img alt='logo' data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine"  className='first_section_btn' src='./images/imgbook.jpeg'/>
          </h2>
        </div>
      </div>

      {!mobile?
      <div className='second_section_wrapper'>
        <div className='second_section_aboutus'>
            <h2 className='h2_style'>About Us</h2>
            <p className='p_style'>We at Wingrow Agritech facilitate direct interaction between consumers and farmers. Consumers get access to produce direct from farms which is much fresher and lasts longer, at reasonable prices.</p>
          </div>
          <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/28.png' alt='img' className='second_section_img'/>
            </div>

              <div data-aos="fade-down" className='second_section_component_arrow'>
                <img src='https://cdn-icons-png.flaticon.com/512/664/664866.png' alt='img' className='second_section_img'/>
              </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/29.png' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
            <img src='https://cdn-icons-png.flaticon.com/512/3183/3183354.png' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/30.png' alt='img' className='second_section_img'/>
            </div>
        </div>
        </div>
        :
        <div className='second_section_wrapper'>
          <div className='second_section_aboutus'>
            <h2 className='h2_style'>About Us</h2>
            <p className='p_style'>We at Wingrow Agritech facilitate direct interaction between consumers and farmers. Consumers get access to produce direct from farms which is much fresher and lasts longer, at reasonable prices.</p>
          </div>
        <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/28.png' alt='img' className='second_section_img'/>
            </div>

              <div data-aos="fade-down" className='second_section_component_arrow'>
                <img src='https://cdn-icons-png.flaticon.com/512/545/545678.png ' alt='img' className='second_section_img'/>
              </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/29.png' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/30.png' alt='img' className='second_section_img'/>
            </div>
        </div>
        </div>
      }
      <div className='third_section'>
          <div className="title_info">
            <h1>OUR MARKETS</h1>
            <p style={{fontSize:"1.2rem" , textAlign:"start"}}>We organize weekly markets at key locations in Pune which allows farmers to sell fresh produce directly to the customers, cutting out middlemen in the process. This allows customers to buy farm fresh goods at affordable rates, while the farmers who grow the produce get a fair price for it.</p>
          </div>
          <div className='location_component'>
              <Location/>
          </div>
          <h2 className='headers_section'>Gallery</h2> 
          <div className='fourth_section'>
            <Slider/>
          </div>
          <Footer/>
        </div>
      </div>  
    )
}

export default Home