import React, { useContext, useEffect, useState } from 'react';
// import styles from './price.module.css';
// import styled from 'styled-components';
import { Card, CardActions, CardContent, CardMedia, Container, Fab, Grid, Paper, Stack, Typography } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SummaryDesc from './SummaryDesc';
import ServiceList from './ServiceList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



const DesignPricing = ({ productList }) => {
    const theme = useTheme();
    const { staticImage, } = useContext(GeneralContext);
    // const { priceCatelog } = useContext(PriceContext);
    const [designPrice, setDesignPrice] = useState({});
    const [targetObj, setTargetObj] = useState({ loaded: false, object: null });
    const [activate, setActivate] = useState({ loaded: false, id: null });
    const getDesigns = productList.loaded ? productList.data : null;


    useEffect(() => {
        if (getDesigns) {
            let arr = [];
            getDesigns.forEach((obj, index) => {
                let Image = `${staticImage}/${obj.imageName}`;
                arr.push({ ...obj, "Img": Image, "link": obj.extra_kwargs });
            });
            setDesignPrice({ loaded: true, data: arr });
        }

    }, [setDesignPrice, getDesigns, staticImage]);

    const handleMouseOver = (e, ob) => {
        if(!activate.loaded && activate.id !==ob.id){
        const getObj = designPrice.loaded ? designPrice.data.filter(obj => (obj.id === ob.id))[0] : null;
        setTargetObj({ loaded: true, object: getObj })
        }else{setTargetObj({ loaded: false, object: {} })}
    }
    const handleMouseOut = (e, ob) => {
        setTargetObj({ loaded: false, object: {} })
    }
    const handleActivate =(e,id)=>{
        e.preventDefault();
        if(!activate.loaded){
            setActivate({loaded:true,id:id});
        }else{
            setActivate({loaded:false,id:0});
        }
    }
    const handleActiveClose=(e)=>{
        e.preventDefault();
        setActivate({loaded:false,id:0})
    }

    return (
        <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", margin: "2rem auto" }}>
            <Typography component="h1" variant="h2" sx={{ margin: "2rem auto", fontFamilt: "Roboto" }}>Design Templates</Typography>
            <Grid container spacing={2} >
                {designPrice.loaded && designPrice.data.map(obj => (
                    <Grid item xs={12} md={4} key={obj.id} onMouseOver={(e) => handleMouseOver(e, obj)} onMouseOut={(e) => handleMouseOut(e, obj)}
                    sx={{position:"relative"}}
                    >

                        <Paper elevation={10} sx={{ textAlign: "center", width: "100%", margin: "auto", position: "relative", background: theme.palette.common.background2 }}>
                            <Card sx={{ width: "100%" }}
                            
                            >
                                <CardMedia component="img" alt="www.master-connect.ca" image={obj.Img} height="250px" />
                                <CardContent>
                                    <Paper elevation={10} sx={{ textAlign: "center", width: "100%", margin: "1rem auto", fontFamily: "Roboto", padding: "0.5rem", background: theme.palette.common.background2 }}>
                                        <Stack direction="column">
                                            <Typography component="h1" variant="h4">{obj.name}</Typography>
                                            <Stack direction="row" spacing={2} sx={{ margin: "1rem auto" }}>
                                                <Typography component="h1" variant="h5">unit:${obj.price}.<sup>00</sup></Typography>
                                                <Typography component="h1" variant="h5">monthly:${obj.monthly}.<sup>00</sup></Typography>
                                            </Stack>
                                            <Typography component="h1" variant="h6">description:{obj.desc}</Typography>
                                        </Stack>
                                    </Paper>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                    <Fab variant="extended" color="primary" href={obj.link}>
                                        <Typography component="h1" variant="body2">go to page</Typography>
                                        <ArrowForwardIcon sx={{ ml: 2 }} />
                                    </Fab>
                                </CardActions>
                                
                            </Card>
                            {(targetObj.loaded && targetObj.object.id === obj.id) && <SummaryDesc url={staticImage} obj={obj} />}
                        </Paper>
                        {(activate.loaded && activate.id === obj.id) ?
                            <Stack direction="column" spacing={0} sx={{ justifyContent: "center", alignItems: "center" }}>
                                <Fab variant="extended" color="info" size="medium"
                                onClick={(e)=>handleActivate(e,obj.id)}
                                sx={{color:"red",margin:"2rem auto"}}
                                >
                                    close <ExpandLessIcon sx={{ ml: 1, color: "red" }} />
                                </Fab>
                            </Stack>
                            :
                            <Stack direction="column" spacing={0} sx={{ justifyContent: "center", alignItems: "center" }}>
                                <Typography component="h1" variant="h6" sx={{margin:"1rem auto"}}>recommendations</Typography>
                                <Fab variant="extended" color="info" size="medium"
                                onClick={(e)=>handleActivate(e,obj.id)}
                                sx={{margin:" auto"}}
                                >
                                    expand <ExpandMoreIcon sx={{ ml: 1, color: "warning" }} />
                                </Fab>
                            </Stack>
                        }
                        
                        <ServiceList services={obj.services} postServices={obj.postServices} activate={(activate.loaded && activate.id===obj.id) ? 
                        true:false} />
                        
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default DesignPricing