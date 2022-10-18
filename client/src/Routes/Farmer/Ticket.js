import React from "react";
import './Ticket.css'
import { PDFDownloadLink} from '@react-pdf/renderer';
import MyDoc from "../../components/MyDoc";

function Ticket ({bookingDetails}) {
    const {BookedStalls} = bookingDetails;
    const strBookedStalls = BookedStalls.toString()
    return (
        <>
        {bookingDetails ? <div className="invoice-box">
            <h2 className="thanks">Stall booking details</h2>
            <br/>
            <div className="invoice_details">
                <div>Farmer Name : {bookingDetails.farmer}</div>
                <br/>
                <div>Phone : {bookingDetails.phone}</div>
                <br/>
                <div>Address : {bookingDetails.stallAddress}</div>
                <br/>
                <div>Date and Time :08/05/22</div>
                <br/>
                <div>Payment Details : {bookingDetails.paymentDetails}</div>
                <br/>
                <div>Total Amount : {bookingDetails.totalAmount}</div>
                <br/>
                <div>Total no. of Stalls booked: {bookingDetails.stallsBooked}</div>
                <br/>
                <div>Stalls Booked : {strBookedStalls}</div>
            </div>
            <h2 className="thanks">Thank You !</h2>
            {/* <PDFDownloadLink document={<MyDoc bookingDetails={bookingDetails}/>} fileName="stallbookingdetails.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink> */}
        </div> : <h2>Loading...</h2>}
        </> 
     );
}

export default Ticket  ;