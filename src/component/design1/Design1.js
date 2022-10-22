import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Box, Container, Stack, Grid, Typography, Fab } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider.js';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import CardSample from './CardSample';
import CardSample2 from './CardSample2';
import MyWork from './MyWork';
import { ContainerT } from '../../styled/Container.styled';
import GridLayer from './GridLayer';
import ModalContainer from '../utils/ModalContainer';
import Shop2Icon from '@mui/icons-material/Shop2';
import CloseIcon from '@mui/icons-material/Close';
import RegisterPage from '../RegisterPage';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import styled from 'styled-components';
import GetRegisterPages from '../utils/GetRegisterPages';
import Design1Helmet from './Design1Helmet';

const CustBoxPageCover = styled(Box)`
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
width:100vw;
margin-top:-15px;
position:relative;
background-image:url(${({ bg }) => bg});
background-size: 100% 100%;
animation: clearIn 2s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
margin-top:-2px;
}
@media screen and (max-width:600px){
  margin-top:-54px;
}

`;


// loadGoogleFont("Playfair + Display");
const Design1 = () => {
  const theme = useTheme();
  const fade1 = 1
  const fade2 = 0.8
  const { setTitle, setStyleName, workArr,setChangePage,staticImage } = useContext(GeneralContext);
  const {getProductList}=useContext(PriceContext);
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
  const image1 = "https://master-connect.s3.ca-central-1.amazonaws.com/static/pics/shortTermRental2.png";

  const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState(false);

    useEffect(()=>{
        if(getProductList.loaded){
            let obj=getProductList.data.filter(obj=>(parseInt(obj.id)===1))[0]
            setSummary(obj.summary);
            setDesc(obj.desc);
            setKeywords("Flower-store,Web,Design,web-page,page product,purchase-a-site");
            setimage(`${staticImage}/${obj.imageName}`);
            setOBJ(obj)
        }
        if(window.scrollY){
          window.scroll(0,0);
          
      }
    },[getProductList.loaded]);
  const array = [
    { id: 0, rating: 3, name: "Harry", "comment": " I had a really good time. The place was absolutely beautiful. The service was okay!" },
    { id: 1, rating: 5, name: "Bob", "comment": " The clientele was curtious and provided all the help available" },
    { id: 2, rating: 4, name: "Donna", "comment": " I recommend anyone to book with them. You will not regret this!" },
    { id: 5, rating: 5, name: "Smith", "comment": " I met my wife while using one of their facilities. The experience was well worth the expense." },{ id: 6, rating: 5, name: "Sarah", "comment": " We were well served" },
    { id: 7, rating: 4, name: "Betty", "comment": " Brought my Mom on vacation. We both enjoyed this trip and location!" },
    { id: 8, rating: 5, name: "Won", "comment": " Nice people, appreciated their kindness" }]
  const array2 = [
    { id: 0,"title":"Product Summary",  "comment": "This can give a summary of a product"},
    { id: 1,"title":"Service Summary", "comment": " This can give a summary of a service" },
    { id: 2,"title":"Event Details",  "comment": " This can give directions to an Event" },
    { id: 3,"title":"Decription",  "comment": " This can give a summary description of a product" },
    ]

  useEffect(() => {
    const title1 = workArr.filter(obj => (obj.id === 0))[0].title
    setTitle(title1)
    setStyleName("Style 1");
    setChangePage(false);
  }, [setTitle, setStyleName]);

  useEffect(() => {
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
    if (getUser_id) {
      setShowPurchaseBtn(true);
    }
  }, []);

  return (
    <>

      <RegisterPage />
      <GetRegisterPages/>
      <Design1Helmet summary={summary} desc={desc} image={image} keywords={keywords} OBJ={OBJ}/>
      <CustBoxPageCover bg={image1} sx={{ position: "relative",  }}>
        
          <Grid container spacing={0}
            sx={{
              height: { lg: "80vh", md: "50vh", sm: "30vh",xs:"30vh" },
              
              justifyContent: "center",
              alignItems: "flex-start",
              overflowY: "scroll",
              padding: { xs: "5px", sm: "1rem" },
              marginTop: "0px", marginBottom: "2rem"
            }}
          >
            {

              array.map((obj) => (
                <Grid item xs={12} sm={6} md={4} lg={6} key={obj.id}
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <CardSample2 fade={fade2} rating={obj.rating} name={obj.name} comment={obj.comment}  />
                </Grid>
              ))
            }</Grid>

          
            <Container maxWidth={"xl"}
            sx={{background:theme.palette.fade,color:"white"}}
            >
              <Typography component="h1" variant="h3"
                sx={{width:"100%",textAlign:"center"}}
              >
                Custom details
              </Typography>
              <Typography component="h1" variant="body2"
                sx={{
                  padding: { xs: "1rem 0.25rem" },
                  transform: { xs: "scale(1)", sm: "scale(1)" },
                  width: { xs: "80%", sm: "100%" },
                  fontFamily: "Roboto",
                  // fontStyle: "italic",
                  fontSize: { xs: "14px", sm: "30px", md: "30px" }
                }}
              >
                This Design is adjustable to the client's interests. The pictures are sample pictures and are randomly selected for staging purposes.
              </Typography>
            </Container>
         
        

      </CustBoxPageCover>
      <Container maxWidth={"xl"}
        sx={{
          
          marginTop: "1rem", marginBottom: "1rem",

        }}
      >
        <Grid container spacing={0} sx={{ justifyContent: "flex-start", alignItems: "center",width:"100%" }}>
          {array2.map(obj => (
            <Grid item xs={12} sm={6} md={4} key={obj.id}
              sx={{ margin: { xs: "0.5rem auto", sm: "2rem auto" }, width: "100%", }}
            >
              <CardSample fade={1} comment={obj.comment} title={obj.title} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth={"xl"}>
        <GridLayer />
      </Container>
      <MyWork />


      <Container maxWidth={"md"}>
        <Stack direction={"column"} sx={{ margin: "1rem auto" }}>
          {showPurchaseBtn ? <UserSignedInPurchaseBtn />
            :
            <ModalContainer />}
        </Stack>
      </Container>
    </>


  )
}

export default Design1