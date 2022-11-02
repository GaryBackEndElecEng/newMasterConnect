import React, { useContext, useEffect, useRef,useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { useTheme } from '@mui/material/styles';
// import styles from './calculate.module.css';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import styled from 'styled-components';
import { Box, } from '@mui/material';
import CoverPage from './CoverPage';
import QuestSlide from './QuestSlide';
import ShowQAResults from './ShowQAResults';

const MainCalculator=styled(Box)`
margin:auto;
margin-top:20px;
width:100vw;
z-index:0;
position:relative;
background-image:url(${({bg_image})=>bg_image});
background-size: 100% 50%;
min-height:100vh;
animation: appearIn 1s ease-in;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){
    margin-top:-58px;
}

`;

const Calculate = () => {
    const {setTitle,setStyleName,answeredFilled,} =useContext(GeneralContext);
    const MyRef=useRef();
    const calcPic="https://new-master.s3.ca-central-1.amazonaws.com/static/images/calculator1.png";
    const whiteImg="https://new-master.s3.ca-central-1.amazonaws.com/static/images/white.png";

   

        useEffect(()=>{
            setTitle("Calculator");
            setStyleName("Calculate your page");
            if(window.scrollY){
                window.scroll(0,0);
              }
        },[]);


  return (
    <MainCalculator bg_image={calcPic} ref={MyRef}>
        <RegisterPage/>
        <GetRegisterPages/>
        <CoverPage/>
        {!answeredFilled && <QuestSlide/>}
        {answeredFilled && <ShowQAResults/>}

    </MainCalculator>
  )
}

export default Calculate