import React, { useEffect, useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container, Paper, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import PolicyHelmet from './PolicyHelmet';

const MainPrivacy = styled(Container)`
margin:1rem auto;
margin-top:4rem;
animation: showContent 1.5s ease-in-out;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:600px){
margin-top:-50px;
}
@keyframes showContent {
    from {opacity:0;}
    to {opacity:1;}
}


`;
const Privacy = () => {
    const {privacy,setTitle,setStyleName}=useContext(GeneralContext);

    useEffect(()=>{
        if(window.scrollY){
            window.scroll(0,0);
          }
          setTitle("Privacy Policy")
          setStyleName("Privacy")
    },[]);
    
  return (
    <MainPrivacy>
        <PolicyHelmet/>
        <Paper elevation={10}
                sx={{ margin: { xs: "auto", sm: "auto" }, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: { xs: "0.25rem " },width:"100%", }}
            >
                {privacy.loaded && privacy.data.map(obj => (
                    <Stack spacing={{ xs: 0, sm: 1, md: 2 }} key={obj.id} sx={{ padding: { xs: "0rem  ", sm: "0.5rem" }, margin: "auto",textAlign:"center",width:"100%"  }}>
                        
                        <Typography component='h1' variant="h3" sx={{ margin: "2rem auto", textAlign: "center",fontWeight:"bold", }}>
                            {obj.title}
                        </Typography>
                        <Typography component='h1' variant="h6" sx={{ margin: "2rem auto", padding: { xs: " 0rem 0.5rem" } }}>
                            {obj.sectionTitle}
                        </Typography>
                        <Typography component='h1' variant="body1" sx={{ margin: "1rem auto", }}>
                            {obj.content && obj.content}
                        </Typography>
                        <Typography component='h1' variant="body1" sx={{ margin: "1rem auto", textAlign: "center", }}>
                            {obj.content1}
                        </Typography>
                        <Typography component='h1' variant="body1" sx={{ margin: "1rem auto", textAlign: "center", }}>
                            {obj.content2}
                        </Typography>
                        <Typography component='h1' variant="body1" sx={{ margin: "1rem auto", textAlign: "center", }}>
                            {obj.content3}
                        </Typography>

                        
                    </Stack>
                ))}

            </Paper>

    </MainPrivacy>
  )
}

export default Privacy