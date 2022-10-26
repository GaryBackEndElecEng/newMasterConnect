import React, { useContext, useEffect, useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { Grid, Typography, Stack, Card,Fab, CardContent, CardMedia, IconButton, Avatar } from '@mui/material';

import { useTheme } from '@mui/material/styles';
// import styled from 'styled-components';
import styles from "./home.module.css";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import DoneIcon from '@mui/icons-material/Done';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const SpecialCreatValueCard = ({ pointer }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { staticImage,setChangePage } = useContext(GeneralContext);
    const { getPackages } = useContext(PriceContext);
    const [getSpecials, setGetSpecials] = useState({ loaded: false, data: [] });

    const getpackages = getPackages.loaded ? getPackages.data : null;

    useEffect(() => {
        if (getpackages) {
            const filterSpecials = getpackages.filter(obj => (obj.specialOffer === true));
            setGetSpecials({ loaded: true, data: filterSpecials })

        }
    }, [setGetSpecials, getpackages]);

    const handlePageChange=(e,link)=>{
        if(link.startsWith("https")){
            window.open(link);
        }else{
            navigate(link,setChangePage(true))
        }
    }
    return (
        <>
            {getSpecials.loaded && getSpecials.data.map((obj,index) => (
                <Grid item xs={12} md={4} key={`${obj.id}-${index}`}
                    sx={{
                        display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column",
                        margin: "1rem 0px"
                    }}
                >

                    <Card elevation={3} className={pointer ? styles.growBig : ""}
                        sx={{ padding: "0rem 1rem" }}
                    >
                        <Stack direction="column" spacing={0} sx={{alignItems:"center",marginBottom:"2rem"}}>
                        <Avatar  src={"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"} alt="www.master-connect.ca" variant="circular" sx={{width:"70px",height:"70px"}}/>
                        </Stack>
                        <Typography component="h1" variant="h4"
                            sx={{ color: theme.palette.common.background, textDecoration: "underline", margin: "0px auto", textAlign: "center", }}
                        >
                            {obj.name}
                            <DoneIcon className={pointer ? styles.rotateDeal : styles.noRotateDeal} sx={{ ml: 2, fontSize: { xs: "40px", sm: "45px", md: "50px" } }} />
                        </Typography>
                        <CardContent>
                            <Typography component="h1" variant="h5"
                                sx={{ color: theme.palette.common.background2, textDecoration: "underline", margin: "0px auto", textAlign: "center", width: "100%", }}
                            >
                                
                                <AttachMoneyIcon sx={{ ml: 1, color: "green" }} />
                                <span style={{ color: "red" }}>{obj.monthly}.<sup>00</sup></span>,
                                <span style={{ textDecoration: "line-through", color: "black" }}>
                                    <AttachMoneyIcon sx={{ ml: 1, color: "green" }} />{Math.ceil(obj.monthly * (1 + obj.reducePerc / 100))} </span>
                               
                            </Typography>
                            <Typography component="h1" variant="h6">{obj.summary}</Typography>



                            <Typography component="h1" variant="h5" sx={{ textDecoration: "underline", textAlign: "center",color:theme.palette.common.teal }}>Product</Typography>
                            {obj.products.map((obj,index) => (
                                <Card elevation={3} key={`${obj.id}-1-${index}`} sx={{ margin: "1rem auto" }}>
                                    <CardMedia component={"img"} image={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" height="200px" />
                                    <CardContent>
                                        <Stack direction={{ xs: "column" }} >
                                            <Typography component="h1" variant="h5"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {obj.name} page
                                            </Typography>
                                            <Typography component="h1" variant="h6"
                                                sx={{ fontFamily: "Roboto" }}
                                            >{obj.summary}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <Stack direction="column" sx={{textAlign:"center",justifyContent:"center",alignItems:"center",margin:"2rem auto",}}>
                                    <IconButton  onClick={(e)=>handlePageChange(e,obj.extra_kwargs)}
                                     sx={{background:theme.palette.common.mediumBlue,
                                     borderRadius:"3%",boxShadow:"1px 1px 13px 4px grey",width:"80%"
                                     }}>
                                        see page <FileOpenIcon sx={{ml:3,color: "blsck",}}/>
                                    </IconButton>
                                    </Stack>
                                </Card>
                            ))}
                            <Typography component="h1" variant="h5" sx={{ textDecoration: "underline", textAlign: "center",
                            color:theme.palette.common.teal
                         }}>
                                Services
                            </Typography>
                            {obj.services.map((obj,index) => (
                                <Stack direction={{ xs: "column" }} key={`${obj.id}-2-{index}`}>
                                    <Typography component="h1" variant="h6" sx={{color:"blue"}}>{obj.name}</Typography>
                                    <Typography component="h1" variant="body1">Type:{obj.priceCatelog.name}</Typography>
                                    <Typography component="h1" variant="body2">{obj.summary}</Typography>
                                </Stack>
                            ))}

                            <Typography component="h1" variant="h6"
                                sx={{ color: theme.palette.common.background3, margin: "0px auto", textAlign: "center" }}
                            >
                                {separateWords(obj.desc)[0]} <br/>
                            </Typography>
                            <Typography component="h1" variant="body1">
                            {separateList(obj.desc).splice(1,5).map((phrase,index)=>(
                                <ul key={`${phrase}-3-${index}`}>
                                    <li>{phrase}</li>
                                </ul>
                            ))}
                            </Typography>


                        </CardContent>
                    </Card>

                </Grid>
            ))}
        </>
    )
}

export default SpecialCreatValueCard

function separateWords(phrase){
    let arrSentence=phrase.split(".");
    let lastSentence = arrSentence.splice(0,arrSentence.length-1);
    return (lastSentence)
  }
  function separateList(phrase){
    let arrSentence=phrase.split(".,");
    let lastSentence = arrSentence.splice(0,arrSentence.length-1);
    return (lastSentence)
  }