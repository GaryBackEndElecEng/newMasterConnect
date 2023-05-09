import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import styled from 'styled-components';
import { Stack, Card, CardMedia, Typography, Fab, Grid, CardContent, Avatar, Container } from '@mui/material';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import CoverPage from './CoverPage';
import styles from './design14.module.css';
import ProductHelmet from './ProductHelmet';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import products from './product.json';
import sliderImg from './slider.json';
import ModalContainer from '../utils/ModalContainer';
import Included from '../utils/Included';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


const MainCover = styled.div`
width:100vw;
position:relative;
min-height:46vh;
margin-top:0px;
margin-top:2rem;
@media screen and (max-width:900px){
    margin-top:2rem;
}
@media screen and (max-width:600px){
    margin-top:3.5rem;
}
`;
const StackMediaTrain=styled(Stack)`
margin:auto;
width:100%;
justify-content:flex-start;
align-items:center;
flex-wrap:nowrap;
animation: ${({start})=>start ? "autoSlider" : ""} 16s linear alternate infinite;
@keyframes autoSlider {
    from {
        transform: translateX(0%);
    }
    to{
        transform: translateX(-${({length})=>(length-1)*100}%);
    }
   
}
`;

const Product = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const [getProducts, setGetProducts] = useState({ loaded: false, data: [] });
    const [start, setStart] = useState({ id: null, loaded: false });
    const { setTitle, setStyleName,average,getPathLocation,pageRatings,staticImage,productDesigns } = useContext(GeneralContext);
    const [pageRatingHelmet, setPageRatingHelmet] = useState(null);
    const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
    const [seeDetail, setSeeDetail] = useState({loaded:false,id:null});
    const [detail, setDetail] = useState(false);
    const [OBJ,setOBJ]=useState(null);
    const [keywords, setKeywords] = useState([]);
    const [summary, setSummary] = useState([]);
    const image=`${staticImage}/design14.png`;
    const [length,setLength]=React.useState(null);

    useEffect(() => {
        if (pageRatings.loaded && pageRatings.data) {
            let tempPageRating=pageRatings.data.filter(obj => (obj.page === pathname))
                if(tempPageRating){
            setPageRatingHelmet(pageRatings.data.filter(obj => (obj.page === pathname)))
                }
        }
        if(productDesigns.loaded){
        let getOBJ=productDesigns.data.filter(obj=>(obj.extra_kwargs==="/design14"))[0];
        setOBJ(getOBJ);
        }
    }, [pathname, pageRatings,productDesigns]);

    useEffect(() => {
        let arr=[];
        if (products) {
            setGetProducts({ loaded: true, data: products });
            setLength(products.length);
            products.forEach((obj,index)=>{
                arr.push(`${obj.name} is a sample product  to help display a web-page.`)
            });
            setKeywords(arr);
            setSummary(" this page displays to the viewer a sample of how a line of products can be displayed")
        }
        setTitle("product display");
        setStyleName(" sample prod.Display");
        if (window.scrollY) {
            window.scroll(0, 0);
        }
        const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
        if (getUser_id) {
            setShowPurchaseBtn(true);
        }
    }, [setTitle, setStyleName]);

    const handleSlide = (e, id) => {
        if (!start.loaded) {
            setStart({ loaded: true, id: id });
        } else {
            setStart({ loaded: false, id: null });
        }
    }
    const handleSeeDetail=(e,id)=>{
        e.preventDefault();
        if(!seeDetail.loaded){
        setSeeDetail({loaded:true,id:id});
        setDetail(false);
        }else{
            setSeeDetail({loaded:false,id:null})
        }

    }
    const handleShowMe=(e)=>{
        if(e ){
            
        }
    }
    const handleShowMeOut=(e)=>{
        if(e){
            
        }
    }

    return (
        <MainCover
        className={styles.mainCover}
        >
            <RegisterPage />
            <GetRegisterPages />
            <PageRating />
            <ProductHelmet 
            keywords={keywords}
            summary={summary}
            image={image}
            pageRatings={pageRatingHelmet}
            getArray={products}

            />
            <CoverPage sliderArray={sliderImg} />
            <Grid container spacing={{ xs: 1, md: 2 }}>
                {getProducts.loaded && getProducts.data.map((obj, index) => (
                    <Grid item xs={12}  md={4} key={`${obj.id}-product--${index}`}>
                        <Card elevation={10}
                            sx={{ position: "relative", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}
                            
                        >
                            <Avatar src={obj.logo} alt="www.masterconnect.ca"
                                sx={{ width: "75px", height: "75px", boxShadow: "1px 1px 20px 3px black", alignSelf: "stretch", margin: "0.5rem",cursor:"pointer",position:"relative" }}
                                onClick={(e)=>handleSeeDetail(e,obj.id)}
                                className={ styles.showClickMe}
                                onMouseOver={(e)=>handleShowMe(e)}
                            />
                            {(seeDetail.loaded && seeDetail.id===obj.id) &&
                            <Stack direction="column" sx={{justifyContent:"center",alignItems:"center",position:"absolute",top:"0%",left:"15%"}}>
                                {!detail ? 
                                <>
                                <Typography component='h1' variant="h5">See detail</Typography>
                                <Fab variant="extended" color="secondary" size="medium"
                                onClick={()=>setDetail(true)}
                                >
                                    product  <ManageSearchIcon sx={{ml:1,color:"red"}}/>
                                </Fab>
                                </>
                                :
                                <Typography component='h1' variant="h5">Sends you to the detail page</Typography>
                                
                            }
                            </Stack>
                            }
                            <Stack direction="row" spacing={{ xs: 1, md: 4,sm:2 }} sx={{ margin: "auto", width: "100%", overFlowX: "auto", cursor: "pointer",postion:"relative" }}

                                onClick={(e) => handleSlide(e, obj.id)}
                            >
                                <StackMediaTrain
                                direction="row"
                                start={start.loaded && start.id===obj.id}
                                length={obj.imageArr.length}
                                spacing={10}
                                >
                                {obj.imageArr && obj.imageArr.map((obj1, index) => (
                                    <CardMedia
                                        // className={(start.loaded && start.id === obj.id) ? styles.cardSlide : styles.card}
                                        key={`${obj1.id}--image=${index}`}
                                        component="img"
                                        defer={true}
                                        src={obj1.image}
                                        sx={{ width: '100%', maxHeight: {xs:"350px",sm:"500px",md:"500px"},aspectRatio:"4/3" }}

                                    />
                                ))}
                                </StackMediaTrain>
                            </Stack>
                            <CardContent
                                sx={{ margin: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
                                <Typography component='h1' variant="h4" sx={{ textAlign: "center", margin: "auto" }}>{obj.name}</Typography>
                                <Typography component='h1' variant="body1" sx={{ textAlign: "center", margin: "0.5rem auto" }}>{obj.summary}</Typography>
                                <Typography component='h1' variant="body2" sx={{ textAlign: "center", margin: "auto" }}>{obj.desc}</Typography>
                            </CardContent>
                        </Card>
                        <Stack direction="column" sx={{ alignItems: "center", margin: '1rem auto' }}>
                            <Fab color="info" variant="extended" size="medium">add to basket</Fab>
                        </Stack>
                    </Grid>

                ))}
            </Grid>
            
            <Container maxWidth="lg" sx={{ margin: "1rem auto" }}>
                <Typography component="h1" variant="h4" sx={{ textAlign: "center", margin: "1rem auto" }}>Please comment - we aim to improve</Typography>
                <PageFeedback />
            </Container>
        </MainCover>
    )
}

export default Product