import React, { useContext }  from 'react';
import ProductContext from '../../cartContext/ProductContext';
import Spinner from '../../components/Spinner';
import './CustomerHome.css';
import Dropdownplaces from './DropdownPlaces';
import ProductsPage from './ProductsPage';

const CustomersHome = () => {  
  const {places} = useContext(ProductContext)
  return (
    <>
    {places && places.length !== 0 && <div className='customerhome_component'>
        <img alt="Lifestyle Exhibition" className="img-responsive" src="../images/5.jpg" width="80%"/>
        <h2 className='places_header'>Select market in pune!</h2>
        <Dropdownplaces/>
        <ProductsPage/>
    </div>}
    {!places && <Spinner/>}
    </>
  )
}

export default CustomersHome