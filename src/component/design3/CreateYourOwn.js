import React from "react";
import styles from "./design3.module.css";
import styled from "styled-components";
import { GeneralContext } from "../../context/GeneralContextProvider";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CustCreateOwn = styled.div`
  margin: 0 auto;
  opacity: ${({ createOpen }) => (createOpen ? "1" : "0")};
  min-height: 65vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-image: url(${({ bgimage }) => bgimage});
  background-position: 50% 50%;
  background-size: 100% 100%;
  // position:relative;
  animation: ${({createOpen})=>createOpen ? "rollIn":""} 2s ease-in-out;
  @keyframes rollIn {
    from {
      opacity: 0;
      transform: translateY(60%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @media screen and (max-width:900px){
    background-size: 100% 100%;
    margin:0;
    min-height:0vh;
    height:auto;
  }
  @media screen and (max-width:600px){
    background-size: 200% 50%;
  }
`;


const CreateYourOwn = ({ getWidth }) => {
  const createRef = React.useRef(null);
  const { staticImage } = React.useContext(GeneralContext);
  const diamonBack = `${staticImage}/design3/diamonBack.png`;
  const [createOpen, setCreateOpen] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let entry = entries[0];
        if (entry.isIntersecting) {
          setCreateOpen(true);
        }
      },
      { threshold: 0.5 }
    );
    if (createRef.current) {
      observer.observe(createRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <CustCreateOwn
      bgimage={diamonBack}
      createOpen={createOpen}
      className={styles.custCreateMain}
      ref={createRef}
    >
      <Typography component="h1" variant={getWidth<900 ? (getWidth <600 ? "h4" :"h2"):"h1"} sx={{ margin: "2rem auto" }}>
        Invent With Creativity
      </Typography>
      <div className={styles.innerBox}>
        <Stack direction="row" spacing={3} className={styles.createSteps}>
          <div className={styles.stepBox}>
            <p className={styles.number}>1</p>
            <Typography
              component="h1"
              variant="h5"
              sx={{ margin: "2rem auto" }}
            >
              <span className={styles.steps}>step 1. </span>Describe your creation from the heart
              <TrendingFlatIcon className={styles.arrow1}/>
            </Typography>
          </div>
          <div className={styles.stepBox}>
          <p className={styles.number}>2</p>
            <Typography
              component="h1"
              variant="h5"
              sx={{ margin: "2rem auto" }}
            >
              <span className={styles.steps}> step 2. </span> let us create your envision from air
              <TrendingFlatIcon className={styles.arrow2}/>
            </Typography>
          </div>
          <div className={styles.stepBox}>
          <p className={styles.number}>3</p>
            <Typography
              component="h1"
              variant="h5"
              sx={{ margin: "2rem auto" }}
            >
              <span className={styles.steps}> step 3. </span> let us show you your envisioned creation for
              adjustments.
              <TrendingFlatIcon className={styles.arrow3}/>
            </Typography>
          </div>
          <div className={styles.stepBox}>
          <p className={styles.number}>4</p>
            <Typography
              component="h1"
              variant="h5"
              sx={{ margin: "2rem auto", marginBottom: "1rem" }}
            >
              <span className={styles.steps}> step 4. </span> Finally, show her your love appreciation,
              from your heart.
              <FavoriteIcon className={styles.arrow4}/>
            </Typography>
          </div>
        </Stack>
      </div>
      <Stack direction="column" sx={{alignItems:"center",margin:"2rem auto"}} spacing={2}>
        <Fab color="secondary" size="large" variant="extended"> Book an appointment</Fab>
      </Stack>
    </CustCreateOwn>
  );
};

export default CreateYourOwn;
