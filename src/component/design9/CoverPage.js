import React,{useContext} from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {  Box,} from '@mui/material';
import styled from 'styled-components';
import SalePerson from './SalePerson';

const CustomBox=styled(Box)`
margin:auto 5px;
width:100vw;
min-height:75vh;
position:relative;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;
`;
const CoverPage = ({lang}) => {
  const {staticImage}=useContext(GeneralContext);
   
    const realtorCoverPage=`${staticImage}/RealtorCoverPage.png`;
  return (
    <CustomBox bg_image={realtorCoverPage}>
      <SalePerson lang={lang}/>
    </CustomBox>
  )
}

export default CoverPage