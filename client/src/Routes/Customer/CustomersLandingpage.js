import React from 'react'
import { Link } from 'react-router-dom'
import './Customer.css'

const CustomersLandingpage = () => {
  return (
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

    </div>
  )
}

export default CustomersLandingpage