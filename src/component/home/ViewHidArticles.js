import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container, Stack, Paper, Typography, Grid, Fab,Avatar } from '@mui/material';
import Styles from './home.module.css';
import MsgArticlePopper from './MsgArticlePopper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
const masterUrl = "https://master-connect-app.herokuapp.com";

const articleLinks = [
    { id: 1, name: "connecting", link: `${masterUrl}/detail1-connecting/`, summary: "This is about connecting to the Internet. It explains the future of the internet and the dangers of going to the wrong sites." },
    { id: 2, name: "Cyber Security", link: `${masterUrl}/web-Security1/`, summary: " This Article describes what are viruses and how they penetrate software during reading and uploading processes. It describes the types of viruses and identifies the ongoing battle of technology's influence on the war. " },
    { id: 3, name: "cognitive Easing", link: `${masterUrl}/cognitive-easing/`, summary: "This article describes what types of people are influenced by idea reptition and images through assimilation. It gives the reader a thorough understanding of influence and who can easily be influenced." },
    { id: 4, name: "6-degrees of separation", link: `${masterUrl}/web-6degrees-of-separation/`, summary: " This goes deep into the fight of good verse evil on safegarding the internet. It describes the types of bugs, and how the bugs get into your system as well as the propbability of being being ineffected." },
    { id: 5, name: "Store front Design", link: `${masterUrl}/storeFront-detail/`, summary: "This describes the complexities and maintenance, and site's conceptual layout associated to selling on the market." },

    { id: 6, name: "The Smart Way", link: `${masterUrl}/seo-page/`, summary: " This explains SEO and the advantages of helping Google do its work on new content registration." },
    { id: 7, name: "Covid Market effects", link: `${masterUrl}/trend-page/`, summary: "COVID has dramtically impacted world's market, increasing online sales by 67% in the first COVID year. It describes where the major market changes and to what extent." },

    { id: 8, name: "6-degs of separation", link: `${masterUrl}/web-6degrees-of-separation/`, summary: "This identifies that aquaintances are more valuable than close friends in social networking." },
    { id: 9, name: "Dooms Day Glacier", link: `${masterUrl}/thwaites-glacier/`, summary: "Bonus: The future to ocean front property- it explains, in detail the threat of the Antarctic's Thwaites Glacier - on the edge of collapse." },
    { id: 10, name: "The Rise Of Lightning", link: `${masterUrl}/lightning/`, summary: "Bonus: Global warming has increased lightning strikes to earth significantly, leading to increased forest fires. This article, in detail, explains what lightning is, how it forms and the safeguards to lightning." },
]

const ViewHidArticles = () => {
    const theme = useTheme();
    const hideShowRef = useRef();
    const hideTitleRef = useRef();
 const { open,setOpen} = useContext(GeneralContext);
const [hideDisplay, setHideDisplay] = useState(false);

useEffect(()=>{
    if(hideShowRef.current && hideTitleRef.current){
        hideTitleRef.current.style.display="none";
        hideShowRef.current.style.display="none";

    }
},[])
const handleShowingArticleList = (e) => {
    e.preventDefault();
    if (hideShowRef.current) {
        setOpen(true)
        let div = hideShowRef.current;
        let title = hideTitleRef.current
        div.style.display = "block";
        title.style.display = "block";

        return
    }
}
const handleHidingArticleList = (e) => {
    e.preventDefault();
    if (hideShowRef.current) {
        setOpen(false);
        let div = hideShowRef.current;
        let title = hideTitleRef.current
        div.focus();
        div.style.display = "none";
        title.style.display = "none";

        return
    }
}
    return (
        <Container maxwidth="xl" sx={{background:theme.palette.home.blueGrey,margin:"1rem auto"}}>
            {/* To hide/View Articles */}
            <>
                <Typography component="h1" variant="h3" sx={{ fontFamily: "Roboto", color: "white" }}>view articles</Typography>
                {open ? <KeyboardArrowDownIcon sx={{ color: "white" }} onClick={(e) => handleHidingArticleList(e)} />
                    : <KeyboardArrowUpIcon sx={{ color: "white" }} onClick={(e) => handleShowingArticleList(e)} />}
            </>
            <hr style={{ borderBottom: `2px solid ${theme.palette.home.light}`, width: "100%", color: theme.palette.home.light }} />
            <Typography component="h1" variant="h5" className={open ? Styles.showArticles : Styles.hideShow} ref={hideTitleRef} 
                sx={{ color: "white", fontFamily: "Roboto", fontSize: "50px", marginTop: "2rem" }}
            >

                Pick an Article:
            </Typography>
            <Stack direction={"column"} ref={hideShowRef} className={open ? Styles.showArticles : Styles.hideShow} >
                <Grid container spacing={0} sx={{ width: { xs: "100%", sm: "100%" } }}>
                    {articleLinks && articleLinks.map(obj => (
                        <Grid item xs={12} md={6} key={obj.id} sx={{ position: "relative", width: "100%", flexGrow: 1 }}>

                            <MsgArticlePopper obj={obj} />

                        </Grid>
                    ))}
                </Grid>
            </Stack>

        </Container>
    )
}

export default ViewHidArticles