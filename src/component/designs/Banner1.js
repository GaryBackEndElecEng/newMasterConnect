import React from "react";
// import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design.module.css";
import { Typography, Grid, Stack } from "@mui/material";
import styled from "styled-components";
import Girl from "./Girl";
import Earth from "./Earth";
import StartNow from './StartNow';
const CustomBanner1 = styled.div`
  width: 100vw;
  position: relative;
  margin: 4.6rem auto;
  padding:0.5rem;
  // border:1px solid red;
  background: var(--background-44);

  position: relative;
`;

const Banner1 = () => {
  const paraLeftRef = React.useRef(null);
  const militaryRef = React.useRef();
  // const { staticImage } = React.useContext(GeneralContext);
  const max600="h5";

  React.useEffect(() => {
 
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);

  

 
  return (
    <CustomBanner1>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Stack direction="column" sx={{justifyContent:"center",alignItems:"stretch",position:"relative",width:"100%" }}
          ref={paraLeftRef}
          >
           
              <Girl />
              <StartNow/>
            

            <div className={styles.containerGirl_2} ref={militaryRef}>
              <Typography component="h1" variant={window.innerWidth < 600 ? "h4" :"h3" }>
                Backed by loyalty, through military experience
              </Typography>
            </div>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <Earth max600={max600} />
        </Grid>
      </Grid>
    </CustomBanner1>
  );
};

export default Banner1;
