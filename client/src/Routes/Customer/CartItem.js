import React from 'react'

const CartItem = ({cartsData , Counter}) => {
  return(
    cartsData.map((e)=>{
        const Counterid = Counter[e._id]
        return(
          <div key={e._id} className='products'>
            <img className='img_products' alt='gift' src='https://tse2.mm.bing.net/th?id=OIP.iwB5ZHEBW7HiLsUfb4BYzwHaHa&pid=Api&P=0'/>
            <span className='content_product'>Market : {e.market}</span>
            <span className='content_product'>Commodity : {e.commodity}</span>
            <span className='content_product'>Price : {e.purchase_rate} / kg</span>
            <span className='content_product'>
              <span>
                <button>----</button>
                <span>  {Counterid}  </span>
                <button>++</button>
              </span>
              <button>Remove Item</button>
            </span>
          </div>
        )
      })
  )
}

export default CartItem