import React, { useContext, useState, useRef, useEffect, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Box, Grid, Paper, Container, Typography, Stack, Avatar } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
// import { red } from '@mui/material/colors';
import styles from './bio.module.css';
import UploadCV from './UploadCV';
import api from '../axios/api';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import RegisterPage from '../RegisterPage';
import SendAMessageContainer from './SendAMessageContainer';
import GetRegisterPages from '../utils/GetRegisterPages';
import BioHelmet from './BioHelmet';

const BioMmain = styled.div.attrs({ className: "container-fluid" })`
display:${({ display }) => display};
width:96vw;
min-height:90vh;
justify-content:flex-start;
align-items:center;
flex-direction:center;
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

const Bio = () => {
    const { loadingData, resume, setResume, setTitle, setStyleName ,setChangePage,generalInfo,conical,getPathLocation} = useContext(GeneralContext);
    const theme = useTheme();
    const MainResumeRef = useRef();
    const showBlock = !loadingData ? "block" : "none";
    const intro = resume.loaded ? resume.data.filter(obj => (obj.sectionTitle === "Intro"))[0] : "";
    const profileImg = resume.loaded ? resume.data.filter(obj => (obj.title === "Image"))[0] : "";
    const mainResume = resume.loaded ? resume.data.filter(obj => (obj.title === "Resume")) : "";
    const sidebar = resume.loaded ? resume.data.filter(obj => (obj.sectionTitle === "sidebar")).filter(obj => (obj.title !== "Image")) : [];
    const getGeneralInfo= generalInfo.loaded ? generalInfo.data :null;
    const [resumeHeight, setResumeHeight] = useState(null);
    let ResHeight = resumeHeight;
   
   
    useEffect(()=>{
        if (MainResumeRef.current) {
            setResumeHeight(window.getComputedStyle(MainResumeRef.current).getPropertyValue("height"));
            
        }
   
    },[setResumeHeight,MainResumeRef]);
   

    if (loadingData) {
        document.location.reload();
        console.log(" reloading")
    }

// console.log(resumeHeight)
    useEffect(() => {
        setTitle("Bio");
        setStyleName("Inside View");
        setChangePage(false);
        if(window.scrollY){
            window.scroll(0,0);
            
        }

    }, [setTitle, setStyleName]);

    useEffect(() => {

        const getResume = async () => {
            try {
                const res = await api.get('/wordSnippet/');
                const data = await res.data;
                setResume({ loaded: true, data: data });
            } catch (error) {
                console.error(error.message)
            }

        }
        getResume();
    }, [setResume]);

    const options = { threshold: 1 }
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
            } else { entry.target.style.opacity = "0"; }
        });
    }, options);

    const MyFunc = (e) => {
        if (e) {
            observer.observe(e)


        }

    }


    const handleList = (content2) => {
        const checkHyphen = content2.split("- ");
        if (checkHyphen) {
            return (
                checkHyphen.map(obj => (
                    <Typography component="div" variant="li" key={Math.ceil(Math.random() * 1000)}
                        sx={{ color: "black", margin: "0.5rem 0", fontfamily: "Roboto", width: "100%" }}>{obj}</Typography>
                ))
            )
        }
        else { return }
    }

    return (
        <BioMmain display={showBlock}>
            <BioHelmet 
            obj={getGeneralInfo} 
            intro ={intro} 
            conical={conical.loaded ? conical.data:""}
            getPathLocation={getPathLocation.loaded ? getPathLocation.data :""}
            />
            <RegisterPage />
            <GetRegisterPages/>
            <Container maxWidth='xl' sx={{ margin: "auto", padding: "0px" }} >
                <Paper elevation={3} sx={{ padding: "0.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: {lg:"1rem -4px",xs:"1rem -20px"},background:theme.palette.common.lighter}}>
                    <Typography component="h1" variant="h3">
                        {intro.title}
                    </Typography>
                    <Stack direction={"column"} spacing={0}>

                        <Typography component="p" variant="h5" key={1} style={{ margin: "1rem auto" }}>
                            {intro.content}
                        </Typography>
                        <Typography component="p" variant="h5" key={2} style={{ margin: "1rem auto" }}>
                            {intro.content1}
                        </Typography>
                        <Typography component="p" variant="h5" key={3} style={{ margin: "1rem auto" }}>
                            {intro.content2}
                        </Typography>
                        <Typography component="p" variant="h5" key={4} style={{ margin: "1rem auto" }}>
                            {intro.content3}
                        </Typography>


                    </Stack>
                </Paper>




                <Paper elevation={3} sx={{ margin: {lg:"1rem auto",xs:"1rem auto"}, padding: "0.5rem ", }}>
                    <Grid container spacing={{xs:0,sm:0,md:0}} sx={{ textAlign: "flex-start",display:"flex", justifyContent: "center", alignItems: "flex-start",position:"relative" }}>
                        <Grid item xs={12} md={3} sx={{ boxShadow: "1px 3px 10px blue",
                          padding: "0 0.5rem", height: { xs: "auto", lg:resumeHeight },flexGrow:1 }}
                          className={styles.sidebar}
                          >

                            <Stack direction={"column"} spacing={0} sx={{ flexGrow: 1 }} className={styles.sidebar}>
                                {resume.loaded && <Avatar src={profileImg.webImage} alt="www.master-connect.ca"
                                    sx={{ maxWidth: "350px", maxHeight: "350px", width: "100%", height: "100%", margin: "auto" }}
                                />}
                                {sidebar.map((obj,index) => (
                                    // ACHIEVEMENTS
                                    <Typography component="ul" variant="h4"
                                        sx={{
                                            color: theme.palette.common.lighter, margin: "1rem 0"
                                        }}
                                        key={`${obj.id}-${Math.ceil(Math.random()*10000*index)}`}
                                    >
                                        {obj.title} <ConnectWithoutContactIcon sx={{ ml: 1,color:theme.palette.common.red }} />
                                        {obj.content && <Typography component="li" variant="h6" sx={{ color: theme.palette.common.light, margin: "auto 0" }}>
                                            {obj.content}
                                        </Typography>}
                                        {obj.content1 && <Typography component="li" variant="h6" >
                                            {obj.content1}
                                        </Typography>}
                                        {obj.content2 && <Typography component="li" variant="h6" >
                                            {obj.content2}
                                        </Typography>}
                                        {obj.content3 && <Typography component="li" variant="h6" >
                                            {obj.content3}
                                        </Typography>}
                                        {obj.webImage && <Typography component="li" variant="h6" >
                                            < a href={obj.webImage} style={{ margin: "auto 0" }}>{obj.title} link</a>
                                        </Typography>}

                                    </Typography>
                                ))}
                            </Stack>

                        </Grid>
                        {/*---------------- MAIN BODY ---------------------------------*/}
                        <Grid ref={MainResumeRef} item xs={12} md={9} sx={{ position: "relative", margin: { xs: "1rem auto", md: "auto" } }}>
                            <Stack direction={"column"}
                                sx={{
                                    marginTop: { xs: "1rem", sm: "0px" },

                                }}>
                                <Paper elevation={3}
                                    sx={{ background:"grey", margin: {lg:"0px -6px",xs:"0px -4px"}, minHeight: "10vh", boxShadow: "1px 1px 5px blue", color:"white",display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column" }}
                                >
                                    <Typography component="h1" variant="h3" sx={{ margin: "auto" }}>
                                        Gary Wallace
                                    </Typography>
                                </Paper>
                                {mainResume && mainResume.map((obj,index) => (
                                    <Box sx={{ margin:{lg:"auto 0.5rem"}, display: 'flex', flexDirection: "column", width: "100%" }} key={`${obj.id}-${Math.ceil(Math.random()*1000*index)}`}>

                                        <Typography component="div" variant="h4"
                                            sx={{
                                                color: theme.palette.common.teal, margin: "1rem auto", fontfamily: "Roboto", background: "transparent"
                                            }}>
                                            {obj.sectionTitle}
                                        </Typography>


                                        <Typography component="div" variant="h5"
                                            sx={{ color: "black", margin: "1rem auto", fontFamily: "Roboto" }}>
                                            {obj.subSectionTitle}
                                        </Typography>
                                        {obj.content &&
                                            <Typography component="div" variant="h6"
                                                sx={{ color: "black", margin: "1rem auto", fontFamily: "Roboto" }}>
                                                {obj.content}
                                            </Typography>}
                                        <Box ref={(e) => MyFunc(e)} className={styles.project} 
                                        key={`${Math.ceil(Math.random() * 1000*index)}-${obj.id}`}>
                                            {obj.content1 &&
                                                <Typography component="div" variant="h6"
                                                    sx={{ color: "black", margin: "1rem auto", fontFamily: "Roboto" }}>
                                                    {obj.content1}
                                                </Typography>}
                                            {obj.content2 && handleList(obj.content2)}
                                        </Box>
                                        {obj.content3 &&
                                            <Typography component="div" variant="h6"
                                                sx={{ color: "black", margin: "1rem auto", fontFamily: "Roboto" }}>
                                                {obj.content3}
                                            </Typography>}
                                        {obj.webImage &&
                                            <Typography component="a" variant="h6" href={obj.webImage}
                                                sx={{ color: "black", margin: "1rem 0", fontFamily: "Roboto" }}>
                                                link
                                            </Typography>}
                                    </Box>
                                ))}
                            </Stack>


                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <SendAMessageContainer/>
            <UploadCV />
        </BioMmain>
    )
}

export default Bio