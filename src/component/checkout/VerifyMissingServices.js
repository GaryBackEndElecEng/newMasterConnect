import React, { useContext, useState, useEffect } from 'react'
import apiProtect from '../axios/apiProtect';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { Stack, Grid, Typography } from '@mui/material';

const VerifyMissingServices = () => {
    const { user_id, loggedIn } = useContext(TokenAccessContext);
    const [missing, setMissing] = useState({ loaded: false, data: [] });
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
    const [showMsg,setShowMsg]=useState(false);
    const display= showMsg ? "flex":"none";

    useEffect(() => {
        const verifyMissingServices = async (user_id) => {
            try {
                const res = await apiProtect.post('account/MissedProdServs/', { "user_id": user_id });
                const missingArray = res.data.data;
                setMissing({ loaded: true, data: missingArray })
                if(missingArray.length > 0){
                    setShowMsg(true);
                }
            } catch (error) {
                console.error(error.message)
            }
        }
        if (loggedIn) {
            verifyMissingServices(getUser_id)
        }
    }, [loggedIn, getUser_id]);

    return (
        <Stack direction="column"
        sx={{justifyContent:"center",alignItems:"center",
    position:"absolute",top:"70%",left:"auto", width:"100%",
    display:display,
    }}
        >
            <Typography component="h1" variant="h3" sx={{textAlign:"center",textDecoration:"underline"}}>FYI:missing services found</Typography>
            <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{margin:"1rem auto",color:"white"}}>
                {missing.loaded && missing.data.map((obj, index) => (
                    <Grid item xs={12} sm={6}  key={`${obj}-missing-${index}`}>
                        <Typography component="h1" variant="h5" sx={{textAlign:"center",textDecoration:"underline"}}>missing item</Typography>
                        <Typography component="h1" variant="h6" sx={{textAlign:"center"}}> {obj}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}

export default VerifyMissingServices