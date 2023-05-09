import React from 'react';
// import {useNavigate} from 'react-router-dom';
// import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './blog.module.css';
import styled from 'styled-components';
import {Stack,Grid,Typography, Fab} from '@mui/material';
import api from '../axios/api';
import ArticleCard from './ArticleCard';
import {getArticImages} from './GetImages';

const CustArticle=styled.section`
margin:0 auto;
padding:0 0.5rem;
width:100%;
height:auto;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;

@media screen and (max-width:900px){

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


const GetArticles = ({getWidth}) => {
    const [articleArr,setArticleArr]=React.useState({loaded:false,data:[]});

    React.useEffect(()=>{
        const getBlogVideo=async ()=>{
            try {
                const res=await api.get("/blog/articles/");
                const articles=res.data;
                setArticleArr({loaded:true,data:articles})
                
            } catch (error) {
                
            }
        }
        getBlogVideo();
    },[]);
  return (
    <CustArticle
    className={styles.custArticle}
    >
        {   
        articleArr.loaded && articleArr.data.map((obj,index)=>(
        <CustDiv elevation={3} key={`${obj.id}--${index}`}>
            <ArticleCard getWidth={getWidth} obj={obj}/>
        </CustDiv>
        ))
        }
    </CustArticle>
  )
}

export default GetArticles