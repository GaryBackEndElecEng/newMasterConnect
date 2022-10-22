import React, { useEffect, useContext, useState } from 'react';
import { Card, CardMedia, Box, Stack, Image, Container, Grid, Typography, Paper, Button, Fab } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import ImgSlider from './ImgSlider';
import Stars from './Stars'
import { useTheme } from '@mui/material/styles';
import Modal from '../utils/Modal';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import Shop2Icon from '@mui/icons-material/Shop2';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModalContainer from '../utils/ModalContainer';
import RegisterPage from '../RegisterPage';
import styled from 'styled-components';
import GetRegisterPages from '../utils/GetRegisterPages';
import Design4Helmet from './Design4Helmet';

let prevCount = 1;
const bgflowers = "https://www.coolgreenandshady.com/wp-content/uploads/2020/04/124-GHM_PS-2016-2-1024x375.jpg"
const bgflowers2 = "http://localhost:3000/images/wallPaperFlower.png"
const bgPatterns = "http://localhost:3000/images/wallPaperPattern.png"

const ContainerFlowersBgImage=styled.div.attrs({className:"containerFluidImage"})`
position:relative;
width:100vw;
height:auto;
margin:auto;
margin-top:-100px;
padding-top:5rem;
padding-bottom:2rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
background-image:url(${({bgImage})=>bgImage});
background-size: 25% 25%;

@media screen and (max-width:900px){
   margin-top:-50px;
   background-size: 100% 50%;
   padding-top:1rem;
}
@media screen and (max-width:600px){
   margin-top:-90px;
   background-size: 100% 50%;
   padding-top:1rem;
}

`;
const CustTypo = styled(Typography)`
animation: showLeft 1s ease-in-out;

@keyframes showLeft {
    from {opacity:0;transform:translateX(-100%);}
    to {opacity:1;transform:translateX(0%);}
}
@media screen and (max-width:900px){
    top:10%;
}
`;

const Design4 = () => {
    const theme = useTheme();
    const { setTitle, setStyleName, workArr, flowerImg,setChangePage,staticImage } = useContext(GeneralContext);
    const {getProductList}=useContext(PriceContext);
    const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
    const getFlowers = flowerImg.loaded ? flowerImg.data : null;
    const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState(false);
    const [show, setShow] = useState({loaded:false,id:null});

    useEffect(()=>{
        if(getProductList.loaded){
            let obj=getProductList.data.filter(obj=>(parseInt(obj.id)===6))[0]
            let kewds=obj.desc.split(" ")
            .filter(wd=>(wd !=="the"))
            .filter(wd=>(wd !=="This"))
            .filter((wd)=>(wd !=="a"))
            .filter(wd=>(wd !=="for"))
            .filter(wd=>(wd !=="in"))
            .filter(wd=>(wd !=="is"))
            .filter(wd=>(wd !=="of"))
            .filter(wd=>(wd !=="are"))
            setSummary(obj.summary);
            setDesc(obj.desc);
            setKeywords(kewds);
            setimage(`${staticImage}/${obj.imageName}`);
            setOBJ(obj)
        }
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    },[getProductList.loaded]);

    const fourArrL = [{ 'id': 0, 'name': 'Sweet Blossom Collection',"comment":"This changes a page: Thanks for pressing Me" }, { 'id': 1, 'name': 'Bunches Collection | 50% Off',"comment":"This changes a page: Pretty cool!" }, { 'id': 2, 'name': 'Sympathy & Funeral Flowers',"comment":"This changes a page: Hope you don't buy this often" }, { 'id': 3, 'name': 'Designer Collection - Half Price',"comment":"This changes a page: BUY ME!" }]
    const fourArrR = [
        {
            'id': 0, star: 3.5, phrase: "Many thanks for flowers - the bouquet was beautiful and the service was great. Will certainly use you again!",
            'name': 'Joanna,Regina'
        },
        {
            'id': 1, star: 4.5, phrase: "Bloomex is amazing! It does a great job for delivery and the products are always top notch",
            'name': 'Sara, North York'
        },
        {
            'id': 2, star: 4, phrase: "I really enjoy how easy it is to go online and make the selection. The feed back from those receiving the product is very positive",
            'name': 'Betty, Montreal'
        },
        {
            'id': 3, star: 5, phrase: "I have used your service numerous times and have always been very happy! Everyone who has received flowers were very impressed and happy THANK YOU!!!",
            'name': 'Veronica, Alberta'
        }]
    const [count, setCount] = useState(1);

    const handleLeft = () => {
        if (prevCount > 0 && prevCount <= 14) {
            setCount(prevCount--);
        } else {

            prevCount = 14;
            setCount(prevCount);
        }
    }
    const handleRight = () => {
        if (prevCount > 0 && prevCount <= 13) {
            setCount(prevCount++);
        } else {
            prevCount = 1;
            setCount(prevCount);
        }
    }

    useEffect(() => {
        const title1 = workArr.filter(obj => (obj.id === 4))[0].title
        setTitle(title1);
        setStyleName("Style 5");
        setChangePage(false);
    }, [setStyleName, setTitle]);

    useEffect(() => {
        const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
        if (getUser_id) {
            setShowPurchaseBtn(true);
        }
    }, [])

    useEffect(() => {
        const forwardCount = () => {
            if (prevCount > 0 && prevCount <= 13) {
                setCount(prevCount++);
                setTimeout(() => {
                    forwardCount();
                }, 4000)
            } else {
                prevCount = 1;
                setCount(prevCount);
            }
        }
        forwardCount();
    }, [setCount]);

    const handleShow=(e,id)=>{
        e.preventDefault();
        setShow({loaded:true,id:id})

    }

    return (
        <>
            <ContainerFlowersBgImage bgImage={bgPatterns} className="sliderHeader" >
                <Design4Helmet summary={summary} desc={desc} image={image} keywords={keywords} OBJ={OBJ} />
                <GetRegisterPages/>
                <RegisterPage />
                <Container maxWidth="xl" className="text-center"
                    sx={{
                        margin: { xs: "0.25rem -20px", sm: "1rem -10px", md: "auto" },
                        padding: { xs: "0px", sm: "0px", md: "0.25rem" },
                        display: "flex", justifyContent: "flex-start", alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Paper component="div" elevation={4}
                        sx={{
                            position: "relative",
                            minHeight: "450px", width: "100%", height: "100%", margin: "1rem auto",
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            background: "tranparent", backgroundImage: `url(${bgflowers})`, backgroundSize: "100% 100%"
                        }}
                    >
                        <Paper
                            sx={{
                                padding: "2px 15px", background: "rgba(255,255,0,.3)", color: theme.palette.common.dark,margin:"2rem auto"
                            }}>
                            <Typography component="h1" variant="h3">
                                Flowers
                            </Typography>
                        </Paper>

                        <Grid container spacing={{xs:0,sm:1,md:2}}
                            sx={{
                                margin: {xl:"5rem 1rem"}, justifyContent: "center",
                                alignItems: "flex-start",
                                width: "95%", height: "100%",
                                background: theme.palette.card.light, padding: "1rem 1rem",

                            }}
                        >
                            <Grid item xs={12} md={3} className="leftSide" sx={{position:"relative"}}>
                                {fourArrL.map((obj) => (
                                    <Box key={obj.id} sx={{margin:"0.5rem auto"}} onClick={(e)=>handleShow(e,obj.id)}
                                    onMouseOut={()=>setShow({loaded:false})}>
                                        <Button href="#"
                                            sx={{ boxShadow: "1px 2px 2px solid black", border: "1px solid grey" }}>
                                            {obj.name}
                                        </Button>
                                        {(show.loaded && show.id===obj.id) && 
                                    <CustTypo component="h1" variant="h5"
                                    sx={{position:"absolute",top:{md:"100%",sm:"0%",xs:"-40%"},
                                    boxShadow:"1px 1px 15px 7px grey",background:theme.palette.common.background,
                                    color:"white",
                                    width:{xs:"100%",sm:"25%",md:"80%"},
                                    left:{lg:"15%"}
                                }}
                                    >
                                        {obj.comment}
                                    </CustTypo>}
                                    </Box>
                                ))}
                            </Grid>
                            <Grid item xs={12} md={6} className="main"
                                sx={{
                                    position: "relative",
                                    boxShadow: "1px 2px 3px grey",
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                    height: "650px",
                                    alignSelf: "center", justifySelf: "center",
                                    margin:{xs:"0.5rem -20px",sm:"0.5rem -10px",md:"0.5rem auto"}
                                }}
                            >
                                <ImgSlider count={count} getFlowers={getFlowers} />

                            </Grid>
                            <Grid item xs={12} md={3} className="rightSide">
                                {fourArrR.map((obj) => (
                                    <Box key={obj.id}>
                                        <Typography component="div" variant="h5" >
                                            <Button href="#"
                                                sx={{
                                                    boxShadow: "1px 2px 2px solid black", border: "1px solid grey",
                                                    display: "flex", flexDirection: "column", alignItems: "center"
                                                }}
                                            >
                                                {obj.name}

                                                <Box><Stars rating={obj.star} /></Box>
                                            </Button>
                                        </Typography>
                                        <Typography component="h1" variant="body2" sx={{ textAlign: "left", padding: "1rem 0", background: theme.palette.common.light }}>{obj.phrase.substring(0, 126)}</Typography>
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                        <Button variant={"contained"} className="w3-button w3-display-left" onClick={() => { handleLeft() }}
                            sx={{
                                fontSize: "20px", alignSelf: "flex-start", position: "absolute", left: {lg:"22%",sm:"0%",xs:"0%"},
                                background: theme.palette.primary.light,
                                top: { xs: "55%", sm: "auto" }
                            }}
                        ><ArrowBackIosNewIcon /></Button>
                        <Button variant="contained" className="w3-button w3-display-right" onClick={() => { handleRight() }}
                            sx={{
                                fontSize: "20px", alignSelf: "flex-end", position: "absolute", right: {lg:"22%",sm:"0%",xs:"0%"},
                                background: theme.palette.primary.light,
                                top: { xs: "55%", sm: "auto" }
                            }}
                        ><ArrowForwardIosIcon /></Button>
                        <Box
                            sx={{
                                margin: "auto",
                                position: "absolute",
                                top: "5%",
                                left: "5%",
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: theme.palette.secondary.dark
                            }}
                        >
                            {count}
                        </Box>
                    </Paper>
                </Container>

            </ContainerFlowersBgImage>
            <Container maxWidth="md">
                <Stack direction="column" sx={{ margin: "1rem auto" }}>
                    {showPurchaseBtn ? <UserSignedInPurchaseBtn />
                        :
                        <ModalContainer />}
                </Stack>
            </Container>
        </>
    )

};

export default Design4