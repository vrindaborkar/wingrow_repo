import React , {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import './CustomerHome.css';

const CustomersHome = ({places , setId}) => {
    const [place, setplace] = useState();

    useEffect(() => {
      setplace(places)
    }, [places])

    
  return (
    <>
    {place && place.length !== 0 && <div className='customerhome_component'>
        <img alt="Lifestyle Exhibition" className="img-responsive" src="./images/5.jpg" width="90%"/>
        <h2 className='places_header'>Select market in pune!</h2>
        <div className='places_container'>
            {
                place && place.map((e,i)=>{
                    return(
                        <Link key={i} onClick={()=>setId(e)} to="./productspage" className='places_card'>
                            <span className='places_cards_content'>Stalls in<br/>{e}</span>
                        </Link>
                    )
                })
            }
        </div>
    </div>}
    {place && place.length === 0 && <div className='customerhome_component'>
        <img alt="Lifestyle Exhibition" className="img-responsive" src="./images/5.jpg" width="90%"/>
        <h2 className='places_header'>Select market in pune!</h2>
        <div className='places_container'>
            <h2>No markets available</h2>
        </div>
    </div>}
    {place === undefined && <Spinner/>}
    </>
  )
}

export default CustomersHome