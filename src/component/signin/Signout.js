import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Typography, Grid, Container, Paper, FormControl, CheckBox, InputLabel, FormHelperText, Input, TextField, TextareaAutosize, FormControlLabel, Checkbox, FormLabel, Card, CardContent, Fab, CardMedia } from '@mui/material';
import styled from 'styled-components';
import styles from './signin.module.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import apiProtect from '../axios/apiProtect';
import GetRegisterPages from '../utils/GetRegisterPages';

const Signout = () => {
  const navigate = useNavigate();
  const { setChangePage,staticImage,setTitle,setStyleName} = useContext(GeneralContext);
  const {setLoggedIn,setSignin,setSignout,setGoToSignin }=useContext(TokenAccessContext);
  const cardImg = `${staticImage}/jupiter.png`;


  useEffect(()=>{
    setTitle("Signout");
    setChangePage(false);
    setStyleName("Leaving so soon");
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  },[])
  const handleLogout = () => {
    const postSignout = async () => {
      try {

        const params = {
          user_id: localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null,

        }
        console.log(params)
        const res = await apiProtect.post(`/account/logout/`,params);
        const data = res.data
        if (data) {
          setSignin(false);
          setSignout(true);
          setLoggedIn(false);
          localStorage.removeItem('username');
          localStorage.removeItem('email');
          localStorage.removeItem('user_id');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('csrftoken');
          localStorage.removeItem('page');
          localStorage.removeItem("tokenIsValid");
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("goToSignin");
          localStorage.removeItem("userAccount");
          localStorage.removeItem("reducedService");  //Client's reduced available list
          localStorage.removeItem("reducedProduct");  //Client's reduced available list
          localStorage.removeItem("usersProduct");
          setGoToSignin(true);
          navigate("/", setChangePage(true));
        } else { new Error("nothing returned") }

      } catch (error) {
        console.error(error.message)

      }
    }
    postSignout();
  }

  return (
    <Container maxWidth="xl"
      sx={{
        display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",margin:"2rem auto",marginTop:{xs:"4.5rem",sm:"2rem"},
      }}>
        <GetRegisterPages/>
      <Container maxWidth="sm">
        <Card>
          <CardMedia component="img" height="100%" image={cardImg}/>
          <CardContent sx={{margin:"1rem auto",textAlign:"center"}}>
          
            <Fab
            color="secondary"
              variant="extended"
              onClick={(e) => handleLogout(e)}
            >
              
              <Typography component="h1" variant="h4">
                Signout
              </Typography>
              <ExitToAppIcon sx={{ ml: 2, color: "red", fontSize: "30px" }} />
              
            </Fab>

          
          </CardContent>
        </Card>
      </Container>
    </Container>
  )
}

export default Signout