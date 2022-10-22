import React from 'react';
import { Link } from 'react-router-dom';
import './CustomerHome.css';

const data = ["hadapsar" , "amanora" , "bhosari" , "pimpri" , "chakan" , "ravet"] 

const CustomersHome = () => {
  return (
    <div className='customerhome_component'>
        <img alt="Lifestyle Exhibition" class="img-responsive" src="./images/5.jpg" width="90%"/>
       
        <h2 className='places_header'>Select market in pune!</h2>

        <div className='places_container'>
            {
                data.map((e,i)=>{
                    return(
                        <Link to={`./productspage`} className='places_card'>
                            <span className='places_cards_content'>Stalls in<br/>{e}</span>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default CustomersHome