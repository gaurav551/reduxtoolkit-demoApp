import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../features/alertModal/alertModalSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 560,
  boxShadow: 24,
  padding : 0,

};

export default function BasicModal(props) {
  const dispatch = useDispatch()

  const alertModal = useSelector((state) => state.alertModal)
 
  const{isOpen,type,message,linkText,link} = alertModal;




  return (
    <div>
      <Modal
        open={isOpen}
        onClose={()=>dispatch(hideModal())}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Alert severity={type}> <p>{message}</p>  
        
        
       {link!==null && linkText!==null &&  <p className='text-center'><Link onClick={()=>dispatch(hideModal())} style={{color:COLORS.primary}} to={link}>Go to {linkText}</Link></p> } 

         </Alert>
        </Box>
      </Modal>
    </div>
  );
}
