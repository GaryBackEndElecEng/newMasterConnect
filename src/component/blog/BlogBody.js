import React, { useContext, useEffect, useState, } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { useTheme } from '@mui/material/styles';
import {  Paper, Typography, Container, Stack } from '@mui/material';
import styled from 'styled-components';
import api from '../axios/api';
import SectionBlog from "./SectionBlog";
import BlogHelmet from './BlogHelmet';


const MainBody = styled(Container)`
margin: 1rem auto;
position:relative;
display:flex;
position:relative;
justify-content:flex-start;
align-items:center;
flex-direction:column;
background:${({ bg }) => bg};
min-height:30vh;
box-shadow: 1px 1px 8px 5px ${({ shade }) => shade};
@media screen and (max-width:900px){
    margin-top:8px;
}
@media screen and (max-width:600px){
    margin-top:5px;
}
`;
const MainImage = styled.img`
// filter:grayscale(100%);
filter:contrast(160%) ;
// filter: drop-shadow(16px 16px 20px red) invert(48%);
width:70%;
margin: 1rem auto;
padding:auto;
// aspect-ratio:4/3;
@media screen and (max-width:900px){
    width:100%;
}


`;


const BlogBody = ({blogBodys}) => {
    const { staticImage } = useContext(GeneralContext);
    

    

    const createMarkup = (text1)=>{
        let len=text1.split(" ")
        if(len.length > 0){
            return {__html:text1}
        }else{
            return {__html:""}
        }
    }

    return (
        <MainBody>
            
            <Paper elevation={10}
                sx={{ margin: { xs: "auto", sm: "auto" }, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: { xs: "0.25rem " }, width: "100%", }}
            >
                {blogBodys.loaded && [blogBodys.data].map(obj => (
                   
                     <Stack spacing={{ xs: 0, sm: 1, md: 2 }} key={`${obj.id}-${Math.ceil(Math.random()*1000)}`} 
                     sx={{ padding: { xs: "0rem  ", sm: "0.5rem" }, 
                     margin: " 1rem auto", textAlign: "center", width: "100%",
                     display: "flex", justifyContent: "center", alignItems: "flex-center", flexDirection: "column",
                     
                     }}>
                        {obj.mainImage && obj.show &&
                            <MainImage src={obj.mainImage} alt="www.master-connect.ca"  />}
        
                           {obj.show && 
                           <>
                           <Typography component="h1" variant="h3">{obj.title}</Typography>

                            <div style={{padding:"0.5rem",textAlign:"left"}}  dangerouslySetInnerHTML={createMarkup(obj.intro)}/>
                            </>
                           }
                            {obj.imageMain && obj.show &&
                            <MainImage src={obj.imageMain} alt="www.master-connect.ca" style={{margin:"1rem auto"}} />}
                        {obj.show &&
                            <SectionBlog sectionBlog={obj.sectionBlog} />
                        }
                    </Stack>
                    
                ))}

            </Paper>

        </MainBody>
    )
}

export default BlogBody