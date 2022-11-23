import React, { useContext, useEffect, useRef } from 'react';
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
import CalculatorHelmet from './CalculatorHelmet';
import {useTheme} from '@mui/material/styles';


const MainCalculator=styled(Box)`
margin:auto;
margin-top:20px;
width:100vw;
z-index:0;
position:relative;
background-image:url(${({bg_image})=>bg_image});
background-size: 100% 50%;
min-height:100vh;
background:${({bg})=>bg};

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
    const theme=useTheme();
    const {setTitle,setStyleName,answeredFilled,generalInfo,conical} =useContext(GeneralContext);
    const MyRef=useRef();
    const whiteImg="https://new-master.s3.ca-central-1.amazonaws.com/static/images/white.png";

   

        useEffect(()=>{
            setTitle("Calculator");
            setStyleName("Calculate your page");
            if(window.scrollY){
                window.scroll(0,0);
              }
        },[]);


  return (
    <MainCalculator  ref={MyRef}
    bg={theme.palette.home.lighter}
    >
        <CalculatorHelmet generalInfo={generalInfo} conical={conical.loaded ? conical.data:""}/>
        <RegisterPage/>
        <GetRegisterPages/>
        <CoverPage/>
        {!answeredFilled && <QuestSlide/>}
        {answeredFilled && <ShowQAResults/>}

    </MainCalculator>
  )
}

export default Calculate