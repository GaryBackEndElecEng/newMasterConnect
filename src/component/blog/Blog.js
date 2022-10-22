import React, {  useEffect,} from 'react'
import styled from 'styled-components';
import BlogBody from './BlogBody';
import CoverPage from './CoverPage';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import BlogHelmet from './BlogHelmet';

const MainBlog = styled.div.attrs({className:"container-fluid"})`
width:100vw;
margin:2rem auto;
margin-top:0rem;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}

@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:600px){
    margin-top:-50px;
}
`;

const Blog = () => {
  useEffect(()=>{
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  },[]);

  return (
    <MainBlog>
      <BlogHelmet/>
      <RegisterPage/>
      <GetRegisterPages/>
        <CoverPage/>
<BlogBody/>

    </MainBlog>
  )
}

export default Blog