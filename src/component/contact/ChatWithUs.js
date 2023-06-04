import React from "react";
import { Stack, Box, Typography, Fab } from "@mui/material";
import styles from "./contact.module.css";

const ChatWithUs = ({contactMsg}) => {
    //{loaded:false,data:"",email:"",name:""}
    const [okay,setOkay]=React.useState(false);

    const handleOkay=(e)=>{
        e.preventDefault();
        setOkay(true);
    }
  return (
    <Stack direction="column" className={styles.chatWithUsOut}>
        { contactMsg.loaded && !okay && 
        <Stack direction="column" spacing={2} className={styles.contactMsg}>
            <Typography component="h1" variant="h4">Message has been sent</Typography>
            <Typography component="h1" variant="h4">Confirmed</Typography>
            <Typography component="h1" variant="h5">{contactMsg.data}</Typography>
            <div className={styles.message}>
            <Typography component="h1" variant="h6">name:{contactMsg.name}</Typography>
            <Typography component="h1" variant="h6">email:{contactMsg.email}</Typography>
            {contactMsg.cell &&<Typography component="h1" variant="h6">cell:{contactMsg.cell}</Typography>}
            {contactMsg.coName &&<Typography component="h1" variant="h6">Company:{contactMsg.coName}</Typography>}
            {contactMsg.coSite &&<Typography component="h1" variant="h6">Comp. Site:{contactMsg.coSite}</Typography>}
            {contactMsg.prefferredComs &&<Typography component="h1" variant="h6">Comp. Site:{contactMsg.preferredComms}</Typography>}
            
            <Typography component="h1" variant="h6">content</Typography>
            <Typography component="h1" variant="body1h6">{contactMsg.content}</Typography>
            <Fab variant="extended" color="secondary" size="small"
            onClick={(e)=>handleOkay(e)}
            > we will contact you ASAP!</Fab>
            </div>
            

        </Stack>
        }
      <Stack direction="row" spacing={3} className={styles.chatWithUsIn}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontFamily: "Phylosopher" }}
        >
          Chat With Us
        </Typography>
        <a href="tel:+14169175768">
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Phylosopher", padding: "2px",color:"blue" }}
          >
            416.917.5768
          </Typography>
        </a>
      </Stack>
      <Stack direction="row" spacing={3} className={styles.chatWithUsIn}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontFamily: "Phylosopher",}}
        >
          Using your email
        </Typography>
        <a href="mailto:masterconnect919@gmail.com">
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Phylosopher", padding: "2px",color:"blue" }}
          >
            masterconnect
          </Typography>
        </a>
      </Stack>
    </Stack>
  );
};

export default ChatWithUs;
