import React from 'react';
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';

const CustTopWord=styled.p`
position:absolute;
z-index:10;
top:70%;
/* left:5%; */
background-image:var(--background-image-1-turn);
background-size:200% 100%;
background-clip:text;
-webkit-background-clip:text;
color:transparent;
font-size:1000%;
-webkit-text-stroke:1px white;
animation: ${({turnon})=>turnon ? "moveUpDown":null} 3s ease-in-out;
@keyframes moveUpDown {
    from {transform:translateY(0%);opacity:0.5}
    50% {transform:translateY(-20%);}
    to {transform:translateY(0%);}
}
@media screen and (max-width:900px){
    font-size:800%;
    top:60%;
}
@media screen and (max-width:600px){
    font-size:500%;
}
@media screen and (max-width:380px){
    font-size:400%;
}
`;

const TopCoverWord = ({word}) => {
    const {setDesign10Start}=React.useContext(GeneralContext);
    const wordRef=React.useRef(null);
    const [turnon1,setTurnon1]=React.useState(null);
    React.useEffect(()=>{
        const observer=new IntersectionObserver(entries=>{
            let entry=entries[0];
            setTurnon1(entry.isIntersecting);
            if(entry.isIntersecting){
                setTimeout(()=>{setDesign10Start(true);},30000);
            
            }
        },{threshold:0.5});
        if(wordRef.current){
            observer.observe(wordRef.current);
            return ()=>observer.disconnect();
        }
    },[]);
  return (
    <CustTopWord
    ref={wordRef}
    turnon={turnon1}
    >
        {word}
    </CustTopWord>
  )
}

export default TopCoverWord