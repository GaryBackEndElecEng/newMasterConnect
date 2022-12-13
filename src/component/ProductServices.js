import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Box, Grid, Typography, Card, Avatar, Paper, Stack, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustPaper = styled(Paper)`
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
margin:1rem auto;
padding:2rem;
`;
const CustBox=styled(Box)`
margin:auto 0;
position:absolute;
width:100%;
top:0%;
left:0%;
padding:0.5rem;
animation: showInfo 1s ease-in-out;
@keyframes showInfo {
    from {opacity:0;transform:translateX(-50%);}
    to {opacity:1;transform:translateX(0%);}
}
`;

const ProductServices = ({ productServices, staticImage }) => {
    const theme = useTheme();
    const [show,setShow]=useState({loaded:false,id:null});
    const [reveal,setReveal]=useState(false);
    const display= reveal ? "flex":"none";

    useEffect(()=>{
        if(productServices.length>0){
            setReveal(true);
            // console.log(productServices.length)
        }
    },[setReveal,productServices])

    const handleSeeDesc=(e,id)=>{
        if(!show.loaded){
            setShow({loaded:true,id:id});
        }else{setShow({loaded:false,id:null});}
    }
    return (
        <CustPaper elevation={10}
            sx={{ background: theme.palette.common.blueGrey,display:display }}
        >
            <Typography component="h1" variant="h3"
                sx={{ margin: "1rem auto", textAlign: "center" }}
            >included services</Typography>
            <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "1rem auto" }}>
                {productServices && productServices.map((obj, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${obj.id}-services-${index}-${Math.ceil(Math.random()*10000)}`}
                        sx={{ margin: "1rem auto" }}
                    >
                        <Card elevation={3} sx={{ margin: "1rem auto", padding: "1rem", position:"relative" }}>
                            <Avatar src={`${staticImage}/${obj.image}`} sx={{ width: "75px", height: "75px" }} />
                            <Typography component="h1" variant="h5"
                                sx={{ margin: "1rem auto" }}
                            >{obj.name}</Typography>

                            <Typography component="h1" variant="h6"
                                sx={{ margin: "1rem auto", }}
                            >summary</Typography>
                            <Typography component="h1" variant="body1"
                                sx={{ margin: "auto" }}
                            >{obj.summary}</Typography>
                            <Stack direction="column"
                            sx={{alignItems:"center",marginTop:"0.5rem"}}
                            >
                                <Fab variant="extended" color="primary" size="small"
                                onClick={(e)=>handleSeeDesc(e,obj.id)}
                                >
                                   {(show.loaded && show.id===obj.id)  ? "close"
                                :"showInfo"   
                                }
                                </Fab>
                            </Stack>
                            {(show.loaded && show.id===obj.id) &&
                                <CustBox
                                sx={{background:theme.palette.common.fadeCharcoal3,color:"white"}}
                                >
                                <Typography component="h1" variant="h6"
                                    sx={{ margin: "1rem auto", }}
                                >Description</Typography>
                                <Typography component="h1" variant="body1"
                                    sx={{ margin: "auto" }}
                                >{obj.desc}</Typography>
                            </CustBox>
                            }
                        </Card>

                    </Grid>
                ))}
            </Grid>

        </CustPaper>
    )
}

export default ProductServices