import React, { useContext, useEffect, useState, useMemo } from 'react';
import { TokenAccessContext } from '..//../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { Stack, Typography, Fab, Paper, Divider, Grid, } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import apiProtect from '../axios/apiProtect';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

//THE serviceDependences=>SERVICE DEPENDENCIES COME FROM DEPENDANCY ARRAY. IT FINDS WHAT usersService THE CLIENT HAS AND PULLS THE postServices RELATED THE THE dependancy.category SERVICE.
const ServiceDependancy = ({ serviceDependences }) => {
    const { usersService, setUsersPostService, usersPostService, setUserAccount, user_id, setUsersPostInvoice, loggedIn } = useContext(TokenAccessContext);
    const [RemainderSvc, setRemainderSvc] = useState({ loaded: false, data: [] });
    const [show, setShow] = useState(false);
    const [serviceToPostServDependant,setServiceToPostServDependant]=useState({loaded:false,data:[]});
    const [postServices, setPostServices] = useState({ loaded: false, data: [] });
    const [neededPostServices, setNeededPostServices] = useState({ loaded: false, data: [] });



    useEffect(() => {
        const getPostBareServices = async () => {
            const res = await apiProtect.get('/account/getPostBareServices/');
            const postService = res.data;
            setPostServices({ loaded: true, data: postService })
        }
        getPostBareServices()
    }, []);
    useMemo(()=>{
        //THIS PULLS THE POSTSERVICE FROM THE DEPENDANCIES
        if(serviceDependences.loaded && usersService.loaded){
            let addPostDepend=[]
            let arr=serviceDependences.data
            arr.forEach((dependant,index)=>{
                let serviceObj=usersService.data.filter(obj=>(obj.category ===dependant.name))[0];
                if(serviceObj){
                    dependant.postServices.forEach((postServ)=>{
                        let filterOutDups=addPostDepend.filter(obj=>(obj.id ===postServ.id))[0];
                        if(!filterOutDups){
                        addPostDepend.push(postServ)
                        }
                    });
                    
                }
            });
            if (addPostDepend.length > 0) {
                setShow(true);
                localStorage.setItem("neededPostServices",JSON.stringify(addPostDepend));
            }else{setShow(false);}
            return setServiceToPostServDependant({loaded:true,data:addPostDepend})

        }
    },[serviceDependences,usersService,setServiceToPostServDependant]);

    useMemo(() => {
        if (serviceToPostServDependant.loaded && serviceToPostServDependant.data) {
            let getNeededPostServices= localStorage.getItem("neededPostServices")? JSON.parse(localStorage.getItem("neededPostServices")):serviceToPostServDependant.data;
            let arr=getNeededPostServices;

            arr.forEach((postservice,index) => {
                usersPostService.data.forEach((serv) => {
                    if(serv.id===postservice){
                        arr.splice(index,1);
                    }
                    
                });
            });
            localStorage.setItem("neededPostServices",JSON.stringify(arr));
            setRemainderSvc({loaded:true,data:arr});
            setNeededPostServices({ loaded: true, data: arr });
            if (arr.length > 1) {
                setShow(true);
            }else{setShow(false);}
        }
    }, [serviceToPostServDependant, usersPostService, setShow,setRemainderSvc,setNeededPostServices]);


    const handleAddPostServices = (e, id) => {
        e.preventDefault();
        setShow(true);
        e.preventDefault();
        const sendToServer = async () => {
            try {
                const params = { user_id: user_id, serv_id: id }
                const getRemainder = localStorage.getItem("remainderSvc") ? JSON.parse(localStorage.getItem("remainderSvc")) : postServices.data;
                const res = await apiProtect.post('/account/addPostService/', params);
                const user_account = res.data;
                setUserAccount({ loaded: true, data: user_account });
                setUsersPostInvoice({ loaded: true, data: user_account.postInvoice });
                setUsersPostService({loaded:true,data:user_account.postService});
                // if(getRemainder){
                let remainder = getRemainder.filter(obj => (parseInt(obj.id) !== id));
                // console.log("remainderSvc",remainder,"added to usersService",usersAddService)
                setRemainderSvc({ loaded: true, data: remainder });
                localStorage.setItem("remainderSvc", JSON.stringify(remainder));
                localStorage.setItem("usersPostService", JSON.stringify(user_account.postService));
                setUsersPostService({ loaded: true, data: user_account.postService });
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