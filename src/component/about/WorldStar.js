import React,{useContext, useEffect,useState} from 'react'
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';

const StartContainer = styled.div.attrs({className:"worldStar"})`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-color:transparent;
position:absolute;
width:100px;
height:100px;
top:5%;
left:0%;
z-index:1000;
animation: moveAndVanish 20s ease-in-out infinite;

@keyframes moveAndVanish {
    0% {
        transform:scale(0) translate(0%,0%);
    }
    25% {
        transform:scale(.5) translate(400%,50%);
    }
    50% {
        transform:scale(1.25) translate(900%,200%);
    }
    75% {
        transform:scale(.5) translate(400%,500%);
    }
    to{
        transform:scale(0) translate(0%,900%);
    }
    
}
@media screen and (max-width:600px){
    @keyframes moveAndVanish {
        0% {
            transform:scale(0) translate(0%,0%);
        }
        25% {
            transform:scale(.5) translate(250%,50%);
        }
        50% {
            transform:scale(1.25) translate(250%,200%);
        }
        75% {
            transform:scale(.5) translate(300%,500%);
        }
        to{
            transform:scale(0) translate(0%,900%);
        }
        
    }
}

`;

const WorldStar = ({count}) => {
    const theme=useTheme();
    const [word,setWord]=useState("");
    
    useEffect(()=>{
        const changeWord=()=>{
            const words=["Recognition","26% Annual Growth","Residue Income","Client/Staff unity","Work Mobility"]
            let randomWord=Math.ceil(Math.random()*5)< 5 ? Math.ceil(Math.random()*5): 0;
            setTimeout(()=>{
                changeWord();
            },7000)
           return  setWord(words[randomWord]);
        }
        changeWord();
        
    },[])
    const {staticImage} = useContext(GeneralContext);
    const starPic=`${staticImage}/star.png`
  return (
    <StartContainer >
        <Typography component="h1" variant="h4" sx={{color:theme.status.danger}}>{word}</Typography>
        <img src={starPic} alt="www.master-connect.ca"style={{width:"100%"}}/>
        </StartContainer>
  )
}

export default WorldStar