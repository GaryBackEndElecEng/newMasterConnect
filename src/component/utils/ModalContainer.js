import React, { useContext, useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { Stack, Fab } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import Modal from '../utils/Modal';
import Shop2Icon from '@mui/icons-material/Shop2';
import CloseIcon from '@mui/icons-material/Close';
import styles from './utils.module.css';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
// import Signin from '../signin/Signin';

const ModalContainer = () => {
  const location=useLocation();
  const pathname=location.pathname;
  const { setShowRegistration,setOpenSignin}=useContext(GeneralContext);
  const [openModal, setOpenModal] = useState();
  const [removeSignINBtn, setRemoveSignINBtn] = useState();
  const toOpen = openModal ? "18%" : "0%";

useEffect(()=>{
  setOpenSignin(false);
  setRemoveSignINBtn(false);
},[setOpenSignin]);

  const handleSignin = (e)=>{
    e.preventDefault();
    setShowRegistration(false);
    setOpenSignin(true);
    setRemoveSignINBtn(true);
    localStorage.setItem("page",location.pathname)
  }
  const closeHandle=(e)=>{
    e.preventDefault();
    setOpenSignin(false)
    setOpenModal(false)
    setShowRegistration(false);
    setRemoveSignINBtn(false);
    localStorage.removeItem("page")
  }
  const handleOpenModel=(e)=>{
    e.preventDefault();
    setOpenModal(true);
    localStorage.setItem("extra_kwargs",pathname);
    
  }

  return (
    <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center", position: "relative", margin: " 2rem -10px", }}>
      {!openModal &&
        <Fab variant="extended" color="primary" onClick={(e) => handleOpenModel(e)}
          className={styles.openModalOpen}
          sx={{ position: "relative", top: toOpen, animation: `${styles.moveCloseBtn} 2s ease-in` }}
        >
          purchase
          <Shop2Icon sx={{ ml: 2 }} color="success" />
        </Fab>
      }
      {openModal &&
        <Stack direction="row">
           <Fab variant="extended" color="warning" onClick={(e) => closeHandle(e)}
            className={styles.openModalClose}
            sx={{ position: "absolute", top: {sm:toOpen,xs:"20%"}, animation: `${styles.moveOpenBtn} 2s ease-in`,left:{lg:"55%",sm:"60%"}}}
          >
            close
            <CloseIcon sx={{ ml: 2 }} color="success" />
          </Fab>
          
          {!removeSignINBtn &&
            <Fab variant="extended" color="success" onClick={(e) => handleSignin(e)}
                className={styles.openModalClose}
                sx={{ position: "absolute", top: {sm:toOpen,xs:"20%"},left:{lg:"30%",md:"40%",sm:"25%",xs:"15%"}, animation: `${styles.moveOpenBtn} 2s ease-in` }}
              >
                signin
                <VpnKeyIcon sx={{ ml: 2 }} color="shite" />
              </Fab>
            }
          
        </Stack>
      }
      {openModal && <Modal />}



    </Stack>
  )
}

export default ModalContainer