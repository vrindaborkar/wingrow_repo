import React from "react";
import './Ticket.css'
import { PDFDownloadLink} from '@react-pdf/renderer';
import MyDoc from "../../components/MyDoc";

function Ticket ({bookingDetails}) {
    return (
        <>
        {bookingDetails ? <div className="invoice-box">
            <h2 className="thanks">Stall booking details</h2>
            <div className="invoice_details">
                <div>Farmer Name : {bookingDetails.farmer}</div>
                <div>Phone : {bookingDetails.phone}</div>
                <div>Farmer Market Address : {bookingDetails.stallAddress}</div>
                <div>Date and Timing of Market :08/05/22</div>
                <div>Payment Details : {bookingDetails.paymentDetails}</div>
                <div>Total no. of Stalls : {bookingDetails.BookedStalls.length}</div>
                <div>Stall fare : {bookingDetails.Stallfare}</div>
            </div>
            <h2 className="thanks">Thank You !</h2>
            <PDFDownloadLink document={<MyDoc bookingDetails={bookingDetails}/>} fileName="stallbookingdetails.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div> : <h2>Loading...</h2>}
        </> 
     );
}

export default Ticket  ;