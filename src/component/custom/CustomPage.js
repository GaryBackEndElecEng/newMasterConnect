import React, { useEffect, useState, useContext, } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import styled from 'styled-components';
import styles from './custom.module.css';
import { useTheme } from '@mui/material/styles';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import { Fab, Stack, Grid, Container, Box, Typography, CardMedia, Card, Avatar } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CustCoverPage from './CustCoverPage';
import apiProtect from '../axios/apiProtect';
import CustomHelmet from './CustomHelmet';

const MainCustom = styled.div`
width:100vw;
margin:auto;
margin-top:-3px;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
padding:0.5rem;
position:relative;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:-5px;
}
@media screen and (max-width:600px){
    margin-top:-65px;
    margin-left:0px;
    margin-right:0px;
}

`;
const MainCustomGrid = styled(Grid)`
margin:auto 0;
min-height:50vh;
width:100%;
border:1px solid blue;

`;
const CustomPage = () => {
    const theme = useTheme();
    const location=useLocation();
    const navigate = useNavigate();
    // const { customTemplates } = useContext(PriceContext);
    const { staticImage, setTitle, setStyleName, setChangePage,getPathLocation,average,customTemplates } = useContext(GeneralContext);
    const {loggedIn,user_id,setUsersProduct,setUserAccount}=useContext(TokenAccessContext);
    const [popUp, setPopUp] = useState({ loaded: false, data: {} });
    const getLoggedIn= localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")):loggedIn;
    const getUser_id= localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):user_id;
    const [labelTitle,setLabelTitle] = useState("");
    const bgImage =`${staticImage}/customPage.png`;
    const [desc,setDesc] = useState("");
    const [keywords,setKeywords] = useState("");
    const products=customTemplates.loaded ? customTemplates.data :null;

    useEffect(()=>{
        let arr=[];
        let descrip="";
        if(products){
            products.forEach((obj,index)=>{
                arr.push(obj.name);
                descrip= descrip + ",,," + obj.desc.slice(0,20);
            });
            setDesc(descrip);
            setKeywords(arr);
        }
    },[products]);



    useEffect(() => {
        setTitle("Custom Page");
        setStyleName("layout design");
        setLabelTitle("Main")
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, [setTitle, setStyleName,setLabelTitle]);

    const handleSelect = (e, obj) => {
        e.preventDefault();
        setPopUp({ loaded: true, data: obj });
        localStorage.setItem("custTemplate",JSON.stringify({id:obj.id,path:location.pathname}))

    }
    const handleNext=(e,product_id)=>{
        e.preventDefault();
        if(!getLoggedIn){
        navigate("/register",setChangePage(true));
        }else{
            addTemplateToUserAccount(e,product_id);
            navigate("/MyAccount",setChangePage(true));
        }

    }
    const addTemplateToUserAccount = async (e,product_id)=>{
        const params = { "user_id": getUser_id, "prod_id": product_id }
        try {
            const res = await apiProtect.post("/account/userProductPost/", params);
                    const user_account = res.data;
                    if(user_account){
                        setUserAccount({loaded:true,data:user_account})
                    setUsersProduct({loaded:true,data:user_account.product})
                    }
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <MainCustom
            id="mainContainer"

        >
            <CustomHelmet 
            keywords={keywords}
            desc={desc}
            image={bgImage}
            products={products}
            average={average}
            getPathLocation={getPathLocation.loaded ? getPathLocation.data : ""}
            staticImage={staticImage}
            />
            <CustCoverPage bgImage={bgImage} title={labelTitle} />
            <Container maxWidth="xl" spacing={{ xs: 0, sm: 1 }} sx={{ marginTop: "2px" }}>
                <Stack direction="column" spacing={{ xs: 0, sm: 1 }} sx={{ alignItems: "center", justifyContent: "center", margin: "1rem auto" }}>
                    <Typography component="h1" variant="h4" sx={{ margin: "auto" }}>
                        Pick and choose your template that closest matches your requirement
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{ margin: "auto" }}>
                        Don't worry, we will customize its appearnace with slight adjustments.
                    </Typography>
                    <Typography component="h1" variant="h6" sx={{ margin: "auto", textAlign: "center" }}>
                        The images can be selected by us or by you, depending on what you would like. All other services are selected within your account. Its drag and drop. Once, done, your site will be done - <span style={{ color: "red" }}>no hassles.</span>
                    </Typography>
                </Stack>
                <MainCustomGrid container spacing={{ xs: 0, sm: 1 }}>
                    {customTemplates.loaded && customTemplates.data.map((obj, index) => (
                        <Grid item xs={12} sm={12} md={4} key={`${obj.id}-template-${index}`}

                        >
                            <Card elevation={3} sx={{ position: "relative" }}>
                                <CardMedia component="img" src={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" />
                                <Box style={{ margin: "auto", padding: "1rem", textAlign: "center", fontWeight: "bold" }}>
                                    <Typography component="h1" variant="h4">{obj.name}</Typography>
                                </Box>
                                <Box style={{ margin: "auto", padding: "1rem" }}>
                                    <Typography component="h1" variant="body1">{obj.summary}</Typography>
                                </Box>
                                <Box style={{ margin: "auto", padding: "1rem" }}>

                                    <Typography component="h1" variant="body1"
                                        sx={{ borderBottom: "1px solid black" }}
                                    >
                                        {obj.desc}
                                    </Typography>
                                </Box>
                                <Box style={{ margin: "auto", padding: "1rem" }}>
                                    <Typography component="h1" variant="h6"
                                    >
                                        <AttachMoneyIcon sx={{ color: "green", ml: 1, fontSize: "110%" }} />
                                        {obj.monthly}.<sup>00</sup>
                                    </Typography>

                                </Box>
                                <Stack direction="column"
                                    sx={{ boxShadow: "1px 1px 13px 5px lightgrey", justifyContent: "center", alignItems: "center", margin: "1rem auto" }}
                                >
                                    <Fab variant="extended" color="secondary" size="medium" onClick={(e) => handleSelect(e, obj)}>
                                        select <DoneOutlineIcon sx={{ ml: 1, color: "blue" }} />
                                    </Fab>
                                </Stack>
                                {(popUp.loaded && popUp.data.id===obj.id) &&
                                <Stack direction="column" spacing={2}
                                sx={{position:"absolute",top:"20%",left:"auto",width:"100%",textAlign:"center"}}
                                className={styles.popUp}
                                >
                                    <Card elevation={3} sx={{margin:"auto",padding:"1rem"}}>
                                        <Avatar 
                                         src={`${staticImage}/${popUp.data.imageName}`}
                                         alt="www.master-connect.ca"
                                         sx={{height:"100px",width:"100px"}}
                                        />
                                        <Typography component="h1" variant="h4">
                                            You have selected {popUp.data.name}
                                        </Typography>
                                        <Typography component="h1" variant="h5"
                                        sx={{color:theme.palette.common.blueGrey}}
                                        >
                                            if you are 70-80% good with your pick, click next
                                        </Typography>
                                        <Stack direction="column" sx={{alignItems:"center"}}>
                                            <Fab variant="extended" color="success" size="medium" onClick={(e)=>handleNext(e,obj.id)}>
                                                next <DoneOutlineIcon sx={{color:"blue",ml:1}}/>
                                            </Fab>
                                        </Stack>
                                    </Card>
                                </Stack>
                                }
                            </Card>
                        </Grid>
                    ))}

                </MainCustomGrid>
            </Container>
        </MainCustom>
    )


}




export default CustomPage
