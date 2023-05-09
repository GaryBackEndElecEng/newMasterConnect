import React from "react";
import styles from "./about.module.css";
import styled from "styled-components";
import AboutMain from "./AboutMain";
import AboutMainAfter from "./AboutMainAfter";
import Imagery from "./Imagery";
import Longevity from "./Longevity";
import { Stack, Typography, Grid, CardMedia, Container } from "@mui/material";

const Page=styled.div`
position:relative;
margin:1rem auto;
display:flex;
flex-wrap:nowrap;
justify-content:flex-start;
align-items:flex-start;
width:100%;

z-index:${({zindex})=>zindex};
gap:0;
box-shadow:1px 1px 4px 1px ${({bscolor})=>bscolor};
transform:translateX(${({translatex})=>translatex}%);
transition: all 1.5s ease-in-out;
@media screen and (max-width:900px){
    flex-direction:column;
}
@media screen and (max-width:600px){}
`;
const TabPosition=styled.div`
position:relative;
cursor:pointer;
min-height:90vh;
width:15%;
height:100%;
box-shadow:1px -1px 5px 1px white ;
background-color:black;
transform:translateX(0%);
transition:transform 1.5s ease-in-out;
@media screen and (max-width:900px){
    min-height:5vh;
    height:5vh;
    position:absolute;
    width:28%;
    top:-10%;
    z-index:${({zindex})=>zindex};
    left:${({left})=>left}%;
    opacity:${({opacity})=>opacity};
    transition:opacity 1.5s ease-in-out;
}
@media screen and (max-width:600px){
  left:${({left})=>left}%;
  
}
`;

const PageImageContainer=styled.div`
display:block;
opacity:${({opacity})=>opacity};
position:relative;
height:100%;
display:flex;
justify-content:center;
width:100%;
margin-left:0;
// border:1px solid black;
transition:all 1.5s ease-in-out;
@media screen and (max-width:900px){
    width:90%;
    
}
@media screen and (max-width:600px){
    width:95%;
   
}

`;

const CardMediaImage=styled(CardMedia)`
margin:0;
width:100%;
max-width:900px;
// height:90dvh;
transform:scale(0.7);
opacity:${({opacity})=>opacity};
trasition: all 1.5s ease-in-out;
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){
    height:80vh;
    // padding:50px;
    max-width:350px;
    opacity:0;
    border:1px solid red;
    
}
`;
const TextPageContainer=styled.div`
opacity:${({opacity})=>opacity};
position:absolute;
top:10%;
left:5%;
trasition: all 1.5s ease-in-out;
@media screen and (max-width:900px){}
@media screen and (max-width:600px){
    height:40vh;
    top:0%;
}
`;



const Folder = ({ connect, design, ownership }) => {
    const [reposition,setReposition]=React.useState(true);
    const [reposition1,setReposition1]=React.useState(false);
    const [reposition2,setReposition2]=React.useState(false);
    const [fonSize,setFontSize]=React.useState("h3");
    const [fontSizeH6,setFontSizeH6]=React.useState("h6");
    const [hidetab,setHideTab]=React.useState(false);
    const [sixHundred,setSixHundred]=React.useState(false);
    React.useEffect(()=>{
        if(window.innerWidth && window.innerWidth <900){
            setFontSize("h4");
            setHideTab(true);
        }if(window.innerWidth && window.innerWidth <600){
            setFontSizeH6("body1");
            setFontSize("h6");
            setSixHundred(true);
        }
    },[]);

    const handleShow=(e)=>{
        e.preventDefault();
        // console.log("reposition clicked");
        if(!reposition1 && !reposition2){
            setReposition(true);
            setReposition1(false); setReposition2(false);
           
        }else{
            setReposition1(false); setReposition2(false);
        }

    };
    const handleShow1=(e)=>{
        e.preventDefault();
        
        if(!reposition1){
            setReposition1(true);
            setReposition(false); setReposition2(false);
        }else{
            setReposition(true);setReposition1(false); setReposition2(false);
        }

    };
    const handleShow2=(e)=>{
        e.preventDefault();
        // console.log("reposition2 clicked");
        if(!reposition2){
            setReposition2(true);
            setReposition1(false); setReposition(false);
        }else{
            setReposition(true);setReposition1(false); setReposition2(false);
        }

    };
   
  return (
    <Container maxWidth="xl" className={styles.mainFolder}>
      <div className={styles.folder} style={{left:"5%"}}>
        <Page
         translatex={0} 
        zindex={!reposition1 && !reposition2 ? 200:1}
        bscolor={!reposition1 && !reposition2 ? "white":"transparent"}
        >
          <TabPosition 
          onClick={(e)=>handleShow(e)}
          left={sixHundred ? 1:-3}
          zindex={3000}
          opacity={hidetab && reposition ? 0:1}
           >
          <div className={styles.tab}>
              <Typography component="h1" variant={window.innerWidth < 600 ? "body1":fonSize}>
                Connect
              </Typography>
              
            </div>
          </TabPosition>
          <PageImageContainer 
          bgimage={connect}
          opacity={!reposition1 && !reposition2 ? 1:0}
          >
            <TextPageContainer opacity={!reposition1 && !reposition2 ? 1:0}>
                <div className={styles.textArea}>
                    <Typography component="h1" variant="h2">Relationship</Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                       We believe the most effective connections are emmotional. Emmotions links to long term memory and has the most long term effects to memory.
                    </Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                       Our interactive web design agency , will help you connect with your audience in exciting and engaging ways through what you do. We want you to be successful and will work effortlessly to help you achieve your goals.
                    </Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                       This is our mission
                    </Typography>
                </div>
            </TextPageContainer>
            <CardMediaImage
              component="img"
              src={connect}
              height="80%"
              alt="www.masterconnect.ca"
              opacity={!reposition1 && !reposition2 && !sixHundred ? 1:0}
              
            />
          </PageImageContainer>
        </Page>
      </div>
      <div className={styles.folder} style={{ left: "20%" }}>
        <Page 
        translatex={reposition1 ? -16 :89} 
        zindex={reposition1 ? 200:1}
        bscolor={reposition1 ? "white":"transparent"}
        >
          <TabPosition 
          onClick={(e)=>handleShow1(e)} 
          left={sixHundred ? -70 :-73}
          zindex={ 3000}
          opacity={hidetab && reposition1 ? 0:1}
           >
          <div className={styles.tab}>
              <Typography component="h1" variant={window.innerWidth < 600 ? "body1":fonSize} >
                Design
              </Typography>
              
            </div>
          </TabPosition>
          <PageImageContainer opacity={reposition1 ? 1:0}>
          <TextPageContainer opacity={reposition1 ? 1:0}>
                <div className={styles.textArea}>
                    <Typography component="h1" variant="h2">Creation</Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                         Brainstorming new ideas helps develop the best strategies and inspired solutions for your brand. In general brands needs to grow and breath responsive to corporate growth.
                    </Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                        We leverage intelligence and technology to create great experiences. Each brand is designed to be unique in every perspect. Like brands, every digital initiative needs to be a custumized and unique approach in driving a statement. As Brands, Corporate identity is unique and so is it's website.
                    </Typography>
                </div>
            </TextPageContainer>
            <CardMediaImage
              component="img"
              src={design}
              height="80%"
              alt="www.masterconnect.ca"
              translatex={-7}
              opacity={reposition1  && !sixHundred ? 1:0}
            />
          </PageImageContainer>
        </Page>
      </div>
      <div className={styles.folder} style={{ left: "35%" }}>
        <Page 
        translatex={reposition2 ? -38 :78} 
        zindex={reposition2 ? 200:1}
        bscolor={reposition2 ? "white":"transparent"}
        >
          <TabPosition 
          onClick={(e)=>handleShow2(e)} 
          left={ sixHundred ? -41 :-46}
          zindex={ 3000}
          opacity={hidetab && reposition2 ? 0:1}
          
           >
          <div className={styles.tab}>
              <Typography component="h1" variant={window.innerWidth < 600 ? "body1":fonSize}>
                Ownership
              </Typography>
            </div>
          </TabPosition>
          <PageImageContainer opacity={reposition2 ? 1:0}>
          <TextPageContainer opacity={reposition2 ? 1:0}>
                <div className={styles.textArea}>
                    <Typography component="h1" variant="h2">Data Control</Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                        What matters to us is data ownership. Data retention is vital to a company's success through online data presense and accessibility, in the holistic view of connecting.
                    </Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                        We create quick and secure data access through effient front-to-back requests to ensure data access reliability.
                    </Typography>
                    <Typography component="h2" variant={fontSizeH6}>
                        We want your business.
                    </Typography>
                </div>
            </TextPageContainer>
            <CardMediaImage
              component="img"
              src={ownership}
              alt="www.masterconnect.ca"
              translatex={-7}
              opacity={reposition2 && !sixHundred  ? 1:0}
            />
          </PageImageContainer>
        </Page>
      </div>
    </Container>
  );
};

export default Folder;
