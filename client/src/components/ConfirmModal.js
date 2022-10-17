import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({confirmBooking}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Book Seats</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}>
            <h3>Terms and conditions</h3>
            <br/>
            <p>vawkfuhfioahfowihfawiofhwoh</p>
            <br/>
            <p>vawkfuhfioahfowihfawiofhwoh</p>
            <br/>
            <p>vawkfuhfioahfowihfawiofhwoh</p>
            <br/>
            <p>vawkfuhfioahfowihfawiofhwoh</p>
            <br/>
            <Button onClick={()=>{confirmBooking(); handleClose()}}>Confirm Booking</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
