import React from 'react'
import {  Stack, Paper, Typography,} from '@mui/material';
// import styled from 'styled-components';
import {useTheme} from '@mui/material/styles';


const Particulars = ({userAccount}) => {
const theme=useTheme();
    
    return (
        <Paper elevation={10} sx={{padding:"0.5rem"}}>
        <Stack direction="column" sx={{color:theme.palette.common.blueGrey}}>
            <Typography component="h1" variant="body2"
                sx={{
                    textAlign: "center", margin: "auto",
                }}>
                <span style={{fontWeight:"bold"}}>Fullname: </span>{userAccount.loaded && userAccount.data.name}
            </Typography>
            <Typography component="h1" variant="body2"
                sx={{
                    textAlign: "center", margin: "auto",
                }}>
                <span style={{fontWeight:"bold"}}>email:</span>{userAccount.loaded && userAccount.data.email}
            </Typography>
            <Typography component="h1" variant="body2"
                sx={{
                    textAlign: "center", margin: "auto",
                }}>
                <span style={{fontWeight:"bold"}}>add:</span>{userAccount.loaded && userAccount.data.address}
            </Typography>
            <Typography component="h1" variant="body2"
                sx={{
                    textAlign: "center", margin: "auto",
                }}>
                <span style={{fontWeight:"bold"}}>city:</span>{userAccount.loaded && userAccount.data.city}
            </Typography>
            <Typography component="h1" variant="body2"
                sx={{
                    textAlign: "center", margin: "auto",
                }}>
                <span style={{fontWeight:"bold"}}>phone:</span>{userAccount.loaded && userAccount.data.cell}
            </Typography>
        </Stack>
        </Paper>
    )
}

export default Particulars