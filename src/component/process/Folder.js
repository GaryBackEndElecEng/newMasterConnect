import React from "react";
// import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./process.module.css";
import { Container, Typography,  } from "@mui/material";
import styled from "styled-components";
import Page from './Page';


const Folder = ({ slideArr }) => {
    


  return (
    <Container maxWidth="xl" sx={{margin:{md:"auto",sm:"1vh auto"}}}>
      <Typography component="h1" variant="h2" sx={{textAlign:"center",marginBotton:"2rem",backgroundImage:"var(--background-image-1-left)",backgroundSize:"400% 200%"}}
      className={styles.fontStyleEffect}
      >Steps</Typography>
    <div className={styles.mainFolder}>
      
      <div className={styles.parentPage}>
        {slideArr && slideArr.map((obj, index) =>(
            <div key={`${obj.id}-folder-${index}`}>
         <Page obj={obj} index={index}  />
         </div>

        ))}
      </div>
    </div>
    </Container>
  );
};

export default Folder;
