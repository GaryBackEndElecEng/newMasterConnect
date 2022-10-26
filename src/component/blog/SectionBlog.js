import React from 'react'

import {  Typography, Container, Stack } from '@mui/material';
import styled from 'styled-components';
// import styles from './blog.module.css';

const MainContainer = styled(Container)`
margin: 1rem auto;
position:relative;
display:flex;
position:relative;
justify-content:flex-start;
align-items:center;
flex-direction:column;
background:${({ bg }) => bg};
box-shadow: 1px 1px 8px 5px ${({ shade }) => shade};
@media screen and (max-width:900px){
    // margin-top:0px;
}
@media screen and (max-width:600px){
    margin: 2rem auto;
}
`;
const MainImage = styled.img`
// filter:grayscale(100%);
filter:contrast(160%) ;
// filter: drop-shadow(16px 16px 20px red) invert(48%);
width:70%;
margin:auto;
// aspect-ratio:4/3;
@media screen and (max-width:900px){
    width:100%;
}


`;

const SectionBlog = ({ sectionBlog }) => {

    const createMarkup = (text1)=>{
        let len=text1.split(" ")
        if(len.length >0){
            return {__html:text1}
        }else{
            return {__html:""}
        }
    }
    return (
        <MainContainer maxWidth="lg" spacing={{ xs: 0, sm: 1, md: 2 }} sx={{margin:"2rem auto"}}
        >
            {sectionBlog && sectionBlog.map(obj => (
                <Stack spacing={{ xs: 0, sm: 1, md: 2 }} key={`${obj.id}-${Math.ceil(Math.random()*1000)}`} sx={{ padding: { xs: "0rem  ", sm: "0.5rem" }, margin: "auto", textAlign: "center", width: "100%" }}>
                    <Typography component='h1' variant="h3" sx={{ margin: "2rem auto", textAlign: "center", fontWeight: "bold", }}>
                        {obj.section}
                    </Typography>
                    {obj.sectionImage && <MainImage src={obj.sectionImage} alt="www.master-connect.ca" style={{ width: "90%" }} />}
                    
                    <div style={{padding:"0.5rem"}}  dangerouslySetInnerHTML={ createMarkup(obj.summary)}/>
                    
                    {obj.sectionImage && <MainImage src={obj.sectionImage} alt="www.master-connect.ca" style={{ width: "100%" }} />}
                    <Typography component='h1' variant="h4" sx={{ margin: "2rem auto", textAlign: "center", fontWeight: "bold", }}>
                        {obj.subSection && obj.subSection}
                    </Typography>
                    <div style={{padding:"0.5rem"}}  dangerouslySetInnerHTML={ createMarkup(obj.content)}/>
                    <Typography component='h1' variant="h5" sx={{ margin: "1rem auto", }}>
                        {obj.subSection1 && obj.subSection1}
                    </Typography>

                    {obj.imageSection && <MainImage src={obj.imageSection} alt="www.master-connect.ca" style={{ width: "100%" }} />}

                    <div style={{padding:"0.5rem"}}  dangerouslySetInnerHTML={createMarkup(obj.content1)}/>
                    <Typography component='h1' variant="h5" sx={{ margin: "2rem auto", textAlign: "center", fontWeight: "bold", }}>
                        {obj.subSection2 && obj.subSection2}
                    </Typography>
                    <div style={{padding:"0.5rem"}}  dangerouslySetInnerHTML={createMarkup(obj.content2)}/>
                    
                </Stack>
            ))}

        </MainContainer>
    )
}

export default SectionBlog