import React  from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import './Cartpage.css'

const Cartspage = ({Itemcount , cartsData , Counter}) => {

  return (
    <div className='carts_page'>
      <div className='carts_head'>
        <Link className='head_carts' to="../productspage">Items</Link>
        <Link className='head_carts' to="../cartspage">Cart {Itemcount}</Link>
      </div>
      <div className='carts_container'>
      { cartsData && cartsData.length!==0 &&
          <CartItem cartsData={cartsData} Counter={Counter}/>
        }
        { cartsData && cartsData.length === 0 &&
          <div className='products_container'>
            Cart is empty!!
          </div>
        }
        { !cartsData &&
          <div className='products_container'>
          Cart is empty!!
        </div>
        }
      </div>
      {cartsData && cartsData.length !==0? <button>...Proceed to checkout...</button>:<></>}
    </div>
  )
}

export default Cartspage