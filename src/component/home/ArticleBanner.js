import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { Container, Stack, Typography, Fab, Box, Paper, Link, Button, IconButton } from '@mui/material';
import Styles from './home.module.css';
import { useTheme } from '@mui/material/styles';
import BookShelf from './BookShelf';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const Banner = styled.div`
width:100vw;
margin:3rem auto;
margin-top:7rem;
position:relative;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
min-height:36vh;
background-image:url(${({ bgImg }) => bgImg}),${({ splash }) => splash};
background-size:5% 5%;

`;

const ArticleBanner = () => {
    const { setChangePage } = useContext(GeneralContext);
    const navigate = useNavigate();
    const [activate,setActivate]=useState(false);
    const bookShelf = "https://master-connect.s3.ca-central-1.amazonaws.com/media/ckeditor/bookShelve.png";
    const theme = useTheme();
    const wallPaper = "https://master-connect.s3.ca-central-1.amazonaws.com/media/ckeditor/wallPaper.png";

    const observer2 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActivate(true)
            // console.log("activate")
          } else {
            setTimeout(() => {
              setActivate(false)
            }, 300);
          }
        });
      }, { threshold: .2 });
    
      const handleObserver = (e) => {
        if (e) {
          observer2.observe(e)
        }
      }
      const handleBox =(e)=>{
        if (e) {
            observer2.observe(e)
          }
      }

    const handleNavigate = (e) => {
        e.preventDefault();
        navigate("/articles", setChangePage(true));
        console.log("clicked")
    }

    return (
        <Banner
            bgImg={wallPaper}
            splash={theme.palette.splash}
            
        >
            
            <Container maxWidth="md" >
                <Stack direction="column" spacing={{ xs: 0, sm: 1, md: 2 }}
                    sx={{ textAlign: "center", justifyContent: "flex-start", alignItems: "center",position:"relative" }}
                >

                    <Paper elevation={20} 
                    sx={{padding:"1rem",position:"relative",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} 
                    ref={(e)=>handleBox(e)}
                    >
                    {activate &&  <BookShelf />}
                        <img src={bookShelf} alt="www.master-connect.ca" style={{ width: "100%", }} ref={(e)=>handleObserver(e)}/>
                        {activate && <Box className={Styles.link} onClick={(e) => handleNavigate(e)} >
                            <IconButton variant="extended" color="info" sx={{ fontSize: { xs: "22px", sm: "30px", md: "36px" } }}>
                               View Our Articles <PriorityHighIcon className={Styles.exclamation} sx={{color:"red",fontSize:"110%"}}/> <MarkUnreadChatAltIcon sx={{ ml: 2 }} />
                            </IconButton>

                        </Box>}
                    </Paper>
                </Stack>
            </Container>


        </Banner>
    )
}

export default ArticleBanner