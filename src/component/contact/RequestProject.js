import React from "react";
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from "./contact.module.css";
import { Stack, Grid, Container, Typography, Fab,FormControl,InputLabel,Input } from "@mui/material";
import FullNameInput from "./FullNameInput";
import EmailInput from "./EmailInput";
import ContentInput from "./ContentInput";
import CompanyInput from './CompanyInput';
import SiteInput from './SiteInput';
import CellInput from './CellInput';
import api from '../axios/api';
import RequestResponse from  './RequestResponse';

const RequestProject = () => {
    const postRequest = "post/";
    const {setFullName,setEmail,setContent,content,email,fullName,coSite,setCoSite,coName,setCoName,startProject,setStartProject,setCell,cell}=React.useContext(GeneralContext);
    const [confirm,setConfirm]=React.useState({loaded:false,data:{}});
    const [comms,setComms]=React.useState("");
    const [contactMsg,setContactMsg]=React.useState({loaded:false,data:"",email:"",name:"",content:""});

    React.useEffect(() => {
        const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const fullname_REGEX=/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        let emailValid = email_REGEX.test(email);
        let fullNameValid = fullname_REGEX.test(fullName);
        
        if(emailValid && fullNameValid){
          setConfirm({loaded:true,data:{email:emailValid,fullName:fullNameValid}})
        }
      }, [content, email,fullName,confirm.loaded,confirm.data]);

      React.useEffect(()=>{
        if(confirm.loaded){
        setStartProject({loaded:true,data:{fullName:fullName,email:email,content:content,coSite:coSite,coName:coName,cell:cell,preferredComms:comms}});
        }
      },[confirm.loaded]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const sendRequest = async (e) => {
          try {
            const res = await api.post(postRequest,startProject.data);
            const body= res.data;
            // console.log(body);
            setContactMsg({data:"We will contact you ASAP by email: ",name:body.fullName,email:body.email,loaded:true,cell:cell,content:body.content,coSite:body.coSite,coName:body.coName});
            setTimeout(()=>{
                setFullName("");
                setEmail("");
                setContent("");
                setCoSite("");
                setCoName("");
                setCell("");
            },1000);
          
          setTimeout(()=>{
            setContactMsg({loaded:false,data:"",name:"",email:""});
          },3000);
          } catch (error) {
            console.error(error.message);
          }
          
        };
        if(confirm.loaded && startProject.loaded){
        sendRequest();
        }
    }

  return (
    <Container maxWidth="lg" sx={{margin:"auto",}}>
    <Stack direction="column" sx={{alignItems:"center",margin:"1rem auto"}}>
        <RequestResponse contactMsg={contactMsg}/>
    <form
      style={{
        margin:"auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <FullNameInput />
      <EmailInput />
      <CellInput/>
      <CompanyInput/>
      <SiteInput/>
      <ContentInput />
      <FormControl size="medium" variant="filled" className={styles.formControl}>
      <InputLabel
        focused={false}
        label="comms"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        preferred Communication
      </InputLabel>
      <Input
        component="div"
        name="comms"
        placeholder=" email"
        value={comms}
        onChange={(e) => setComms(e.target.value)}
        margin={"dense"}
        required={false}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
    </FormControl>
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
    </Container>
  );
};

export default RequestProject;