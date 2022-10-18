import React from 'react'

const Stall = ({data , handleClick , bookedStalls}) => {

  return (
        <div className='Stalls_info'>
        {
            data.map((e,i)=>{
                const { stallName , isBooked , _id , stallPrice } = e;
                const isSelected = bookedStalls.some(e=>e._id === _id)
                let stallClass;
                if(isBooked === true)
                {
                    stallClass = "booked";
                }else
                {
                    stallClass = "available"
                }
                
                if(isSelected && !isBooked){
                    stallClass = "selected"
                }
            
                return(
                    <div onClick={handleClick} className={stallClass} id={_id} key={i}>{stallName}<br/>Rs.{stallPrice}</div>
                )
            })
        }
        </div>
  )
}

export default Stall