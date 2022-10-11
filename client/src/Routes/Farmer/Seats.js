import React from 'react';
import classes from './BookMySeats.module.css';
import shortid from 'shortid';

const Seats = (props) => {
    return (
      <div className={classes.section}>
          {props.values.map((seat,i) => {
              let isEmpty;
              if(seat === " "){
                isEmpty = true;
              }else{
                isEmpty = false;
              }
              const isAvailable = props.availableSeats.includes(seat);
              const isBooked = props.bookedSeats.includes(seat);
              let seatClass;
                if(!isAvailable) {
                seatClass = classes.disabled;
                }
                if(isBooked) {
                    seatClass = classes.booked;
                }
                if(isEmpty)
                {
                    seatClass = classes.empty
                }
              return <div key={shortid.generate()} className={seatClass} onClick={props.addSeat}>{seat}</div>;
          })}
      </div>
    );
}
export default Seats;