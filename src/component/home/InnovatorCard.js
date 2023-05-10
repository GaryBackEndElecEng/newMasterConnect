import React from "react";
import { Box, Card, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import styles from "./home.module.css";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CustCard = styled(Card)`
position:relative;
margin:${({open})=>open ? "2vh auto" : "0px"};
height:${({open})=>open ? "50vh":"4.7vh"};
background:${({open})=>open ? "var( --background-555 )":"transparent"};
box-shadow:${({open})=>open ? "1px 1px 15px 1px white":"none"};
animation:${({open})=>open ? "innovationShowOn" : "innovationShowOff"} 1.5s ease-in;
@keyframes innovationShowOn{
  from {height:4.7vh}
  to {height:50vh}
}
@keyframes innovationShowOff{
  from {opacity:1;height:50vh}
  to {opacity:1;height:4.7vh}
}
@media screen and (max-width:900px){
  height:${({open})=>open ? "50vh":"3.8vh"};
  @keyframes innovationShowOn{
    from {opacity:1;height:3.8vh}
    to {opacity:1;height:50vh
  }
  @keyframes innovationShowOff{
    from {opacity:1;height:50vh}
    to {opacity:1;height:3.8vh}
  }
}
@media screen and (max-width:600px){
  height:${({open})=>open ? "95vh":"3.9vh"};
  @keyframes innovationShowOn{
    from {opacity:1;height:3.9vh}
    to {opacity:1;height:95vh
  }
  @keyframes innovationShowOff{
    from {opacity:1;height:95vh
    to {opacity:1;height:3.9vh}
  }
}
`;
const CustStack=styled(Stack)`
Margin:${({open})=>open ? "2rem auto":"0 auto"};
opacity:${({open})=>open ? 1:0};
height:${({open})=>open ? "100%":"0"};
justify-content:center;
z-index:100;
align-items:center;
box-shadow:1px 1px 5px 1px white;
animation: ${({open})=>open ? "smoothOpen": "smoothClose"} 1s ease-in;
@keyframes smoothOpen {
    from { opacity:0.5; height:0;}
    to { opacity:1; height:100%;}
}
@keyframes smoothClose {
    from { opacity:1; height:100%;}
    to { opacity:0; height:5vh;}
}
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){
  
}

`;
const InnovatorCard = ({obj,fontSize,textFontSize}) => {
    const [open, setOpen] = React.useState({ id: null, loaded: false });
    

    const handleOpen = (e, name) => {
        e.preventDefault();
        
        switch(true){
          case (open.id !==name && open.loaded):
            setOpen({ loaded: true, id: name });
            // console.log("open new + while open.loaded===true")
            break;
          case ( open.id ===name && open.loaded):
            setOpen({ loaded: false, id: null });
            // console.log("closes the opened")
            break;
          case (open.loaded):
            setOpen({ loaded: false, id: null });
            // console.log("has no effect")
            break;
          default:
            setOpen({ loaded: true, id: name });
            // console.log("opens single item initial start")
            return
        }
      };
  return (
    <CustCard
              open={open.loaded && open.id===obj.name}
                id={obj.name}
              
              >
              
                  <Stack className={(open.loaded && open.id===obj.name) ? styles.changeColor : styles.removeColor}
                    direction="row"
                    spacing={5}
                    onClick={(e) => handleOpen(e, obj.name)}

                    sx={{height:{sm:"auto",xs:"auto"},cursor:"pointer"}}
                  >
                    <IconButton sx={{width:"auto",height:{sm:"auto",xs:"auto"}}}>
                      {(open.loaded && open.id===obj.name) ? <RemoveIcon sx={{ color: "black", mr: 10,cursor:"pointer" }} /> :<AddIcon sx={{ color: "white", mr: 1,cursor:"pointer" }} />}
                      
                    </IconButton>
                    <Typography component="h1" 
                    variant={(open.loaded && open.id===obj.name) ? "h3": textFontSize}
                    className={(open.loaded && open.id===obj.name) ? styles.changeTextColor : styles.removeTextColor}
                     >
                      {obj.name}
                    </Typography>
                  </Stack>
              
                  <CustStack direction="column" spacing={2} open={open.loaded && open.id === obj.name} >

                    <Stack direction={{xs:"column",sm:"row"}} spacing={{ xs: 2, md: 6 }} sx={{margin:"2rem auto"}} className={styles.openLoadedTrue}>
                      <Typography component="h1" variant="h6" sx={{width:{sm:"70%",xs:"100%"}}}
                      className={(open.loaded && open.id===obj.name) ? styles.mainTextOn :styles.maineTextOff}
                      >
                        {obj.desc}
                      </Typography>
                      <Box>
                      <Typography component="h1" variant="h4" sx={{margin:"1rem auto"}}
                      className={(open.loaded && open.id===obj.name) ? styles.mainTextOn :styles.maineTextOff}
                      >
                        More
                      </Typography>
                      <Typography component="h1" variant="h6"
                      className={(open.loaded && open.id===obj.name) ? styles.mainTextOn :styles.maineTextOff}
                      >
                        {obj.more}
                      </Typography>
                      </Box>
                    </Stack>
                    <Box className={(open.loaded && open.id===obj.name) ? styles.mainTextMore2 :styles.maineTextOff}>{obj.more2}</Box>
                  </CustStack>
              </CustCard>
  )
}

export default InnovatorCard