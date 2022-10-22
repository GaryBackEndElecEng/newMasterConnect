import React, { useContext, useEffect, useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
// import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import {GeneralContext} from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Paper, Typography, Grid, Fab, Card, CardContent, CardActions } from '@mui/material';
import styles from './account.module.css';
// import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import apiProtect from '../axios/apiProtect';
import SouthIcon from '@mui/icons-material/South';

const GetProductList = () => {
    const navigate=useNavigate();
    const theme = useTheme();
    const { setChangePage,loadProduct } = useContext(GeneralContext);
    //SetUsersProduct=> FROM MyAccount ( it recieves all user's products and service)
    const { usersProduct, setUsersProduct, setReducedProduct } = useContext(TokenAccessContext); 
    const loadedProduct= loadProduct.loaded ? loadProduct.data:null;
    const getProductList2 = (localStorage.getItem("loadedProduct")) ? JSON.parse(localStorage.getItem("loadedProduct")) :loadedProduct.data;
    // const [isPostSuccess, setIsPostSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [postError, setPostError] = useState(null);

    const reducedProduct1 = (localStorage.getItem("reducedProduct") ) ? JSON.parse(localStorage.getItem("reducedProduct")) : loadedProduct;

//   console.log(reducedProduct1)


  useEffect(()=>{
    if(reducedProduct1 ===[] || reducedProduct1===[0]){
        localStorage.removeItem("reducedProduct");
    }
    const getUsersProduct=localStorage.getItem("usersProduct") ? JSON.parse(localStorage.getItem("usersProduct")):null;
    if(getUsersProduct){
        setUsersProduct({loaded:true,data:getUsersProduct})
    }
  },[])


    const handleAddItem = (e, objID) => {
        e.preventDefault();
        const addProductToUser = async () => {
            const user_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
            const params = { "user_id": user_id, "prod_id": objID }
            if (user_id && objID) {
                try {
                    const res = await apiProtect.post("/account/userProductPost/", params);
                    const body = res.data;
                    let getReducedArray = localStorage.getItem("reducedProduct") ? JSON.parse(localStorage.getItem("reducedProduct")) : loadedProduct;
                    const reduceArray = getReducedArray.filter(obj => (obj.id !== objID))
                    let addToUserProductProduct = getReducedArray.filter(obj => (obj.id === objID))[0];
                    setReducedProduct({ data: reduceArray, loaded: true })
                    setUsersProduct({ data: [...usersProduct.data, addToUserProductProduct], loaded: true })
                    
                    setError(false);
                    localStorage.setItem("reducedProduct", JSON.stringify(reduceArray));
                } catch (error) {
                    if (error.response) {
                        setError(true);
                        setPostError(error.response.status)
                    } else {
                        setPostError(error.message)
                        setError(true)
                    }
                }
            }
        }
        addProductToUser();
    }

    const handleDelete = (e, objID) => {
        e.preventDefault();
        const removeProductToUser = async () => {
            const user_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
            const params = { "user_id": user_id, "prod_id": objID }
            console.log("objID",objID)
            if (user_id && objID) {
                try {
                    const res = await apiProtect.post("/account/userProductPostDelete/", params);
                    const body = res.data.product;
                    console.log("body",body)
                    if(body.length===0){
                        setUsersProduct({data:[],loaded:false})
                        setReducedProduct({ data: loadedProduct, loaded: true })
                        localStorage.setItem("reducedProduct",JSON.stringify(loadedProduct))
                    }else{
                        let returnedUserProdsArr=returnUsersProdDelAddSubArray(body,"sub")
                        setUsersProduct({data:returnedUserProdsArr,loaded:true})
                    }
                    
                    // setIsPostSuccess(true);
                    setError(false);
                } catch (error) {
                    if (error.response) {
                        setError(true);
                        setPostError(error.response.status)
                    } else {
                        setPostError(error.message)
                        setError(true)
                        console.error(error.message)
                    }
                }
            }
        }
        removeProductToUser();
        
    }
const handleGoToDesign =(e,link)=>{
    e.preventDefault();
    if(link.includes("https")){
        window.open(link);
    }else{
        navigate(link,setChangePage(true))
    }
    console.log(usersProduct)
}
    return (
        <>
            <Container maxWidth="lg"
                sx={{
                    margin: "2rem auto", marginTop: { xs: "1rem", sm: "1rem" }, minHeight: { xs: "30vh", sm: "" },
                    fontFamily: "Roboto"
                }}>
                <Paper elevation={10} component="div"
                    sx={{ width: "100%", margin: "1rem auto", alignItems: "center" }}
                >
                    <Typography component="h1" variant="h3" sx={{ width: "100%", margin: " 2rem auto", textAlign: "center", padding:"1rem" }}>
                        Products to Select
                    </Typography>
                    <Grid container spacing={2} sx={{padding:"0.5rem"}}>
                        {reducedProduct1 && reducedProduct1.map(obj => (
                            <Grid item xs={12} md={4} key={obj.id}>
                                <Paper elevation={3}>
                                    <Card sx={{ maxWidth: "100%", fontFamily: "Roboto",padding:"0.5rem" }}>
                                        <Typography component="h1" variant="h4">
                                            {obj.name}
                                        </Typography>
                                        <CardContent>
                                            <Typography component="h1" variant="body1">
                                                {obj.desc}
                                            </Typography>
                                            <Stack direction="row" sx={{ background: theme.palette.common.blueGrey, color: theme.palette.secondary.lighter }}>
                                                <Typography component="h1" variant="subtitle1" sx={{ margin: "auto .25rem" }}>
                                                    <span style={{fontSize:"14px",fontWeight:"bold",color:theme.palette.common.background3}}>Base:</span> ${obj.price}.<sup>00</sup>
                                                </Typography>
                                                <Typography component="h1" variant="subtitle1" sx={{ margin: "auto .25rem" }}>
                                                    <span style={{fontSize:"14px",fontWeight:"bold",color:theme.palette.common.background3}}>base monthly:</span> ${obj.monthly}.<sup>00</sup>
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                        <Paper elevation={2} sx={{ position: "relative" }}>
                                            <CardActions>
                                                <Fab variant="extended" color="secondary" onClick={(e) => handleAddItem(e, obj.id)}>
                                                    Add Item <AddIcon sx={{ ml: 2 }} />
                                                </Fab>
                                                <Fab variant="extended" color="primary" onClick={(e) => handleGoToDesign(e, obj.extra_kwargs)}>
                                                    view Design <AddIcon sx={{ ml: 2 }} />
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
                </Paper>
            </Container>
            <Container maxWidth="md" sx={{ margin: "2rem auto" }} >
                <Paper elevation={3}>
                <Typography component="h1" variant="h3" sx={{ margin: "2rem auto",padding:"1rem",textAlign:"center" }}>
                     basket Items <SouthIcon  sx={{ml:2,color:theme.palette.common.orangeFade}}/>
                     <br/><div style={{color:theme.palette.common.blue,fontSize:"70%"}}>Project</div>
                     </Typography>
                <Grid container spacing={2} sx={{padding:"0.5rem"}}>
                    {usersProduct.loaded && usersProduct.data.map(obj => (
                        <Grid item xs={12} sm={6} md={4} key={`${obj.id}-${Math.ceil(Math.random() * 1000)}`}>
                            <Paper elevation={3}>
                                <Card sx={{ maxWidth: "100%", fontFamily: "Roboto",padding:"1rem" }}>
                                    <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                                        {obj && obj.name}
                                    </Typography>
                                    <CardContent>
                                        <Typography component="h1" variant="body2">
                                            {obj && obj.desc.slice(0,70)}...
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
                                    <Paper elevation={2} sx={{ position: "relative", }}>
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





                            </Paper>

                        </Grid>
                    ))}
                </Grid>
                </Paper>
            </Container>
        </>
    )


// This only deals with delting items in product
function returnUsersProdDelAddSubArray(bodyProdIdArr,type){
    const products=loadedProduct ? loadedProduct:null;
    let userProdServsArr=[];
    let newReducedProdServArr=[];
        if((products && bodyProdIdArr.length >0) && (newReducedProdServArr.length < products.length)){
            
                products.forEach((obj)=>{
                    let IntObjId=parseInt(obj.id)
                    bodyProdIdArr.forEach((prodId)=>{
                        if(IntObjId === prodId){
                            userProdServsArr.push(obj);
                        }else{
                            newReducedProdServArr.push(obj)
                        }
                    });
                    
                });
                if(userProdServsArr.length>=1){
                localStorage.setItem("reducedProduct",JSON.stringify(newReducedProdServArr));
                setUsersProduct({data:userProdServsArr,loaded:true});
                localStorage.setItem("usersProduct",JSON.stringify(userProdServsArr))
                return userProdServsArr
                }else{
                    localStorage.removeItem("usersProduct");
                    setUsersProduct({data:[],loaded:false});
                    localStorage.setItem("reducedProduct",JSON.stringify(products));
                    return []
                }

        }else if ((products && type ==="sub" && bodyProdIdArr.length===0) || bodyProdIdArr===[0]){
            localStorage.setItem("reducedProduct",JSON.stringify(products));
                setUsersProduct({loaded:false,data:[]});
                return

        }else {

        }
            
    
        return userProdServsArr
}
}
export default GetProductList

