import React from "react";
import styles from "./navbar.module.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Typography, Stack, CardMedia, Card } from "@mui/material";
import { Link } from "react-router-dom";
import {GeneralContext} from '../../context/GeneralContextProvider';

const Copywright = () => {
  const {staticImage}=React.useContext(GeneralContext);
  // const url = "http://localhost:3000/image";
  const logo = `${staticImage}/logo.png`;
  const JWT = `${staticImage}/logo/JWT.png`;
  const [smallFontSize, setSmallFontSize] = React.useState(null);
  const [typo, setTypo] = React.useState(null);
  React.useEffect(() => {
    if (window.innerWidth < 600) {
      setSmallFontSize("130%");
      setTypo("h6");
    } else {
      setSmallFontSize("200%");
      setTypo("h4");
    }
  }, []);
  return (
    <div className={styles.copywriteContainer} >
      <div className={styles.main}>
        <Stack direction={{ sm: "row", xs: "column",position:"relative" }} spacing={3}>
          <Link to="/" style={{cursor:"pointer"}}>
          <Stack direction={"row"} spacing={2} className={styles.logo}>
            
              <CardMedia
                component="img"
                src={logo}
                alt="www.masterconnect.ca"
                sx={{boxShadow:"1px 1px 5px 1px white",borderRadius:"50%"}}
              />
            
            <Typography component="h1" variant="h6">masterconnect</Typography>
          </Stack>
          </Link>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <CopyrightIcon sx={{ fontSize: smallFontSize }} />

            <Typography
              component="h1"
              variant="body1"
              sx={{ fontFamily: "Philosopher", color: "black", margin: "auto" }}
            >
              Digital Master Connect all wrights reserve
            </Typography>
            <Typography
              component="h1"
              variant={typo}
              sx={{
                fontFamily: "Philosopher",
                color: "black",
                margin: "auto",
              }}
            >
              <span>---</span> 2023
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} className={styles.privacyPolicy}>
            <Link to='/privacy'>
              <Typography component="h1" variant="h6" sx={{fontfamily:"Philosopher"}}>
                privacy policy
              </Typography>
            </Link>
            <Link to='/contact'>
              <Typography component="h1" variant="h6" sx={{fontfamily:"Philosopher"}}>
                Contact US
              </Typography>
            </Link>
          </Stack>
          <Stack direction="row" sx={{justifyContent:"flex-start",alignItems:"center"}} className={styles.jwt}>
            <CardMedia component="img" src={JWT} alt="www.masterconnec.ca" />
            <Typography component="h1" variant="h6">protected by JWT</Typography>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default Copywright;
