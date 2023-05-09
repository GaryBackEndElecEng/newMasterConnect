import React from "react";
import {
  
  Typography,
  Fab,
  Grid,
  Container,
  FormControl,
  Input,
  InputLabel,
  TextareaAutosize,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styled from "styled-components";
import styles from "./design2.module.css";

const CustMsg = styled.div.attrs({ className: styles.custFamily })`
  margin: auto;
  padding: 5vh 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--background-hopefulHarvest-msg);
  min-height: 50vh;
`;
const SendMsg = ({ getWidth }) => {
    const { staticImage}=React.useContext(GeneralContext);
    const farm=`${staticImage}/design2/logoMe.png`;
  return (
    <CustMsg>
      <Container maxWidth="lg" sx={{ margin: "1rem auto" }}>
        <Grid container spacing={{ md: 6, sm: 2, xs: 4 }}>
          <Grid item xs={12} md={6}>
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background:"var(--background-hopefulHarvest-msg)"
              }}
            >
                <Typography component={"h1"} variant="h4" sx={{margin:"0.5rem auto",color:"black"}}>send us a Message</Typography>
                <CardMedia component="img" src={farm} alt="www.masterconnect.ca" sx={{height:{md:"200px",sm:"300px",xs:"200px"},width:{xs:"70%"},borderRadius:"50%"}}/>
                <CardContent>
              <form className={styles.form} style={{ background: "white" }}>
                <FormControl
                  size="medium"
                  variant="filled"
                  className={styles.formcontrol}
                >
                  <InputLabel
                    focused={false}
                    label="name"
                    sx={{ color: "black", fontFamily: "Philosopher" }}
                  >
                    name
                  </InputLabel>
                  <Input
                    component="div"
                    name="name"
                    placeholder=" name"
                    margin={"dense"}
                    required={true}
                    sx={{ boxShadow: "1px 1px 3px 1px white" }}
                  />
                </FormControl>
                <FormControl
                  size="medium"
                  variant="filled"
                  className={styles.formcontrol}
                >
                  <InputLabel
                    focused={false}
                    label="email"
                    sx={{ color: "black", fontFamily: "Philosopher" }}
                  >
                    email
                  </InputLabel>
                  <Input
                    component="div"
                    name="email"
                    placeholder=" email"
                    margin={"dense"}
                    required={true}
                    sx={{ boxShadow: "1px 1px 3px 1px white" }}
                  />
                </FormControl>
                <FormControl
                  size="medium"
                  variant="filled"
                  className={styles.formcontrol}
                >
                  <InputLabel
                    focused={false}
                    label="comment"
                    sx={{ color: "black", fontFamily: "Philosopher" }}
                  >
                    request
                  </InputLabel>
                  <TextareaAutosize
                    component="div"
                    aria-label="maximum height"
                    minRows={4}
                    margin={"dense"}
                    required={true}
                    style={{ boxShadow: "1px 1px 3px 1px white",width:320 }}
                />
                </FormControl>

                <Fab
                  color="primary"
                  size="medium"
                  variant="extended"
                  sx={{ margin: "1rem auto" }}
                >
                  <Typography component="h1" variant={"h6"}>
                    send
                  </Typography>
                </Fab>
              </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{padding:"1rem"}}>
            <Typography
                component="h1"
                variant="3"
                className={styles.familyFontStyle}
              >
                GET A HOLD OF US
              </Typography>
            <Typography component="h1" variant="h6" sx={{color:"black"}}>
              Our response is quick,, no worries
            </Typography>
            <Typography component="h1" variant="body1" sx={{color:"black"}}>
              We'll do our best to assist with your request.
            </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </CustMsg>
  );
};

export default SendMsg;
