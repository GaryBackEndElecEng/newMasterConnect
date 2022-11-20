import React from 'react'
import {  Stack, Container, Divider, Typography } from '@mui/material';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { theme } from '../../context/theme';
import styled from 'styled-components';
import styles from './design3.module.css';

const CustTitleContainer= styled(Container)`
marginTop:0.5rem;
width:100%;
box-shadow:1px 2px 10px 10px white;
`;

const Titlebar = () => {
    return (
        <CustTitleContainer maxWidth="lg" sx={{marginTop:{xs:"1rem",sm:"0.5rem"}}}>
            <Stack direction="row" sx={{color:"white", columnGap:"20px",alignItems:"center"}}>
                <StarPurple500Icon sx={{ color: "white" ,fontSize:"50px"}} />
                <Divider  sx={{ color:"white",borderBottom: "2px solid red",width:"20vw"}}/>
                <Stack direction={{xs:"column",sm:"row"}} spacing={2} sx={{ borderBox:"1px solid red",background:"rgba(255,255,255,.2)",padding:"0.5rem 1rem" ,position:"relative"}}>
                    <Typography component="h1" variant="h5" className={styles.home}
                     sx={{cursor:"pointer",
                     "&:hover":{color:theme.palette.secondary.main},fontSize:{xs:"18px",sm:"auto"},
                     
                     }}>HOME</Typography>
                    <Typography component="h1" variant="h5" className={styles.destination}
                     sx={{cursor:"pointer",
                     "&:hover":{color:theme.palette.secondary.main},fontSize:{xs:"18px",sm:"auto"},
                     
                     }}>DESTINATION</Typography>
                    <Typography component="h1" variant="h5" className={styles.technology} 
                    sx={{cursor:"pointer",
                    "&:hover":{color:theme.palette.secondary.main},fontSize:{xs:"18px",sm:"auto"},
                    
                    }}>TECHNOLOGY</Typography>
                </Stack>

            </Stack>
        </CustTitleContainer>
    )
}

export default Titlebar