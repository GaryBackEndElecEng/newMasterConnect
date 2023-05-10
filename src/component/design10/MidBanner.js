import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import styles from './design10.module.css';
import { Box, Fab, Stack, Typography, Container, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DehazeIcon from '@mui/icons-material/Dehaze';
import jsonArray from './JsonArray.json';


const MainMidBanner = styled.div`
width:100%;
margin: auto;
min-height:20vh;
position:relative;
marginBottom:2rem;
display:flex;
flex-direction:column;
justify-content:flex-start;
background:${({ bg }) => bg};
box-shadow: 1px 1px 13px 4px ${({ bs }) => bs};
`;
const MidBanner = ({ arr,signature,loadArr }) => {
    const theme = useTheme();
    const [showMsg,setShowMsg]=useState(false);
    const [msg,setMsg]=useState("");
    
const handleShowClick=(e)=>{
    let wordMatch= e.currentTarget.textContent
    if(wordMatch){
        setMsg(wordMatch);
        setShowMsg(true);
        e.currentTarget.style.zIndex="1000";
    }else{
        setMsg(false);
        e.currentTarget.style.zIndex="0"
    }
}

    return (
        <MainMidBanner
            bg={"white"}
            bs={theme.palette.common.orangeFade2}
            className={styles.mainMidBanner}
        >
            <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center", minHeight: "20vh", background: theme.palette.common.orangeFade2,position:"relative",marginBottom:"1rem", }}>
                <hr style={{ width:"50%",color:"black"}}/>
                <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
                <Button sx={{"&:hover":{color:"white"}}}><Typography component="h1" variant="h6" key={"collection"} onClick={(e)=>handleShowClick(e)} onMouseOut={()=>setShowMsg(false)}> Collection</Typography></Button>
                <Button sx={{"&:hover":{color:"white"}}}><Typography component="h1" variant="h6" key={"press"} onClick={(e)=>handleShowClick(e)} onMouseOut={()=>setShowMsg(false)}> Press</Typography></Button>
                <Button sx={{"&:hover":{color:"white"}}}><Typography component="h1" variant="h6" key={"blog"} onClick={(e)=>handleShowClick(e)} onMouseOut={()=>setShowMsg(false)}> Blog</Typography></Button>
                <Button sx={{"&:hover":{color:"white"}}}><Typography component="h1" variant="h6" key={"about"} onClick={(e)=>handleShowClick(e)} onMouseOut={()=>setShowMsg(false)}> About</Typography></Button>
                <Button sx={{"&:hover":{color:"white"}}}><Typography component="h1" variant="h6" key={"contact"} onClick={(e)=>handleShowClick(e)} onMouseOut={()=>setShowMsg(false)}> Contact</Typography></Button>
                </Stack>
                <hr style={{ width:"50%",color:"black"}}/>
                <div><span><DehazeIcon sx={{color:"red"}}/> - </span>  <span>by</span><span> - <DehazeIcon sx={{color:"red"}}/></span></div>
                <Typography component="h1" variant="h6" sx={{fontFamily:"'Great Vibes', cursive",fontSize:"40px"}}> Gary Wallace</Typography>
                {showMsg && <Typography component="h1" variant="h5"
                sx={{position:"absolute",top:{sm:"-0%",xs:"3%",md:"50%"},left:{xs:"auto",md:"20%"},zIndex:"1000"}}
                className={styles.clickMenuOn}
                >
                     This takes you to {msg} page 
                </Typography>
                }
            </Stack>
            <Container maxWidth="xl" spacing={{xs:0,sm:1}}>

                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
                    {loadArr.loaded && loadArr.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${obj.index}-design-${index}`}>
                            <Card elevation={3}
                            sx={{boxShadow:`1px 1px 6px 2px ${theme.palette.common.orangeFade2}`}}
                            >
                                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>{obj.title}</Typography>
                                <CardMedia component="img" src={obj.image} alt="www.master-connect.ca" />
                                <CardContent>
                                    <Typography component="h1" variant="body1">{obj.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MainMidBanner>
    )
}

export default MidBanner