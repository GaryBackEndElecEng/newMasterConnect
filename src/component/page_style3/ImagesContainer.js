import {  ImageList, ImageListItem, Stack, Typography, Paper } from '@mui/material';
import React ,{useState} from 'react';
// import styles from './design3.module.css';


const ImagesContainer = () => {
 
const [showTitle_,setShowTitle_]=useState(false);

  const handleShowTitle=(e)=>{
    e.preventDefault();
    e.currentTarget.nextSibling.style.opacity=1;
    e.currentTarget.nextSibling.style.transition="opacity 1s ease-in";
    setShowTitle_(true);
    
  }
  const handleHideTitle=(e)=>{
    e.preventDefault();
    e.currentTarget.nextSibling.style.opacity=0;
    e.currentTarget.nextSibling.style.transition="opacity 1s ease-out";
    setShowTitle_(false);
  }
  
  return (
    <ImageList
      sx={{ width: "100%", height: "auto", overflow: "hidden" }}
      cols={4}
      rowHeight={200}
    >
      {itemData ? itemData.map(image => (
        <Stack direction={"column"} sx={{ position: "relative" }} key={`${Math.ceil(Math.random()*1000)}-${image.title}`}>
          <ImageListItem  onMouseOver={(e)=>handleShowTitle(e)} onMouseOut={(e)=>handleHideTitle(e)}>
            <img
              src={`${image.img}?w=100%&aspect-ratio=4/3&fit=crop`}
              alt={image.title}
              loading="lazy"
            />
          </ImageListItem>
          <Paper elevation={8}
          sx={{position:"absolute",opacity:0
          }}
          
          >
            <Typography component="h1" variant="h4">
              {image.title}
            </Typography>
          </Paper>
        </Stack>
      )) :
        <h3 style={{ margin: "50% 40%" }} key={"star"}>...loading</h3>}

    </ImageList>
  )
}

export default ImagesContainer

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];