import React, { useContext, useEffect, useState,  } from 'react'
import { useNavigate,  } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {PriceContext} from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Card, CardContent, CardMedia, Container,  Fab,  Grid, Paper, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
// import styles from './works.module.css';
import RevealPrice from './RevealPrice';
import RegisterPage from '../RegisterPage';
import Summary from './Summary';
import GetRegisterPages from '../utils/GetRegisterPages';
import WorksHelmet from './WorksHelmet';
import RatedPages from './RatedPages';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const WorksContainer = styled.div`
margin:0;
margin-top:-10px;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
max-width:100vw;
min-height:80vh;
background:${({ bg }) => bg};
animation: clearIn 1.5s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
margin-top:-10px;
}
@media screen and (max-width:600px){
margin-top:-70px;
}
`;
const CusPaper = styled(Paper)`
height:100%;
position:absolute;
padding:1rem;
animation: growUp 4s ease-in-out;
background:transparent;
@keyframes growUp {
    from {opacity:0;transform:translateY(20%);
    height:0%;background:lightgrey;}
    to {opacity:1;transform:translateY(0%);
    height:100%;background:transparent;}
}
`;
const WorkFeatures = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { setChangePage, setTitle, setStyleName, staticImage,getPathLocation,pageRatings,average } = useContext(GeneralContext);
    const {getProductList} =useContext(PriceContext);
    const design = `${staticImage}/mainDesign.png`;
    const [keywords, setKeywords] = useState(null);
    const [desc, setDesc] = useState(null);
    const [summary, setSummary] = useState(null);
    const [helmetProduct,setHelmetProduct]=useState([]);
    const [sendRated,setSendRated]=useState([]);
    const [showReview,setShowReview]=useState(false);

    useEffect(()=>{
        let arr=[];
        if(getProductList.loaded && getProductList.data && pageRatings.loaded){
            getProductList.data.forEach((obj,index)=>{
                let getReview= pageRatings.data.filter(rateObj=>(rateObj.page===obj.extra_kwargs))
                arr.push({...obj,"review":getReview});
            });
            setHelmetProduct(arr)
            setSendRated(arr)
        }
        
    },[getProductList.loaded,getProductList.data,pageRatings.loaded,pageRatings.data]);

    useEffect(() => {
        if (getProductList.loaded) {
            setKeywords(
                getProductList.data.map(obj => (obj.name)).concat(["Products", "sale", "buy"])
            )
            setDesc(
                getProductList.data.map(obj => (obj.desc).slice(0, 100))
            )
            setSummary(
                getProductList.data.map(obj => (obj.desc).slice(0, 100))
            )
            
        }
    }, [getProductList.loaded, getProductList.data]);

    useEffect(() => {
        setTitle("Designs");
        setStyleName("Design ideas")
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, [setTitle, setStyleName]);

   

    const handleNavigate = (e, link) => {
        if (!link.startsWith("https")) {
            navigate(link, setChangePage(true));
        } else { window.open(link); }

    }
    const handleShowReview = (e)=>{
        e.preventDefault();
        if(!showReview ){
            setShowReview(true)
        }else{setShowReview(false)}
    }
    return (
        <WorksContainer bg={theme.palette.common.lightTeal} >
            <WorksHelmet 
            keywords={keywords}
             summary={summary}
             desc={desc}
             products={helmetProduct}
             staticImage={staticImage}
             getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
             average={average !== 0 ? average:"4"}
             />
            <RegisterPage />
            <GetRegisterPages />
            <Container maxWidth="xl"
                sx={{ backgroundImage: `url(${design})`, backgroundSize: "100% 100%", width: "100%", minHeight: "40vh", marginTop: "1rem", display: "flex", justifyContent: "center", position: "relative" }}
            >
                <CusPaper elevation={20} sx={{ background: "transparent", color: theme.palette.common.light, }}>
                    <Typography component="h1" variant="h3" sx={{ fontSize: { xs: "32px", md: "60px" }, padding: "1rem" }}> Sample Templates for Ideas</Typography>
                </CusPaper>
            </Container>
            <Container maxWidth="xl" sx={{ margin: " 1rem auto" }}>
                <RevealPrice />
                <Stack direction="column" spacing={{xs:0,sm:1}} 
                sx={{justifyContent:"flex-start",alignItems:"center"}}
                >
                    {!showReview ? <Fab variant="extended" color="info" size="medium" onClick={(e)=>handleShowReview(e)}
                    sx={{margin:"1rem auto"}}
                    >
                        see Top Reviews <ExpandMoreIcon sx={{ml:1,color:"red"}}/>
                    </Fab>
                    :
                    <Fab variant="extended" color="info" size="medium" onClick={(e)=>handleShowReview(e)}
                    sx={{margin:"1rem auto"}}
                    >
                        close Reviews <ExpandLessIcon sx={{ml:1,color:"red"}}/>
                    </Fab>}
                </Stack>
                {showReview && <RatedPages helmetProduct={sendRated}/>}
                <Stack direction="column" spacing={{xs:0,sm:1}} 
                sx={{justifyContent:"flex-start",alignItems:"center"}}
                >
                    {showReview &&
                    <Fab variant="extended" color="info" size="medium" onClick={(e)=>handleShowReview(e)}
                    sx={{margin:"1rem auto"}}
                    >
                        close Reviews <ExpandLessIcon sx={{ml:1,color:"red"}}/>
                    </Fab>}
                </Stack>
                <Grid container spacing={3}>
                    {getProductList.loaded && getProductList.data.map(obj => (

                        <Grid item xs={12} md={4} key={obj.id} >
                            <Card sx={{ width: "100%", "&:hover": { cursor: "pointer" }, position: "relative" }} >
                                <Paper elevation={10} sx={{ width: "100%", margin: "1rem auto", textAlign: "center" }}>
                                    <Typography component="h1" variant="h4" sx={{ textAlign: "center", fontFamily: "Roboto", width: "100%" }}>{obj.name}</Typography>
                                </Paper>
                                <CardMedia component="img" image={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" onClick={(e) => handleNavigate(e, obj.extra_kwargs)} />
                                <CardContent>
                                    <Typography component="h1" variant="h6" sx={{ textAlign: "center", fontFamily: "Roboto" }}>{obj.desc}</Typography>
                                </CardContent>
                                <Stack direction="column" sx={{ textAlign: "center" }}>
                                    <Summary summary={obj.summary} />
                                </Stack>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Container>

        </WorksContainer>
    )
}

export default WorkFeatures