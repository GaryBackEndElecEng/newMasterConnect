import React, { useEffect, useContext, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Stack, Container, Box, Avatar, Card, CardContent, Typography, Paper, Grid, } from '@mui/material';
import styled from 'styled-components';
import styles from './design9.module.css'
import { useTheme } from '@mui/material/styles';

const CustomeContainer = styled(Container)`
margin:auto;
animation:slideDown 7s ease-in-out;
transform:translate(-20%,100%);


@keyframes slideDown {
    from {opacity: 0; transform:translate(40%,-100%);}
    50% {opacity: 1; transform:translate(40%,100%);}
    to{opacity: 1; transform:translate(-20%,100%);}
}
@media screen and (max-width:900px){
    transform:translate(-0%,100%);
    @keyframes slideDown {
        from {opacity: 0; transform:translate(0%,-100%) rotate(90deg);}
        50% {opacity: 1; transform:translate(0%,100%) rotate(0deg);}
        to{opacity: 1; transform:translate(-0%,100%);}
    }
}
@media screen and (max-width:600px){
        transform:translate(0%,3.5%);
        padding:1rem;
        @keyframes slideDown {
            from {opacity: 0; transform:translate(0%,-100%) rotate(90deg);}
            50% {opacity: 1; transform:translate(0%,3.5%) rotate(0deg);}
            to{opacity: 1; transform:translate(0%,3.5%);}
        }
}
`;
const ShowMessage = styled(Paper)`
animation:reveal 1.5s ease-in-out;
@keyframes reveal {
    from {opacity: 0;}
    to {opacity: 1;}
}

`;
const SalePerson = () => {
    const theme=useTheme();
    const { staticImage } = useContext(GeneralContext);
    const [showMessage,setShowMessage]=useState(false);
    const generalBuisnessMan = `${staticImage}/businessMan.png`;

    useEffect(()=>{
        setTimeout(()=>{
            setShowMessage(true);
        },6000)
    },[]);
    return (
        <CustomeContainer maxWidth="lg">
            <Grid container spacing={{ sx: 0, sm: 1, md: 1 }}>
                <Grid item xs={12}  md={8}>
                    <Card elevation={10}
                        sx={{ display: "flex", justifyContent: "center", alignItems:{xs:"center",sm: "flex-start"}, padding: "1rem",flexDirection:{xs:"column",sm:"row"},background:theme.palette.common.blueFade,color:theme.palette.common.lighter }}
                    >
                        <Avatar src={generalBuisnessMan} alt="www.master-connect.ca"
                            sx={{ width:{xs:"85%",sm:"35%",md:"45%"}, height: {xs:"85%",sm:"35%",md:"45%"}, mr: 2 ,padding:{md:"0.25rem"},borderRadius:"15%"}}
                        />
                        <Stack direction="column" sx={{padding:"1rem"}}>
                            <Typography component="h1" variant="h4"> Francois Brunet</Typography>
                            <Typography component="h1" variant="h6"> particulars:</Typography>
                            <Stack direction={{xs:"column",sm:"row"}} sx={{ alignItems: "flex-start" }} spacing={1}>
                                <Typography component="h1" variant="h6"> 101 Bonaventure,Montreal</Typography>
                                <Typography component="h1" variant="h6"> Quebec,Ca</Typography>
                            </Stack>
                            <Typography component="h1" variant="h6"> Communications:</Typography>
                            <Stack direction={{xs:"column",sm:"row"}} sx={{ alignItems: "flex-start" }} spacing={1}>
                                <Typography component="h1" variant="h6"> C:123.456.7891</Typography>
                                <Typography component="h1" variant="h6"> e.francoisbrunet@realtors.ca</Typography>
                            </Stack>

                        </Stack>

                    </Card>
                </Grid>
                <Grid item xs={12}  md={4} sx={{minHeight:{sm:"12vh",md:"17vh",xs:"30vh"},margin:{xs:"0.5rem auto",sm:"0.5rem auto"}}}>
                    {showMessage && <ShowMessage elevation={10} sx={{background:theme.palette.common.orangeFade2,color:"white"}}>
                        <Stack direction="column">
                            <Typography component="h1" variant="h6" sx={{padding:"1rem"}}>
                                The client can put a mission statement here to reflect his/hers competence of getting the job done! All colors and format can be changed to reflect the client's preference.
                            </Typography>
                        </Stack>
                    </ShowMessage>}
                </Grid>
            </Grid>

        </CustomeContainer>
    )
}

export default SalePerson