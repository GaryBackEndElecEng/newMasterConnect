import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Paper, Typography, Grid, ListItem, Fab, Card, CardContent, Avatar, CardMedia, CardActions, IconButton } from '@mui/material';
import styles from './postAccount.module.css';
import styled from 'styled-components';
import SummaryDesc from './SummaryDesc';
import AddIcon from '@mui/icons-material/Add';
import apiProtect from '../axios/apiProtect';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const PostInfo = styled(Container)`
margin:2rem 0px;
background:${({ bg }) => bg};
background-size:100% 100%;
max-height:56vh;
overflow-y:scroll;
box-shadow:1px 2px 13px 8px ${({ color }) => color};
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
@media screen and (max-width:900px){
    max-height:48vh;
}


`;

const Services = () => {
    const theme = useTheme();
    // const serviceRef = useRef();
    const { priceCatelog, postService,getServices} = useContext(PriceContext);
    const { extraImages,staticImage,MyRef } = useContext(GeneralContext);
    const {setUserAccount,usersPostService,setUsersPostService,setUsersService,usersService,setUsersPostInvoice}=useContext(TokenAccessContext);
    const {user_id,loggedIn}=useContext(TokenAccessContext);
    const getPriceCatelog = priceCatelog.loaded ? priceCatelog.data : null;
    const [preServices, setPreServices] = useState({ loaded: false, data: [] });//id:4
    const [migration, setMigration] = useState({ loaded: false, data: [] });//id6
    const [userAccountCreation, setUserAccountCreation] = useState({ loaded: false, data: [] });//id:5
    const [publish, setPublish] = useState({ loaded: false, data: [] });//id:7
    const [SEO, setSEO] = useState({ loaded: false, data: [] });//ID:9
    const [storage, setStorage] = useState({ loaded: false, data: [] });//id:11
    const [RemainderSvc, setRemainderSvc] = useState({ loaded: false, data: [] });
    const [revealObj, setRevealObj] = useState(false);
    const [targetEle,setTargetEle]=useState({loaded:false,id:0});
    const image = extraImages.loaded ? extraImages.data[1].image : null;
    const allServiceList = getServices.loaded ? getServices.data :null;
    const getRemainderSvc=localStorage.getItem("remainderSvc") ? JSON.parse(localStorage.getItem("remainderSvc")):(postService.loaded ? postService.data :false);


    useEffect(()=>{
        if(getRemainderSvc){
            setRemainderSvc({loaded:true,data:getRemainderSvc});
            localStorage.setItem("remainderSvc",JSON.stringify(getRemainderSvc));
            
        }else{
            setRemainderSvc({loaded:false,data:getRemainderSvc}); 
        }
    },[]);
    // console.log(getRemainderSvc)

  


    const handleAddToBasket= (e,id)=>{
        e.preventDefault();
        const sendToServer= async ()=>{
            try {
                const params = {user_id:user_id,serv_id:id}
                const getRemainder=localStorage.getItem("remainderSvc") ? JSON.parse(localStorage.getItem("remainderSvc")):postService.data;
                const res = await apiProtect.post('/account/addPostService/',params);
                const body = res.data
                setUserAccount({loaded:true,data:body})
                setUsersPostInvoice({loaded:true,data:body.postInvoice})
                // if(getRemainder){
                    let selectedService=getRemainder.filter(obj=>(parseInt(obj.id)===id))[0]
                    let remainder=getRemainder.filter(obj=>(parseInt(obj.id)!==id))
                    let usersAddService=[...usersPostService.data,selectedService]
                    // console.log("remainderSvc",remainder,"added to usersService",usersAddService)
                    setRemainderSvc({loaded:true,data:remainder})
                    localStorage.setItem("remainderSvc",JSON.stringify(remainder))
                    localStorage.setItem("usersPostService",JSON.stringify(usersAddService))
                    setUsersPostService({loaded:true,data:usersAddService})
                // }
                // setUsersPostService({loaded:true,data:})
            } catch (error) {
                console.error(error.message)
            }

        }
        if(user_id && loggedIn){
            sendToServer();
        }
    }

   
    const handleReveal=(obj)=>{
        if(targetEle.loaded){
            setTargetEle({loaded:false});
        }else{
            let target=getRemainderSvc.filter(ob=>(parseInt(ob.id)===parseInt(obj.id)))[0]
        setTargetEle({loaded:true,id:target.id})
        }
    
    }
   

    return (
        <PostInfo maxWidth="lg" bg={theme.palette.common.light} color={theme.palette.common.blueGreyLight}>
            <Grid container spacing={{xs:0,sm:1,lg:2}}
            sx={{margin:"2rem auto"}}
            >
        <Typography component="h1" variant="h4" sx={{marginTop:"2rem"}}> Remaining Svc(s)</Typography>
        {getRemainderSvc&& getRemainderSvc.map(obj=>(
        <Grid item xs={12} md={6} key={obj.id}>
                <Card elevation={20} key={obj.id} sx={{ position: "relative", margin: "1rem auto", padding: "1rem" }} spacing={{ xs: 1, md: 2 }}
                           
                            >
                                <CardMedia component="img" variant="rounded" src={image} height="150px" />
                                <Typography component="h1" variant="h5">{obj.name}</Typography>
                                <CardContent>
                                    <Typography component="h1" variant="h5">$ {obj.monthly}.<sup>00</sup></Typography>
                                    {!targetEle.loaded && <Typography component="h1" variant="body1">{obj.desc.slice(0,150)}...</Typography>}
                                    {targetEle.loaded && targetEle.id ===obj.id && <SummaryDesc url={staticImage} desc={obj.desc} summary={obj.summary}/> }
                                    <IconButton  onClick={()=>handleReveal(obj)}>see desc <RemoveRedEyeIcon sx={{ml:1,zIndex:10}}/></IconButton>
                                </CardContent>
                                <CardActions>
                                    <Fab variant="extended" color="warning" onClick={(e)=>handleAddToBasket(e,obj.id)}>
                                        add to basket <AddIcon sx={{ml:2, color:"green"}}/>
                                    </Fab>

                                </CardActions>

                            </Card>

        </Grid>
        ))}
    </Grid>
        </PostInfo>
    )
}

export default Services