import React, { useContext, useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Stack,  Typography, Grid, Container,  Card, CardMedia, CardContent } from '@mui/material';
import Styles from './wedding.module.css';

const CustCardTable = styled.div.attrs({ className: "custCardTable" })`
position:relative;
margin-top:0rem;
width:100vw;
height:auto;
opacity:${({open})=> open ? "1":"0"};
background:${({open2,bg})=>open2 ? "transparent":bg};
transition:background 1.5s ease-in-out;
margin:0;padding:0;
// border:1px solid red;
z-index:1;
animation: ${({open})=>open ? "growUp":""} 1.25s ease-in-out;
@keyframes growUp {
    from {opacity:0; transform:translateY(30%);}
    to {opacity:1; transform:translateY(0%);}
}
@media screen and (max-width:900px){
    min-height:120vh;
}

`;

const CustTableDiv = styled.div`
opacity:${({open2})=> open2 ? "1":"0"};
width:100%;
height:60dvh;
box-shadow:var(--box-shadow-normal);
background-image:url(${({bgimage})=>bgimage});
background-size:100% 100%;
background-position:50% 50%;
animation:${({animation})=> animation } ;
@keyframes viewTable {
  from {
    opacity:0;
    background-size:200% 200%;
    background-position:0% 0%;
  }
  10% {
    opacity:1;
    background-size:200% 200%;
    background-position:5% 5%;
  }
  50% {
    opacity:1;
    background-size:200% 200%;
    background-position:100% 100%;
  }
  to {
    opacity:1;
    background-size:100% 100%;
    background-position:50% 50%;
  }
}
@keyframes close {
  from {
    opacity:1;
  }
  
  to {
    opacity:0;
  }
}


`;

const WeddingCardTable = ({flower,weddingTable,bg}) => {
    const flowerRef=React.useRef(null);
    const weddingTableRef=React.useRef(null);
    const [open,setOpen]=React.useState(false);
    const [open2,setOpen2]=React.useState(false);
    const threshold= window.innerWidth < 900 ? 0.5 :0.7;
    const background=`linear-gradient(217deg, ${bg}, rgb(233, 240, 241) 50% )`;

    React.useEffect(()=>{
        const arrRef=[flowerRef.current,weddingTableRef.current];
        const observer= new IntersectionObserver(entries=>{
            entries.forEach(entry=>{
                if(entry.target===flowerRef.current && entry.isIntersecting){
                    setOpen(true);
                }else if(entry.target===weddingTableRef.current){
                    setOpen2(entry.isIntersecting);
                }
            });
            
        },{threshold:threshold});
        if(arrRef){
            arrRef.forEach(ele=>{
                observer.observe(ele);
            });
            return ()=>observer.disconnect();
        }

    },[]);
   
  return (
    <CustCardTable
    open={open}
    open2={open2}
    bg={background}
    
    className={Styles.custCardTable}
    >
        <Grid container spacing={0}
            sx={{ margin: "0rem auto", height:"auto" ,}}
          >
            <Grid item xs={12} md={6} sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" ,maxHeight:"60vh"}}>
              <Card 
              ref={flowerRef}
              elevation={10}
              className={open ? Styles.flowerSeen : Styles.flowerNotSeen} 
              >
                <CardMedia  image={flower} component="img" alt="www.master-connect.ca"
                sx={{width:{md:"62.3%",sm:"62.3%",xs:"100%"},height:{md:"62.3%",sm:"62.3%",xs:"70%"}}}
                />
                <CardContent>
                  <Typography component="h1" variant="h6" sx={{ fontFamily: "Ibarra Real Nova" }}>Our Event</Typography>
                  <Typography component="h1" variant="h4" sx={{ fontFamily: "Ibarra Real Nova" }}>Designed By Unity,</Typography>
                  <Typography component="h1" variant="h5" sx={{ fontFamily: "Ibarra Real Nova" }}>Created For You</Typography>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} md={6}  sx={{position:"relative", }} >
              <CustTableDiv 
              open2={open2}
              ref={weddingTableRef} 
              bgimage={weddingTable} 
              animation={open2 ? "viewTable 20s ease-in" : "close 1.5s ease-out"}
              className={Styles.custTableDiv}
              />
            </Grid>

          </Grid>
    </CustCardTable>
  )
}

export default WeddingCardTable