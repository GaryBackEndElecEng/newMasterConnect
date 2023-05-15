import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import styles from './corporate.module.css';
import { Typography } from '@mui/material';
import corporateArr from './corpArr';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const CustCoverPage=styled.div`
margin:auto;
opacity:1;
padding-inline:2rem;
padding-block:1rem;
position:relative;
height:100vh;
width:100vw;
display:flex;
justify-content:center;
align-items:center;
// border:1px solid red;
// background:yellow;
z-index:2;
flex-direction:column;
background-image:url(${({bgimage1})=>bgimage1});
background-position:50% 50%;
background-size:100% 100%;
animation: appearIn 2s ease-in-out;
@ketframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    height:70vh;
    background-position:50% 50%;
    background-size:175% 100%;

}
@media screen and (max-width:600px){
    height:60vh;
    background-position:47% 50%;
    background-size:200% 100%;
    margin-bottom:2rem;
}
`;
const CustPortalSwirl = styled.img`
position:absolute;
opacity:0;
width78%;
height:75%;
top:12.5%;
z-index:0;
animation: swirl 25s linear;
@keyframes swirl{
    from {transform:rotate(-360deg);opacity:1;}
    95% {opacity:1;}
    to {transform:rotate(0deg);opacity:0;}
}
@keyframes fade{
    from {transform:rotate(-360deg);}
    to {transform:rotate(0deg);}
}


@media screen and (max-width:900px){
    width:130%;
    height:75%;
    top:13%;
}
@media screen and (max-width:600px){
    top:15%;
    width:153%;
    height:70%;
}
`;

const CustCartoonsLeft=styled.div`
position:absolute;
top:${({top})=>top}%; //40%
left:${({left})=>left}%; //41%
background-image:url(${({bgimage})=>bgimage});
opacity:${({opacity})=>opacity};
background-position:${({backgroundposition})=>backgroundposition};
background-size:100% 100%;
height:300px;
filter:saturate(2);
width:275px;
height:275px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
animation:${({animation})=>animation};
@keyframes sweepInLeft {
    0% {opacity:0; transform:translate(-${({left,random})=>(left +random)*7}%,-${({top})=>top*4}%) skewX(45deg);}
    25% {opacity:1; transform:translate(-${({left,random})=>(left +random)*5}%,-${({top})=>top*3.0}%) skewX(30deg);}
    50% {opacity:1; transform:translate(-${({left,random})=>(left +random)*2.5}%,-${({top})=>top*3.0}%) skewX(20deg);}
    75% {opacity:1; transform:translate(-${({left,random})=>(left +random)*1}%,-${({top})=>top*3}%) skewX(10deg);}
    85% {opacity:0.67; transform:translate(-${({left,random})=>(left)*1}%,-${({top})=>top*0.5}%) skewX(0deg);}
    to {opacity:0; transform:translate(0%,0%) skew(0deg) skewX(0deg);}
}
@media screen and (max-width:900px){
    height:200px;
    width:200px;
}
@media screen and (max-width:600px){
    height:125px;
    width:125px;
}

`;
const CustCartoonsRight=styled.div`
position:absolute;
top:${({top})=>top}%; //40%
right:${({right})=>right}%; //41%
background-image:url(${({bgimage})=>bgimage});
opacity:${({opacity})=>opacity};
background-position:${({backgroundposition})=>backgroundposition};
background-size:100% 100%;
filter:saturate(2);
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:275px;
height:275px;
animation:${({animation})=>animation};
@keyframes sweepInRight {
    0% {opacity:0; transform:translate(${({right,random})=>(right +random)*7}%,-${({top})=>top*4}%) skewX(45deg);}
    25% {opacity:1; transform:translate(${({right,random})=>(right+random)*5}%,-${({top})=>top*3.0}%) skewX(30deg);}
    50% {opacity:1; transform:translate(${({right,random})=>(right+random)*2.5}%,-${({top})=>top*3.0}%) skewX(20deg);}
    75% {opacity:1; transform:translate(${({right,random})=>(right+random)*1}%,-${({top})=>top*3}%) skew(10deg);}
    85% {opacity:0.67; transform:translate(${({right,random})=>(right)*1}%,-${({top})=>top*0.5}%) skewX(0deg);}
    to {opacity:0; transform:translate(0%,0%) skewX(0deg);}
}
@media screen and (max-width:900px){
    height:200px;
    width:200px;
}
@media screen and (max-width:600px){
    height:125px;
    width:125px;
}

`;

const CoverPage = ({start}) => {
    const {staticImage}=React.useContext(GeneralContext);
    const portal=`${staticImage}/corporate/portal.png`;
    const portalSwirl=`${staticImage}/corporate/portalSwirl.png`;
    const [getArr,setGetArr]=React.useState({loaded:false,data:[]});
    const [getArr2,setGetArr2]=React.useState({loaded:false,data:[]});
    const [corpArr,setCorpArr]=React.useState({loaded:false,data:[]});
    const [statement,setStatement]=React.useState(null);
    const timing =window.innerWidth <900 ? (window.innerWidth < 600 ? "":""):"";

    React.useEffect(()=>{
        if(corporateArr){
            setCorpArr({loaded:true,data:corporateArr});
        }
    },[corporateArr]);

    React.useEffect(()=>{
        setTimeout(()=>{if(start){setStatement(true);}},23000);
    },[start]);

    React.useMemo(()=>{
    const genArr=()=>{
        const arr=[];
        for(let i=0;i<10;i++){
            arr.push(
                {
                    id:i+1,
                    name:`"employee${i+1}"`,
                    image:`${staticImage}/corporate/img${i+1}.png`,
                    statement:" somethingHere"
                }
            )
        }
        setGetArr({loaded:true,data:arr});
    }
    genArr();
    const genArr2=()=>{
        const arr=[];
        for(let i=0;i<10;i++){
            arr.push(
                {
                    id:i+1,
                    name:`"client${i+1}"`,
                    image:`${staticImage}/corporate/img${i+1}.png`,
                    statement:" somethingHere"
                }
            )
        }
        setGetArr2({loaded:true,data:arr});
    }
    genArr2();
    },[]);
    
    // console.log(Math.ceil(Math.random()*10))
  return (
    <CustCoverPage
    bgimage1={portal}
    className={styles.custCoverPage}
    // style={{backgroundImage:`url(${portal})`}}
    >
    <CustPortalSwirl src={portalSwirl} alt="www.masterconnect.ca"/>
        
        {getArr.loaded && start ? 
        getArr.data.map((obj,index)=>(
            <CustCartoonsLeft key={`${obj.id}-corporate-cartoons-${index}`}
            opacity={1}
            bgimage={obj.image}
            backgroundposition={"50% 50%"}
            top={40}
            left={41}
            random={Math.ceil(Math.random()*10)}
            animation={`sweepInLeft ${1+(index +1)*2}s ease-in forwards ${0}s`}
            >
                <p
                className={styles.fontCartoon}
                >
                    {obj.name}
                </p>
            </CustCartoonsLeft>
        ))
        :
        <div><h5>loading...</h5></div>
        }

        {
        getArr2.loaded && start ? 
        getArr2.data.map((obj,index)=>(
            <CustCartoonsRight key={`${obj.id}-corporate-cartoons-${index}`}
            opacity={1}
            bgimage={obj.image}
            backgroundposition={"50% 50%"}
            top={40}
            right={41}
            left={0}
            random={Math.ceil(Math.random()*10)}
            animation={`sweepInRight ${1+(index +1)*2}s ease-in forwards ${0}s`}
            >
                <p
                className={styles.fontCartoon}
                >
                    {obj.name}
                </p>
            </CustCartoonsRight>

            
        ))
        :
        <div><h5>loading...</h5></div>
        }
        {
        statement &&
        <div
            className={styles.statement}
        >
            
                <p className={styles.fontStyleStatement}>Corporate Alignment</p>
                {
                corpArr.loaded &&
                
                (
                corpArr.data.map((obj,index)=>(
                    <Typography component="h2" variant={"h6"}
                    key={`${obj.id}--statement--${index}`}
                    className={styles.subStatement}
                    style={{animation:`${styles.growUp} ${index*2 + 2}s ease-in`}}
                    >
                        <span><ArrowRightAltIcon
                        className={styles.number}
                        sx={{animation:`${styles.growShrinkNumber} ${index*2 + 2}s ease-in`}}
                        />
                        </span>
                        {obj.desc}
                    </Typography>
                ))
                )
                
                }
        
        </div>
            }

    </CustCoverPage>
  )
}


export default CoverPage