import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { IconButton, Stack } from '@mui/material'
import jwt_decode from 'jwt-decode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTheme } from '@mui/material/styles';
import apiProtect from '../axios/apiProtect';


const RegisterGoogle = () => {
    const navigate = useNavigate();
    const {  setGmailUser,gmailUser, setSignin, setLoggedIn, setTokenIsValid, setLoginError } = useContext(TokenAccessContext);
    const {  setChangePage,setRegister } = useContext(GeneralContext);
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
            const getUUID = localStorage.getItem("UUID") ? JSON.parse(localStorage.getItem("UUID")) : null;
            const getpackageId = localStorage.getItem("buypackage") ? JSON.parse(localStorage.getItem("buypackage")) : null;
            var userObject = jwt_decode(response.credential);
            setGmailUser({
                loaded: true, data: {
                    email: userObject.email,
                    name: `${userObject.given_name} ${userObject.family_name}`,
                    image: userObject.picture,
                    username: `${userObject.given_name}_${userObject.family_name}`,
                    password: userObject.sub,
                    check: true,
                    packageId:getpackageId,
                    UUID: getUUID

                }
            });
            document.getElementById("signinDiv").hidden = true;
            setShowSignout(true);
            let signin=document.getElementById("signinDiv");
            signin.addEventListener("click",(e)=>{
                e.preventDefault();
            });
            //SIGNIN
            const postSignin= async ()=>{
                try {
                 const params={
                    username: `${userObject.given_name}_${userObject.family_name}`,
                    email: userObject.email,
                    password: userObject.sub,
                  }
                    const res = await apiProtect.post(`/account/login/`,params)
                    const data=res.data
                        setSignin(true);
                        setLoggedIn(true);
                        setTokenIsValid(true);
                        localStorage.setItem('username',JSON.stringify(data.username));
                        localStorage.setItem('email',JSON.stringify(data.email));
                        localStorage.setItem('user_id',JSON.stringify(data.user_id));
                        localStorage.setItem('access_token',data.access_token);
                        localStorage.setItem('refresh_token',data.refresh_token);
                        localStorage.setItem('tokenIsValid',true);
                        localStorage.setItem("loggedIn",true);
                        localStorage.setItem("goToSignin",false)
                        setTimeout(()=>{setSignin(false)},1000);
                        navigate("/",setChangePage(true));
                        setRegister({ loaded: false, data: { 'username': gmailUser.username, "email": gmailUser.email, "password": "" } });
                    localStorage.removeItem("buypackage");
                    localStorage.removeItem("extra_kwargs");
                    localStorage.removeItem("UUID");
                    
                } catch (error) {
                    setLoginError(true);
                    console.error(error.message)
                    
                }
            }
            postSignin();

    }
        //The /*,,,,*/ is s globla linter that tells react that the app is coming from outside the root
        /* global google */
        google.accounts.id.initialize({
            client_id: "306515055842-b7tskt88grcr7i9i2glvnqrd3bgf5s56.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signinDiv"),
            { theme: "outline", size: "large" }
        )

    }, [setRegister,setGmailUser,setLoggedIn,setTokenIsValid]);

    //    console.log(gmailUser.data,showSignout)

    return (
        <Stack direction="row" spacing={2} sx={{ textAlign: "center" }}>
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