import React, { useContext, useState, useEffect, useCallback } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { Stack, Container, Grid, Card, Typography, Avatar, Paper, Fab } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import apiProtect from '../axios/apiProtect';

const PopUpStack = styled(Paper)`
position:absolute;
top:-75%;
left:0%;
width:100%;
display:${({ display }) => display};
justify-content:flex-start;
align-items:center;
flex-direction:column;
padding:1rem;
z-index:99999;
background:${({ bg }) => bg};
@media screen and (max-width:900px){
    top:-55%;
    left:0%;
}
@media screen and (max-width:800px){
    top:-55%;
    left:0%;
}
@media screen and (max-width:600px){
    top:-75%;
    left:0%;
}

`;
const ServiceDepend = ({ selectedService }) => {
    
    const theme = useTheme();
    const { serviceDependancy, staticImage, setOpen, open,getProductDesigns } = useContext(GeneralContext);
    const { user_id, loggedIn, setUserAccount, setUsersService, setUsersProduct, setUsersPostService, setUsersInvoice,setUsersExtraService,setUsersExtraInvoice } = useContext(TokenAccessContext);
    const { getServiceList,} = useContext(PriceContext);
    const [allservicesDependArray, setAllServicesDependArray] = useState({ loaded: false, data: [] });
    const [desc, setDesc] = useState("");
    const [sent, setSent] = useState(false);
    const [savedItem, setSavedItem] = useState(false);
    const [message, setMessage] = useState({ loaded: false, data: "" });
    const display = (allservicesDependArray.loaded && selectedService) && (open) ? "flex" : "none";
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
    const windowInnerWidth = window.innerWidth;

// console.log("open",open,"sent",sent)
    // console.log("allservicesDependArray.loaded && !closePopUp",(allservicesDependArray.loaded || closePopUp))
    useEffect(() => {
        let arr = []
        if (serviceDependancy.loaded && selectedService) {

            let getObject = serviceDependancy.data.filter(obj => (obj.category === selectedService.name))[0];
            if (getObject) {
                setDesc(getObject.desc)
                setOpen(open => true)
                getObject.services?.forEach((obj, index) => {
                    arr.push({ id: obj.id, name: obj.name, image: obj.image });
                });
                getObject.postServices?.forEach((obj, index) => {
                    arr.push({ id: obj.id, name: obj.name, image: obj.image });
                });
                getObject.extraServices?.forEach((obj, index) => {
                    arr.push({ id: obj.id, name: obj.name, image: obj.image });
                });
                getObject.products?.forEach((obj, index) => {
                    arr.push({ id: obj.id, name: obj.name, image: obj.imageName })
                });
                // console.log("INSIDE",arr,"closePopUp",closePopUp,"display:",display,);
                setAllServicesDependArray({ loaded: true, data: arr });
                if (windowInnerWidth < 900 && windowInnerWidth > 440) {
                    window.scrollBy(0, 500);
                } else if (windowInnerWidth < 440) {
                    window.scrollBy(0, 1000);
                }
            } else { setOpen(open => false) }

        }

    }, []);

    const balanceUsersServiceReduceServices= useCallback((userAccount_data)=>{

        let arr=getServiceList.loaded ? getServiceList.data:[];
            arr.forEach((service,index)=>{
                let Exists = userAccount_data.service.filter(obj=>(parseInt(obj.id)===parseInt(service.id)))[0];
                    if(Exists){
                        arr.splice(index,1);
                    }
            });
            localStorage.setItem("reducedService",JSON.stringify(arr));
    },[getServiceList.loaded,getServiceList.data]);

    const balanceUsersProductReduceServices= useCallback((userAccount_data)=>{

        let arr=getProductDesigns.loaded ? getProductDesigns.data.filter(obj => (obj.type === "pageDesign")):[];
            arr.forEach((product,index)=>{
                let Exists = userAccount_data.product.filter(obj=>(parseInt(obj.id)===parseInt(product.id)))[0];
                    if(Exists){
                        arr.splice(index,1);
                    }
            });
            localStorage.setItem("reducedProduct",JSON.stringify(arr));
    },[getProductDesigns.loaded,getProductDesigns.data]);

    const loadUsersProductServsInv = useCallback((userAccount_data) => {
        if (userAccount_data) {
            setUsersProduct({ loaded: true, data: userAccount_data.product })
            setUsersService({ loaded: true, data: userAccount_data.service });
            setUsersInvoice({ loaded: true, data: userAccount_data.invoice });
            if(userAccount_data.postService && userAccount_data.postService.length>0){
            setUsersPostService({ loaded: true, data: userAccount_data.postService });
            }else{setUsersPostService({ loaded: false, data:[] });}
            if(userAccount_data.extraService && userAccount_data.extraService.length>0){
                setUsersExtraService({ loaded: true, data: userAccount_data.extraService });
            }else{
                setUsersExtraService({ loaded: false, data:[] });
            }
            if(userAccount_data.extraInvoice){
                setUsersExtraInvoice({loaded:true,data:userAccount_data.extraInvoice});
            }else{setUsersExtraInvoice({loaded:false,data:{}})}
            balanceUsersServiceReduceServices(userAccount_data);
            balanceUsersProductReduceServices(userAccount_data);
        }
    }, [setUsersProduct,setUsersService,setUsersInvoice,setUsersPostService,setUsersExtraService,balanceUsersServiceReduceServices,setUsersExtraInvoice,balanceUsersProductReduceServices]);

    const sendItemsToServer = async (e, params) => {
        e.preventDefault();
        try {
            const res = await apiProtect.post("/account/saveServicedependencies/", params);
            const userAccount_data = res.data;
            //THIS IS THE PROBLEM!! ITS NOT FAST ENOUGHT ( HAVE CREATE A DELAY UPLOAD THROUGH A Callback(()=>{}))
            setUserAccount({ loaded: true, data: userAccount_data });
            loadUsersProductServsInv(userAccount_data);
            setSent(sent => true);
            setSavedItem(true)
            setMessage({ loaded: true, data: "items were added to your basket" });
            setTimeout(()=>{
                setSent(sent=>false);
                setOpen(open => false);
            },2000);

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleAddToBasket = (e) => {
        e.preventDefault();
        if (allservicesDependArray.loaded && getUser_id && getLoggedIn && !savedItem) {
            const params = { serviceName: selectedService.name, user_id: getUser_id };
            sendItemsToServer(e, params);
        } else {
            setSent(sent=>false);
                setOpen(open => false);
            
        }
    }
    const handleNoAdding = (e) => {
        e.preventDefault();
        setSent(sent => false);
        setOpen(open => false);

    }
    return (

        <PopUpStack direction="column"
            bg={theme.palette.common.blueGreyLight}
            elevation={20}
            display={display}
            sx={{ display: display }}
        >
            {open && !sent && <Typography component="h1" variant="h4" >{message.data}</Typography>}
            <Typography component="h1" variant="h4" sx={{ margin: "1rem auto", fontWeight: "bold" }}>{selectedService && selectedService.name}-DEPENDANCIES</Typography>
            <Typography component="h1" variant="h5" sx={{ margin: "0.5rem auto" }}>Selected {selectedService && selectedService.name}</Typography>
            <Typography component="h1" variant="body1" sx={{ margin: "0.5rem auto" }}>{desc}</Typography>

            <Grid container spacing={0}>
                {allservicesDependArray.loaded && allservicesDependArray.data.map((obj, index) => (
                    <Grid item xs={12} sm={6} key={`${obj.id}-//-${index}`}>
                        <Card elevation={3} sx={{ padding: "0.25rem", display: "flex" }}>
                            <Avatar src={`${staticImage}/${obj.image}`}
                                sx={{ width: "50px", height: "50px", mr: 2 }}
                            />
                            <Typography component="h1" variant="h6">{obj.name}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" spacing={2}

                sx={{ alignItems: "center", justifyContent: "center", margin: "1rem auto" }}>
                <Fab variant="extended" color="warning" size="small" sx={{ padding: "0.25rem" }}
                    onClick={(e) => handleAddToBasket(e)}
                >
                    add items to bucket
                </Fab>
                <Fab variant="extended" color="warning" size="small" sx={{ padding: "0.25rem" }}
                    onClick={(e) => handleNoAdding(e)}
                >
                    not yet
                </Fab>
            </Stack>
            {open && sent && <Stack direction="column" spacing={2}
                sx={{ justifyContent: "center", alignItems: "center",color:theme.palette.common.red }}
            >
                <Typography component="h1" variant="h3">{message.data}</Typography>

            </Stack>}

        </PopUpStack>

    )
}

export default ServiceDepend