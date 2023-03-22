import React, { useContext, useState, useRef, useEffect, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Box, Grid, Paper, Container, Typography, Stack, Avatar, Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeckIcon from '@mui/icons-material/Deck';
import AddLinkIcon from '@mui/icons-material/AddLink';

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
    const sidebar = resume.loaded ? resume.data.filter(obj => (obj.sectionTitle === "sidebar")).filter(obj => (obj.title !== "Image")).filter(obj=>(obj.subSectionTitle!=="Contact")) : [];
    const getGeneralInfo= generalInfo.loaded ? generalInfo.data :null;
    const [newGenInfo,setNewGenInfo]=useState(null);
    const [resumeHeight, setResumeHeight] = useState(null);
    const CV="https://new-master.s3.ca-central-1.amazonaws.com/static/files/Resume.pdf";
   
   
    useEffect(()=>{
        if(!MainResumeRef.current){return setResumeHeight("2247px")}
        let cvHeight=window.getComputedStyle(MainResumeRef.current).getPropertyValue("height");
            if(parseInt(cvHeight.split("px")[0])> 2000){
            setResumeHeight(cvHeight);
            }else{setResumeHeight("2247px");}
        if(!getGeneralInfo)return
        let arr=[];
        getGeneralInfo.siteArray.forEach((obj)=>{
            if(obj.split("::")[0]==="fb"){
            arr.push({link:obj.split("::")[1],icon:<FacebookIcon sx={{color:"white",background:"blue"}}/>});
            }
            else if(obj.split("::")[0]==="linkedin"){
            arr.push({link:obj.split("::")[1],icon:<LinkedInIcon sx={{color:"white",background:"blue"}}/>});
            }
            else{
                arr.push({link:obj.split("::")[1],icon:<DeckIcon sx={{color:"white",background:"blue"}}/>});
            }
        });

        setNewGenInfo({cell:getGeneralInfo.cell,email:"mailto:masterconnect919@gmail.com",siteArray:arr});

   
    },[setResumeHeight,MainResumeRef,setNewGenInfo,getGeneralInfo]);
   

    if (loadingData) {
        document.location.reload();
        // console.log(" reloading")
    }

// console.log(resumeHeight)
    useEffect(() => {
        setTitle("Bio");
        setStyleName("Inside View");
        setChangePage(false);
        if(window.scrollY){
            window.scroll(0,0);
            
        }

    }, [setTitle, setStyleName,setChangePage]);

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

    const options = { threshold: 0.5 }
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
    const handleLink=(e,link)=>{
        e.preventDefault();
        window.open(link);
    }
// console.log(resumeHeight)
    return (
        <BioMmain display={showBlock}>
            <BioHelmet 
            obj={getGeneralInfo} 
            intro ={intro} 
            getPathLocation={getPathLocation.loaded ? getPathLocation.data :""}
            CV={CV}
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
                                <>
                                {newGenInfo && 
                                <Typography component="ul" variant="h5" sx={{color:"white"}}>Contact
                                 
                                 <Typography component="li" variant="h6">
                                <Typography component="a" variant="h6" sx={{ color: theme.palette.common.light, margin: "auto 0" }}
                                href="tel:+4169175768"
                                >
                                    {newGenInfo.cell} <ConnectWithoutContactIcon sx={{ m:1,color:theme.palette.common.red }} />
                                </Typography>
                                </Typography>
                                 
                                 <Typography component="a" variant="h6" sx={{ color: theme.palette.common.light, margin: "auto 0" }} href="mailto:masterconnect919@gmail.com">
                                    email
                                </Typography>
                                <ConnectWithoutContactIcon sx={{ m: 1,color:theme.palette.common.red }} />
                                 {newGenInfo.siteArray && newGenInfo.siteArray.map((obj,index)=>(
                                    <Typography component="li" variant="h6" key={`${obj}-sites--${index}`}
                                     sx={{ color: theme.palette.common.light, margin: "auto 0" }}
                                    >
                                    <IconButton onClick={(e)=>handleLink(e,obj.link)} sx={{textDecoration:"none",color:"white","&:hover":{transform:" scale(1.03) translateX(5%)",transition:"transform 0.5s ease-in-out"}}}>{obj.icon}</IconButton>
                                </Typography>
                                 ))}
                                
                                 
                                </Typography>
                                }
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
                                        {obj.content1 && <Typography component="li" variant="body1" >
                                        
                                            {obj.content1}
                                           
                                        </Typography>}
                                        {obj.content2 && <Typography component="li" variant="h6" >
                                        {obj.content2}
                                        </Typography>}
                                        {obj.content3 && <Typography component="li" variant="h6" >
                                        {obj.content3}
                                        </Typography>}
                                        {obj.webImage && <Typography component="li" variant="h6" >
                                            < IconButton onClick={(e)=>handleLink(e,obj.webImage)} style={{ margin: "auto 0" }}>{obj.title}< AddLinkIcon sx={{color:"white",background:"blue",m:1}} /></IconButton>
                                        </Typography>}

                                    </Typography>
                                ))}
                                </>
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
                                            <Avatar  src={obj.webImage} sx={{width:{xs:"125px",sm:"125px"},height:{xs:"125px",sm:"125px"},margin:"1rem auto"}}/>
                                                
                                            }
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