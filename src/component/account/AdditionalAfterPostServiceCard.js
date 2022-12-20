import React from 'react'
// import { GeneralContext } from '../../context/GeneralContextProvider';
// import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { Stack, Typography, Avatar, CardContent, Box,  } from '@mui/material';
import styles from './account.module.css';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


const AdditionalAfterPostServiceCard = ({ obj,target,staticImage }) => {
    const theme = useTheme();
    const logo = "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png";
   






    return (
        <Box >
            <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"center",margin:"1rem auto",padding:"0.5rem 1rem"}}>
                <Avatar src={`${staticImage}/${obj.image}`} alt="www.master-connect.ca" sx={{width:"75px",height:"75px"}}  />
                <Typography component="h1" variant="h5">{obj.name}</Typography>
            </Stack>
            <CardContent
                sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}
            >
                <Typography component='h1' variant="body1"
                    sx={{ margin: "1rem auto" }}
                >
                    <AttachMoneyIcon sx={{ ml: 1, color: "green" }} />  {obj.monthly}.<sup>00</sup>
                    <span style={{ margin: "auto 1rem", color: theme.palette.common.blueGrey }}>monthly</span>
                </Typography>
                <Typography component='h1' variant="body1"
                    sx={{ margin: "1rem auto" }}
                >
                    {(obj.desc).slice(0,75)}...
                </Typography>
                { target.loaded && target.id===obj.id && <Typography component='h1' variant="body1"
                 className={styles.afterPostSvcDesc}
                 sx={{color:"white"}}
                >
                    {obj.desc}
                </Typography>}
                {(target.loaded && target.id === obj.id) && <Box className={styles.afterPostSvcSummary}
                    sx={{ background: theme.palette.common.blueGrey }}
                >
                    <Typography component="h1" variant="body1" sx={{ color: "white" }}> {obj.summary} </Typography>
                </Box>}
            </CardContent>
            
        </Box>


    )
}

export default AdditionalAfterPostServiceCard