import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    display:"flex",
    flexDirection: 'column',
    justifyContent:"flex-start",
    alignItems:"center",
    padding:10,
  },
  section1: {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    fontSize:15,
    width:"80%",
    flex:'1',
    height:"300px"
  },
  section2: {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    fontSize:15,
    width:"80%",
    height:"200px"
  },
  head:{
    height:"50px",
    width:"80%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderBottom:"1px black solid"
  }

});

// Create Document Component
const MyDoc = ({bookingDetails}) => (
  <Document>
    <Page size="A3" style={styles.page}>
      <View style={styles.head}>
        <Text>Stall Details</Text>
      </View>
      <View style={styles.section1}>
        <Text>Farmer Name : {bookingDetails.farmer}</Text>
        <Text>Phone : {bookingDetails.phone}</Text>
        <Text>Farmer Market Address : {bookingDetails.stallAddress}</Text>
        <Text>Date and Timing of Market :08/05/22</Text>
        <Text>Payment Details : {bookingDetails.paymentDetails}</Text>
        <Text>Stall fare : {bookingDetails.Stallfare}</Text>
      </View>
      <View style={styles.head}>
      <Text>Thank you !</Text>
    </View>
      <view style={styles.section2}>
        <Text>Wingrow Agritech GST Details:GSTIN: 27AACCW0275G1ZD</Text>
        <Text>Wingrow Agritech Producer Company Ltd</Text>
        <Text>Sn 637, b/2,Omkarnagar, PMT Colony, Pokale Wasti, Bibwewadi, Pune - 411037 </Text>
        <Text>Email:connect@wingrowagritech.com </Text>
        <Text> Contact: +917776003700</Text>
      </view>
    </Page>
  </Document>
);

export default MyDoc;                   
