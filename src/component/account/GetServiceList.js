import React, { useContext, useEffect, useState,useMemo  } from 'react';
// import { useNavigate } from 'react-router-dom';
import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import {GeneralContext} from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Paper, Typography, Grid, ListItem, Fab, Card, CardContent, CardActions, Button } from '@mui/material';
import styles from './account.module.css';
// import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import apiProtect from '../axios/apiProtect';
import SouthIcon from '@mui/icons-material/South';
import ServicePopUp from './ServicePopUp';
import ShowSummary from './ShowSummary';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ServiceDepend from './ServiceDepend';



const GetServiceList = () => {
    const theme = useTheme();
    const {open,setOpen}=useContext(GeneralContext);
    const { getServiceList,  } = useContext(PriceContext);
    const { usersService, setUsersService } = useContext(TokenAccessContext); //SetUsersService=> FROM MyAccount ( it recieves all user's products and service)
    const getServiceList2 = getServiceList.loaded ? getServiceList.data : JSON.parse(localStorage.getItem("getServiceList2"));
    const [showPopUp, setShowPopUp] = useState({ loaded: false, obj: {} });
    const [error, setError] = useState(false);
    const [reducedService, setReducedService] = useState({ loaded: false, data: [] });
    const [postError, setPostError] = useState(null);
    const [selectedService,setSelectedService]=useState({loaded:false,obj:{},id:null});
    const [showUserServ,setShowUserServ]=useState({loaded:false,id:null});
    const [showSummary, setShowSummary] = useState({loaded:false,id:null});
    // const getServs = getServiceList.loaded ? getServiceList.data : [];
    const reducedService1 = (localStorage.getItem("reducedService")) ? JSON.parse(localStorage.getItem("reducedService")) : getServiceList2;
    const usersServices2 = (usersService.loaded) ? usersService.data : null;
    
    useEffect(()=>{
        if(!reducedService.loaded){
            setReducedService({loaded:true,data:reducedService1})
        }
    },[]);

    useMemo(()=>{
        if(usersService.loaded && getServiceList.loaded && usersService.data.length !==0){
            let arr=getServiceList.data
            arr.forEach((service,index)=>{
                let Exists = usersService.data.filter(obj=>(parseInt(obj.id)===parseInt(service.id)))[0];
                    if(Exists){
                        arr.splice(index,1)
                        
                    }
            });
            setReducedService({loaded:true,data:arr});
            localStorage.setItem("reducedService",JSON.stringify(arr));
            // console.log("inside useEffect")
            
        }
    },[]);



    const handleAddItem = (e, objID) => {
        e.preventDefault();
        const addServiceToUser = async () => {
            const user_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
            const params = { "user_id": user_id, "serv_id": objID }
            if (user_id && objID) {
                try {
                    let getReducedArray = localStorage.getItem("reducedService") ? JSON.parse(localStorage.getItem("reducedService")) : getServiceList2;
                    const res = await apiProtect.post("/account/userServicePost/", params);
                    const service = res.data;
                    const reduceArray = getReducedArray.filter(obj => (parseInt(obj.id) !== parseInt(objID)))
                    // THIS TESTS THE SERVICE DEPENDANCIES
                    setSelectedService({loaded:true,obj:service,id:objID})
                    setOpen(open => true);
                    setReducedService({ data: reduceArray, loaded: true })
                    localStorage.setItem("reducedService",JSON.stringify(reduceArray))
                    // setUsersService({data:[...usersService.data,addToUserService],loaded:true})
                    // const userRemainingSerivices = returnUsersServDelAddSubArray(body, "add");

                    setUsersService({ data: [...usersService.data,service], loaded: true })
                    setError(false);

                    // console.log("GET=>",getReducedArray,"userRemainingSerivices",userRemainingSerivices)
                    // console.log("reduceIt=>",reduceArray)

                    localStorage.setItem("reducedService", JSON.stringify(reduceArray));
                } catch (error) {
                    setOpen(open => false)
                    if (error.response) {
                        setError(true);
                        setPostError(error.response.status)
                    } else {
                        setPostError(error.message)
                        setError(true)
                    }
                }
            }else{ setOpen(open =>false)}
        }
        addServiceToUser();
    }



    const handlePopUp = (id) => {
        if (id && showPopUp.loaded === false) {
            const obj = reducedService1.filter(obj => (parseInt(obj.id) === parseInt(id)))[0]
            setShowPopUp({ loaded: true, obj: obj });
            setShowSummary({ loaded: false, obj: null });

        } else {
            setShowPopUp({ loaded: false, obj: {} });
        }

    }



    const handleClosePopUp = () => {
        setShowPopUp({ loaded: false, obj: {} });
        setShowSummary({loaded:false,id:null});
    }


    const handleDelete = (e, objID) => {
        e.preventDefault();
        const removeServiceToUser = async () => {
            const user_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
            const params = { "user_id": user_id, "serv_id": objID }
            // console.log("PARAMS:params",params)
            if (user_id && objID) {
                try {
                    const res = await apiProtect.post("/account/userServicePostDelete/", params);
                    const deletedService = res.data;
                    let reducedServiceNew=[...reducedService.data, deletedService]
                    setReducedService({ loaded: true, data: reducedServiceNew });
                    let userRemainder = usersService.data.filter(obj => (parseInt(obj.id) !== parseInt(objID)));
                    setUsersService({ data: userRemainder, loaded: true })
                    localStorage.setItem("reducedService",JSON.stringify(reducedServiceNew))
                } catch (error) {
                    if (error.response) {
                        setError(true);
                        setPostError(error.response.status)
                        console.error("error.response", error.message)
                    } else {
                        setPostError(error.message)
                        setError(true)
                        console.error(error.message)
                    }
                }
            }
        }
        removeServiceToUser();
    }
    const handleMouseOverSummary =(e,id)=>{
        if(!showSummary.loaded){
        setShowSummary({loaded:true,id:id})
        setShowPopUp({loaded:false});
        }else{setShowSummary({loaded:false})}
    }
    const handleMouseOutSummary =(e)=>{
        setShowSummary({loaded:false,id:null});
        setShowPopUp({ loaded: false, obj: {} });
    }
    const handleShowUserServ=(e,id)=>{
        if(!showUserServ.loaded){
            setShowUserServ({loaded:true,id:id});
        }else{
            setShowUserServ({loaded:false,id:null});
        }
    }

    return (
        <Container maxWidth="xl"
            sx={{
                margin: "2rem auto", marginTop: { xs: "0px", sm: "1rem" }, minHeight: { xs: "30vh", sm: "" },
                display: 'flex', justifyContent: "flex-start", alignItems: "center", flexDirection: "column", fontFamily: "Roboto"
            }}>
            <Typography component="h1" variant="h3" sx={{ margin: "2rem auto" }}>
                Additional Services
            </Typography>
            <Grid container spacing={2} onMouseOut={() => handleClosePopUp()}
            sx={{maxHeight:{md:"50vh",xs:"65vh"},overflowY:"scroll"}}
            >
                {reducedService.loaded  && reducedService.data.map(obj => (
                    <Grid item xs={12} sm={6} md={3} key={`${obj.id}-${Math.floor(Math.random() * 10000)}`}
                        sx={{ padding: "0.5rem" }}
                    >
                        <Paper elevation={3} >
                            <Card 
                            sx={{ maxWidth: "100%", fontFamily: "Roboto", position: "relative", padding: "0.5rem" }}
                            
                            onMouseOut={(e)=>handleMouseOutSummary(e)}
                            >
                                <Typography component="h1" variant="h5">
                                    {obj.name}
                                </Typography>

                                <Stack direction="column"

                                >
                                    <Typography component="h1" variant="body1"
                                        sx={{ cursor: "pointer" }}
                                        onClick={(e)=>handleMouseOverSummary(e,obj.id)}
                                    >
                                        {obj.desc.slice(0, 75)}...
                                    </Typography>
                                    {(showPopUp.loaded && showPopUp.obj.id === obj.id) && <ServicePopUp obj={showPopUp.obj} />}
                                    {(showSummary.loaded && showSummary.id===obj.id) &&
                                    <ShowSummary obj={obj}/>
                                    }
                                </Stack>
                                <CardContent>
                                    <ListItem

                                        sx={{
                                            background: theme.palette.common.blueGrey, color: theme.palette.secondary.lighter, margin: "1rem auto"
                                        }}>
                                        <Typography component="h1" variant="subtitle2" sx={{ margin: "auto 1rem" }}>
                                            <span style={{ color: "black", fontWeight: "bold" }}>Base:</span> ${obj.price}.<sup>00</sup>
                                        </Typography>
                                        <Typography component="h1" variant="subtitle2">
                                            <span style={{ color: "black", fontWeight: "bold" }}> base monthly:</span> ${obj.monthly}.<sup>00</sup>
                                        </Typography>
                                    </ListItem>
                                </CardContent>
                                <Paper elevation={2} sx={{ position: "relative" }}>
                                    <CardActions>
                                        <Fab variant="extended" color="secondary" onClick={(e) => handleAddItem(e, obj.id)}>
                                            Add Item <AddIcon sx={{ ml: 2 }} />
                                        </Fab>
                                        <Fab variant="extended" color="success" onClick={() => handlePopUp(obj.id)}>
                                            read desc <MarkUnreadChatAltIcon sx={{ ml: 2 }} />
                                        </Fab>
                                    </CardActions>
                                    <Box sx={{ margin: " 1rem auto", textAlign: "center", }} className={error ? styles.showError : styles.hideError}>
                                        <Paper elevation={20} sx={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Typography component="h1" variant="h6" sx={{ color: "white", background: theme.palette.common.blueGrey }}>
                                                There was an issue with the posting. Please re-login. sorry for the inconvenience. if persists them please call us!-error:
                                                <p>{postError} </p>
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Paper>
                            </Card>
                        </Paper>

                    </Grid>
                ))}


            </Grid>
            <Container maxWidth="lg" sx={{ margin: "2rem auto" }} >
                <Paper elevation={3} sx={{ padding: "0.5rem",position:"relative" }}>
                    <Typography component="h1" variant="h3" sx={{ margin: "1rem auto" }}>
                        basket Items <SouthIcon sx={{ ml: 2, color: theme.palette.common.orangeFade }} />
                        <br /><div style={{ color: theme.palette.common.blue, fontSize: "70%" }}>Service</div>
                    </Typography>
                    <Grid container spacing={2} sx={{ padding: "0.5rem" ,position:"relative"}}>
                        {(usersService.data && usersService.loaded ===true) && usersService.data.length>0 && usersService.data.map(obj => (
                            <Grid item xs={12} sm={6} md={4} key={`${obj.id}-${Math.ceil(Math.random() * 1000)}`} >

                                <Card
                                    sx={{ maxWidth: "100%", fontFamily: "Roboto", padding: "0.5rem",cursor:"pointer" }}
                                    elevation={3}
                                    onClick={(e)=>handleShowUserServ(e,obj.id)}
                                >
                                    <Typography component="h1" variant="h5">
                                        {obj && obj.name}
                                    </Typography>
                                    <CardContent sx={{position:"relative"}}>
                                        {
                                        showUserServ.loaded && showUserServ.id===obj.id && 
                                        <Typography component="h1" variant="body1" 
                                        sx={{ margin: "1rem auto",position:"absolute",top:"-0%",left:"0%",width:"100%", 
                                        background:theme.palette.common.fadeCharcoal3,color:"white",padding:"1rem",maxHeight:"15vh",overflowY:"scroll",zIndex:"999999"
                                         }}
                                        >
                                            {obj && obj.desc}
                                        </Typography>
                                        }
                                       
                                        <Typography component="h1" variant="body2"
                                         sx={{ margin: "1rem auto",cursor:"pointer"
                                         }}
                                        >
                                            {obj && obj.desc.slice(0, 70)}...
                                        </Typography>
                                       
                                        <Stack direction="row" sx={{ background: theme.palette.common.blueGrey, color: theme.palette.secondary.light }}>
                                            <Typography component="h1" variant="body2" sx={{ margin: "auto 1rem" }}>
                                                Base: ${obj && obj.price}.<sup>00</sup>
                                            </Typography>
                                            <Typography component="h1" variant="body2">
                                                base monthly: ${obj && obj.monthly}.<sup>00</sup>
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <Paper elevation={0} sx={{ position: "relative", }}>
                                        <CardActions sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
                                            <Fab variant="extended" color="warning" onClick={(e) => handleDelete(e, obj.id)}>
                                                remove Item <DeleteIcon sx={{ ml: 2 }} />
                                            </Fab>
                                        </CardActions>
                                        <Box sx={{ margin: " 1rem auto", textAlign: "center", }} className={error ? styles.showError : styles.hideError}>
                                            <Paper elevation={20} sx={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Typography component="h1" variant="h6" sx={{ color: "white", background: theme.palette.common.blueGrey }}>
                                                    There was an issue with the deleting. Please re-login. sorry for the inconvenience. if persists them please call us!-error:
                                                    <p>{postError} </p>
                                                </Typography>
                                            </Paper>
                                        </Box>
                                    </Paper>
                               
                                </Card>
                                {open && <ServiceDepend selectedService={(selectedService.loaded && selectedService.id===obj.id) ? selectedService.obj :null}/>}
                            </Grid>
                            
                        ))}
                    </Grid>
                   
                </Paper>
            </Container>

        </Container>
    )

    //This only deletes Services from the array
    function returnUsersServDelAddSubArray(bodyProdIdArr, type) {
        // console.log("BODYPRODIDARR",bodyProdIdArr,"TYPE",type,"BODYPRODIDARR-LENGTH",bodyProdIdArr.length)
        const services = getServiceList.loaded ? getServiceList.data : null;
        let userProdServsArr = [];
        let newReducedProdServArr = [];
        // type=type.trim();
        if (services && type === "add") {

            services.forEach((obj) => {
                let IntObjId = parseInt(obj.id)
                bodyProdIdArr.forEach((prodId) => {
                    if (IntObjId === prodId) {
                        userProdServsArr.push(obj);
                    } else {
                        newReducedProdServArr.push(obj)
                    }
                });

            });

            if (newReducedProdServArr.length > 0 && newReducedProdServArr.length <= services.length) {
                localStorage.setItem("reducedService", JSON.stringify(newReducedProdServArr));
                // console.log("lengthReduce",newReducedProdServArr,"services",services.length)
                setUsersService({ data: userProdServsArr, loaded: true })
            } else {
                localStorage.setItem("reducedService", JSON.stringify(services));
                setUsersService({ loaded: false, data: [] });
            }
            // console.log("newReducedProdServArr",newReducedProdServArr.length,"userProdServsArr",userProdServsArr.length)

        } else if (services && type === "sub" && bodyProdIdArr.length === 0) {
            localStorage.setItem("reducedService", JSON.stringify(services));
            setUsersService({ loaded: false, data: [] });
            return []

        } else {
            services.forEach((obj) => {
                let IntObjId = parseInt(obj.id)
                bodyProdIdArr.forEach((prodId) => {
                    if (IntObjId === prodId) {
                        userProdServsArr.push(obj);
                    } else {
                        newReducedProdServArr.push(obj)
                    }
                });

            });
            setUsersService({ data: userProdServsArr, loaded: true });
            localStorage.setItem("reducedService", JSON.stringify(newReducedProdServArr));
        }


        return userProdServsArr
    }
}

export default GetServiceList