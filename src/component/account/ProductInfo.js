import React, { useEffect, useState, } from 'react'

import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Stack, Container, Paper, Typography, Grid,  Fab } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';

const MainProductInfo=styled(Container)`
margin:1rem auto;
background:${({bg})=>bg};
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
animation: growin 2s ease-in-out;
@keyframes growin {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const CustomGrid = styled(Grid)`
animation: growin 2s ease-in-out;
height:auto;
@keyframes growin {
    from {opacity:0;transform:translateX(-155%);}
    to {opacity:1;}
}
`;

const ProductInfo = ({productInfo}) => {
    const theme=useTheme();
    const [getGeneralInfo,setGetGeneralInfo]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    const arrayLength=getGeneralInfo.loaded ? getGeneralInfo.data.length : 0;
    const isSmArray= arrayLength > 0 ? 6:12;
    const isMdArray= arrayLength > 0 ? 4:12;

    useEffect(()=>{
        if(productInfo.loaded){
            setGetGeneralInfo(productInfo.data)
        }

    },[setGetGeneralInfo,productInfo.loaded,productInfo.data]);

const handleShowInfo=(e)=>{
    if(!showInfo){
        setShowInfo(true)
    }else{setShowInfo(false)}
    }


  return (
    <MainProductInfo 
    bg={theme.palette.common.background2}
    sx={{color:theme.palette.common.light}}
    maxWidth="sm">
        <Stack direction="column" spacing={0} 
        sx={{display:"flex",justifyContent:"center",alignItems:"center"
        
        }}>
            <Fab variant="extended" onClick={(e)=>handleShowInfo(e)}
            sx={{background:theme.palette.common.orangeFade2,"&:hover":{background:theme.palette.common.orangeFade,color:"white"},width:{sm:"50%",xs:"100%"}}}>
                Warranty <PolicyIcon sx={{ml:1,color:"blue"}}/>
            </Fab>
        </Stack>
        { showInfo && <CustomGrid container spacing={{xs:0,sm:1,md:2}}>
            {getGeneralInfo && getGeneralInfo.map(obj=>(
                <Grid item xs={12} sm={isSmArray} md={isMdArray} key={`${obj.id}-${Math.ceil(Math.random()*1000)}`}>
                    <Paper component="div" elevation={20}
                    sx={{display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",
                    margin:"1rem auto", padding:"0.5rem"}}
                    >
                        <Typography component="h1" variant="h4" sx={{margin:"1rem auto"}}>
                                {obj.title && obj.title}
                        </Typography>
                        <Typography component="h1" variant="h5" sx={{margin:"1rem auto"}}>
                                {obj.sectionTitle && obj.sectionTitle}
                        </Typography>
                        <Typography component="h1" variant="body1" sx={{margin:"1rem auto"}}>
                                {obj.content && obj.content}
                        </Typography>
                        <Typography component="h1" variant="body1" sx={{margin:"1rem auto"}}>
                                {obj.content1 && obj.content1}
                        </Typography>
                        <Typography component="h1" variant="body1" sx={{margin:"1rem auto"}}>
                                {obj.content2 && obj.content2}
                        </Typography>
                        <Typography component="h1" variant="body1" sx={{margin:"1rem auto"}}>
                                {obj.content3 && obj.content3}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </CustomGrid>}
    
    </MainProductInfo>
  )
}

export default ProductInfo