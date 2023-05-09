import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
// import styles from './blog.module.css';
// import {Stack,Grid,Typography} from '@mui/material';
import styled from 'styled-components';
import BlogCover from './BlogCover';
import BlogBanner from './BlogBanner';

const CustBlob=styled.div`
margin:0;
width:100vw;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
position:relative;
animation: slideInRight 1.5s ease-in-out;
@keyframes slideInRight {
  from {opacity:0;transform:translateX(100%);}
  to {opacity:1;transform:translateX(0%);}
}
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){

}
`;


const Blog = () => {
  // const {staticImage2}=React.useContext(GeneralContext);
  const [getWidth,setGetWidth]=React.useState(null);

  React.useEffect(()=>{
    setGetWidth(window.innerWidth);
    if(window.scrollY){
      window.scroll(0,0);
    }
  },[]);

  return (
    <CustBlob>

<BlogCover getWidth={getWidth} />
<BlogBanner getWidth={getWidth}/>
    </CustBlob>
  )
}

export default Blog