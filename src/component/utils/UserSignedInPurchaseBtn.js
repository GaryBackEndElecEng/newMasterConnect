import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import styles from './utils.module.css';
import styled from 'styled-components';
import { Fab,Stack, Typography } from '@mui/material';
import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import apiProtect from '../axios/apiProtect';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CusTypography = styled(Typography)`
display:block;
position:absolute;
top:-200%;
padding:0.5rem;
border-radius:5%;
animation: show 6s ease-in-out;
@keyframes show {
    0% {  opacity:0;transform:translateY(0%);}
    50% {  opacity:1;transform:translateY(-200%);}
    85%{  opacity:0.3;}
    100%{ display:none;}
}
`;
const UserSignedInPurchaseBtn = () => {
    const location=useLocation();
    const page=location.pathname;
    const theme=useTheme();
    const { getProductList} = useContext(PriceContext);
    const [productAdded,setProductAdded]=useState(false);
    //SetUsersProduct=> FROM MyAccount ( it recieves all user's products and service)
    const { usersProduct, setUsersProduct, setReducedProduct,user_id } = useContext(TokenAccessContext);
    const getProductList2 = (localStorage.getItem("getProductList2")) ? JSON.parse(localStorage.getItem("getProductList2")) :getProductList.data;
    const reducedProduct1 = (localStorage.getItem("reducedProduct") ) ? JSON.parse(localStorage.getItem("reducedProduct")) : getProductList2;

    const addProductToUser = async (e) => {
        e.preventDefault();
        const GetUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
        const selectedProduct=reducedProduct1 ? reducedProduct1.filter(obj=>(obj.extra_kwargs === page))[0]:null;
        // console.log("outside=> product",selectedProduct)
        if (user_id && selectedProduct) {
            const params = { "user_id": GetUser_id, "prod_id": parseInt(selectedProduct.id) }
            try {
                const res = await apiProtect.post("/account/userProductPost/", params);
                if(res){
                    const reduceArray = reducedProduct1.filter(obj => (parseInt(obj.id) !== parseInt(selectedProduct.id)))
                    let addToUserProductProduct = reducedProduct1.filter(obj => (parseInt(obj.id) === parseInt(selectedProduct.id)))[0];
                    setReducedProduct({ data: reduceArray, loaded: false })
                    setUsersProduct({ data: [...usersProduct.data, selectedProduct], loaded: true })
                    localStorage.setItem("reducedProduct", JSON.stringify(reduceArray));
                    localStorage.setItem("usersProduct", JSON.stringify([...usersProduct.data, addToUserProductProduct]));
                    setProductAdded(`Your ${selectedProduct.name},${selectedProduct.extra_kwargs} was added to your basket`);
                }
            } catch (error) {
                console.error(error.message)
            }
        }
    }

    return (
        <Stack direction="column" sx={{position:"relative"}}>
            <Fab variant="extended" color="info" onClick={(e)=>addProductToUser(e)}>
                purchase <ShoppingCartIcon sx={{ ml: 2 }} />
            </Fab>
            <CusTypography component="h1" variant="h6" sx={{background:theme.palette.common.mediumBlue,color:"white"}}>{productAdded}</CusTypography>
        </Stack>
    )
}

export default UserSignedInPurchaseBtn