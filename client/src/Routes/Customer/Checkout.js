import React,{useContext} from 'react'
import productContext from '../../cartContext/ProductContext';
import './Cartpage.css'
import CheckoutItems from './CheckoutItems';


const Checkout = () => {
  const { cartsData , Counter , Itemcount} = useContext(productContext);


  var result = cartsData.reduce((acc, obj) => { 
    const val = Object.keys(Counter);
    const value = val.filter(e => e === obj._id);
    const data = Counter[value]
    return acc + (obj.purchase_rate * data)} , 0);

  return (
    <div className='checkout_main'>
        <h2>Checkout</h2>
        <div className='checkout_container'/>
            <CheckoutItems cartsData={cartsData} Counter={Counter}/>
        <div/>
        <div>
            <h2>
              Total items : {Itemcount}
            </h2>
            <h2>
              Total Amount : {result}
            </h2>
        </div>
        <button>Proceed to payment</button>
    </div>
  )
}

export default Checkout