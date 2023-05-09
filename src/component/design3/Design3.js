import React from 'react';
// import styles from './design3.module.css';
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';
import CoverDesign3 from './CoverDesign3';
import BannerRings from './BannerRings';
import Selection from './Selection';
import CreateYourOwn from './CreateYourOwn';


const CustMainDesign3=styled.div`
margin:0;
width:100vw;
// min-height:100vh;


`;

const Design3 = () => {
    const {staticImage}=React.useContext(GeneralContext);
    const cover=`${staticImage}/design3/cover1.png`;
    const ring=`${staticImage}/design3/cover2.png`;
    const ringBig=`${staticImage}/design3/cover3Big.png`;
    const [getWidth,setGetWidth]=React.useState(null);

    React.useEffect(()=>{
        setGetWidth(window.innerWidth);
        if(window.scrollY){
            window.scroll(0,0);
        }
    },[]);

  return (
    <CustMainDesign3>
      
        <CoverDesign3 coverPic={cover} coverPic2={ring} getWidth={getWidth} />
        <BannerRings cover3Big={ringBig} getWidth={getWidth}/>
        <Selection  getWidth={getWidth}/>
        <CreateYourOwn getWidth={getWidth}/>
    </CustMainDesign3>
  )
}

export default Design3