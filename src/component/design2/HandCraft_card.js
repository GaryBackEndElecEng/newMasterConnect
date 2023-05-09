import {
  Typography,
  Fab,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
// import styled from "styled-components";
// import styles from "./design2.module.css";
import InfoIcon from '@mui/icons-material/Info';

const HandCraftCard = ({obj,getWidth}) => {
  return (
    <Card
      // elevation={3}
      sx={{ background: "tranparent",}}
    >
      <CardMedia
        component="img"
        src={obj.image}
        alt="www.masterconnect.ca"
        sx={{height:{xs:"350px",sm:"300px",md:"350px"}}}
      />
      <CardContent sx={{ display:"flex",textAlign: "center",justifyContent:"center",flexDirection:"column" }}>
        <Typography component="h1" variant="h5" sx={{color:"black",marginBottom:"0.5rem"}}>
          {obj.name}
        </Typography>
        <Fab color="secondary" size="small" variant="extended">
             <InfoIcon sx={{color:"white",mr:1}} />
             <Typography component="h1" variant="h6">
          details
        </Typography>
        </Fab>
      </CardContent>
    </Card>
  );
};

export default HandCraftCard;
