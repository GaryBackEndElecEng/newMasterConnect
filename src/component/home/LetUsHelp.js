import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { Typography, Container, Grid, Fab } from "@mui/material";
import styled from "styled-components";

const CustWhatWeDo = styled(Grid).attrs({ className: styles.custWhatWeDo })`
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
`;

const LetUsHelp = () => {
  const [fontSize, setFontSize] = React.useState(null);

  React.useEffect(() => {
    if (window.innerWidth < 900) {
      setFontSize("h4");
    }  if (window.innerWidth < 600) {
      setFontSize("h4");
    } else {
      setFontSize("h3");
    }
  }, []);

  return (
    <div className={styles.mainWhatWeDo}>
        <Typography component="h1" variant={window.innerWidth < 600 ? "h3":"h2"}> We Can Assist</Typography>
      <Container maxWidth="xl" sx={{margin:"3rem auto",textAlign:"center"}}>
        
        <CustWhatWeDo container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <CustWhatWeDo container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography component="h1" variant={fontSize} className={styles.fontStyle2}>
                  Contact
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <a href={"tel:14169175768"}>
                  <Fab variant="extended" color="info" size="medium">
                    <Typography component="h1" variant="h6" className={styles.fontStyle}>
                      Call
                    </Typography>
                  </Fab>
                </a>
              </Grid>
            </CustWhatWeDo>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustWhatWeDo container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography component="h1" variant={fontSize} className={styles.fontStyle2}>
                  Message
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/contact">
                  {" "}
                  <Fab variant="extended" color="primary" size="medium">
                    <Typography component="h1" variant="h6" className={styles.fontStyle}>
                      message Us
                    </Typography>
                  </Fab>
                </Link>
              </Grid>
            </CustWhatWeDo>
          </Grid>
        </CustWhatWeDo>
        <CustWhatWeDo container>
          <Grid item xs={12} md={6}>
            <CustWhatWeDo container>
              <Grid item xs={12} md={6}>
                <Typography component="h1" variant={fontSize} className={styles.fontStyle2}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <a href="mailto:masterconnect919@gmail.com">
                  {" "}
                  <Fab variant="extended" color="secondary" size="medium">
                    <Typography component="h1" variant="h5" className={styles.fontStyle}>
                      Email Us
                    </Typography>
                  </Fab>
                </a>
              </Grid>
            </CustWhatWeDo>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustWhatWeDo container>
              <Grid item xs={12} md={6}>
                <Typography component="h1" variant={fontSize} className={styles.fontStyle2}>
                  Let's Start!
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/start-project">
                  <Fab variant="extended" color="secondary" size="medium">
                    <Typography component="h1" variant="h6" className={styles.fontStyle}>
                      start a project
                    </Typography>
                  </Fab>
                  </Link>
                  
              </Grid>
              
            </CustWhatWeDo>
          </Grid>
          <Typography component="h1" variant="h5" sx={{marginTop:"1rem"}} >We'll repond ASAP!- We're responsive</Typography>
        </CustWhatWeDo>
      </Container>
    </div>
  );
};

export default LetUsHelp;
