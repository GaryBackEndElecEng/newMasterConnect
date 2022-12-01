import React, { useState,  useEffect,} from 'react';
import {  Container } from '@mui/material';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
// import styles from './design11.module.css';

const MainCover = styled.div`
width:${({ _width }) => _width}vw;
height:100vh;
display:inline-flex;
position:relative;
margin-left:0px;
transform:translateX(${({ trans }) => trans}%);
animation: alignTranslate 1s ease-in-out;
@keyframes alignTranslate {
    from {transform:translateX(0%);}
    to {transform:translateX(0%);}
}

background:white;
@media screen and (max-width:900px){
    display:inline-flex;
    width:${({ smWidth }) => smWidth}px;
    transform:translateX(${({ smTrans }) => smTrans}%);
    height:auto;
}
@media screen and (max-width:800px){
    display:inline-flex;
    width:${({ sm1Width }) => sm1Width}px;
    transform:translateX(${({ smTrans }) => smTrans}%);
    height:auto;
}

@media screen and (max-width:420px){
    display:inline-flex;
    height:auto;
width:${({ xsWidth }) => xsWidth}px;
    transform:translateX(${({ xsTrans }) => xsTrans}%);
}
@media screen and (max-width:400px){
    display:inline-flex;
    height:auto;
width:${({ xs1Width }) => xs1Width}px;
    transform:translateX(${({ xsTrans }) => xsTrans}%);
}


`;
const MainImage = styled.img`

width:100%;
z-index:0;

@media screen and (max-width:900px){
    width:900px;
}
@media screen and (max-width:800px){
    width:800px;
}
@media screen and (max-width:600px){
    width:600px;
}
@media screen and (max-width:500px){
    width:500px;
}


`;
const SecondMain = styled(Container)`
margin:2rem auto;
display:flex;
width:100vw;
min-height:80vh;
position:relative;
justify-content:center;
overflow:scroll;
align-items:center;
animation: growHere 1s ease-in-out;
@keyframes growHere {
    from {opacity:0;}
    to {opacity:1;}
}


`;
const ImageTitle=styled.img`
width:100%;
@media screen and (max-width:850px;){
width:100%;

}
@media screen and (max-width:800px;){
width:80%;

}
@media screen and (max-width:600px;){
width:100vw;

}
@media screen and (max-width:400px;){
width:100vw;

}
`;

const CoverPage = ({ arr }) => {
    const [counter, setCounter] = useState(0);
    const [atMax, setAtMax] = useState(false);
    const [opacity, setOpacity] = useState(1);
    let getWidth = 5 * 100;
    const isAtMax = atMax ? "" : "transform 3.5s ease-in-out";

    useEffect(() => {
        let count = 0;
        const incCount = () => {
            // console.log("before count",count,)
            if (count < 4) {
                setAtMax(false);
                setOpacity(1);
                setTimeout(() => {
                    setCounter(count);
                    count= count + 1;
                    // console.log("after count",count,);
                    return incCount();
                }, 7100)
            } else if (count === 4) {
                setCounter(4);
                setOpacity(1);
                setTimeout(() => {
                    setCounter(0);
                    setAtMax(true);
                    count = 0;
                    incCount();
                    setOpacity(0);
                }, 7000);





            }

        }
        incCount();
    }, []);
    // console.log(counter)

    return (
        <>
            { opacity ===1 ? 
            <MainCover
                trans={-20.5 * counter}
                smTrans={-20 * counter}
                _width={getWidth}
                smWidth={5 * 910}
                sm1Width={5 * 820}
                xsWidth={5 * 620}
                xs1Width={5 * 522}
                xsTrans={-20 * counter}
                style={{ opacity: opacity, transition: isAtMax, position: "relative" }}
            >
                <MainImage src={arr[0]} alt="www.master-connect.ca" />
                <MainImage src={arr[1]} alt="www.master-connect.ca" />
                <MainImage src={arr[2]} alt="www.master-connect.ca" />
                <MainImage src={arr[3]} alt="www.master-connect.ca" />
                <MainImage src={arr[4]} alt="www.master-connect.ca" />
            </MainCover>

            :
            <SecondMain maxWidth="xl">

                <ImageTitle src={arr[5]} alt="www.master-connect.ca" style={{wisth:"100%"}}/>
            </SecondMain>}
        </>

    )
}

export default CoverPage