import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {  IconButton, Stack, Typography } from '@mui/material'
import jwt_decode from 'jwt-decode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTheme } from '@mui/material/styles';
import apiProtect from '../axios/apiProtect';


const RegisterGoogle = () => {
    const navigate = useNavigate();
    const {  setGmailUser,gmailUser } = useContext(TokenAccessContext);
    const { setRegister, setRegisterConfirmed, setEmail, setChangePage, } = useContext(GeneralContext);
    const [showSignout, setShowSignout] = useState(false);
    const theme = useTheme();
    
    const handleSignOut = (e) => {
        e.preventDefault();
        setGmailUser({ loaded: false, data: {} });
        document.getElementById("signinDiv").hidden = false;
        setShowSignout(false);
    }
    useEffect(() => {
        const handleCallbackResponse = (response) => {
            // actions once the loginin is success
            var userObject = jwt_decode(response.credential);
            setGmailUser({
                loaded: true, data: {
                    email: userObject.email,
                    name: `${userObject.given_name} ${userObject.family_name}`,
                    image: userObject.picture,
                    username: `${userObject.given_name}_${userObject.family_name}`,
                    password: userObject.sub,
                    check: true
    
                }
            });
            setEmail(userObject.email)
            let signin=document.getElementById("signinDiv");
            signin.innerHTML="Register with Google";
            signin.addEventListener("click",(e)=>{
                e.preventDefault();
            });
            signin.hidden = true;
            //REGISTER
            const registerUser = async () => {
                try {
                    const params = {
                        email: userObject.email,
                        name: `${userObject.given_name} ${userObject.family_name}`,
                        image: userObject.picture,
                        username: `${userObject.given_name}_${userObject.family_name}`,
                        password: userObject.sub,
                        check: true
                    }
                    const res = apiProtect.post(`/account/register/`, params);
                    const body = res.data
                    setRegister({ loaded: true ,data:gmailUser.data});
                    setRegisterConfirmed(true);
                    localStorage.setItem('username', body.username);
                    localStorage.setItem('email', body.email);
                    setShowSignout(true);
                    navigate("/signin",setChangePage(true))
                } catch (error) {
                    console.error(error.message)
                }
            }
            registerUser();
            
    
        }
        //The /*,,,,*/ is s globla linter that tells react that the app is coming from outside the root
        /* global google */
        google.accounts.id.initialize({
            client_id: "306515055842-b7tskt88grcr7i9i2glvnqrd3bgf5s56.apps.googleusercontent.com",
            callback: handleCallbackResponse,
            context:"use"
        });
        google.accounts.id.renderButton(
            document.getElementById("signinDiv"),
            { theme: "outline", size: "large",text:"Register with Google",type:"icon" }
        );
        google.accounts.id.prompt();

    }, [gmailUser.data,setEmail,setRegister,setGmailUser]);

    //    console.log(gmailUser.data,showSignout)

    return (
        <Stack direction="column" spacing={2} sx={{alignItems:"center" }}>
            <Typography component="h1" variant="h5">Register with Google</Typography>
            <div id="signinDiv"></div>

            {showSignout &&
                <IconButton variant="extend" size="small" onClick={(e) => handleSignOut(e)}
                    sx={{
                        background: theme.palette.common.fadeCharcoal, color: "white",
                        borderRadius: "5%",
                        "&:hover": { background: theme.palette.common.blueFade, color: "black" },
                    }}>
                    Signout <ExitToAppIcon sx={{ ml: 2, color: "red", "&:hover": { color: "green" } }} />
                </IconButton>}
        </Stack>
    )
}

export default RegisterGoogle