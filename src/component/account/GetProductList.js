import React, { useContext, useEffect, useState,useCallBack } from 'react';
import { useNavigate } from 'react-router-dom';
// import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Paper, Typography, Grid, Fab, Card, CardContent, CardActions, ButtonGroup, Avatar } from '@mui/material';
import styles from './account.module.css';
import styled from 'styled-components';
// import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import apiProtect from '../axios/apiProtect';
import SouthIcon from '@mui/icons-material/South';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo } from 'react';
import ProductsServiceDependancies from './ProductsServiceDependancies';


const UsersSection = styled.div`
width:100%
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
`;


const GetProductList = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { setChangePage, getProductDesigns, staticImage } = useContext(GeneralContext);
    // const { getProductList } = useContext(PriceContext);
    //SetUsersProduct=> FROM MyAccount ( it recieves all user's products and service)
    const { usersProduct, setUsersProduct, setReducedProduct, user_id, setUserAccount,userAccount } = useContext(TokenAccessContext);
    const designProductsOnly = localStorage.getItem("productDesigns") ? JSON.parse(localStorage.getItem("productDesigns")) : null;

    // const [isPostSuccess, setIsPostSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [postError, setPostError] = useState(null);
    const [reduceProduct, setReduceProduct] = useState({ loaded: false, data: [] });
    const [usersProd,setUsersProd]=useState(null);
    const [pageDesign, setPageDesign] = useState([]);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState({ loaded: false, id: null });
    const [serviceArr, setServiceArr] = useState({ loaded: false, data: [], id: null });
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
    const reducedProduct1 = (localStorage.getItem("reducedProduct")) ? JSON.parse(localStorage.getItem("reducedProduct")) : designProductsOnly;
    
//THIS REFRESHES THE  USERSPRODUCT FROM THE USER'S ACCOUNT TO REMOVE THE BUG ON REFRESH


        useEffect(()=>{
            if(userAccount.loaded && userAccount.data){
                setUsersProd(userAccount.data.product)
            }
        },[userAccount])

    //   console.log(reducedProduct1)
    useEffect(() => {
        if (getProductDesigns.loaded) {
            setPageDesign(getProductDesigns.data.filter(obj => (obj.type === "pageDesign")));
        }
    }, [getProductDesigns.loaded, getProductDesigns.data]);

    useMemo(() => {
        let arr = pageDesign ? pageDesign : null;
        if (arr && usersProduct.loaded && usersProduct.data) {
            arr.forEach((obj, index) => {
                let tempUser = usersProduct.data.filter(ob => (parseInt(ob.id) === parseInt(obj.id)))[0];
                if (tempUser) {
                    // console.log("usersObj",usersObj,"arr",obj)
                    arr.splice(index, 1);
                }

            });
            localStorage.setItem("reducedProduct", JSON.stringify(arr));
            setReduceProduct({ loaded: true, data: arr })

        }

    }, [pageDesign, setReduceProduct, usersProduct]);


    const handleAddItem = (e, obj) => {
        let objID = obj.id
        e.preventDefault();
        const addProductToUser = async () => {

            const params = { "user_id": getUser_id, "prod_id": objID }
            if (user_id && objID) {
                try {
                    const res = await apiProtect.post("/account/userProductPost/", params);
                    //USERSPRODUCTS
                    const user_account = res.data;
                    setUserAccount({ loaded: true, data: user_account })
                    const reduceArray = reducedProduct1.filter(obj => (obj.id !== objID))
                    setReduceProduct({ data: reduceArray, loaded: true })
                    setUsersProduct({ data: user_account.product, loaded: true })
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
        if (obj.category === "frontPage") {
            console.log(obj.category)
            addProductToUser();
        } else {
            setShowMessage({ loaded: true, id: obj.id });
            setMessage(`press 'view Design'! to navigate to the ${obj.category} page. From there you can select your template type.`);
            setTimeout(() => { setShowMessage({ loaded: false, id: null }) }, 5000);
        }
    }

    const handleDelete = (e, obj) => {
        let objID = obj.id
        e.preventDefault();
        const removeProductToUser = async () => {
            const params = { "user_id": getUser_id, "prod_id": objID }
            if (user_id && objID) {
                try {
                    const res = await apiProtect.post("/account/userProductPostDelete/", params);
                    //ALL users PRODUCTS
                    const user_account = res.data;
                    const body = res.data.product;
                    // console.log("body",body)
                    setUserAccount({ loaded: true, data: user_account });
                    if (body.length === 0) {
                        setUsersProduct({ data: [], loaded: false })
                        setReducedProduct({ data: designProductsOnly, loaded: true })
                        localStorage.setItem("reducedProduct", JSON.stringify(designProductsOnly))
                    } else {
                        let returnObj_reducedProduct = {}

                        returnObj_reducedProduct = usersProduct.data.filter(obj => (parseInt(obj.id) === parseInt(objID)))[0];
                        setUsersProduct({ data: user_account.product, loaded: true })
                        let reduceProduct1 = [...reduceProduct.data, returnObj_reducedProduct]
                        localStorage.setItem("reducedProduct", JSON.stringify(reduceProduct1))
                        setReducedProduct({ loaded: true, data: reduceProduct1 })
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
    const handleGoToDesign = (e, link) => {
        e.preventDefault();
        if (link.includes("https")) {
            window.open(link);
        } else {
            navigate(link, setChangePage(true))
        }
        console.log(usersProduct)
    }
    const handleShowIncludeServices = (e, services, id) => {
        e.preventDefault();
        if (services) {
            setServiceArr({ loaded: true, data: services, id: id });
        } else {
            setServiceArr({ loaded: false, data: [], id: null });
        }
    }
    const handleCloseIncludeService = (e, id) => {
        e.preventDefault();
        if (id) {
            setServiceArr({ loaded: false, data: [], id: null });
        }
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
                    <Typography component="h1" variant="h3" sx={{ width: "100%", margin: " 2rem auto", textAlign: "center", padding: "1rem" }}>
                        Front Page Products to Select
                    </Typography>
                    <Grid container spacing={2}
                        sx={{ padding: "0.5rem", maxHeight: { xs: "56vh" }, overflowY: "scroll" }}
                    >
                        {reducedProduct1 && reducedProduct1.map(obj => (
                            <Grid item xs={12} md={4} key={obj.id}>
                                <Paper elevation={3}>
                                    <Card sx={{ maxWidth: "100%", fontFamily: "Roboto", padding: "0.5rem" }}>
                                        <Typography component="h1" variant="h4">
                                            {obj.name}
                                        </Typography>
                                        <CardContent>
                                            <Typography component="h1" variant="body1">
                                                {obj.desc}
                                            </Typography>
                                            <Stack direction="row" sx={{ background: theme.palette.common.blueGrey, color: theme.palette.secondary.lighter }}>
                                                <Typography component="h1" variant="subtitle1" sx={{ margin: "auto .25rem" }}>
                                                    <span style={{ fontSize: "14px", fontWeight: "bold", color: theme.palette.common.background3 }}>Base:</span> ${obj.price}.<sup>00</sup>
                                                </Typography>
                                                <Typography component="h1" variant="subtitle1" sx={{ margin: "auto .25rem" }}>
                                                    <span style={{ fontSize: "14px", fontWeight: "bold", color: theme.palette.common.background3 }}>base monthly:</span> ${obj.monthly}.<sup>00</sup>
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                        <Paper elevation={2} sx={{ position: "relative" }}>
                                            <CardActions>

                                                <Fab variant="extended" color="secondary" onClick={(e) => handleAddItem(e, obj)}>
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
                                            {(showMessage.loaded && showMessage.id===obj.id) &&
                                             <Paper elevation={20}
                                             
                                                sx={{
                                                    position: "absolute", top:{md: "-140%",sm:"-100%",xs:"-160%"}, left: "0%", width: "100%", zIndex: "999999",
                                                    background:theme.palette.common.fadeCharcoal3,color:"white",padding:"0.25rem",

                                                }}
                                            >
                                                <Typography component="h1" variant="h6" sx={{ width: "100%", }}>{message}</Typography>
                                            </Paper>
                                            }
                                        </Paper>
                                    </Card>
                                </Paper>

                            </Grid>
                        ))}

                    </Grid>
                </Paper>
            </Container>
            <UsersSection >
                <Paper elevation={3}>
                    <Typography component="h1" variant="h3" sx={{ margin: "2rem auto", padding: "1rem", textAlign: "center" }}>
                        basket Items <SouthIcon sx={{ ml: 2, color: theme.palette.common.orangeFade }} />
                        <br /><div style={{ color: theme.palette.common.blue, fontSize: "70%" }}>Project</div>
                    </Typography>
                    <Grid container spacing={{ md: 2, xs: 0, sm: 1 }}
                        sx={{
                            padding: "0.5rem", overflowY: "scroll", maxHeight: { xs: "50vh", sm: "60vh", md: "38vh" },

                        }}
                    >

                        <Grid item xs={12} sm={8} md={8} sx={{ padding: "0.25rem" }}>
                            <Grid container spacing={0}>
                                {usersProd && usersProd.map(obj => (
                                    <Grid item xs={12} sm={6} md={4} key={`${obj.id}-${Math.ceil(Math.random() * 1000)}`}>
                                        <Paper elevation={3}>
                                            <Card sx={{ maxWidth: "100%", fontFamily: "Roboto", padding: "1rem" }}>
                                                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                                                    {obj && obj.name}
                                                </Typography>
                                                <CardContent>
                                                    <Typography component="h1" variant="body2">
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
                                                <Paper elevation={2} sx={{ position: "relative", }}>

                                                    <CardActions sx={{ display: "flex", justifyContent: "center", flexGrow: 1, flexDirection: "column" }}>
                                                        <ButtonGroup size="medium" sx={{ display: "flex", flexDirection: "column", }} >
                                                            <Fab variant="extended" color="warning" size="medium" onClick={(e) => handleDelete(e, obj)}
                                                                sx={{ margin: "0.5rem auto" }}
                                                            >
                                                                remove Item <DeleteIcon sx={{ ml: 2 }} />
                                                            </Fab>
                                                            {(serviceArr.loaded && serviceArr.id === obj.id) ?

                                                                <Fab variant="extended" color="error" size="small" onClick={(e) => handleCloseIncludeService(e, obj.id)}
                                                                    sx={{ margin: "0.5rem auto" }}
                                                                >
                                                                    close services <CloseIcon sx={{ ml: 2 }} />
                                                                </Fab>
                                                                :
                                                                <Fab variant="extended" color="secondary" size="small" onClick={(e) => handleShowIncludeServices(e, obj.services, obj.id)}
                                                                    sx={{ margin: "0.5rem auto" }}
                                                                >
                                                                    show services <AddIcon sx={{ ml: 2 }} />
                                                                </Fab>}
                                                        </ButtonGroup>
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
                        </Grid>
                        {/* THIS PULLS UP THE SERVICE DEPENDANCIES FOR A USERS SELECTED PRODUCT AND DISPLAYS IT */}
                        <Grid item xs={12} sm={4} md={4} sx={{ padding: "0.25rem", border: { sm: "1px solid grey" } }}>
                            {(serviceArr.loaded && serviceArr.id !== null) &&
                                <Typography component="h1" variant="h3" sx={{ textAlign: "center", marginBottom: "0.5rem" }}> included Services</Typography>
                            }
                            <ProductsServiceDependancies serviceArr={serviceArr} staticImage={staticImage}/>
                        </Grid>
                    </Grid>
                </Paper>
            </UsersSection>
        </>
    )

}
export default GetProductList

