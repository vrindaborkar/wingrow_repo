import React  from 'react'
import { Link } from 'react-router-dom'
import './Cartpage.css'

const Cartspage = () => {
  return (
    <div className='carts_page'>
      <div className='carts_head'>
        <Link className='head_carts' to="../productspage">Items</Link>
        <Link className='head_carts' to="../cartspage">Cart</Link>
      </div>
      <div className='carts_container'>
        hello
      </div>
    </div>
  )
}

export default Cartspage