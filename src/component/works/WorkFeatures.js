import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Container, Fab, Grid, Paper, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import styles from './works.module.css';
import RevealPrice from './RevealPrice';
import RegisterPage from '../RegisterPage';
import Summary from './Summary';
import GetRegisterPages from '../utils/GetRegisterPages';
import WorksHelmet from './WorksHelmet';



const WorksContainer=styled.div`
margin:0;
margin-top:-10px;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
max-width:100vw;
min-height:80vh;
background:${({bg})=>bg};
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
margin-top:-10px;
}
@media screen and (max-width:600px){
margin-top:-70px;
}
`;
const CusPaper=styled(Paper)`
height:100%;
position:absolute;
padding:1rem;
animation: growUp 4s ease-in-out;
background:transparent;
@keyframes growUp {
    from {opacity:0;transform:translateY(20%);
    height:0%;background:lightgrey;}
    to {opacity:1;transform:translateY(0%);
    height:100%;background:transparent;}
}
`;
const WorkFeatures = () => {
    
    const theme=useTheme();
    const navigate=useNavigate();
    const {workArr, setChangePage,setTitle,setStyleName,loadProduct,staticImage}=useContext(GeneralContext);
    const getDesinLinks=workArr ? workArr : null;
    const design=`${staticImage}/mainDesign.png`;
    const loadedProduct = loadProduct.loaded ? loadProduct.data:[];
    const target=useRef(null);
    const [display,setDisplay]=useState('none');
    const [keywords,setKeywords]=useState(null);
    const [desc,setDesc]=useState(null);
    const [summary,setSummary]=useState(null);
    const [products,setProducts]=useState([]);


useEffect(()=>{
setTitle("Designs");
setStyleName("Some Designs")
if(window.scrollY){
    window.scroll(0,0);
}
},[setTitle,setStyleName]);

useEffect(()=>{
    if(loadProduct.loaded){
        setKeywords(
            loadProduct.data.map(obj=>(obj.name)).concat(["Products","sale","buy"])
        )
        setDesc(
            loadProduct.data.map(obj=>(obj.desc).slice(0,100))
        )
        setSummary(
            loadProduct.data.map(obj=>(obj.desc).slice(0,100))
        )
        setProducts(loadProduct.data)
    }
},[loadProduct.loaded,loadProduct.data])

const handleNavigate =(e,link)=>{
    if(!link.startsWith("https")){
navigate(link,setChangePage(true));
    } else {window.open(link);}

}

  return (
    <WorksContainer bg={theme.palette.common.lightTeal} >
        <WorksHelmet keywords={keywords} summary={summary} desc={desc} products={products} staticImage={staticImage}/>
      <RegisterPage/>
      <GetRegisterPages/>
        <Container maxWidth="xl" 
        sx={{backgroundImage:`url(${design})`,backgroundSize:"100% 100%",width:"100%",minHeight:"40vh",marginTop:"1rem",display:"flex",justifyContent:"center",position:"relative"}}
        >
            <CusPaper elevation={20} sx={{background:"transparent",color:theme.palette.common.light,}}>
            <Typography component="h1" variant="h3" sx={{fontSize:{xs:"32px",md:"60px"},padding:"1rem"}}> Sample Templates for Ideas</Typography>
            </CusPaper>
        </Container>
        <Container maxWidth="xl" sx={{margin:" 1rem auto"}}>
            <RevealPrice/>
            <Grid container spacing={3}>
        {loadedProduct.map(obj=>(

            <Grid item xs={12} md={4} key={obj.id} >
                <Card sx={{width:"100%","&:hover":{cursor:"pointer"},position:"relative"}} >
                    <Paper elevation={10} sx={{width:"100%",margin:"1rem auto", textAlign:"center"}}>
                    <Typography component="h1" variant="h4" sx={{textAlign:"center",fontFamily:"Roboto",width:"100%"}}>{obj.name}</Typography>
                    </Paper>
                    <CardMedia component="img" image={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" onClick={(e)=>handleNavigate(e,obj.extra_kwargs)}/>
                    <CardContent>
                    <Typography component="h1" variant="h6" sx={{textAlign:"center",fontFamily:"Roboto"}}>{obj.desc}</Typography>
                    </CardContent>
                    <Stack direction="column" sx={{textAlign:"center"}}>
                    <Summary  summary={obj.summary} display={display} />
                    </Stack>
                </Card>
            </Grid>

        ))}
        </Grid>
        </Container>

    </WorksContainer>
  )
}

export default WorkFeatures