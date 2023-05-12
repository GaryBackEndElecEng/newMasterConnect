import React from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./blog.module.css";
import styled from "styled-components";
import { Stack, Grid, Typography, Button, Fab } from "@mui/material";
// import api from "../axios/api";
import GetBlogs from './GetBlogs';
import GetArticles from './GetArticles';

const CustBlogBanner = styled.section`
  margin: 0;
  min-height: 5vh;
  width: 100vw;
  padding: auto 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
//   border:1px solid red;
  transition: all 1s ease-in-out;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
  }
  @media screen and (max-width: 600px) {
  }
`;
const CustBlogChild = styled.div`
  margin: 0;
  position: absolute;
  left: 6.3%;
  top: 0%;
  z-index: 200;
  padding: auto 1rem;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
//   border:1px solid black;
  @media screen and (max-width: 900px) {
    flex: 0 0 100%;
  }
  @media screen and (max-width: 600px) {
  }
`;
const CustContainer = styled(Grid)`
  opacity: ${({ setopen }) => (setopen ? "1" : "0")};
  min-height: ${({ setopen }) => (setopen ? "100" : "5")}vh;
  margin: 3rem auto;
  position: relative;
  padding: 1rem;
  border-left: 1px solid black;
  padding: auto 1rem;
  justify-content: center;
  align-items: flex-start;
  transition: all 1s ease-in-out;
//   border:1px solid red;
  @media screen and (max-width: 900px) {
    flex: 0 0 100%;
  }
  @media screen and (max-width: 600px) {
  }
`;

const BlogBanner = ({ getWidth }) => {
  const navigate=useNavigate();
  const {  staticImage } = React.useContext(GeneralContext);
  const customPage=`${staticImage}/customPage.png`;
  const [openBlog, setOpenBlog] = React.useState(false);
  const [openArticle, setOpenArticle] = React.useState(false);
  const [sticky,setSticky]=React.useState(false);
  const[stickyYRef,setStickyYRef]=React.useState(null);

  React.useEffect(()=>{
    let here=document.getElementById("IdSticky");
    let Ycord=here.getBoundingClientRect();
    let YLoc=Ycord.y;
    setStickyYRef(YLoc);
  },[]);

  React.useEffect(()=>{
    document.addEventListener("scroll",()=>{
        let Y=window.scrollY;
        if(stickyYRef < Y){
            setSticky(true);
        }else{
            setSticky(false);
        }
    });
  },[stickyYRef]);

  const handleLinkOpen = (e, link) => {
    e.preventDefault();
    
    switch (link) {
      case "blog":
        setOpenBlog(true);
        setOpenArticle(false);
        break;
      case "article":
        setOpenBlog(false);
        setOpenArticle(true);
        break;
      default:
        return;
    }
  };
  const handleLinkClose = (e, link) => {
    e.preventDefault();
    setOpenBlog(false);
    setOpenArticle(false);
  };
  const handleContact=(e)=>{
    navigate("/contact")
  }
  return (
    <CustBlogBanner
      className={styles.custBlogBanner}
      setflex={openBlog || openArticle ? true : false}
    >
      <CustBlogChild setflex={openBlog || openArticle ? true : false}>
        <div>
          {!openBlog ? (
            <Button
              size="large"
              color="primary"
              variant="extended"
              onClick={(e) => handleLinkOpen(e, "blog")}
              sx={{ boxShadow: "1px 1px 10px 1px black" }}
            >
              Open Blogs
            </Button>
          ) : (
            <Button
              size="large"
              color="primary"
              variant="extended"
              onClick={(e) => handleLinkClose(e)}
              sx={{ boxShadow: "1px 1px 10px 1px black" }}
            >
              Close Blogs
            </Button>
          )}
        </div>
        <div>
          {!openArticle ? (
            <Button
              size="large"
              color="primary"
              variant="extended"
              onClick={(e) => handleLinkOpen(e, "article")}
              sx={{ boxShadow: "1px 1px 10px 1px black" }}
            >
              Open Article
            </Button>
          ) : (
            <Button
              size="large"
              color="primary"
              variant="extended"
              onClick={(e) => handleLinkClose(e)}
              sx={{ boxShadow: "1px 1px 10px 1px black" }}
            >
              Close Article
            </Button>
          )}
        </div>
      </CustBlogChild>

      <CustContainer container setopen={openBlog || openArticle ? true : false}>
        <Grid item xs={12} md={2} id={"IdSticky"}>
            <div 
            // style={{top:`${stickyYRef + 50}px`}}
            className={(sticky && getWidth >900) ? styles.stickysmallgridYes : styles.stickysmallgrid} 
             
            >
          {openBlog && (
            <Stack direction="column" spacing={2} className={styles.center}>
            <Typography component={"h1"} variant="h3" sx={{color:"black"}}>
              Blog
            </Typography>
            <Typography component={"h1"} variant="h5" sx={{color:"black",margin:"1rem auto"}}>
              Blogs for the mind
            </Typography>
            <div style={{position:"relative",maxWidth:"370px",isolation:"isolate",textAlign:"center",marginTop:"1rem"}}>
              <img src={customPage} alt="www.masterconnect.ca" style={{maxWidth:"100%",paddingInline:2}}/>
              <Fab color="primary" size="medium" variant="extended" onClick={(e)=>handleContact(e)}
              sx={{marginTop:"1rem"}}
              >send us a note</Fab>
            </div>
            </Stack>
          )}
          {openArticle && (
            <Stack direction="column" spacing={2} className={styles.center}>
            <Typography component={"h1"} variant="h3" sx={{color:"black"}}>
              Articles
            </Typography>
            <Typography component={"h1"} variant="h5" sx={{color:"black",margin:"1rem auto"}}>
              Articles for the mind
            </Typography>
            <div style={{position:"relative",maxWidth:"370px",isolation:"isolate",textAlign:"center",marginTop:"1rem"}}>
              <img src={customPage} alt="www.masterconnect.ca" style={{maxWidth:"100%",paddingInline:2}}/>
              <Fab color="primary" size="medium" variant="extended" onClick={(e)=>handleContact(e)}
              sx={{marginTop:"1rem"}}
              >send us a note</Fab>
            </div>
            </Stack>
          )}
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          {openBlog && (
            <GetBlogs getWidth={getWidth}/>
          )}
          {openArticle && (
            <GetArticles getWidth={getWidth}/>
          )}
        </Grid>
      </CustContainer>
    </CustBlogBanner>
  );
};

export default BlogBanner;
