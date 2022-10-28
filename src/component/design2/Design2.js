import React, { useContext, useEffect, useState } from 'react';
import { Box, Stack, Container, Paper, Grid, Typography, Fab } from '@mui/material';
// import { ContainerFluid } from '../../styled/Container.styled';

import { useTheme } from '@mui/material/styles';
import TitleArt from './TitleArt';
import WordArtLeft from './WordArtLeft';
import RightDesign from './RightDesign';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import ModalContainer from '../utils/ModalContainer';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import RegisterPage from '../RegisterPage';
import styled from 'styled-components';
import styles from './design2.module.css'
import GetRegisterPages from '../utils/GetRegisterPages';
import Design2Helmet from "./Design2Helmet";
const GlobalColFlex = styled.div.attrs({className:"GlobalColFlex"})`
display:flex;
position:relative;
flex-direction:column;
justify-content:flex-start;
align-items:center;



`;

const ContainerFluid = styled.div`
margin-top:0.5rem;
width:100vw;
animation:arrear 1.5s ease-in-out;
@keyframes arrear {
    from { opacity:0;}
    to { opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:-5px;
}
@media screen and (max-width:600px){
    margin-top:-55px;
}
`;
const Design2 = () => {
    const { setTitle, setStyleName, workArr,setChangePage,staticImage } = useContext(GeneralContext);
    const {getProductList}=useContext(PriceContext);
    const theme = useTheme();
    const [showPurchaseBtn,setShowPurchaseBtn]=useState(false);
    const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState({});
    

    useEffect(()=>{
        if(getProductList.loaded){
            let obj=getProductList.data.filter(obj=>(parseInt(obj.id)===2))[0]
            setSummary(obj.summary);
            setDesc(obj.desc);
            setKeywords("art-page,Art,Design,Web,Design,web-page,page product,purchase-a-site");
            setimage(`${staticImage}/${obj.imageName}`);
            setOBJ(obj);
        }
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    },[getProductList.loaded]);

    useEffect(()=>{
        const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):null;
        if(getUser_id){
            setShowPurchaseBtn(true);
        }
    },[]);

    useEffect(() => {
        const title1 = workArr.filter(obj => (obj.id === 1))[0].title
        setTitle(title1);
        setStyleName("Style 2");
        setChangePage(false);
    }, [setTitle, setStyleName])
    return (
        <>
        <RegisterPage />
            <GetRegisterPages/>
            <Design2Helmet summary={summary} keywords={keywords} image={image} desc={desc} OBJ={OBJ}/>
        <ContainerFluid >
            <Grid container spacing={0} sx={{borderBottom:"5px solid black",padding:"0px auto"}}>

                <Grid item xs={6} md={6} sx={{ backgroundColor: theme.palette.primary.lighter, height: "100vh", width: { xs: "100%", md: "30vw" }, position: "relative", border: "1px solid black" }}>

                    <TitleArt />
                    <WordArtLeft />


                    <Typography component="h1" variant="h5" sx={{ width: "100%", padding: "0.25rem 1rem", marginLeft: { xs: "1rem", lg: "14rem" }, marginTop: "0", color: theme.palette.common.dark, fontFamily: ` 'Edu TAS Beginner', cursive` }}>
                        “Creativity takes courage” <br /><span style={{ marginLeft: "3rem" }}> — Henri Matisse</span>
                    </Typography>

                    <Typography component="h1" variant="h6" sx={{ width: "100%", padding: "0.25rem 2rem", marginTop: { md: "0", xs: "12rem", sm: "1rem", lg: "4rem" }, color: theme.palette.common.dark, fontFamily: ` 'Edu TAS Beginner', cursive`, marginLeft: { xs: "1rem", lg: "14rem" } }}><FilterHdrIcon sx={{ fontSize: "40px", color: theme.palette.secondary.main }} /><br />
                        “If I could say it in words there would be no reason to paint.” <br /><span style={{ marginLeft: "3rem" }}> — Henri Matisse</span>
                    </Typography>

                    <Typography className={styles.ART} componenet="h1" variant="h2"
                        sx={{ fontSize: { xs: "180%", sm: "auto" }, top: { xs: "38%", lg: "56%",xl:"65%" } }}
                    >
                        ART
                    </Typography>
                    <Typography componenet="h1" variant="h1" className={styles.DESIGN}
                        sx={{ fontSize: { xs: "180%", sm: "290%" }, zIndex: "1000", top: { xs: "30%", sm: "29%", md: "auto" }, left: { sm: "75%", md: "80%", xs: "65%" } }}
                    >
                        DESIGN
                    </Typography>

                </Grid>
                <Grid item xs={6} md={6} sx={{ backgroundColor: theme.palette.common.light, height: "100vh", width: { xs: "50vw", md: "30vw" }, position: "relative" }}>
                    <Typography className={styles.DECO} componenet="h1" variant="h2"
                        sx={{ fontSize: { xs: "180%", sm: "auto" }, top: { xs: "38%", lg: "56%",xl:"65%" } }}

                    >
                        DECO
                    </Typography>
                    <GlobalColFlex style={{ height: "100%", width: "100%", color: "black" }}>
                        <img src="https://images.unsplash.com/photo-1655821189192-ee3bdde7ea2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" alt="www.master-connect.ca" style={{ width: "100%", height: "100%", margin: "auto" }} />
                    </GlobalColFlex>
                </Grid>
            </Grid>

            <GlobalColFlex sx={{ flex: "4", flexGrow: 1, height: "auto", backgroundColor: theme.palette.common.dark }}>
                <RightDesign />
            </GlobalColFlex>

            

        </ContainerFluid>
        <Container maxWidth="xs">
        <Stack direction="column" sx={{ margin: "1rem auto" }}>
          {showPurchaseBtn  ? <UserSignedInPurchaseBtn /> :
          <ModalContainer />}
        </Stack>
      </Container>
      </>
    )
}

export default Design2