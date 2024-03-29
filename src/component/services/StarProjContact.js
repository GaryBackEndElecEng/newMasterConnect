import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {  Fab, } from "@mui/material";
import styles from "./services.module.css";

const CustStartProj = styled.div`
  margin:1rem auto;
  margin-top:2rem;
  padding:auto;
  opacity: ${({ opacity }) =>opacity};
  min-height: 65vh;
  width:100%;
  background-image: url(${({ bgimage }) => bgimage});
  background-size: 100% 100%;
  background-position: 50% 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  transform:translateY(${({translatey})=>translatey});
  // column-gap:2rem;
  animation: ${({ animation }) =>animation};
  @keyframes startSlideUp {
    from {
      opacity: 0;
      background-size: 200% 200%;
      background-position: 0% 0%;
      transform: translateY(20%);
    }
    to {
      opacity: 1;
      background-size: 100% 100%;
      background-position: 50% 50%;
      transform: translateY(0%);
    }
  }
  @keyframes closeThis {
    from {opacity:1;}
    to {opacity:0;}
  }
  @media screen and (max-width:900px){
    flex-direction:column;
    column-gap:0;
    background-size: 200% 200%;
    background-position: 90% 90%;
    @keyframes startSlideUp {
        from {
          opacity: 0;
          background-size: 200% 200%;
          background-position: 0% 0%;
          transform: translateY(20%);
        }
        to {
          opacity: 1;
          background-size: 200% 200%;
          background-position: 90% 90%;
          transform: translateY(0%);
        }
      }
  }
  @media screen and (max-width:600px){
    background-size: 350% 200%;
    background-position: 65% 80%;
    @keyframes startSlideUp {
      from {
        opacity: 0;
        background-size: 350% 200%;
        background-position: 0% 0%;
        transform: translateY(20%);
      }
      to {
        opacity: 1;
        background-size: 350% 200%;
        background-position: 65% 80%;
        transform: translateY(0%);
      }
    }
  }
`;

const StarProjContact = ({ getWidth }) => {
  const startRef = React.useRef();
  const navigate=useNavigate();
  const { staticImage } = React.useContext(GeneralContext);
  const turtle = `${staticImage}/water/turtle.png`;
  const greenEffect = `${staticImage}/extra/greenEffect.png`;
  const [startOpen1, setStartOpen1] = React.useState(null);
  const threshold= window.innerWidth < 900 ? 0.2:0.5;
  

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let entry = entries[0];
        setStartOpen1(entry.isIntersecting);
        if (entry.isIntersecting) {
            //do
        }
      },
      { threshold: threshold }
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
      opacity={startOpen1 ? "1":"0"}
      animation={startOpen1 ? "startSlideUp 3.5s ease-in-out": "closeThis 1.5s ease-in-out"}
      className={styles.custStartProj}
      translatey={startOpen1 ? "0%": "20%"}
      
    >
      <div className={styles.custStartInner}
      ref={startRef}
      >
        <p
        
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
