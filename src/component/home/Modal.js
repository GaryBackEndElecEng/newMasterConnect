import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import styled from "styled-components";
import { GeneralContext } from "../../context/GeneralContextProvider";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fab,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";

const CustModal = styled(Stack)`
  margin: 0.5rem;
  position: absolute;
  top: -10%;
  left: 50%;
  justify-content: center;
  align-items: center;
  background: var(--background-design);
  box-shadow: 1px 1px 10px 1px white;
  width: 720px;
  min-height: 400px;
  z-index:2000;  
  animation: helpGrowIn 1.0s ease-in;
  @keyframes helpGrowIn {
    from {opacity:0; transform:scale(0);}
    to {opacity:1; transform:scale(1);}
  }

  @media screen and (max-width: 900px) {
    width: 100vw;
    top: -35%;
    left: 0%;
    height: 600px;
  }
  @media screen and (max-width: 600px) {
    top: 30%;
    width:100vw;
  }
`;

const Modal = () => {
  const navigate = useNavigate();

  const handleContact = (e) => {
    e.preventDefault();
    navigate("/contact");
  };
  const handleService = (e) => {
    e.preventDefault(e);
    navigate("/services");
  };
  return (
    <CustModal direction="column">
      <div className={styles.modal}>
        <div className={styles.innerModal}>
          <Typography component="h1" variant="h5">
            Would you like to send us a request?
          </Typography>
          <Fab
            variant="extended"
            color="secondary"
            size="medium"
            style={{margin:"1rem"}}
            onClick={(e) => handleContact(e)}
          >
            send a request
          </Fab>
        </div>
        <div className={styles.innerModal}>
          <Typography component="h1" variant="h5">
            What We offer
          </Typography>
          <Fab
            variant="extended"
            color="primary"
            size="medium"
            style={{margin:"1rem"}}
            onClick={(e) => handleService(e)}
          >
            We Offer
          </Fab>
        </div>
      </div>
    </CustModal>
  );
};

export default Modal;
