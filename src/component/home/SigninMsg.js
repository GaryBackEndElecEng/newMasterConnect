import React, { useEffect, useState,useContext } from 'react';
// import styled from 'styled-components';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {  Paper } from '@mui/material';
import Styles from './home.module.css';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {Stack} from '@mui/material';

const CustSignin=styled(Stack)`
justify-content:center;
align-items:center;
position:absolute;
top:50%;
left:auto;
z-index:99999;
animation: slideIn 1s ease-in-out;
@keyframes slideIn {
    from {opacity:0;transform:translateX(-100%);}
    to {opacity:1;transform:translateX(0%);}
}
`;

const SigninMsg = ({signin,registerConfirmed,signout}) => {
    const {setSignin,setSignout}=useContext(TokenAccessContext);
    const{ setRegisterConfirmed } = useContext(GeneralContext);
    const theme=useTheme();
    const [close,setClose]=useState(false);
    const [msg,setMsg]=useState("");

    useEffect(()=>{
        if(signin){
            setMsg("You have a secured signin. You can view your account.")
            setTimeout(()=>{
                setClose(true)
                setSignin(false);
            },20000)
        }
    },[signin,setSignin])

    useEffect(()=>{
        if(registerConfirmed){
            setMsg("Thank you for registering. You can now signin")
            setTimeout(()=>{
                setClose(true)
                setRegisterConfirmed(false);
            },20000)
        }
    },[registerConfirmed,setRegisterConfirmed]);

    useEffect(()=>{
        if(signout){
            setMsg("Thank you for comming.Hope you come back soon!")
            setTimeout(()=>{
                setClose(true);
                setSignout(false);
            },10000)
        }
    },[signout,setSignout]);
    
    return (
        <CustSignin direction="column" spacing={0}>
        {
        
        (!close && signin) &&
        
        <Paper elevation={20}
            className={Styles.register_confirmed}
            sx={{
                fontFamily: "Roboto", position: "absolute", left: { sm: "90%", xs: "70%" }, top: { sm: "40%", xs: "36%" },
                background: theme.palette.common.blueGrey, color: "white", padding: "1rem", boxShadow: "2px 2px 10px white, -2px -3px 10px white"

            }}
        >
            <p>{msg}</p>
            

        </Paper>
        }

        {
        
        (!close && registerConfirmed) && 
        
        <Paper elevation={20}
            className={Styles.register_confirmed}
            sx={{
                fontFamily: "Roboto", position: "absolute", left: { sm: "10%", xs: "20%" }, top: { sm: "40%", xs: "36%" },
                background: theme.palette.common.blueGrey, color: "white", padding: "1rem", boxShadow: "2px 2px 10px white, -2px -3px 10px white"

            }}
        >
            <p>{msg}</p>
            

        </Paper>}
        {
        
        (!close && signout) && 
        
        <Paper elevation={20}
            className={Styles.register_confirmed}
            sx={{
                fontFamily: "Roboto", position: "absolute", left: { sm: "10%", xs: "20%" }, top: { sm: "40%", xs: "36%" },
                background: theme.palette.common.blueGrey, color: "white", padding: "1rem", boxShadow: "2px 2px 10px white, -2px -3px 10px white"

            }}
        >
            <p>{msg}</p>
            

        </Paper>
        
        }
        </CustSignin>
    )
}

export default SigninMsg