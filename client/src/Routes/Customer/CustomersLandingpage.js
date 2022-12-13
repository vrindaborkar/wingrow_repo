import React, { startTransition } from 'react';
import {FaStar} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Customer.css';

function CustomersLandingpage() {

const stars = Array(5).fill(0);
const [currentValue, setCurrentValue] = React.useState(0);
const [hoverValue, setHoverValue] = React.useState(undefined);
const [fb,setFb]=React.useState('');
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
  
};


const handleclick = (e,value) =>{
  e.preventDefault()
  console.log(value)
  setCurrentValue(value)
}
const handleMouseOver = (e,value) => {
  e.preventDefault()
  console.log(value)
  setHoverValue(value)
}
const handleMouseLeave = (e) => {
  e.preventDefault()
  setHoverValue(undefined)
}

const handleText = (e) => {
  e.preventDefault()
  console.log(e.target.value)
  setFb(e.target.value)
}
const handleSubmit = (e,index,fb) => {
  e.preventDefault()
  console.log(index,fb)
}

// const CustomersLandingpage = () => {
  return (
    <form onSubmit={(e)=>handleSubmit(e,currentValue,fb)}>
    <div className='customers_landing_page'>
      <h2 className='customers_landing_header'>Welcome to wingrow shop!!</h2>
      <div className='customers_links_wrapper'>
        <Link className='links_customers' to="./customersnacks">Buy Snacks</Link>
        <Link className='links_customers' to="./customerhome">Buy fruits and vegetables</Link>
      </div>
      <div className='customers_links_wrapper'>
        <a   href= {'tel:+91'+ 7776003700}  >
          <button   className='links_customers' id="bt" >Contact to Owner</button> 
        </a>
      </div>
      {/* <div className='customers_links_wrapper'>
        <Link className='links_customers' to="./feedback">Feedback</Link>
      </div> */}

      <div className='feedback'>
        <h2 className='feedback_heading'>Feedback</h2>
        <div>
          {stars.map((_, index) => {
            return (
              <FaStar 
              key={index}
              size={24}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
              color ={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                
              onClick ={(e) => handleclick(e,index + 1)}
              onMouseOver ={(e) => handleMouseOver(e,index + 1)}
              onMouseLeave = {handleMouseLeave}
              />
            )
          })}
        </div>
        <div>
          <textarea className='textarea'
          placeholder='Whats your feedback ?'
          rows="4" cols="50" 
          onChange={(e)=>handleText(e)}
        
          />

        </div>
        <button className='submit' >Submit</button>

      </div>

    </div>
    </form>
  )
}

export default CustomersLandingpage