import "./alert.css"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function ActionAlerts(props) {

   


  return (
     <>
        <Stack sx={{ width: '100%' }} spacing={2}>
         <Alert  onClose={props.clicked}>Your Order as been placed succesfully</Alert>
    </Stack>
    </>
  );
}

