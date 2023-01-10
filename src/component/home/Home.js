import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
// import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { Container, Stack, Typography, Fab, Paper, Box } from '@mui/material';
import Styles from './home.module.css';
import { useTheme } from '@mui/material/styles';
import CoverPage from './CoverPage';
import ThemeExampleSlideIn from './ThemeExampleSlideIn';
import WeDo from './WeDo';
import TopDesigns from './TopDesigns';
import ShowGetQuoteForm from './ShowGetQuoteForm';
// import ViewHidArticles from './ViewHidArticles';
import MiddleBanner from './MiddleBanner'
import CallBackRequest from '../about/CallBackRequest';
import RegisterPage from '../RegisterPage';
import SigninMsg from './SigninMsg';
import SpecialCreateValue from './SpecialCreateValue';
import ArticleBanner from './ArticleBanner';
import GetRegisterPages from '../utils/GetRegisterPages';
import CalculateBanner from './CalculateBanner';
import HomeHelmet from './HomeHelmet';
import ShowGoToMyAccount from './ShowGoToMyAccount';
import BioBanner from './BioBanner';
import LightbulbIcon from '@mui/icons-material/Lightbulb';





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
    margin-top:-50px;
}
`;

const MainContainer = styled.div`
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
function todayDate(){
    return Date.now()
}


const Home = () => {
    const theme = useTheme();
    const { setLoaded, setTitle, changePage, setStyleName, staticImage, setOpen, callBackConfirmed, registerConfirmed, setChangePage, allCategory, getPathLocation,FAQS } = useContext(GeneralContext);
    const { signout, signin, viewAccount, loggedIn } = useContext(TokenAccessContext);

    const [window600, setWindow600] = useState(false);
    const [seeExample, setSeeExample] = useState(false);
    const [makeEasy, setMakeEasy] = useState(false);
    const [profileHelmet, setProfileHelmet] = useState({});
    const [generalInfoHelmet, setGeneralInfoHelmet] = useState({loaded:false,data:[]});
    const [turnOnWeDo, setTurnONWeDo] = useState(false);
    const [activate, setActivate] = useState(false);
    const [activateBio, setActivateBio] = useState(false);
    const [hello, setHello] = useState(false);
    const myRef = useRef();
    // const homeHeight = removeBlock ? 375 : null;

    const homeBg2 = `${staticImage}/homeBg3.png`;
    const getGeneralInfoHelmet = generalInfoHelmet.loaded ? generalInfoHelmet.data : null;

    const observers = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTurnONWeDo(true)
                setActivate(true);
                if (entry.target.id === "bio") {
                    setActivateBio(true);
                    return
                } if (entry.target.id === "test") {
                    setHello(true);

                }
            } else {
                setActivate(false);
            }
        }, { threshold: 1 });

    });

    const handleRef = (e) => {
        if (e) {
            observers.observe(e)
        }
    }

    const handleRef3 = (e) => {
        if (e) {

            observers.observe(e)

        }
    }

    useEffect(() => {
        const getAllCats = async () => {
            let bio = await allCategory.data.filter(obj => (obj.section === "bio"))[0].catWordSnippet[0]
            let general = await allCategory.data.filter(obj => (obj.section === "GeneralInfo"))[0].categoryGeneralInfo[0]
            let bio1 = bio;
            setProfileHelmet(bio1)
            setGeneralInfoHelmet({loaded:true,data:general})
        }
        if (allCategory.loaded && allCategory?.data) {
            getAllCats();
        }
    }, [allCategory.loaded, allCategory.data])

    

    useEffect(() => {
        setTitle("Web Service");
        setChangePage(false);;
        if (window.scrollY) {
            window.scroll(0, 0);

        }
    }, [setTitle, setChangePage])


    useEffect(() => {

        setTimeout(() => {
            setLoaded(false)

        }, 2000)
        setStyleName("master-connect")

    }, [setLoaded, setStyleName]);


    useEffect(() => {
        if (window.innerWidth < 600) {
            setWindow600(true);
        } else { setWindow600(false) }
    }, [setWindow600, window600, changePage,]);

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

    const testMyRef = useCallback(e => {
        if (e === null) return
        observers.observe(e)
    }, []);
    

    return (
        <>
            <RegisterPage />
            <GetRegisterPages />
            <HomeHelmet
            newDate={todayDate()}
            FAQS={FAQS.loaded ? FAQS.data:null}
                profileHelmet={profileHelmet}
                generalInfoHelmet={getGeneralInfoHelmet}
                getPathLocation={getPathLocation.loaded ? getPathLocation.data : ""}
            />

            <ContainerHomeFluid style={{ marginTop: { xs: "3rem", md: "0px" } }}>

                <MainContainer
                    bg={"white"}
                    // bgUrl1={homeBg2}
                    style={{ marginTop: { md: "2rem", xs: "4.5rem" }, }}


                >

                    <CoverPage makeEasy={makeEasy} />
                    
                    <Typography component="h1" variant="h5"
                                sx={{ color: "black", fontFamily: "Roboto", fontSize: { xs: "35px", sm: "50px" }, marginTop: "2rem", marginBottom: "1rem", position: "relative",textAlign:"center" }}
                            >
                                Designs
                                <SigninMsg
                                signin={signin}
                                registerConfirmed={registerConfirmed}
                                signout={signout}
                            />
                             <ShowGoToMyAccount 
                             viewAccount={viewAccount}
                             loggedIn={loggedIn}
                             />
                            </Typography>

                           <TopDesigns makeEasy={makeEasy}/>
                          
                    {!seeExample ?
                        <>
                            
                            <Stack direction={"column"} sx={{ mt: 1, mb: 2, maxWidth: "350px" }} >
                                <Fab variant="extended" size={"small"} ref={(e) => handleRef(e)}
                                    onClick={(e) => handleExample(e)}
                                    sx={{ fontFamily: "Roboto", m: 2, padding: { xs: "10px", sm: "20px" }, fontSize: { xs: "15px", sm: "20px" }, zIndex: "2" }}
                                    color={"primary"}
                                >see More!
                                </Fab>
                            </Stack>
                            </>
                            :
                            <Container maxWidth="xl" sx={{ position: "relative" ,margin:"2rem auto"}}>
                                <ThemeExampleSlideIn />
                            </Container>
                        
                        }

                    <Container maxWidth="xl" className={Styles.msgContainer} spacing={0} sx={{ textAlign: "left", position: "relative" }}>
                        
                        {!callBackConfirmed && <ShowGetQuoteForm />}
                        {callBackConfirmed && <Paper elevation={3} component="div" sx={{ width: "100%", margin: { xs: "1rem auto", sm: "0.5rem auto" }, transform: { sm: "translateY(-10%)" } }}>
                            <CallBackRequest />
                        </Paper>}
                        <SpecialCreateValue />

                        <Container maxWidth="lg" sx={{ position: "relative", margin: "2rem auto" }}>
                            {turnOnWeDo && <WeDo />}
                        </Container>

                    </Container>
                    <MiddleBanner bg={homeBg2} />
                    {!loggedIn &&
                        <>
                            <CalculateBanner />

                            <Stack id="test" ref={(e) => testMyRef(e)}
                                sx={{
                                    margin: "1rem auto", padding: "0.5rem", background: theme.palette.splash2,
                                    justifyContent: "center", alignItems: "center", width: { xs: "100%", md: "80%", sm: "85%" }, position: "relative", boxShadow: "1px 1px 10px 5px lightgrey"
                                }}
                                direction="column"
                            >
                                <LightbulbIcon
                                    sx={{
                                        fontSize: { md: "60px", sm: "60px", xs: "30px" }, left: { xs: "0%", sm: "-10%", md: "0%" }
                                    }}
                                    className={hello ? Styles.lightbulb : Styles.hide}
                                />
                                <Typography component="h1" variant="h5"
                                    className={hello ? Styles.showHello : Styles.hide}
                                    sx={{ color: "white" }}
                                >

                                    The Calculator can help you determine your cost and give you peace-of-mind.
                                </Typography>
                            </Stack>
                        </>
                    }
                    <ArticleBanner />
                    <div id="bio" ref={(e) => handleRef3(e)}>
                        <BioBanner activate={activateBio} />
                    </div>

                </MainContainer>













            </ContainerHomeFluid>
        </>
    )
}

export default Home