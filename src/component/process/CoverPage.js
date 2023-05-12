import React from 'react';
import {processCoverWordFeed} from '../ultils/tool';
import styled from 'styled-components';
import styles from './process.module.css';

const CustMainCover=styled.div`
margin:auto 25px;
padding:4rem 2rem;
width:100%;
min-height:90vh;
overflow-x:hidden;
overflow-y:auto;
position:relative;
top:20%;
background-color:black;
animation:appearIn 1s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    height:130vh;
    padding:auto;
}
@media screen and (max-width:600px){
    // height:800px;
}

`;
const CustWordEffect =styled.p`
margin:0;
padding:0;
background-size:200% 200%;
background-position:50% 50%;
-webkit-background-clip: text;
-moz-background-clip: text;
background-clip: text;
transform:rotate(${({rotate})=>rotate});
animation: sweepIn 1s ease-in-out forwards ${({forwards})=>forwards}s;
@keyframes sweepIn {
    from {opacity:0; transform:scale(0.5) rotate(180%);}
    to {opacity:1; transform:scale(1) rotate(0deg);}
}
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){

}

`;

const CoverPage = () => {
    const [getWordFeed,setGetWordFeed]=React.useState({loaded:false,data:[]});
    const [open,setOpen]=React.useState(false);
    React.useEffect(()=>{
        setOpen(true);
    },[]);

    React.useEffect(()=>{
        let feedArr=[];
        if(window.innerWidth <900 && window.innerWidth >600){
           feedArr= processCoverWordFeed("sm");
        }else if(window.innerWidth <600){
           feedArr= processCoverWordFeed("xs");
        }else{
            feedArr= processCoverWordFeed("md");
        }
        setGetWordFeed({loaded:true,data:feedArr});
    },[]);

  return (
    <CustMainCover
    open={open}
    >
        {getWordFeed.loaded && getWordFeed.data.map((obj,index)=>(
            <CustWordEffect key={`${obj.id}--wordFeed--${index}`}
            style={{
                position:"absolute",
                fontSize:obj.size,
                top:obj.top,
                left:obj.left,
                color:obj.color,
                backgroundImage:obj.backgroundImage,
            }}
            rotate={obj.rotate}
            forwards={obj.id*0.3 }
            >
                {obj.name}
            </CustWordEffect>
        ))}

    </CustMainCover>
  )
}

export default CoverPage