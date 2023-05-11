import React from 'react';
import { Stack, Container, Grid, Button, Divider ,Avatar} from '@mui/material';
import styled from 'styled-components';
import styles from './design11.module.css'

const CustNavContainer=styled(Container)`
margin:auto;
margin-top:2rem;
padding-inline:1rem;
margin-bottom:4rem;
// border:1px solid red;
@media screen and (max-width:900px){
    background-position:50% 50%;
    background-size:100% 100%;
    background-image:url(${({bgimage})=>bgimage});
    padding-inline:1rem;
}
@media screen and (max-width:600px){

}
`;

const NavContainer = ({menu,logo}) => {
  return (
    <CustNavContainer maxWidth="xl" 
    className={styles.custNavContainer}
    bgimage={menu}
    >
                <Divider sx={{ marginBottom: "1rem", color: { xs: "white", md: "black" }, border: { md: `2px solid black`, xs: "2px solid white" } }} />
                <Grid container spacing={{ xs: 1, sm: 2 }}
                sx={{position:"relative"}}
                >
                   
                    <Grid item xs={12} sm={8}>
                    <Stack direction="row" spacing={5} sx={{justifyContent:"flex-start",alignItems:"center",background:{xs:"rgba(0,0,0,.5)",md:"none"}}}>
                    <Avatar src={logo} alt="www.masterconnect.ca" className={styles.logo} variant="square"/>
                        <Stack direction="row" spacing={1} sx={{ flex: "6", color: { xs: "white", md: "black" } }}>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> Menu</Button>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> Register</Button>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> Extras</Button>
                        </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack direction="row" spacing={1} sx={{ flex: "6",background:{xs:"rgba(0,0,0,.5)",md:"none"} }}>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> log-in</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ marginBottom: "2rem", color: { xs: "white", md: "black" }, border: { md: `2px solid black`, xs: "2px solid white" } }} />
            </CustNavContainer>
  )
}

export default NavContainer