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
import SelectPopUp from './SelectPopUp';

const CustCard = styled(Card)`
  margin: 1rem auto;
  display: flex;
  /* margin-top:5vh; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background:transparent;
  position:relative;
`;
const CustcardImage=styled(CardMedia)`
opacity:${({opacity})=>opacity};
transition:all 2s ease-in-out;

`;

const SelectCard = ({ obj,getWidth }) => {
    const picRef=React.useRef(null);
    const [select,setSelect]=React.useState(null);
    const [selected,setSelected]=React.useState(null);

    React.useEffect(()=>{
        const observer=new IntersectionObserver(entries=>{
            let entry=entries[0];
            setSelect(entry.isIntersecting);

        },{threshold:0.5});
        if(picRef.current){
        observer.observe(picRef.current);
        return ()=>observer.disconnect();
        }
    },[]);
    const handleShowCard900=()=>{
      if(!selected && getWidth <900){
      setSelected(true);
      }else{
        setSelected(false);
      }
      return 
    }
   

  return (
    <CustCard className={styles.customCard} onMouseOut={()=>setSelected(false)} onMouseOver={()=>setSelected(true)} onClick={()=>handleShowCard900()}>
      <CustcardImage
      
      opacity={select ? "1":"0"}
        component={"img"}
        src={obj.image}
        alt="www.masterconnect.ca"
        sx={{ height: { xs: "350px", sm: "550px", md: "350px" } }}
        ref={picRef}
         
      />
      <CardContent
        sx={{ background: "transparent" }}
        className={styles.flexColumnCenter}
      >
        <Typography component="h1" variant={"h5"} sx={{ margin: "1rem auto" }}>
          {obj.name}
        </Typography>
        <Typography
          component="h1"
          variant={"body1"}
          sx={{ margin: "1rem auto" }}
        >
          {obj.desc}
        </Typography>
        <Typography
          component="h1"
          variant={"body2"}
          sx={{ margin: "1rem auto" }}
        >
          {obj.price}
        </Typography>
        <Stack direction="column" spacing={3}>
            <Fab  size="small" variant="extended">
                <Typography component="h2" variant="body1" sx={{color:"white"}}>details</Typography>
            </Fab>
        </Stack>
        
      </CardContent>
      {selected && <SelectPopUp obj={obj}/>}
      
    </CustCard>
  );
};

export default SelectCard;
