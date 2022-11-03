import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';

const Card = ({header , value }) => {
  return(
    <div className='card_layout'>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {header}
        </Typography>
        <Typography variant="h5" component="div">
          <b>{value}</b>
        </Typography>
      </CardContent>
    </div>
  )
};

export default Card;