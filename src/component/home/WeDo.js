import React, { useEffect, useState, useContext, useRef, useMemo } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import Styles from './home.module.css';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { Container,  Box, Paper, Typography, Grid, } from '@mui/material';
// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import StorageIcon from '@mui/icons-material/Storage';
// import PaymentIcon from '@mui/icons-material/Payment';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
// import RssFeedIcon from '@mui/icons-material/RssFeed';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import api from '../axios/api';
import WeDoSubComp from './WeDoSubComp';



const ContainerDisplay = styled(Container)`
margin:1rem auto;
margin-bottom:3rem;
position:relative;
display:${({ display }) => display};
display:flex;
justify-content:center;
min-height:50vh;
align-items:center;
flex-direction:column;
animation: growInOnStart 2.5s ease-in-out;

@keyframes growInOnStart {
    from {opacity:0;}
    to {opacity:1;}
}

`;



const WeDo = () => {
    var counter = 1;
    const maxTime=4700;
    const theme = useTheme();
    const { staticImage, allServiceArray, setAllServiceArray } = useContext(GeneralContext);
    const [counterWatch, setCounterWatch] = useState({});
    const [turnOn, setTurnOn] = useState(false);
    const [endDisplay, setEndDisplay] = useState(false);
    const [closeDisplay, setCloseDisplay] = useState(false);
    const opacity = closeDisplay ? 0 : 1;
    const imagePic=`${staticImage}/contactWallpaper.png`

    const serviceArr = [
        { id: 1, image: `${staticImage}/revenue.png`, content: " We build revenue", icon: <ShoppingCartIcon fontSize="15px" />, display: false, count: 1 },
        { id: 2, image: `${staticImage}/bank.png`, content: " We Connect You to services", icon: <CreditScoreIcon fontSize="15px" />, display: false, count: 2 },
        { id: 3, image: `${staticImage}/design.png`, content: " We Design", icon: <AddBusinessIcon fontSize="15px" />, display: false, count: 3 },
        { id: 4, image: `${staticImage}/book.png`, content: " We Help Educate ", icon: <MenuBookIcon fontSize="15px" />, display: false, count: 4 },
        { id: 5, image: `${staticImage}/robot.png`, content: " We Automate Processes ", icon: <PrecisionManufacturingIcon fontSize="15px" />, display: false, count: 5 },
        { id: 6, image: `${staticImage}/navigate.png`, content: " We faciliate Easy Navigation ", icon: <AssistantDirectionIcon fontSize="15px" />, display: false, count: 6 },
        { id: 7, image: `${staticImage}/design.png`, content: " We work at satisfying you.", icon: <SavedSearchIcon fontSize="15px" />, display: false, count: 7 },
    ]
    const getObj = (arr) => {
        let obj = arr.filter(obj => (parseInt(obj.count) === counter))[0]
        if (obj){ 
            // console.log("OBJ",obj,"COUNT",counter,turnOn)
            setTurnOn(true)
            return obj
        }
    }
    const loopThrough = ()=>{
        setTimeout(()=>{
            let obj=getObj(serviceArr);
            setCounterWatch(obj);
        },0);
        
        setTimeout(() => {
            
                if (counter < serviceArr.length ) {
                    // setTurnOn(false)
                    counter++;
                    loopThrough()
                }
                if (counter === serviceArr.length ) {
                    return setEndDisplay(true);
                }

            }, maxTime)
    }

    useEffect(() => {
        loopThrough();
    }, []);

    useEffect(() => {
        if (endDisplay) {
            setTimeout(() => {
                setCloseDisplay(true);
            }, 3500)
        }
    }, [endDisplay, setCloseDisplay])

    useMemo(() => {
        const getGeneralServices = async () => {
            try {
                const res = await api('/category/');
                const body = res.data
                const allServices=body.filter(obj=>(parseInt(obj.id)===3))[0].categories;
                setAllServiceArray({ loaded: true, data: allServices })
            } catch (error) {

            }
        }
        getGeneralServices();
    }, [setAllServiceArray])

    return (

        <>
            {!closeDisplay ?
                <>
                    <ContainerDisplay maxWidth="md" className={endDisplay && Styles.WeDoSmoothOut} display={closeDisplay ? "none" : "block"}>
                        <Paper elevation={10} component="div" sx={{ background: theme.palette.home.emphasize, color: theme.palette.home.background, position: "relative", margin: "3rem 0px",width:"100%" }}>
                            <Typography component="h1" variant="h3" sx={{ fontFamily: "Roboto", textAlign: "center", opacity: { opacity } }}>What We Do</Typography>
                                
                                <WeDoSubComp counterWatch={counterWatch} maxTime={maxTime} counter={counter}/>
                              
                        </Paper>
                    </ContainerDisplay>
                </>

                :
                <>
                    <Container maxWidth="lg" className={Styles.showWhoWeAre}
                    sx={{backgroundImage:`url(${imagePic})`,backgroundSize:"100% 100%"}}
                    >
                        <Paper elevation={10} sx={{ margin: "0.5rem auto", background: theme.palette.common.mediumBlue, padding: "1rem" }}>
                            <Typography component="h1" variant="h3">
                                We design what you want. Join us!
                            </Typography>
                            <Typography component="h1" variant="h5">
                                We Provide:
                            </Typography>

                            <Grid container spacing={0}>
                                {allServiceArray.loaded && allServiceArray.data.map(obj => (
                                    <Grid item xs={12} md={4} key={obj.id} sx={{padding:"0.5rem"}}>
                                        <Paper elevation={5}>
                                            <Typography component="h1" variant="h5" 
                                            sx={{padding:"0.5rem",color:theme.palette.common.teal,fontWeight:"bold"
                                            }}>
                                                {obj.title}
                                            </Typography>
                                            <Typography component="h1" variant="h6" sx={{padding:"0.5rem"}}>{obj.content}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}

                            </Grid>


                        </Paper>
                    </Container>
                </>

            }

        </>


    )
}

export default WeDo