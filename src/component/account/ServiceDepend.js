import React, { useContext, useState, useEffect ,useCallback} from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
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
    var count=0;
    const theme = useTheme();
    const { serviceDependancy, staticImage,setOpen,open } = useContext(GeneralContext);
    const {user_id,loggedIn,setUserAccount,setUsersService,setUsersProduct,setUsersPostService,setUsersInvoice,usersProduct} =useContext(TokenAccessContext);
    const [allservicesDependArray, setAllServicesDependArray] = useState({ loaded: false, data: [] });
    const [desc, setDesc] = useState("");
    const [closePopUp, setClosePopUp] = useState(false);
    const [sent, setSent] = useState(false);
    const [savedItem, setSavedItem] = useState(false);
    const [message, setMessage] = useState({loaded:false,data:""});
    const display = (allservicesDependArray.loaded && selectedService ) || (!closePopUp || open)  ? "flex" : "none";
    const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):user_id;
    const getLoggedIn=localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")):loggedIn;
    const windowInnerWidth=window.innerWidth;
    
console.log(closePopUp,sent,open)
// console.log("allservicesDependArray.loaded && !closePopUp",(allservicesDependArray.loaded || closePopUp))
    useEffect(() => {
        let arr = []
        if (serviceDependancy.loaded && selectedService) {

            let getObject = serviceDependancy.data.filter(obj => (obj.category === selectedService.name))[0];
            if (getObject) {
                setDesc(getObject.desc)
                // setOpen(open => true)
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
                if(windowInnerWidth <900 && windowInnerWidth >440){
                    window.scrollBy(0,500);
                }else if(windowInnerWidth < 440){
                    window.scrollBy(0,1000);
                }
            }
           
        }

    }, []);

    const loadUsersProductServsInv= useCallback((userAccount_data)=>{
        if(userAccount_data){
            setUsersProduct({loaded:true,data:userAccount_data.product})
            setUsersService({loaded:true,data:userAccount_data.service});
            setUsersPostService({loaded:true,data:userAccount_data.service});
            setUsersInvoice({loaded:true,data:userAccount_data.invoice})
        }
    },[]);

    const sendItemsToServer = async (e,params) => {
        e.preventDefault();
        try {
            const res = await apiProtect.post("/account/saveServicedependencies/", params);
            const userAccount_data = res.data;
            //THIS IS THE PROBLEM!! ITS NOT FAST ENOUGHT ( HAVE CREATE A DELAY UPLOAD THROUGH A Callback(()=>{}))
            setUserAccount({ loaded: true, data: userAccount_data });
            loadUsersProductServsInv(userAccount_data);
            setClosePopUp(closePopUp => true);
            setSent(sent => true);
            setOpen(open => false);
            setSavedItem(true)
            setMessage({loaded:true,data:"The following items were added to your basket"});
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleAddToBasket = (e) => {
        e.preventDefault();
        if (allservicesDependArray.loaded && getUser_id && getLoggedIn && !savedItem) {
            const params ={serviceName:selectedService.name,user_id:getUser_id}; 
            sendItemsToServer(e,params);
        }else{
            setTimeout(()=>{setSavedItem(false);setOpen(open => false);setClosePopUp(closePopUp=> true)},1000)
            setMessage({loaded:true,data:" there are no items loaded"})
        }
    }
    const handleNoAdding = (e) => {
        e.preventDefault();
        setClosePopUp(closePopUp => true);
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
            {message.loaded && <Typography component="h1" variant="h4" >{message.data}</Typography>}
            <Typography component="h1" variant="h4" sx={{ margin: "1rem auto", fontWeight: "bold" }}>{selectedService && selectedService.name}-DEPENDANCIES</Typography>
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

        </PopUpStack>
        
    )
}

export default ServiceDepend