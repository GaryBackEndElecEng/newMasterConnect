import React, {  useEffect, useState, } from 'react'

import { Typography} from '@mui/material';
import styled from 'styled-components';
let count=1;


const SpellTypeMain = styled(Typography)`
position: absolute;
top:0%;
left:37%;
width:90%;
color:white;
z-index:1000;
@media screen and (max-width:900px){
    top:3%;
    left:32.5%;
}
@media screen and (max-width:600px){
    top:1%;
    left:15%;
}
`;
const SpanCount=styled.span`
animation: slowShow ${({count})=>count}s ease-in-out;
@keyframes slowShow {
    from {opacity:0;transform:translateY(-90%);}
    to{opacity:1;transform:translateY(0%);}
}

`;
const SpellType = () => {
    const [spellOut,setSpellOut]=useState(null);

    useEffect(()=>{
        const phrase=' Learning is living';
        const words=phrase.split(" "); let arr=[]
        words.forEach((word,index)=>{
            
            arr.push(word + " ")
        });
        setSpellOut(arr);
    },[]);

    const countFunc =()=>{
        
        if( spellOut && count < spellOut.length ){
            // console.log("inside",count)
            count++;
            setTimeout(()=>{
                countFunc();
            },600);

        }
    }

    useEffect(()=>{
        // console.log("inside effect")
        countFunc();
    
    },[]);
    // console.log(count,spellOut[count])
  return (
    <SpellTypeMain component="h1" variant="h4">
        {spellOut && spellOut.map(obj=>(
            <SpanCount count={3} key={`${obj}-${Math.ceil(Math.random()*1000)}`} >
                {obj}
            </SpanCount>
        ))}
        
    </SpellTypeMain>
  )
}

export default SpellType