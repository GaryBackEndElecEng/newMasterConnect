import { Box, Card, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

const Innovators = () => {
  const [open, setOpen] = React.useState({ id: null, loaded: false });
  const [fontSize, setFontSize] = React.useState(null);
  const[textFontSize,setTextFontSize]=React.useState("h4");
  
  React.useEffect(() => {
    if (window.innerWidth < 900) {
      setFontSize("h3");
      setTextFontSize("h4")
    } if (window.innerWidth < 600) {
      setFontSize("h4");
      setTextFontSize("body1");
    } else {
      setFontSize("h1");
      setTextFontSize("h4");
    }
  }, []);
  const arr = [
    {
      id: 1,
      name: "Discovery",
      desc: " A thorough discovery is at the core of every successful digital crafted solution.Understanding your clients needs is critical to the final product. A great design starts with client's needs. ",
      more: <Link  style={{color:"red",cursor:"pointer"}} to="/process">more About this</Link>,
      more2: <Link style={{color:"red",cursor:"pointer"}} to="/contact">learn more</Link>,
    },
    {
      id: 2,
      name: "Strategy",
      desc: " Strategy & planning is everything. The needs of digital consumers are not the same today as they were yesterday. We have the experience and knowledge needed to create a smart strategy for your business in the aim to lower cost and improve digital services. ",
      more: <Link  style={{color:"red",cursor:"pointer"}} to="/about">more about this</Link>,
      more2: <Link style={{color:"red",cursor:"pointer"}} to="/services">learn more</Link>,
    },
    {
      id: 3,
      name: "Web Solutions",
      desc: " Web design and development is what we do. Designing and developing for numerous screen sizes and devices takes precision, which is why our hand-crafted, innovative online solutions are second to none.",
      more: <Link style={{color:"red",cursor:"pointer"}} to="/designs">designs</Link>,
      more2: <Link style={{color:"red",cursor:"pointer"}} to="/contact">learn more</Link>,
    },
    {
      id: 4,
      name: "Responsive Design & Mobile Apps",
      desc: " We are experts at delivering and engaging experience on mobile devices of all shapes and sizes. We know which best practices to follow and how we can deliver the essential data feedback for a dynamic market. ",
      more: <Link style={{color:"red",cursor:"pointer"}} to="/process">something here</Link>,
      more2: <Link tyle={{color:"red",cursor:"pointer"}} to="/contact">learn more</Link>,
    },
    {
      id: 5,
      name: "Enterprise CMS Solutions",
      desc: "if you are looking for the power and efficiencies found with enterprise content management solutions, we can help. Our enterprise solutions enable you to leverage your business content in an improved means - cutomized for your business. ",
      more: <Link style={{color:"red",cursor:"pointer"}} to="/services">something here</Link>,
      more2: <Link style={{color:"red",cursor:"pointer"}} to="/contact">learn more</Link>,
    },
    {
      id: 6,
      name: "Digital Marketing",
      desc: "You've spent a lot of time and money getting your business to where it is today and we understand this. Let us help you take your take your business to the next level on improved exposure.",
      more: <Link style={{color:"red",cursor:"pointer"}} to="/services">something here</Link>,
      more2: <Link style={{color:"red",cursor:"pointer"}} to="/contact">learn more</Link>,
    },
  ];
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
    <div className={styles.mainInnovator}>
    <Container maxWidth="xl" sx={{margin:"5vh auto"}} >
      <Grid container
       sx={{position:"relative",justifyContent:"center", alignItems:"flex-start"}}
      >
        <Grid item xs={12} md={6} spacing={1} sx={{borderRight:{md:"1px solid white"}}} >
          <Typography
            component="h1"
            variant={fontSize}
            className={styles.fontStyle_2}
          >
            We are innovators in creative web design in Montreal.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} spacing={1} sx={{position:"relative"}}>
          <Typography component="h1" variant={"h2"} className={styles.font} sx={{textAlign:"center",marginBottom:"1rem",color:"white"}}> We Offer</Typography>
          {arr &&
            arr.map((obj, index) => (
              <CustCard
              open={open.loaded && open.id===obj.name}
                key={`${obj.id}-${obj.name}-${index}`}
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
            ))}
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default Innovators;
