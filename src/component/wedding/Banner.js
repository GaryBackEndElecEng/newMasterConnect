import React from 'react';
import {Stack,Typography,Grid,Container,Fab} from "@mui/material";
import styled from "styled-components";
import styles from './wedding.module.css';
import SpaIcon from '@mui/icons-material/Spa';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';


const CustBanner = styled.div`
opacity:${({open})=>open ? "1":"0"};
padding-block:1rem;
position:static;
top:22%;
background:${({ bg,open }) =>open ?  bg : "white"};
height:48vh;
// height:48svh;
width:100%;
color:${({ color,open }) =>open ? color : "black"};
animation: ${({open})=>open ? "openThis":""} 1.75s ease-in-out;
@keyframes openThis {
    from {opacity:0; transform:translateY(40%);}
    to {opacity:1; transform:translateY(0%);}
}
@media screen and (max-width:600px){
  top:66%;
}
`;

const Banner = ({color,bg}) => {
    const bannerRef=React.useRef(null);
    const theme = useTheme();
    const [open,setOpen]=React.useState(false);
    const threshold=window.innerWidth <900 ? 0.5 : 0.8;

    React.useEffect(()=>{
        const observer= new IntersectionObserver(entries=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setOpen(true);
            }
        },{threshold:threshold});
        if(bannerRef.current){
            observer.observe(bannerRef.current);
            return ()=>observer.disconnect();
        }

    },[]);

  return (
    <CustBanner
    color={color}
    bg={bg}
    ref={bannerRef}
    open={open}
    >
    <Container maxWidth={"sm"} sx={{ margin: "2rem auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}
    >
        <Stack direction={"column"} sx={{ margin: "auto" }}>
        <Typography component="h1" variant={window.innerWidth <600 ? "h4":"h2"} sx={{ fontFamily: "Ibarra Real Nova" }}>
            Like A Flower(<SpaIcon sx={{ ml: 1, fontSize: {sm:"50px",xs:"30px"}, color: "blue)grey" }} />),
        </Typography>
        <Typography component="h1" variant={window.innerWidth <600 ? "h5":"h4"} sx={{ fontFamily: "Ibarra Real Nova",margin:"0.5rem auto" }}>
            "Love Is A Rush Of Fragmented Colors Entering My momentary Thoughts,,,"
        </Typography>
        <Typography component="h1" variant="h5" sx={{ fontFamily: "Ibarra Real Nova" }}>
            When I'm With You,,,---<FavoriteIcon sx={{ ml: 1, color: "pink" }} />
        </Typography>
        </Stack>

        <Stack direction="column" sx={{ maxWidth: "350px", mt: 2 }}>
        <Typography component="h1" variant="body1">
            This, and all content can be editable, through an editor, with font changes, if desired.
        </Typography>
        </Stack>
        <Stack direction="column" sx={{ mt: 2 }}>
        <Fab variant="extended" sx={{ background: theme.palette.common.orangeFade, '&:hover': { background: "white" } }}>Learn More</Fab>

        </Stack>

    </Container>
            </CustBanner>
  )
}

export default Banner