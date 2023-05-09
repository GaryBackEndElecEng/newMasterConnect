import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { Typography, Stack, Fab, Box } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import ExpandIcon from "@mui/icons-material/Expand";
import SubWeDevDesign from "./SubWeDevDesign";
import SubWeDev from "./SubWeDev";
import SubWebDevGrow from "./SubWebDevGrow";

const WeDevelop = ({
  titleBlock,
  getTitleVariant1,
  getVariant1,
  positionImage,
  backgroundSizeImage,
}) => {
  const { staticImage } = React.useContext(GeneralContext);
  const scroll1Ref = React.useRef();
  const scroll2Ref = React.useRef();
  const lionest = `${staticImage}/lionest.png`;
  const monkey = `${staticImage}/monkey2.png`;
  const zebra3 = `${staticImage}/zebra/zebra3.png`;
  const [smallTitleBlock, setSmallTitleBlock] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);

  React.useEffect(() => {
    if (window.innerWidth < 400) {
      setSmallTitleBlock(-10);
    }
    if (window.innerWidth < 380) {
      setSmallTitleBlock(-20);
    }
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        entities.forEach((entity, index) => {
          if (entity.isIntersecting) {
            setShow(true);
          } else {
            setShow(false);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (scroll2Ref.current) {
      observer.observe(scroll1Ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        entities.forEach((entity, index) => {
          if (entity.isIntersecting) {
            setShow1(true);
          } else {
            setShow1(false);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (scroll2Ref.current) {
      observer.observe(scroll2Ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.zebra} style={{background:"var(--background-111)"}}>
      <SubWeDevDesign monkey={monkey} getTitleVariant1={getTitleVariant1} />

      <div className={styles.bannerWhite} ref={scroll1Ref}>
        <div className={show ? styles.scrollGroupOn : styles.scrollGroupOff}>
          <div>
            <Typography
              component="h1"
              variant={getVariant1}
              className={styles.write}
              style={{ color: "white" }}
            >
              Front-end Design
            </Typography>
          </div>
          <div>
            <Typography
              component="h1"
              variant={getVariant1}
              className={styles.write}
              style={{ color: "white" }}
            >
              Back-end Design
            </Typography>
          </div>
        </div>
      </div>

      <SubWeDev lionest={lionest} getTitleVariant1={getTitleVariant1} />
      <div className={styles.bannerWhite} ref={scroll2Ref}>
        <div className={show1 ? styles.scrollGroupOn : styles.scrollGroupOff}>
          <div>
            <Typography
              component="h1"
              variant={getVariant1}
              style={{
                fontFamily: "'Philosopher', sans-serif",
                color: "white",
              }}
            >
              User Accounts
            </Typography>
          </div>
          <div>
            <Typography
              component="h1"
              variant={getVariant1}
              style={{
                fontFamily: "'Philosopher', sans-serif",
                color: "white",
              }}
            >
              Financial transactions
            </Typography>
          </div>
        </div>
      </div>
     
      <SubWebDevGrow zebra3={zebra3} getTitleVariant1={getTitleVariant1} />
      
    </section>
  );
};

export default WeDevelop;
