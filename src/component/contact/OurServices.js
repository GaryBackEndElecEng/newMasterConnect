import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Typography, Container, Paper, } from '@mui/material';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const ArchitectIcon = styled(ArrowBackIcon)`
margin:auto;
margin-left:3rem;
transform:scale(3);
color:red;
background:black;
position:absolute;
top:30%;
animation: moveAppear1 2s ease-in;
@keyframes moveAppear1 {
  from { opacity:0;transform:translateX(600%) scale(0);}
  to { opacity:1;transform:translateX(0%) scale(3);}
}
@media screen and (max-width:600px){
    transform:scale(1);
    position:absolute;
    margin-left:0rem;
    top:40%;
    background:black;
    @keyframes moveAppear1 {
        from { opacity:0;transform:translateX(-600%) scale(0);}
        to { opacity:1;transform:translateX(0%) scale(1);}
      }
}
@media screen and (max-width:500px){
    transform:scale(.8);
    position:absolute;
    right:0%;
    opacity:0;
    
    top:40%;
    background:black;
    @keyframes moveAppear1 {
        from { opacity:0;transform:translateX(-600%) scale(0);}
        to { opacity:1;transform:translateX(0%) scale(0.8);}
      }
}
`;

const OurServices = () => {
    const theme=useTheme();
    const{allCategory,removeApp}=useContext(GeneralContext);
    const [service,setService]=useState(null);
    const [showIcon, setShowIcon] = useState('none');
    

    useEffect(()=>{
        const getdataFunc = async ()=>{
            try {
                let getData= await allCategory.data.filter(obj=>(parseInt(obj.id)===1))[0].categories;
                let getdata2=getData;
            if(getdata2){
              setService(getdata2[0]);
            }
            if(removeApp){
                setTimeout(()=>{
                    setShowIcon("block");
                },1500)
                
            }
            } catch (error) {
                console.log("no array")
            }
        }
        if(allCategory.loaded && allCategory?.data.length>0){
            getdataFunc();
        }
        
      },[setService,allCategory.loaded,allCategory.data,removeApp]);


    return (
        <Container maxWidth="xl" sx={{margin:"1rem auto",background:theme.palette.common.background,padding:"0.5rem",justifyContent:"center",alignItems:"center"}}>
        <Paper component="div" elevation={9}
            sx={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0.5rem" }}
        >
            <Typography component="h1" variant="h2"
                sx={{
                    fontFamily: "Roboto", padding: "auto 0.5rem", margin: "auto ",position:"relative"
                }}
            >
                {service && service.title} {showIcon === 'block' ? <ArchitectIcon /> : <ArchitectureIcon sx={{ml:2,color:"red"}}/>}
            </Typography>
            <Typography component="h1" variant="h5"
                sx={{
                    padding: "auto 0.5rem", margin: "auto 0.5rem"
                }}
            >
                {service && service.content}
            </Typography>
        </Paper>
        </Container>
    )
}

export default OurServices