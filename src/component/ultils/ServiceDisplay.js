import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {GeneralContext} from '../../context/GeneralContextProvider';
import RemoveIcon from "@mui/icons-material/Remove";
import { Stack, Box, Typography, IconButton, Container } from "@mui/material";
import styles from "./ultis.module.css";

const ServiceDisplay = ({arr}) => {
    const {staticImage2,setIsServiceClicked}=React.useContext(GeneralContext);
    const [open, setOpen] = React.useState({loaded:false,id:null});
    const [fontSizeOn,setFontSizeOn] = React.useState({loaded:false,font:null});
    const sizeFont = "150%";

    const handleOnClickOpen = (e) => {
        // e.preventDefault();
        setIsServiceClicked(true);
          let thisId=document.getElementById(e.currentTarget.id).id;
          switch(thisId){
            case "strategy":
              setOpen({loaded:true,id:thisId});
              setFontSizeOn({loaded:true,font:sizeFont});
              return;
            case "technology":
              setOpen({loaded:true,id:thisId});
              setFontSizeOn({loaded:true,font:sizeFont});
              return;
            case "design":
              setOpen({loaded:true,id:thisId});
              setFontSizeOn({loaded:true,font:sizeFont});
              return;
            default:
              setOpen({loaded:false,id:null});
              setFontSizeOn({loaded:false,font:null});
              setIsServiceClicked(false);
              return;
          }
      
    };
    const handleOnClickClose = (e) => {
        setOpen({ loaded: false, id: null });
        setFontSizeOn({ loaded: false, font: null });
        setIsServiceClicked(false);
      };

  return (
    <div>
        {arr.length>0 && arr.map((obj,index)=>(
            <div key={`${obj.id}-${obj.name}--${index}`}>
        {!(open.loaded && open.id === obj.name) ? (
          <Stack
            direction={"row"}
            onClick={(e) => handleOnClickOpen(e)}
            id={obj.name}
            className={
              !fontSizeOn.loaded ? styles.handleClickOff : styles.handleClickOn
            }
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid white",
              cursor: "pointer",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              style={{
                color: "lightgrey",
                fontSize: sizeFont,
                transition: "fontSize 1s ease-in-out",
              }}
            >
              {obj.name}
            </Typography>
            <IconButton>
              <AddIcon sx={{ marginLeft: "3rem", color: "white" }} />
            </IconButton>
          </Stack>
        ) : (
          <Box>
            <Stack
              direction="row"
              onClick={(e) => handleOnClickClose(e)}
              className={styles.handleClickOn}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid white",
                cursor: "pointer",
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                sx={{ color: "white", transition: "fontSize 1s ease-in-out" }}
              >
                {obj.name}
              </Typography>
              <IconButton>
                <RemoveIcon sx={{ marginLeft: "3rem", color: "white" }} />
              </IconButton>
            </Stack>
            <Box className={styles.serviceBoxEffect}>
              <Typography component="h1" variant="h5" sx={{ color: "white" }}>
                {obj.whatWeDo.name}
              </Typography>
              <Typography component="h1" variant="h6" sx={{ color: "white" }}>
                {obj.whatWeDo.desc}
              </Typography>
              <ul className={styles.serviceLiEffect}>
                {obj.whatWeDo.services &&
                obj.whatWeDo.services.map((service,index2)=>(
                    <Typography
                        key={`service--${service.name}-${index2}`}
                        component="li"
                        className={styles.list}
                        variant="h6"
                        sx={{ color: "white" }}
                    >
                  <span>{service.name}</span>
                    </Typography>
                ))
                
                }
              </ul>
              <Box className={styles.result}>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: "white" }}
                >
                  RESULT
                </Typography>
                <Typography
                  component="h1"
                  variant="h6"
                  style={{ color: "white" }}
                >
                  {obj.result}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </div>
            
            ))}
      </div>
  )
}

export default ServiceDisplay