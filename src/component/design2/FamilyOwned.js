import React from "react";
import {
  Typography,
  Fab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import {Link} from 'react-router-dom';
import { GeneralContext } from "../../context/GeneralContextProvider";
import styled from "styled-components";
import styles from "./design2.module.css";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

const CustFamily = styled.div.attrs({ className: styles.custFamily })`
  margin: auto;
  padding: 5vh 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--background-hopefulHarvest-family);
  min-height: 50vh;
`;

const FamilyOwned = ({ getWidth }) => {
  const { staticImage } = React.useContext(GeneralContext);
  const familyPic = `${staticImage}/design2/familyPic.png`;
  return (
    <CustFamily>
      <Container maxWidth="xl" sx={{ margin: "1rem auto" }}>
        <Grid container spacing={{md:6,sm:2,xs:4}}>
          <Grid item xs={12}  md={6} >
            <div>
              <Card
                // elevation={3}
                sx={{ background: "var(--background-hopefulHarvest-familyTypo)", }}
                className={styles.familyCard}
              >
                <CardMedia
                  component="img"
                  src={familyPic}
                  alt="www.masterconnect.ca"
                  sx={{ maxHeight: { xs: "350px", sm: "400px", md: "350px" },background:" var(--background-hopefulHarvest-family)",filter:"saturate(1.5)" }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    background:"white",
                    border:"1px solid white",
                  }}
                >
                  <Typography
                    component="h1"
                    variant={getWidth < 900 ? "h4":"h3"}
                    sx={{  marginBottom: "0.5rem",color:"white" }}
                  >
                    Canadians at Heart
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Typography
                component="h1"
                variant="h2"
                className={styles.familyFontStyle}
              >
                FAMILY OWNED
              </Typography>
              <Typography
                component="h1"
                variant="h2"
                className={styles.familyFontStyle}
              >
                SINCE 2019
              </Typography>
            </div>
            <div style={{ marginRight: "10px",color:"black" }}>
              <Typography component="h1" variant="body1" sx={{color:"black" }}>
                Founders, Anne and Bill are proud farmers. from limited selection
                of naturally grown food and flowers, they created Honest Harvest
                in 2019 in Kingston Ontario, to provide a better country choice
                of produce and flowers for Canadians abroad.
              </Typography>
              <Typography
                component="h1"
                variant="body1"
                sx={{ margin: "1rem",color:"black" }}
              >
                " Today, our goal is to provide Canadians with a healthy choice
                in Vegetables, Fruits and Flowers with a natural and
                trusted-source of Natural, Hand-Picked Food and Flowers for
                years to come."
              </Typography>
              <Typography component="h1" variant="body1" sx={{color:"black" }}>
                Our Family
              </Typography>
              <Typography component="h1" variant="h6" className={styles.familyFontStyle}>
                spend a visit with a Canadian Welcome... <span style={{fontSize:"120%",color:"black"}}>yeh!.</span>
              </Typography>
              <Typography component="h1" variant="h6" sx={{padding:"15px",color:"black"}}>
                address: address, kingston, Ontario,
              </Typography>
              <Typography component="h1" variant="h6" sx={{padding:"15px",color:"red"}}>
                Clients can't find you? - Contact Us for improved Search Optimization!-<Link to="/contact">CONTACT</Link>
              </Typography>
              <Typography component="h1" variant="h5"sx={{color:"black"}}>
                Call Us!
              </Typography>
              <Fab  size="small" variant="extended" sx={{margin:"1rem",marginLeft:"2rem"}}>
                  <PermPhoneMsgIcon sx={{fontSize:"170%",color:"maroon"}}/>
              </Fab>
            </div>
          </Grid>
        </Grid>
      </Container>
    </CustFamily>
  );
};

export default FamilyOwned;
