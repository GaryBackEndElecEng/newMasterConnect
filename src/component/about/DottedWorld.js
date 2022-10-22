import React,{useContext} from 'react'
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';
import Arrow1 from './Arrow1';
import Arrow2 from './Arrow2';
import Internet from './Internet';
import Currency1 from './Currency1';
import Currency2 from './Currency2';
import WorldStar from './WorldStar';
import BusinessIco from './BusinessIco';
import BusinessIco1 from './BusinessIco1';
import FactStatement from './FactStatement';


const ImageContainer = styled.div.attrs({className:"dottedWorld"})`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:100%;
height:100%;
position:relative;
background-image:url(${({bgImage})=>bgImage});
background-size:100% 120%;


`;


const DottedWorld = ({counter,Fact}) => {
    const {staticImage}=useContext(GeneralContext);
    const dotWorldImg=`${staticImage}/images/dottedWorld2.png`;
  return (
    <ImageContainer bgImage={dotWorldImg}
    
    >
      <WorldStar count={counter} />
            <FactStatement Fact={Fact} />
            <Currency1 />
            <Currency2 />
            <Arrow1 />
            <Arrow2 />
            <BusinessIco />
            <BusinessIco1 />
            <Internet />
      
    </ImageContainer>
  )
}

export default DottedWorld