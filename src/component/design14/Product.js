import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Stack, Card, CardMedia, Typography, Box, Fab, Grid, CardContent, Avatar } from '@mui/material';
import CoverPage from './CoverPage';
import styles from './design14.module.css';
import api from '../axios/api';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import products from './product.json';
import sliderImg from './slider.json';

const MainCover = styled.div`
width:100vw;
position:relative;
min-height:46vh;
margin-top:0px;



`;
const Product = () => {
    const [getProducts, setGetProducts] = useState({ loaded: false, data: [] });
    const [start,setStart]=useState({id:null,loaded:false});
    const {setTitle,setStyleName}=useContext(GeneralContext);

    useEffect(() => {
        if (products) {
            setGetProducts({ loaded: true, data: products });
        }
        setTitle("product display");
        setStyleName(" sample prod.Display");
        if(window.scrollY){
            window.scroll(0,0);
        }
    }, [setTitle,setStyleName]);

    const handleSlide=(e,id)=>{
        if(!start.loaded){
            setStart({loaded:true,id:id});
        }else{
            setStart({loaded:false,id:null});
        }
    }
    
    return (
        <MainCover>
            <CoverPage sliderArray={sliderImg} />
            <Grid container spacing={{ xs: 1, md: 2 }}>
                {getProducts.loaded && getProducts.data.map((obj, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${obj.id}-product--${index}`}>
                        <Card elevation={10}
                            sx={{ position: "relative", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}
                        >
                            <Avatar src={obj.logo} alt="www.masterconnect.ca"
                            sx={{width:"75px",height:"75px",boxShadow:"1px 1px 20px 3px black",alignSelf:"stretch",margin:"0.5rem"}}
                            />
                            <Stack direction="row" spacing={{xs:1,md:2}} sx={{ margin: "auto", width: "100%", overFlowX: "scroll" ,cursor:"pointer"}}
                            
                            onClick={(e)=>handleSlide(e,obj.id)}
                            >
                                {obj.imageArr && obj.imageArr.map((obj1, index) => (
                                    <CardMedia
                                    className={(start.loaded && start.id===obj.id) ? styles.cardSlide: styles.card}
                                        key={`${obj1.id}--image=${index}`}
                                        component="img"
                                        defer={true}
                                        src={obj1.image}
                                        sx={{maxWidth:'200%',maxHeight:"350px"}}
                                        
                                    />
                                ))}
                            </Stack>
                            <CardContent
                                sx={{ margin: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
                                <Typography component='h1' variant="h4" sx={{ textAlign: "center", margin: "auto" }}>{obj.name}</Typography>
                                <Typography component='h1' variant="body1" sx={{ textAlign: "center", margin: "0.5rem auto" }}>{obj.summary}</Typography>
                                <Typography component='h1' variant="body2" sx={{ textAlign: "center", margin: "auto" }}>{obj.desc}</Typography>
                            </CardContent>
                        </Card>
                        <Stack direction="column" sx={{alignItems:"center",margin:'1rem auto'}}>
                        <Fab color="info" variant="extended" size="medium">add to basket</Fab>
                    </Stack>
                    </Grid>
                    
                ))}
            </Grid>
        </MainCover>
    )
}

export default Product