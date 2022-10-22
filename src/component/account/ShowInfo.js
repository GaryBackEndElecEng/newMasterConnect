import React, { useContext,  } from 'react'
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Container, Paper, Typography,  Fab,} from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import styles from './account.module.css';


const ShowInfo = () => {
    const theme= useTheme();
    const {setFormComplete}=useContext(TokenAccessContext);

    const handleChange = (e)=>{
        e.preventDefault();
        setFormComplete(false);
        localStorage.setItem("formComplete",false)
    }
  return (
    <Container maxWidth="md" sx={{textAlign:"center",position:"relative"}}>
        <Stack direction="column" 
        sx={{margin:"1rem auto",display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"Roboto",width:"calc(100%-50px)"}}>
            <Paper elevation={10} sx={{background:theme.palette.common.background2,margin:"1rem auto",color:"white",padding:"1rem"}}>
                <Typography component="h1" variant="h4">Thank you</Typography>
                <Typography component="h1" variant="body1">for completing the information</Typography>
            </Paper>
            <Paper elevation={10} sx={{background:theme.palette.common.background2,margin:"1rem auto",color:"white",padding:"1rem"}}>
                <Typography component="h1" variant="h6">Below:</Typography>
                <Typography component="h1" variant="body1">Are the Products and Services you can choose from.
                </Typography>
                <Typography component="h1" variant="h6">Next Step:</Typography>
                <Typography component="h1" variant="body1">Select the product(s) and starting services you want.If you are comfortable proceeding then you can can click to purchase or hold for consultation, by clicking on consult and we will call you.
                </Typography>
            </Paper>
        </Stack>
        <Fab variant="extended" color={"secondary"} sx={{margin:"1rem auto"}} onClick={(e)=>handleChange(e)}>
            Need to change your Particulars? ? <PermIdentityIcon sx={{ml:2, color:"white"}}/>
        </Fab>
    </Container>
  )
}

export default ShowInfo