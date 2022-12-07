import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './home.module.css';
import {  Box, Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CameraIcon from '@mui/icons-material/Camera';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FavoriteIcon from '@mui/icons-material/Favorite';


const CustBox = styled(Box)`
display:flex;
jstustify-content:flex-start;
align-items:center;
flex-direction:column;
`;

const ThemeExampleSlideIn = () => {
  const navigate = useNavigate();
  const { staticImage, setChangePage, } = useContext(GeneralContext);
  
  // Array
  const designLinks = [
    { id: 1, name: "homeStyle", link: "/design1", summary: "Rental,vacation or home-style Design.", icon: <CarRentalIcon sx={{mr:1,color:"red"}} />, pic: `${staticImage}/design1.png`, display: "none" },
     { id: 2, name: "retrospect", link: "/design2", summary: "Deca- style Design for the arts.", icon: <CameraIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design2.png`, display: "none" },
    { id: 3, name: "ImageWall", link: "/design3", summary: "A Macab of images creating a wall Design.", icon: <WallpaperIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design3.png`, display: "none" },
      { id: 4, name: "Space-frontier", link: "/design4", summary: "Space Design of the moon orbiting the Earth for venture.", icon: <RocketLaunchIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design4.png`, display: "none" },
    { id: 5, name: "FlowerStore", link: "/design5", summary: "A flower sale's design representing flowers for sale.", icon: <LocalFloristIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design5.png`, display: "none" },
    { id: 6, name: "StoreFront", link: "https://www.master-sale.ca", summary: "This is a full non-react design . This site is for sale if requested.", icon: <StorefrontIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design6.png`, display: "none" },
    { id: 7, name: "Wedding", link: "/design6", summary: "A wedding design", icon: <CameraIcon sx={{mr:1,color:"red"}} />, pic: `${staticImage}/design7.png`, display: "none" },
    { id: 8, name: "success", link: "/design8", summary: "Success, motivation page", icon: <FavoriteIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design8.png`, display: "none" },
    { id: 9, name: "Realtor", link: "/design9", summary: "realtor Specialist page", icon: <FavoriteIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design9.png`, display: "none" },
    { id: 10, name: "Interior Design", link: "/design10", summary: "Beautifully Design Page", icon: <FavoriteIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design10.png`, display: "none" },
    { id: 11, name: "Restaurant Design", link: "/design11", summary: "5-Star restaurant", icon: <FavoriteIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design11.png`, display: "none" },
    { id: 12, name: "Product Detail Page", link: "/design12", summary: "Well Designed Product Detail display", icon: <FavoriteIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design12.png`, display: "none" },
    { id: 13, name: "Custom templates", link: "/customPage", summary: "Choose your template", icon: <FavoriteIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/customPage.png`, display: "none" },
  ]

  


  const handleLink = (e, link) => {
    if (!link.startsWith("https")) {
      navigate(link, setChangePage(true));
    } else {
      window.open(link)
    }

  }

  return (
    <Container maxWidth="xl" sx={{ margin: "1rem auto", marginBottom: "3rem" }}>
      <Typography component="h1" variant="h3" sx={{ fontFamily: "Roboto" }}>
                    More Designs
                  </Typography>
      <Grid container spacing={2} sx={{ maxHeight: {xs:"60vh"}, overflowY: "scroll",marginTop:"2rem" }}>
        {designLinks.map(obj => (
          <Grid item xs={12} md={4} key={`${obj.id}--see more designs-${Math.ceil(Math.random()*10000)}`} sx={{ position: "relative" }} >
            <Card className={Styles.exampleDisplay}>
              <CustBox onClick={(e) => handleLink(e, obj.link)}>
                {obj.icon}
                <CardMedia component="img" image={obj.pic} height={220} alt="www.master-connect.ca" />
                <CardContent>
                  <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto" }}>
                    {obj.summary}
                  </Typography>
                </CardContent>
              </CustBox>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ThemeExampleSlideIn