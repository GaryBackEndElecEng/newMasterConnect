import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Stack, Typography, Fab, Container, Grid, Box } from "@mui/material";
import styles from "./services.module.css";

const CustStartProj = styled.div`
  margin:1rem 0;
  margin-top:2rem;
  padding:auto 1rem;
  opacity: ${({ startopen }) => (startopen ? "1" : "0")};
  min-height: 55vh;
  background-image: url(${({ bgimage }) => bgimage});
  background-size: 100% 100%;
  background-position: 50% 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  column-gap:2rem;
  animation: ${({ startopen }) => (startopen ? "startSlideUp" : "")} 3.5s
    ease-in-out;
  @keyframes startSlideUp {
    from {
      opacity: 0;
      background-size: 200% 200%;
      background-position: 0% 0%;
      transform: translateY(40%);
    }
    to {
      opacity: 1;
      background-size: 100% 100%;
      background-position: 50% 50%;
      transform: translateY(0%);
    }
  }
  @media screen and (maxWidth:900px){
    flex-direction:column;
    width:100vw;
    background-size: 200% 200%;
    background-position: 0% 50%;
    @keyframes startSlideUp {
        from {
          opacity: 0;
          background-size: 200% 200%;
          background-position: 0% 0%;
          transform: translateY(40%);
        }
        to {
          opacity: 1;
          background-size: 200% 100%;
          background-position: 0% 50%;
          transform: translateY(0%);
        }
      }
  }
  @media screen and (maxWidth:600px){
    flex-direction:column;
    width:100vw;
    background-size: 200% 200%;
    background-position: 0% 50%;
  }
`;

const StarProjContact = ({ getWidth }) => {
  const startRef = React.useRef();
  const navigate=useNavigate();
  const { staticImage } = React.useContext(GeneralContext);
  const turtle = `${staticImage}/water/turtle.png`;
  const greenEffect = `${staticImage}/extra/greenEffect.png`;
  const [startOpen, setStartOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let entry = entries[0];
        if (entry.isIntersecting) {
          setStartOpen(true);
        }
      },
      { threshold: 0.8 }
    );
    if (startRef.current) {
      observer.observe(startRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const handleContact = ()=>{
    navigate("/contact")
  }
  const handleStartProject = ()=>{
    navigate("/start-project")
  }

  return (
    <CustStartProj
      bgimage={turtle}
      startopen={startOpen}
      className={styles.custStartProj}
      
    >
      <div className={styles.custStartInner}>
        <p
        ref={startRef}
          className={styles.startProjTitle}
          style={{ backgroundImage: `url(${greenEffect})`,backgroundSize:"200% 200%"}}
        >
          Start a project
        </p>
        <Fab variant="extended" color="secondary" size="large" onClick={(e)=>handleStartProject(e)}>
            start a request
        </Fab>
      </div>
      <div  className={styles.custStartInner}>
        <p
          className={styles.startProjTitle}
          style={{ backgroundImage: `url(${greenEffect})` }}
        >
          Contact Us
        </p>
        <Fab variant="extended" color="info" size="large" onClick={(e)=>handleContact(e)}>
            contact us
        </Fab>
      </div>
    </CustStartProj>
  );
};

export default StarProjContact;
