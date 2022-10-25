import React, { useContext } from 'react'
import ProductContext from '../../cartContext/ProductContext'

const CartItem = () => {
const {cartsData , Counter , setcartsData , setItemcount , setCounter , Itemcount} = useContext(ProductContext)

  const handleRemove = (ev) => {
    const id = ev.target.id; 
    const data = cartsData.filter(e => e._id !== `${id}`)
    setcartsData(data)
    setItemcount(prev => prev - Counter[id])
          setCounter((prev)=>{
            return{
              ...prev,
              [id]: 0
            }
          })
    alert("item removed successfully")
  }

  const handleInCounter = (ev) => {
    const id = ev.target.id
      setItemcount(prev => prev + 1)
      setCounter((prev)=>{
        return{
          ...prev,
          [id]: prev[id]+1
        }
      })
  }

  const handleDeCounter = (ev) => {
    const id = ev.target.id

    if(Counter[id] === 1){
      const data = cartsData.filter(e => e._id !== `${id}`)
      setItemcount(prev => prev - 1)
      setcartsData(data)
      return;
    }
    if(Counter[id] === 1 && Itemcount === 1){
      console.log("hii")
      const data = cartsData.filter(e => e._id !== `${id}`)
      setItemcount(0)
      setcartsData(data)
      return;
    }
      setItemcount(prev => prev - 1)
      setCounter((prev)=>{
        return{
          ...prev,
          [id]: prev[id]-1
        }
      })
  }

  return(
    <>
    {cartsData && cartsData.length !== 0 && cartsData.map((e)=>{
        const Counterid = Counter[e._id]
        return(
          <div key={e._id} className='products'>
            <img className='img_products' alt='gift' src='https://tse2.mm.bing.net/th?id=OIP.iwB5ZHEBW7HiLsUfb4BYzwHaHa&pid=Api&P=0'/>
            <span className='content_product'>Market : {e.market}</span>
            <span className='content_product'>Commodity : {e.commodity}</span>
            <span className='content_product'>Price : {e.purchase_rate} / kg</span>
            <span className='content_product'>
              <span>
                <button id={e._id} onClick={handleDeCounter}>----</button>
                <span>  {Counterid}  </span>
                <button id={e._id} onClick={handleInCounter}>++</button>
              </span>
              <button id={e._id} onClick={handleRemove}>Remove Item</button>
            </span>
          </div>
        )
      })}
      </>
  )
}

export default CartItem