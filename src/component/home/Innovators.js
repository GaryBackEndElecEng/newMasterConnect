
import React from "react";
import {  Card, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InnovatorCard from './InnovatorCard';

const MainInnovator=styled.div`
// background:var(--background-111);
z-index:100;
width:100%;
padding: 5vh auto;
// border:1px solid red;
padding-block:2rem;

@media screen and (max-width:920px){
margin:auto 0.5rem;
}
@media screen and (max-width:600px){
  
}

`;


const Innovators = () => {
  const [fontSize, setFontSize] = React.useState(null);
  const[textFontSize,setTextFontSize]=React.useState("h4");
  const specFont=window.innerWidth < 920 ? (window.innerWidth < 600 ? "h4" : "h3") : "h2"

  
  React.useEffect(() => {
    if (window.innerWidth < 920) {
      setFontSize("h3");
      setTextFontSize("h4")
    } if (window.innerWidth < 600) {
      setFontSize("h4");
      setTextFontSize("body1");
    } else {
      setFontSize("h1");
      setTextFontSize("h4");
    }
  }, [setFontSize,setTextFontSize]);
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
  

  return (
    <MainInnovator
     className={styles.mainInnovator}
     >
    <Container maxWidth="xl" sx={{padding:{xs:"5vh auto",md:"5vh auto",sm:"5vh 0.5rem"}}} >
      <Grid container spacing={1}
       sx={{position:"relative",justifyContent:"center", alignItems:"flex-start"}}
      >
        <Grid item xs={12} md={6}  >
          <Typography
            component="h1"
            variant={specFont}
            className={styles.fontStyle_2}
          >
            We are innovators in creative web design in Beautiful Montreal.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{position:"relative"}}>
          <Typography component="h1" variant={"h2"} className={styles.font} sx={{textAlign:"center",marginBottom:"1rem",color:"white"}}> We Offer</Typography>
          {arr &&
            arr.map((obj, index) => (
              <div  key={`${obj.id}-${obj.name}-${index}`}>
              <InnovatorCard obj={obj} fontSize={fontSize} textFontSize={textFontSize}  />
              </div>
            ))}
        </Grid>
      </Grid>
    </Container>
    </MainInnovator>
  );
};

export default Innovators;
