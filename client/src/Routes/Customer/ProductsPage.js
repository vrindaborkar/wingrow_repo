import React, {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import './Productspage.css'

const ProductsPage = ({Data}) => {
  const [StallsData, setStallsData] = useState()

  useEffect(() => {
    Data && setStallsData(Data)
  }, [Data])
  
  const handleClick = () => {
    alert("added to cart")
  }

  return (
    <div className='products_page'>
      <div className='products_head'>
        <Link className='head_products' to={`../productspage`}>Items</Link>
        <Link className='head_products' to="../cartspage">Cart</Link>
      </div>
      <div className='products_container'>
        { StallsData && StallsData.length!==0 &&
          StallsData.map((e,i)=>{
            return(
              <div key={i} className='products'>
                <img className='img_products' alt='gift' src='https://tse2.mm.bing.net/th?id=OIP.iwB5ZHEBW7HiLsUfb4BYzwHaHa&pid=Api&P=0'/>
                <span className='content_product'>Market : {e.market}</span>
                <span className='content_product'>Commodity : {e.commodity}</span>
                <span className='content_product'>Price : {e.purchase_rate} / kg</span>
                <button onClick={handleClick} className='add_product'>Add to cart</button>
              </div>
            )
          })
        }
        { StallsData && StallsData.length === 0 &&
          <div className='products_container'>
            No StallsData available
          </div>
        }
        { !StallsData &&
          <Spinner/>
        }
      </div>
    </div>
  )
}

export default ProductsPage