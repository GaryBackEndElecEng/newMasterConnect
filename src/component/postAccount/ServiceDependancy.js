import React, { useContext, useEffect, useState, useMemo } from 'react';
import { TokenAccessContext } from '..//../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { Stack, Typography, Fab, Paper, Divider, Grid, } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import apiProtect from '../axios/apiProtect';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const ServiceDependancy = ({ usersArray }) => {
    const { DNS, SEO, userAccountPostGroup } = useContext(PriceContext);
    const { usersService, setUsersPostService, usersPostService, setUserAccount, user_id, setUsersPostInvoice, loggedIn } = useContext(TokenAccessContext);
    const [RemainderSvc, setRemainderSvc] = useState({ loaded: false, data: [] });
    const [show, setShow] = useState(false);
    const [postServices, setPostServices] = useState({ loaded: false, data: [] });
    const [neededPostServices, setNeededPostServices] = useState({ loaded: false, data: [] });



    useEffect(() => {
        const getPostBareServices = async () => {
            const res = await apiProtect.get('/account/getPostBareServices/');
            const body = res.data;
            setPostServices({ loaded: true, data: body })
        }
        getPostBareServices()
    }, []);

    useMemo(() => {
        if (postServices.loaded && usersService.loaded) {
            let needPostServArr = [];
            let getNeededPostServices= localStorage.getItem("neededPostServices")? JSON.parse(localStorage.getItem("neededPostServices")):postServices.data;
            getNeededPostServices.forEach((postservice) => {
                postservice.services.forEach((serv, index) => {
                    let foundServ = usersService.data.filter(obj => (parseInt(obj.id) === parseInt(serv.id)))[0]
                    let checkPostServArr = needPostServArr.filter(obj => (parseInt(obj.id) === parseInt(postservice.id)))[0]
                    // console.log(foundServ, !checkPostServArr)
                    if (foundServ && !checkPostServArr) {
                        needPostServArr.push(postservice)
                    }
                });
            });
            if (needPostServArr.length > 1) {
                setNeededPostServices({ loaded: true, data: needPostServArr });
                setShow(true);
            }else{setShow(false);}
        }
    }, [postServices.loaded, usersService.loaded, setShow]);


    const handleAddPostServices = (e, id) => {
        e.preventDefault();
        setShow(true);
        e.preventDefault();
        const sendToServer = async () => {
            try {
                const params = { user_id: user_id, serv_id: id }
                const getRemainder = localStorage.getItem("remainderSvc") ? JSON.parse(localStorage.getItem("remainderSvc")) : postServices.data;
                const res = await apiProtect.post('/account/addPostService/', params);
                const body = res.data;
                setUserAccount({ loaded: true, data: body });
                setUsersPostInvoice({ loaded: true, data: body.postInvoice });
                // if(getRemainder){
                let selectedService = getRemainder.filter(obj => (parseInt(obj.id) === id))[0];
                let remainder = getRemainder.filter(obj => (parseInt(obj.id) !== id));
                let usersAddService = [...usersPostService.data, selectedService];
                // console.log("remainderSvc",remainder,"added to usersService",usersAddService)
                setRemainderSvc({ loaded: true, data: remainder });
                localStorage.setItem("remainderSvc", JSON.stringify(remainder));
                localStorage.setItem("usersPostService", JSON.stringify(usersAddService));
                setUsersPostService({ loaded: true, data: usersAddService });
                // REDUCING  setNeededPostServices({loaded:true, data:[]})
                if(neededPostServices.loaded){
                    let reduceNeededPostServs = neededPostServices.data.filter(obj=>(parseInt(obj.id)!==parseInt(id)));
                    setNeededPostServices({loaded:true,data:reduceNeededPostServs});
                    localStorage.setItem("neededPostServices",JSON.stringify(reduceNeededPostServs));
                }
            } catch (error) {
                console.error(error.message)
            }

        }
        if (user_id && loggedIn) {
            sendToServer();
        }
    }
console.log(user_id)
    return (
        <div>
            {
                (show) &&


                <Stack direction="column"
                    sx={{
                        width: "100%", alignItems: "center", justifyContent: "center",
                        position: "absolute", top: { sm: "0%", xs: "0%", md: "0%" }, marginLeft: "0%", left: "0%", zIndex: "10000"
                    }}>
                    <Paper elevation={20} sx={{ padding: "0.5rem", width: "100%", margin: "0.5rem auto", textAlign: "center" }}>
                        <Grid container spacing={{xs:0,sm:1}}>
                        {neededPostServices.loaded && neededPostServices.data.map((obj, index) => (
                            <Grid item xs={12} sm={6} key={`${obj.id}-neededPost-${index}`} sx={{margin:"1rem auto"}} >
                                <Divider sx={{borderBottom:"1px solid blue"}}/>
                                <Typography component='h1' variant="h5"

                                    sx={{ margin: "1rem auto" }}>
                                    You should include {obj.name}
                                </Typography>
                                <Fab variant="extended" color="warning" size="small" sx={{ width: { sm: "25%", xs: "100%" } }} onClick={(e) => handleAddPostServices(e, obj.id)}>
                                    include  <QuestionMarkIcon sx={{ ml: 1, color: "blue", fontSize: "20px" }} />
                                </Fab>
                                <Divider sx={{borderBottom:"1px solid blue"}}/>
                            </Grid>
                        ))}
                        </Grid>
                        <Typography component="h1" variant="h5" sx={{ margin: "1rem auto", fontWeight: "bold", color: "red" }}>These are all <span style={{ color: "black", fontSize: "30px" }}> essential </span>dependancies to your initial purchase!</Typography>
                        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                            <Fab variant="extended" color="warning" sx={{ width: { sm: "25%", xs: "100%" } }} onClick={() => setShow(false)}>
                                close <ClearIcon sx={{ ml: 1, color: "red" }} />
                            </Fab>
                            
                        </Stack>
                    </Paper>
                </Stack>

            }
        </div>
    )
}

export default ServiceDependancy