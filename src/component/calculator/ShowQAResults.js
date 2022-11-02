import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Container, Stack, Grid, Typography, Paper } from '@mui/material';
import api from '../axios/api';


const ShowResultsMain = styled(Container)`
margin:2rem auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
max-height:50vh;
overflow-y:scroll;
background:${({bg})=>bg};
animation:appearIn 1s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const CustomGrid=styled(Grid)`

display:flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:row;
color:white;
background:${({bg1})=>bg1};
box-shadow:1px 1px 5px 2px ${({bs})=>bs};
@media screen and (max-width:900px){
    flex-direction:column;
}

`;
const ShowQAResults = () => {
    const theme = useTheme();
    const { userSelectionArray } = useContext(GeneralContext);
    const [sent,setSent]=useState(false)
    useEffect(()=>{
const sendInfo = async ()=>{
    try {
        const res= await api.post('/postCalculatorResults/',userSelectionArray);
        const body = res.data;
        setSent(true);
    } catch (error) {
        console.error(error.message)
    }
}
if(userSelectionArray){
    sendInfo();
}
    },[]);
    return (
        <ShowResultsMain 
        maxWidth="xl"
        sx={{maxHeight:"50vh",
        overflowY:"scroll",
        }}
        >
            <Typography component="h1" variant="h3" sx={{margin:"2rem auto",textAlign:"center",}}>Results</Typography>
            <Grid container spacing={{ xs: 1, sm: 2,md:3}}>
            
                {userSelectionArray && userSelectionArray.map((obj,index) => (
                    <CustomGrid item xs={12} sm={6} md={4}
                    bs={theme.palette.common.mediumBlue2}
                     key={`${index}-Results-${obj.id}`}
                     sx={{background:theme.palette.common.blueGrey,
                    boxShadow:`1px 1px 5px 2px ${theme.palette.common.blueFade}`,
                    color:"white", paddingdisplay:"flex",flexDirection:"column"
                    }}
                    >
                        <Stack direction="column" spacing={{xs:0,sm:1,md:2}} sx={{margin:"auto"}}>
                        <Paper elevation={3} sx={{textAlign:"center"}}><Typography component="h1" variant="h5" sx={{padding:"0.5rem"}}>Question</Typography></Paper>
                        <Typography component="h1" variant="h6" sx={{padding:"0.5rem"}}>{obj.Q}</Typography>
                        </Stack>
                        <Stack direction="column" spacing={{xs:0,sm:1,md:2}} sx={{margin:"auto"}}>
                        <Paper elevation={3} sx={{textAlign:"center"}}><Typography component="h1" variant="h5" sx={{padding:"0.5rem"}}>answer</Typography></Paper>
                        <Typography component="h1" variant="h6" sx={{padding:"0.5rem"}}>{obj.ans}</Typography>
                        </Stack>
                    </CustomGrid>

                ))}
            </Grid>

        </ShowResultsMain>
    )
}

export default ShowQAResults