import React from 'react'
import {useLocation,} from 'react-router-dom';
import queryString from 'query-string';
import {  Typography, Container, Stack } from '@mui/material';
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';
import api from '../axios/api';
import styles from './blog.module.css';

const MainContainer = styled(Container)`
margin: 0 auto;
position:relative;
min-height:100vh;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
background:var(--background-section-blog);
box-shadow: 1px 1px 8px 5px ${({ shade }) => shade};
animation: appearIn 1.63s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    tp {opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:0px;
    top:-25px;
    background:var(--background-section-blog-sm);

}
@media screen and (max-width:600px){
    margin: 0 auto;
   
}
`;
const MainImage = styled.img`
// filter:grayscale(100%);
filter:contrast(160%) ;
// filter: drop-shadow(16px 16px 20px red) invert(48%);
width:100%;
animation:slideIn 2s ease-in-out;
@keyframes slideIn {
    from {opacity:0; transform:translateX(-100%)}
    to {opacity:1; transform:translateX(0%)}
}
@media screen and (max-width:900px){
    width:100%;
}


`;

const SectionBlog = () => {
    const location=useLocation();
    const parsed=queryString.parse(location.search);
    const id=parsed.id;
const {sectionBlog,setSectionBlog}=React.useContext(GeneralContext);

React.useEffect(()=>{
    if(window.scrollY){
        window.scroll(0,0);
    }
},[]);


React.useEffect(()=>{
    const getSectionBlog= async()=>{
        try {
        const res= await api.get("/blog/");
        const bodyObj=res.data.filter(obj=>(parseInt(obj.id)===parseInt(id)))[0];
        const blogItem=bodyObj.sectionBlog;
        setSectionBlog({loaded:true,data:blogItem,id:id})
        } catch (error) {
            console.error(error.message);
        }
    }
    getSectionBlog();
},[]);

    const createMarkup = (text1)=>{
        let len=text1.split(" ")
        if(len.length >0){
            return {__html:text1}
        }else{
            return {__html:""}
        }
    }
    return (
        <MainContainer classname={styles.mainContainer} maxWidth="lg" spacing={{ xs: 0, sm: 1, md: 2 }} sx={{margin:"0 auto",marginTop:"2rem",paddingTop:"3rem"}}
        >
            {sectionBlog.loaded && sectionBlog.data.map((obj,index) => (
                <Stack direction="column" spacing={{ xs: 0, sm: 1, md: 2 }} key={`${obj.id}-sectionBlog-${index}`} sx={{ padding: { xs: "0rem  ", sm: "0.5rem" }, margin: "auto",  width: "100%",justifyContent:"flex-start",alignItems:"flex-start" }}>
                    <Typography component='h1' variant="h3" sx={{ margin: "2rem auto", textAlign: "center", fontWeight: "bold",color:"black" }}>
                        {obj.section}
                    </Typography>
                    {obj.sectionImage && <MainImage src={obj.sectionImage} alt="www.master-connect.ca" style={{ width: "90%" }} />}
                    
                    <div style={{padding:"0.5rem",textAlign:"left"}}  dangerouslySetInnerHTML={ createMarkup(obj.summary)}/>
                    
                    <Typography component='h1' variant="h4" sx={{ margin: "2rem auto", textAlign: "center", fontWeight: "bold",color:"black" }}>
                        {obj.subSection && obj.subSection}
                    </Typography>
                    <div style={{padding:"0.5rem",textAlign:"left"}}  dangerouslySetInnerHTML={ createMarkup(obj.content)}/>
                    <Typography component='h1' variant="h5" sx={{ margin: "1rem auto",color:"black" }}>
                        {obj.subSection1 && obj.subSection1}
                    </Typography>

                    {obj.imageSection && <MainImage src={obj.imageSection} alt="www.master-connect.ca" style={{ width: "100%" }} />}

                    <div style={{padding:"0.5rem",textAlign:"left"}}  dangerouslySetInnerHTML={createMarkup(obj.content1)}/>
                    <Typography component='h1' variant="h5" sx={{ margin: "2rem auto", textAlign: "center", fontWeight: "bold",color:"black" }}>
                        {obj.subSection2 && obj.subSection2}
                    </Typography>
                    <div style={{padding:"0.5rem",textAlign:"left"}}  dangerouslySetInnerHTML={createMarkup(obj.content2)}/>
                    
                </Stack>
            ))}

        </MainContainer>
    )
}

export default SectionBlog