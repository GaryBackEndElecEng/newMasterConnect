import React from "react";
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from "./contact.module.css";
import { Stack, Grid, Container, Typography, Fab } from "@mui/material";
import FullNameInput from "./FullNameInput";
import EmailInput from "./EmailInput";
import ContentInput from "./ContentInput";
import api from '../axios/api';
import ChatWithUs from  './ChatWithUs';

const RequestForm = () => {
    const postRequest = "postRequest/";
    const {formData,setFullName,setEmail,setContent,content,email,fullName,setFormData}=React.useContext(GeneralContext);
    const [confirm,setConfirm]=React.useState({loaded:false,data:{}});
    const [contactMsg,setContactMsg]=React.useState({loaded:false,data:"",email:"",name:"",content:""});

    React.useEffect(() => {
        const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const fullname_REGEX=/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        let emailValid = email_REGEX.test(email);
        let fullNameValid = fullname_REGEX.test(fullName);
        
        if(emailValid && fullNameValid){
          setConfirm({loaded:true,data:{email:emailValid,fullName:fullNameValid}})
        }
      }, [content, email,fullName,confirm.loaded,confirm.data.email,confirm.data.fullName,confirm.data.content]);
      React.useEffect(()=>{
        if(confirm.loaded){
        setFormData({loaded:true,data:{fullName:fullName,email:email,content:content}});
        }
      },[confirm.loaded]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const sendRequest = async (e) => {
          try {
            const res = await api.post(postRequest,formData.data);
            const body= res.data;
            // console.log(body);
            setContactMsg({data:"We will contact you ASAP by email: ",name:body.fullName,email:body.email,loaded:true,content:body.content});
          setFullName("");
          setEmail("");
          setContent("");
          setTimeout(()=>{
            setContactMsg({loaded:false,data:"",name:"",email:""});
          },3000);
          } catch (error) {
            console.error(error.message);
          }
          
        };
        if(confirm.loaded && formData.loaded){
        sendRequest();
        }
    }

  return (
    <Stack direction="column" sx={{alignItems:"center",margin:"1rem auto"}}>
        <ChatWithUs contactMsg={contactMsg}/>
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FullNameInput />
      <EmailInput />
      <ContentInput />
      <Stack direction="column" spacing={2} sx={{ margin: "2rem auto" }}>
        <Fab
          color="secondary"
          size="small"
          variant="extended"
          onClick={(e) => handleSubmit(e)}
        >
          <Typography component="h1" variant="h6" className={styles.write}>
            submit
          </Typography>
        </Fab>
      </Stack>
    </form>
    </Stack>
  );
};

export default RequestForm;
