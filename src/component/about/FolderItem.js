import React from "react";
import styles from "./about.module.css";
import styled from "styled-components";
import TextPageContainer from './TextPageContainer';
import folderContent from './folderContent.json';
import AboutMain from "./AboutMain";
import AboutMainAfter from "./AboutMainAfter";
import Imagery from "./Imagery";
import Longevity from "./Longevity";
import MouseIcon from '@mui/icons-material/Mouse';
import { Stack, Typography, Grid, CardMedia, Container } from "@mui/material";

const CustMainFolder=styled.div`
margin:10vh auto;
// border:5px solid red;
height:90vh;

// width:100%;
overflow:hidden;
@media screen and (max-width:900px){
  margin:1rem auto;
  display:flex;
  flex-direction:column;
  min-height:0;
  height:auto;
  width:100%;
}
@media screen and (max-width:600px){
  width:100vw;
  padding-inline:1rem;
}
`;
const CustFolderItem= styled.div`
position:absolute;
margin:auto;
// width:100%;
inset:0;
z-index:0;
left:${({left})=>left};
// transform:translateX(${({translatex})=>translatex});
transition: all 1.5s ease-in-out;
height:90vh
transition:all 1.5s ease-in-out;
@media screen and (max-width:900px){

  min-height:0;
  width:100%;
  height:auto;
  padding-inline:1rem;
  position:static;
  display:flex;
  flex-direction:column;
  justify-content:stretch;
  align-items:stretch;
    padding-inline:0rem;
    overflow:visible;
}

`;

const Page=styled.div`
position:relative;
margin:1rem auto;
width:100%;
display:flex;
flex-wrap:nowrap;
justify-content:stretch;
align-items:stretch;
align-items:flex-start;
overflow:hidden;
width:100%;
height:90vh;
z-index:${({zindex})=>zindex};
background:${({bg})=>bg};
gap:0;
box-shadow:1px 1px 4px 1px ${({bscolor})=>bscolor};
transition: all 1.5s ease-in-out;
@media screen and (max-width:900px){
  position:static;
  flex-wrap:wrap;
  flex-direction:column;
  padding-inline:0rem;
  overflow:visible;
  height:auto;
}
@media screen and (max-width:600px){}
`;
const TabPosition=styled.div`
position:relative;
cursor:pointer;
min-height:90vh;
width:8%; //8% of the page width(100%)
height:100%;
left:${({left})=>left};
background-color:black;
transform:translateX(0%);
z-index:2000;
transition:transform 1.5s ease-in-out;
@media screen and (max-width:900px){
  display:none;
  margin:2rem auto;
  min-height:auto;
    position:static;
    width:100%;
    transition:opacity 1.5s ease-in-out;
    background:transparent;

    
}
@media screen and (max-width:600px){
  
  
}
`;
const TypoStack=styled(Stack)`
position:absolute;
top:15%;
justify-content:center;
align-items:center;
left:${({left})=>left};
transform:rotate(90deg);
@media screen and (max-width:900px){
  left:0%;
  transform:rotate(0deg);
}
`;






const FolderItem = ({obj,getWidth,fontSize }) => {
    const [reposition,setReposition]=React.useState({loaded:false,name:null,translatex:null,reset:false});
    const [hidetab,setHideTab]=React.useState(false);
    const [sixHundred,setSixHundred]=React.useState(false);
    const testFontSize = getWidth < 900 ? (getWidth < 600 ? "h6" : "h4") :"h3";
    const folderLogic= (reposition.loaded && reposition.name===obj.object && !reposition.reset) ? true:false;

 const adjustFloderLeft =React.useCallback(()=>{
  if(obj.object==="Connect"){
    return {main:"0%",tab:"0%",tab900:"-2%",translatxRest:"0%"};
  }else if(obj.object==="Design"){
    return {main:"57%",tab:"-0%",tab900:"-40%",translatexRest:"0%"};
  }else{
    return {main:"65%",tab:"0%",tab900:"-40%",translatexRest:"0%"};
  }
 },[obj]);
    
    React.useEffect(()=>{
        if(getWidth <900){
            setHideTab(true);
        }if(getWidth <600){
            setSixHundred(true);
        }
    },[]);

    const handleShow=(e,obj)=>{
      
        e.preventDefault();
         if(!reposition.loaded && obj.object==="Design"){
          setReposition({loaded:true,name:obj.object,translateIn:"8%",reset:false});
          // console.log("here");
        }else if(!reposition.loaded && obj.object==="OwnerShip"){
          setReposition({loaded:true,name:obj.object,translateIn:"6%",reset:false});
          // console.log("here");
        }else if(folderLogic){
          setReposition({loaded:false,name:"Connect",translateIn:"0%",reset:false});
          console.log("here");
        }else if(obj.object === "Connect"){
          // console.log("Connect");
          setReposition({loaded:false,name:"Connect",translateIn:"0%",rest:true});
        }

    };
    
  return (
    <CustMainFolder
    //  className={styles.custMainFolder}
     >
      <CustFolderItem 
      left={folderLogic  ? (reposition.translateIn):adjustFloderLeft().main}
      // className={styles.custFolderItem}
      >
        <Page
        
        zindex={folderLogic ? 200:1}
        left={"0%"}
        bg={folderLogic ? "black":"transparent"}
        >
          <TabPosition 
          onClick={(e)=>handleShow(e,obj)}
          left900={sixHundred ? "1%":adjustFloderLeft().tab900}
          left={"-5%"}
          zindex={3000}
          opacity={1}
          // opacity={hidetab ? 0:1}
           >
            <TypoStack direction="row">
              <Typography component="h1" variant={getWidth < 600 ? "body2":testFontSize}
              left={obj.object ==="Design" ? "-50%" :"-52%"}
             
              >
                {obj.object} 
              </Typography>
              <MouseIcon sx={{color:"red",ml:1}}/>
              </TypoStack>
          </TabPosition>
          
            <TextPageContainer 
            opacity={folderLogic ? "1":"0" }
            folderLogic={folderLogic}
            reposition={reposition}
            getWidth={getWidth}
              obj={ obj}

            />
       
          
        </Page>
      </CustFolderItem>
      </CustMainFolder>
     
  );
};

export default FolderItem;
