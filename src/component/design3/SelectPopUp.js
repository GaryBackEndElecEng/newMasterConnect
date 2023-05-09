import React from "react";
import styles from "./design3.module.css";
import styled from "styled-components";
import {
  Button,
  Card,
  
  Typography,
} from "@mui/material";
const SelectCard=styled(Card)`
opacity:1;
position:absolute;
top:0%;left:0%;
width:100%;
height:50%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
box-shadow:1px 1px 15px 1px black;
z-index:200;
animation: growIn 1s ease-in;
@keyframes growIn {
    from { opacity:0; transform:scale(0.5);}
    to { opacity:1; transform:scale(1);}
}

`;
const CustTypo=styled(Typography)`
animation: slideIn 1.5s ease-in-out;
@keyframes slideIn {
    from { opacity:0;transform:translateX(-100%);}
    to { opacity:1;transform:translateX(0%);}
}
`;

const SelectPopUp = ({obj}) => {
    const cardStyle={margin:"auto",width:"100%",height:"30%",display:"flex",justifyContent:"center",aligItems:"center",flexDirection:"column"}
  return (
    <SelectCard elevation={3} sx={{background:"rgba(255,255,255,0.5)"}} >
        <div >
          <Typography component="h1" variant="h3" sx={{margin:"1rem auto"}}>{obj.name}</Typography>
          <CustTypo component="h1" variant="h5" sx={{margin:"1rem auto"}}> from {obj.price}</CustTypo>

        </div>
        <Button sx={{width:"50%",background:"black",borderRadius:"20% 0% 20% 0%"}}>Custmize</Button>
      </SelectCard>
  )
}

export default SelectPopUp