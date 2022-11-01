import React, { useState, useRef, useContext, useEffect } from 'react';
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
let count = 0;
const ThemeExampleSlideIn = () => {
  let countRef = useRef(1);
  const navigate = useNavigate();
  const { staticImage, setChangePage, open } = useContext(GeneralContext);
  const [slideInDelayId, setSlideInDelayId] = useState(1);
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
  ]

  useEffect(() => {
    const slideInFunc = (countVar) => {

      setTimeout(() => {
        if (countVar < designLinks.length && open) {
          countVar = slideInDelayId + 1;
          countRef = countVar;
          return setSlideInDelayId(countRef);

        } else if (count > designLinks.length) return count = 0

      }, 2000)
    }
    if (open) {
      count = 0;
      slideInFunc(count);
    }
  }, [setSlideInDelayId, slideInDelayId, designLinks.length, open]);
  if (count > designLinks.length) return count = 0; //This resets count


  const handleLink = (e, link) => {
    if (!link.startsWith("https")) {
      navigate(link, setChangePage(true));
    } else {
      window.open(link)
    }

  }

  return (
    <Container maxWidth="lg" sx={{ margin: "1rem auto", marginBottom: "3rem" }}>
      <Grid container spacing={2} sx={{ maxHeight: "40vh", overflowY: "scroll" }}>
        {designLinks.slice(0, slideInDelayId).map(obj => (
          <Grid item xs={12} md={4} key={obj.id} sx={{ position: "relative" }} >
            <Card className={Styles.exampleDisplay}>
              <CustBox onClick={(e) => handleLink(e, obj.link)}>
                {obj.icon}
                <CardMedia component="img" image={obj.pic} height={120} alt="www.master-connect.ca" />
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