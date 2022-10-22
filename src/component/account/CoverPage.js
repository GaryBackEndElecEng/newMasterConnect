import React, { useContext, useEffect, useState, } from 'react'

import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Stack, Container, Paper, Typography, } from '@mui/material';
import styles from './account.module.css';
import styled from 'styled-components';

const CusPaper = styled(Paper)`
color:white;
position:relative;
display:flex;
justify-content:center;
align-items:center;
background:black;
margin:1rem;
padding:0.5rem 3.5rem;
// margin-left:2rem;
width:20%;
border-top-left-radius: 25px;
border-top-right-radius:25px;
border-bottom-left-radius:25px;
border-bottom-right-radius:25px;
box-shadow: 1px 2px 20px white,-1px -2px 20px white;
animation:fromLeft 3s ease-in-out;

@keyframes fromLeft {
  from {transform:translateX(-70%);opacity:0;
    box-shadow: none;
  }
  to {transform:translateX(0%);opacity:1;
    box-shadow: 1px 2px 20px white,-1px -2px 20px white;
  }
}
@media screen and (max-width:600px){

}
`;
const CustPaper = styled(Paper).attrs({ className: "automateSequence" })`
display:${({ display }) => display};
animation: shiftUpSeq 1.5s ease-in-out;
@keyframes shiftUpSeq {
  from {opacity:0;transform:translateY(100%);}
  to {opacity:1;transform:translateY(0%);}
}

`;

const CoverPage = () => {
    const theme = useTheme();
    const [username, setUsername] = useState("");
    const { url,staticImage } = useContext(GeneralContext);
    const [block0,setBlock0]=useState(false);
    const [block1,setBlock1]=useState(false);
    const [block2,setBlock2]=useState(false);
    const [activate1, setActivate1] = useState({ block0: "none", block1: "none", block2: "none" });
    const account = `${staticImage}/account.png`;

    useEffect(() => {
        const getUsername = localStorage.getItem("username") ? localStorage.getItem("username") : "";
        setUsername(getUsername)
    }, []);

    useEffect(() => {
        let i=1000;
                setTimeout(() => {
                    setBlock0(true);
                }, i);

                setTimeout(()=>{
                    setBlock1(true);
                },i*2);
                setTimeout(()=>{
                    setBlock2(true);
                },i*3);

    }, []);

    return (
        <Container maxWidth="xl" className="mainImage"
            sx={{
                display: 'flex', justifyContent: "flex-start", alignItems: "center", flexDirection: "column", marginTop: { xs: "-3rem", sm: "0.5rem", md: "0.5rem" }, minHeight: { xs: "40vh", sm: "40vh" }, backgroundImage: `url(${account})`, backgroundSize: "100% 100%", position: "relative"
            }}>
            <CusPaper elevation={10} component="h3" className={styles.user_name}
                sx={{
                    background: theme.palette.common.background2, boxShadow: "1px 2px 20px white,-1px -2px 20px white", color: theme.palette.common.light, transform: { xs: "translateX(20%)", md: "translateX(0%)" },
                    fontSize: { xs: "20px", md: "40px" },
                    position: "relative"
                }}>{username}</CusPaper>
            <Stack direction="column" sx={{ maxWidth: "60%", margin: "1rem auto", justifySelf: "flex-start", transform: "translateX(25%)", position: "relative", top: { xs: "20%" } }}>
                {block0 && <CustPaper display={"block"} elevation={10} component="div" sx={{ margin: "1rem auto", background: theme.palette.common.blueFade }}>
                    <Typography component="h1" variant="h5" sx={{ fontSize: { xs: "14px", sm: "20px", md: "30px" }, padding: "0.25rem 0.75rem", color: theme.palette.common.lighter, fontWeight: "bold" }}>
                        We build your front-end to your satisfaction
                    </Typography>
                </CustPaper>}
                {(block0 && block1) && <CustPaper display={"block"} elevation={10} component="div" sx={{ margin: "1rem auto", background: theme.palette.common.blueFade }}>
                    <Typography component="h1" variant="h5" sx={{ fontSize: { xs: "14px", sm: "20px", md: "30px" }, padding: "0.25rem 0.75rem", color: theme.palette.common.lighter, fontWeight: "bold" }}>
                        We build your backend to meet your service needs
                    </Typography>
                </CustPaper>}
                {block2 && <CustPaper display={"block"} elevation={10} component="div" sx={{ margin: "1rem auto", background: theme.palette.common.blueFade }}>
                    <Typography component="h1" variant="h5" sx={{ fontSize: { xs: "14px", sm: "20px", md: "30px" }, padding: "0.25rem 0.75rem", color: theme.palette.common.lighter, fontWeight: "bold" }}>
                        We publish your site with proper site registration
                    </Typography>
                </CustPaper>}
            </Stack>

        </Container>
    )
}

export default CoverPage