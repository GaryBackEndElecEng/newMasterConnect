import React from "react";
import { Stack, Typography, Grid, Container } from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styled from "styled-components";
import styles from "./design2.module.css";
import HandCraftCard from "./HandCraft_card";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const MainHandCrafted = styled.div.attrs({ className: styles.mainHandCrafted })`
  margin: auto;
  min-height: 50vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-image: url(${({ bgimage }) => bgimage});
  background-position: 0% 50%;
  background-size: 100% 50%;
  @media screen and (max-width: 900px) {
    background-size: 100% 25%;
  }
  @media screen and (max-width: 600px) {
    background-size: 100% 50%;
  }
`;

const HandCrafted = ({ getWidth }) => {
  const { staticImage } = React.useContext(GeneralContext);
  const [handCrafts, setHandCrafts] = React.useState({
    loaded: false,
    data: [],
  });
  const panel = `${staticImage}/design2/panel.png`;
  const handCraft1 = `${staticImage}/design2/handcraft1.png`;
  const handCraft2 = `${staticImage}/design2/handcraft2.png`;
  const handCraft3 = `${staticImage}/design2/handcraft3.png`;
  const handCraft4 = `${staticImage}/design2/handcraft4.png`;

  React.useEffect(() => {
    const arr = [
      { id: 1, name: "Natural-1", image: handCraft1 },
      { id: 2, name: "Natural-2", image: handCraft2 },
      { id: 3, name: "Natural-3", image: handCraft3 },
      { id: 4, name: "Natural-4", image: handCraft4 },
    ];
    setHandCrafts({ loaded: true, data: arr });
  }, []);
  return (
    <MainHandCrafted bgimage={panel}>
      <Container maxWidth="xl">
        <div className={styles.craftedInnerMain}>
          <Typography
            component="h1"
            variant="h3"
            sx={{ margin: "auto", marginBottom: "3rem" }}
          >
            We Hand-Select the Strongest and healthiest variaty of Flowers
          </Typography>
          <Grid container spacing={2} sx={{ width: `100%` }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              className={styles.handCraftGridChild}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
                className={styles.handCraftScrollParent}
              >
                {handCrafts.loaded ? (
                  handCrafts.data.map((obj, index) => (
                    <div
                      key={`${obj.id}--handCraft--${index}`}
                      className={styles.handCraftScrollChild}
                    >
                      <HandCraftCard obj={obj} getWidth={getWidth} />
                    </div>
                  ))
                ) : (
                  <div>
                    <h5>loading...</h5>
                  </div>
                )}
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              className={styles.handCraftGridChild}
              sx={{ alignSelf: "start", padding: "5rem" }}
            >
              <Stack direction="column" spacing={2} sx={{ margin: "0 auto" }}>
                <Typography component="h1" variant="h5">
                  ... and refused the rest
                </Typography>
                <ul style={{ color: "white" }}>
                  <Typography component="h1" variant="h6">
                    Contaminents that:
                  </Typography>
                  <Typography component="li" variant="body1">
                    <ReportProblemIcon sx={{ mr: 1, color: "red" }} /> leach
                    toxins into the soil
                  </Typography>
                  <Typography component="li" variant="body1">
                    <ReportProblemIcon sx={{ mr: 1, color: "red" }} /> leach
                    toxins into the air
                  </Typography>
                  <Typography component="li" variant="body1">
                    <DangerousIcon sx={{ mr: 1, color: "red" }} /> dangerous
                    toxins for the health
                  </Typography>
                </ul>
                <Typography component="h1" variant="h4"> We Cutomize your site to help pull Clientele</Typography>
              </Stack>
            </Grid>
          </Grid>
        </div>
      </Container>
    </MainHandCrafted>
  );
};

export default HandCrafted;
