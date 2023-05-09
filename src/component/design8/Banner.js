import React, { useEffect, useContext, useState, useRef } from 'react';
import {  Stack,  Grid, Typography, } from '@mui/material';
import {Link} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import styles from './design8.module.css';

const MainContainer = styled.div`
margin:auto;
width:100vw;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
flex-direction:center;
min-height:50vh;
@media screen and (max-width:900px){
   
}
@media screen and (max-width:600px){

}
`;
const CusImage = styled.img`
opacity:${({ opacity }) => opacity};
width:100%;
filter:saturate(150%);
// transform:translate(-25%,-10%);
animation:${({ opacity }) => opacity === 1 ? "scaleIn" : ""} 15s ease-in;
@keyframes scaleIn {
    from {transform:scale(0.8);opacity:0;}
    50% {transform:scale(2);opacity:1;}
    to {transform:scale(1);opacity:1;}
}
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){

}
`;
const CustStack = styled(Stack)`
justify-content:flex-start;
align-items:center;
width:75%;
margin:1rem auto;

`;

const Banner = () => {
    const theme = useTheme();
    const { success, opacity,staticImage } = useContext(GeneralContext);
    const [trigger, setTrigger] = useState(false);
    const confidence = `${staticImage}/design8/confidence.png`;
    const transitionAbout= opacity===1 ? true: false;

    useEffect(() => {
        //opacity is triggered on Scroll
        setTrigger(0);
        if (opacity === 1) {
            setTimeout(() => {
                setTrigger(true);
            }, 15000);
            // if(trigger){
            //     setTimeout(()=>{},5000)
            // }
        }
    }, [opacity]);
   
    return (
        <MainContainer
           
        >

            <Grid container spacing={{ xs: 0, sm: 1, md: 3 }}
            sx={{margin:"1rem auto"}}
            >
                <Grid item xs={12} md={6}>
                    <hr style={{ width: "50%", color: theme.palette.common.blueGrey, height: "0.5rem" }} />
                    {(success.loaded && success.data) && success.data.map(obj => (
                        <CustStack direction="column" spacing={{ xs: 0, sm: 1 }}
                            key={`${obj.id}-${Math.ceil(Math.random() * 1000)}`}
                           className={opacity===1 ? styles.showAbout : styles.hideAbout}
                        >

                            <Typography component="h1" variant="h3" sx={{ margin: "1rem auto" }}>{obj.title}</Typography>
                            <Typography component="h1" variant="h4" sx={{ margin: "1rem auto" }}>{obj.sectionTitle}</Typography>
                            <Typography component="h1" variant="h6" sx={{ margin: "1rem auto" }}>{obj.subSectionTitle}</Typography>
                            <Typography component="h1" variant="body2" sx={{ margin: {xs:"1rem auto",sm:"1rem auto"} }}>{obj.content}</Typography>
                            <Typography component="h1" variant="body2" sx={{ margin: {xs:"2rem auto",sm:"1rem auto"} }}>{obj.content1}</Typography>
                            <Typography component="h1" variant="body2" sx={{ margin: {xs:"1rem auto",sm:"1rem auto"} }}>{obj.content2}</Typography>
                            <Link to="/contact">
                            <Typography component="h1" variant="body2" sx={{ margin: {xs:"1rem auto",sm:"1rem auto"} }}>See more?</Typography>
                            </Link>
                        </CustStack>
                    ))}
                    <hr style={{ width: "50%", color: theme.palette.common.blueGrey, height: "0.5rem" }} />
                </Grid>
                <Grid item xs={12} md={6}
                    sx={{
                        position: "relative",
                        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
                    }}

                >
                    <CusImage src={confidence} alt="www.master-connect.ca"
                        opacity={opacity}

                    />
                    {trigger &&
                    <div style={{padding:"0.5rem"}} className={styles.showPhrase}>
                        <Typography component="h1" variant="h4" >
                            Testing your Daily Limits is a Micro-Achievement and Rewards a Break.
                            
                        </Typography>
                        <Typography component="h1" variant="h4" >
                            Sit back and let Us Do The Work!!-<Link to="/contact" style={{color:"red"}}><span style={{color:"red"}}>click to see</span></Link>

                        </Typography>
                        </div>
                    }
                </Grid>
            </Grid>


        </MainContainer>
    )
}

export default Banner