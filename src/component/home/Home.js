import React, { useEffect, useState, useContext, } from 'react';
// import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import { Container, Stack, Typography, Fab, Paper } from '@mui/material';
import Styles from './home.module.css';
import { useTheme } from '@mui/material/styles';
import CoverPage from './CoverPage';
import ThemeExampleSlideIn from './ThemeExampleSlideIn';
import WeDo from './WeDo';
import ShowGetQuoteForm from './ShowGetQuoteForm';
// import ViewHidArticles from './ViewHidArticles';
import MiddleBanner from './MiddleBanner'
import CallBackRequest from '../about/CallBackRequest';
import RegisterPage from '../RegisterPage';
import SigninMsg from './SigninMsg';
import SpecialCreateValue from './SpecialCreateValue';
import ArticleBanner from './ArticleBanner';
import GetRegisterPages from '../utils/GetRegisterPages';
import HomeHelmet from './HomeHelmet';
import HomeHelmet2 from './HomeHelmet2';
// import id from 'date-fns/esm/locale/id/index.js';




const ContainerHomeFluid = styled.div.attrs({ className: "ContainerHomeFluid" })`
margin:0;
margin-top:-40px;
position:relative;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:-32px;
}
@media screen and (max-width:600px){
    margin-top:-95px;
}
`;

const MainContainer = styled.div.attrs({ className: "mainContainerStyle" })`
background-color:${({ bg }) => bg};
background-image: url(${({ bgUrl1 }) => bgUrl1});
background-size:100% 100%;
position:relative;
width:100%;
height:auto;
margin-top:2.5rem;


@media screen and (max-width:600px){
    background-image: none;
}
@media screen and (max-width:860px){
    background-size:100% 25%;
    margin-top:3rem;
}

`;


const Home = () => {
   
    const theme = useTheme();
    // const navigate = useNavigate();
    // let popUpRef=useRef();
    const { setLoaded, setTitle, changePage, setStyleName, staticImage, setOpen, callBackConfirmed, registerConfirmed ,setChangePage,allCategory} = useContext(GeneralContext);
    const {signout,signin}=useContext(TokenAccessContext);
    
    const [window600, setWindow600] = useState(false);
    const [hideDisplay, setHideDisplay] = useState(false);
    const [seeExample, setSeeExample] = useState(false);
    const [makeEasy, setMakeEasy] = useState(false);
    const [profileHelmet,setProfileHelmet]=useState({});
    const [generalInfoHelmet,setGeneralInfoHelmet]=useState({});
    const[turnOnWeDo,setTurnONWeDo]=useState(false);
    // const homeHeight = removeBlock ? 375 : null;
   
    const homeBg2 = `${staticImage}/homeBg3.png`;
    const getGeneralInfoHelmet= generalInfoHelmet ? generalInfoHelmet:null;

    const observers= new IntersectionObserver((entries)=>{
        entries.forEach((entry,index)=>{
            if(entry.isIntersecting){
                setTurnONWeDo(true)
                
            }
        },{threshold:1});

    })
    const handleRef=(e)=>{
        if(e){
            observers.observe(e)
        }
    }

    useEffect(()=>{
        if(allCategory.loaded && allCategory.data){
            setProfileHelmet(
                allCategory.data.filter(obj=>(obj.section==="bio"))[0].catWordSnippet[0]
            )
            setGeneralInfoHelmet(
                allCategory.data.filter(obj=>(obj.section==="GeneralInfo"))[0].categoryGeneralInfo[0]
            )
        }
    },[allCategory.loaded,allCategory.data])
       


    useEffect(() => {
        setTitle("Web Service");
        setChangePage(false);;
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    }, [setTitle,])

    useEffect(() => {

        setTimeout(() => {
            setLoaded(false)

        }, 2000)
        setStyleName("Digital Master Connect")

    }, [setLoaded, setStyleName]);


    useEffect(() => {
        if (window.innerWidth < 600) {
            setWindow600(true);
        } else { setWindow600(false) }
        if (changePage) return setHideDisplay(true);
    }, [setWindow600, window600, changePage, setHideDisplay]);

    useEffect(() => {
        setTimeout(() => {
            setMakeEasy(true);
        }, 2000);
        if (seeExample) {
            setOpen(true);
        } else { setOpen(false) }
    }, [setOpen, seeExample]);

  
    const handleExample = (e) => {
        if (seeExample === false) {
            setSeeExample(true);
        } else { setSeeExample(false); }
    }
    


    return (
        <>
        <RegisterPage/>
<GetRegisterPages/>
<HomeHelmet profileHelmet={profileHelmet} generalInfoHelmet={getGeneralInfoHelmet}/>
<HomeHelmet2 generalInfoHelmet={getGeneralInfoHelmet}/>
        <ContainerHomeFluid style={{marginTop:{xs:"3rem",md:"0px"}}}>

            <MainContainer
                className={`container-fluid ${Styles.mainContainerStyle}`}
                bg={theme.palette.home.light2}
                // bgUrl1={homeBg2}
                style={{ marginTop:{md: "2rem",xs:"4.5rem"}, }}


            >
                
                <CoverPage makeEasy={makeEasy}/>
                <Container maxWidth="xl" className={Styles.msgContainer} spacing={0} sx={{ textAlign: "left",position:"relative" }}>
                    
                    <hr style={{ borderBottom: `5px solid white`, width: "100%", background: "white" }} />
                    <Stack direction="column">
                         <SigninMsg 
                         signin={signin}
                          registerConfirmed={registerConfirmed}
                          signout={signout}
                          />
                    </Stack>


                    {!callBackConfirmed && <ShowGetQuoteForm />}
                    {callBackConfirmed && <Paper elevation={3} component="div" sx={{ width: "100%", margin: { xs: "1rem auto", sm: "0.5rem auto" } ,transform:{sm:"translateY(-10%)"}}}>
                        <CallBackRequest />
                    </Paper>}
                    <SpecialCreateValue />
                    <Typography component="h1" variant="h5"
                        sx={{ color: "black", fontFamily: "Roboto", fontSize: { xs: "35px", sm: "50px" }, marginTop: "2rem", marginBottom: "1rem" }}
                    >
                        Basic Theme Examples:
                    </Typography>
                    
                    <Stack direction={"column"} sx={{ mt: 1, mb: 2, maxWidth: "350px" }} >
                        <Fab variant="extended" size={"small"} ref={(e)=>handleRef(e)}
                            onClick={(e) => handleExample(e)}
                            sx={{ fontFamily: "Roboto", m: 2, padding: { xs: "10px", sm: "20px" }, fontSize: { xs: "15px", sm: "20px" },zIndex:"2" }}
                            color={"primary"}
                        >see examples</Fab>
                    </Stack>
                    
                    {/* THEME EXAMPLES */}
                    <Container maxWidth="lg" sx={{position:"relative"}}>
                    {seeExample && <ThemeExampleSlideIn />}
                    </Container>
                    {/* SLIDER */}
                    <Container maxWidth="lg" sx={{position:"relative",margin:"2rem auto"}}>
                   {turnOnWeDo && <WeDo />}
                    </Container>

                </Container>
                <MiddleBanner bg={homeBg2} />
                    <ArticleBanner/>


            </MainContainer>













        </ContainerHomeFluid>
        </>
    )
}

export default Home