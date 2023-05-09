import React from 'react';
// import {useNavigate} from 'react-router-dom';
// import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './blog.module.css';
import styled from 'styled-components';
// import {Stack,Grid,Typography, Fab} from '@mui/material';
import api from '../axios/api';
import BlogCard from './BlogCard';

const CustBlogBlog=styled.section`
margin:auto;
width:100%;
height:auto;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;@media screen and (max-width:900px){

}
flex-direction:column;@media screen and (max-width:600px){

}
`;
const CustDiv=styled.div`
margin:0;
padding:0.5rem;
display flex;
justify-content:center;
align-items:center;
flex-direction:column;
`;


const GetBlogs = ({getWidth}) => {
    // const {staticImage2,staticImage}=React.useContext(GeneralContext);
    const [blogArr,setBlogArr]=React.useState({loaded:false,data:[]});

    React.useEffect(()=>{
        const getBlogVideo=async ()=>{
            try {
                const res=await api.get("/blog/");
                const blogs=res.data.filter(obj => (obj.show === true));
                setBlogArr({loaded:true,data:blogs})
                
            } catch (error) {
                
            }
        }
        getBlogVideo();
    },[]);
    
  return (
    <CustBlogBlog
    className={styles.custBlogBlog}
    >
    {   
        blogArr.loaded && blogArr.data.map((obj,index)=>(
        <CustDiv elevation={3} key={`${obj.id}--${index}`}>
            <BlogCard getWidth={getWidth} obj={obj}/>
        </CustDiv>
        ))
        }
    </CustBlogBlog>
  )
}

export default GetBlogs