import React, { useContext,useState  } from 'react'
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Container, Paper, Typography,  Fab,} from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SitePreferenceForm from './SitePreferenceForm';
import PsychologyIcon from '@mui/icons-material/Psychology';


const ShowInfo = () => {
    const theme= useTheme();
    const {setFormComplete,sentToServer}=useContext(TokenAccessContext);
    const [openSitePreferenceForm,setOpenSitePreferenceForm]=useState(false);

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
        <Stack direction="column" sx={{alignItems:"center",justifyContent:"center"}}>
        <Fab variant="extended" color={"secondary"} sx={{margin:"1rem auto"}} onClick={(e)=>handleChange(e)}>
            Need to change your Particulars? ? <PermIdentityIcon sx={{ml:2, color:"white"}}/>
        </Fab>
        { !sentToServer ?
            <Fab variant="extended" color="primary" size="large" onClick={()=>setOpenSitePreferenceForm(true)}>
                site preference <PsychologyIcon sx={{ml:1,color:"red"}}/>
            </Fab>
        :
            <Typography component="h1"  variant="h4"> Thank for sending your site preference form to us. This will help us get it right the first time around.</Typography>
        }
        {(openSitePreferenceForm && !sentToServer) && <SitePreferenceForm/>}
        </Stack>
    </Container>
  )
}

export default ShowInfo