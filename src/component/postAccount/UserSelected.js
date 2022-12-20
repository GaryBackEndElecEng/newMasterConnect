import React, { useContext, useEffect, useState, } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import {  Stack, Container,  Typography, Grid, Fab, Card, CardContent, CardMedia, CardActions } from '@mui/material';
// import styles from './postAccount.module.css';
import styled from 'styled-components';

import apiProtect from '../axios/apiProtect';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ServiceDependancy from './ServiceDependancy';

const PostInfo = styled(Container)`
margin:2rem 0px;
background:${({ bg }) => bg};
background-size:100% 100%;
max-height:56vh;
margin-top:2rem;
overflow-y:scroll;
box-shadow:1px 2px 13px 8px ${({ color }) => color};
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
border:1px solid red;
@media screen and (max-width:900px){
    max-height:48vh;
}


`;

const UserSelected = ({serviceDependences}) => {
    // const serviceRef = useRef();
    const {postService} = useContext(PriceContext);
    const { extraImages, } = useContext(GeneralContext);
    const {setUserAccount,usersPostService,setUsersPostService,setUsersPostInvoice}=useContext(TokenAccessContext);
    const {user_id,loggedIn}=useContext(TokenAccessContext);
    const [remaindingSvc,setRemaindingSvc]=useState({loaded:false,data:[]})
    const image = extraImages.loaded ? extraImages.data[2].image : null;
    const getUsersService= localStorage.getItem("usersPostService") ? JSON.parse(localStorage.getItem("usersPostService")):(usersPostService.loaded ? usersPostService.data :false);
    
    

    useEffect(()=>{
       
        if(usersPostService.loaded){
            localStorage.setItem("usersPostService",JSON.stringify(usersPostService.data))
        }else{
            setUsersPostService({loaded:false,data:getUsersService})
           
        }
       
    },[]);

    const handleDeleteFromBasket = (e,id)=>{
        e.preventDefault();
        const sendToServer= async ()=>{
            try {
                const getRemainder=localStorage.getItem("remainderSvc") ? JSON.parse(localStorage.getItem("remainderSvc")):postService.data;
                // const getUsersService= localStorage.getItem("usersService") ?JSON.parse(localStorage.getItem("usersService")):usersPostService.data;
                const params = {user_id:user_id,serv_id:id}
                const res = await apiProtect.post('/account/subPostService/',params);
                const body = res.data
                setUserAccount({loaded:true,data:body})
                setUsersPostInvoice({loaded:true,data:body.postInvoice})
                    let selectedService=usersPostService.data.filter(obj=>(parseInt(obj.id)===id))
                    let remainingUserServices=usersPostService.data.filter(obj=>(parseInt(obj.id)!==id))
                    let remainder=[...getRemainder,selectedService[0]]
                    setUsersPostService({loaded:true,data:remainingUserServices})
               
                
                setRemaindingSvc({loaded:true,data:remainder})
                localStorage.setItem("usersPostService",JSON.stringify(remainingUserServices))
                localStorage.setItem("remainderSvc",JSON.stringify(remainder))
                
                // setUsersPostService({loaded:true,data:})
            } catch (error) {
                console.error(error.message)
            }

        }
        console.log("loggedIn",loggedIn,"user_id",user_id)
        if(user_id && loggedIn){
            sendToServer();
        }
    }
    // console.log("usersService",usersService,"getUsersService",getUsersService)
  return (
    <PostInfo maxWidth="lg">
    <Grid container spacing={{xs:0,sm:1,lg:2}}
    sx={{margin:"1rem"}}
    >
        <Typography component="h1" variant="h4" sx={{marginTop:"3rem"}}> Selected services</Typography>
        {getUsersService && getUsersService.map(obj=>(
        <Grid item xs={12} md={6} key={`${obj.id}-${Math.ceil(Math.random()*1000)}`}>
                <Card elevation={20} key={obj.id} sx={{ position: "relative", margin: "1rem auto", padding: "1rem",textAlign:"center" }} spacing={{ xs: 1, md: 2 }}
                            
                            >
                                <Stack direction="column" >
                                <CardMedia component="img" variant="rounded" src={image} height="155px"

                                />
                                </Stack>
                                <Typography component="h1" variant="h5">{obj.name}</Typography>
                                <CardContent>
                                    <Typography component="h1" variant="h5">$ {obj.monthly}.<sup>00</sup></Typography>
                                    <Typography component="h1" variant="body1">{obj.desc.slice(0,75)}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Fab variant="extended" color="warning" onClick={(e)=>handleDeleteFromBasket(e,obj.id)}>
                                        delete from basket <RemoveShoppingCartIcon sx={{ml:2, color:"green"}}/>
                                    </Fab>

                                </CardActions>

                            </Card>

        </Grid>
        ))}
    </Grid>
    <ServiceDependancy serviceDependences={serviceDependences} />
    </PostInfo>
  )
}

export default UserSelected