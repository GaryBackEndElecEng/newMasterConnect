import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design.module.css";
import { Container, Typography, Grid } from "@mui/material";
import styled from "styled-components";

const CustomBannerTop = styled.div`
  margin: 1rem auto;
  margin-top: 5vh;
  min-height: 30vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity:1;
  animation: sweepIn 2s ease-in-out;
  @keyframes sweepIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;
const CustomBtGrid = styled(Grid)`
  margin: 4.5rem auto;
  justify-content: flex-start;
  align-items: flex-start;
`;

const BannerTop = () => {
  const { staticImage, } = React.useContext(GeneralContext);
  const happy2 = `${staticImage}/happy/happy2.png`;
  return (
    <CustomBannerTop>
      <Container maxWidth="xl" sx={{ marginTop: "1vh" }}>
        <CustomBtGrid
          container
          spacing={{ xs: 2, sm: 1, md: 6 }}
          className={styles.btContainer}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              component="h1"
              variant="h2"
              className={styles.fontStyle}
            >
              FEATURED PROJECTS
            </Typography>
            <div className={styles.bannerTopFollow}>
              <Typography
                component="h1"
                variant="h3"
                sx={{ margin: "1rem auto" }}
                className={styles.fontStyle1}
              >
                GET INSPIRED BY OUR WORK
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                sx={{ margin: "1rem auto" }}
                className={styles.fontStyle1}
              >
                OVER 14 DESIGNS
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid
              container
              spacing={{ xs: 0, sm: 2, md: 3 }}
              className={styles.subMainGrid}
            >
              <Grid item xs={12} sx={{ borderLeft: "1px solid white" }}>
                <Typography component="h1" variant="h5">
                  From hot coffee and sneakers to healthcare and spaceships, we
                  will get it done to your liking.All that is needed is to get
                  in contact with us. We're here for you.
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ margin: "1rem auto" }}
                >
                  Masterconnect - connecting is what we do.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{ backgroundImage: `url(${happy2})` }}
                className={styles.gridChildImg}
              ></Grid>
            </Grid>
          </Grid>
        </CustomBtGrid>
      </Container>
    </CustomBannerTop>
  );
};

export default BannerTop;
