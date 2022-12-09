import React, { useContext, useState } from 'react'
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Container, Paper, Typography, Fab, Grid, } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SitePreferenceForm from './SitePreferenceForm';
import PsychologyIcon from '@mui/icons-material/Psychology';


const ShowInfo = () => {
    const theme = useTheme();
    const windowTheme=useTheme("windowTheme");
    const { setFormComplete, sentToServer, sitePreference } = useContext(TokenAccessContext);
    const [openSitePreferenceForm, setOpenSitePreferenceForm] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setFormComplete(false);
        localStorage.setItem("formComplete", false)
    }

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative" }}>
            <Stack direction="column"
                sx={{ margin: "1rem auto", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Roboto", width: "calc(100%-50px)" }}>
                <Paper elevation={10} sx={{ background: theme.palette.common.background2, margin: "1rem auto", color: "white", padding: "1rem" }}>
                    <Typography component="h1" variant="h4">Thank you</Typography>
                    <Typography component="h1" variant="body1">for completing the information</Typography>
                </Paper>
                <Paper elevation={10} sx={{ background: theme.palette.common.background2, margin: "1rem auto", color: "white", padding: "1rem" }}>
                    <Typography component="h1" variant="h6">Below:</Typography>
                    <Typography component="h1" variant="body1">Are the Products and Services you can choose from.
                    </Typography>
                    <Typography component="h1" variant="h6">Next Step:</Typography>
                    <Typography component="h1" variant="body1">Select the product(s) and starting services you want.If you are comfortable proceeding then you can can click to purchase or hold for consultation, by clicking on consult and we will call you.
                    </Typography>
                </Paper>
            </Stack>
            <Stack direction="column" sx={{ alignItems: "center", justifyContent: "center" }}>
                <Fab variant="extended" color={"secondary"} sx={{ margin: "1rem auto" }} onClick={(e) => handleChange(e)}>
                    Need to change your Particulars? ? <PermIdentityIcon sx={{ ml: 2, color: "white" }} />
                </Fab>
                {!sentToServer ?
                    <Stack direction="column" spacing={2}>
                        <Typography component="h1" variant="h5" sx={{ margin: "1rem auto", color: windowTheme.palette.warning.dark }}>Tell us your preferred site</Typography>
                        <Fab variant="extended" color="primary" size="large" onClick={() => setOpenSitePreferenceForm(true)}>
                            site preference1 <PsychologyIcon sx={{ ml: 1, color: "red" }} />
                        </Fab>
                    </Stack>
                    :
                    <Typography component="h1" variant="h5"> Thank for sending your site preference form to us. This will help us get it right the first time around.</Typography>
                }
                {(openSitePreferenceForm && !sentToServer) && 
                <SitePreferenceForm />
                }
                {sentToServer &&
                    <>
                        <Typography component="h1" variant="h4" sx={{ color: "blue" }}>Your answers</Typography>
                        <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ width: "100%" }}>
                            {(sitePreference.loaded && sitePreference.data) &&

                                <Grid item xs={12} sx={{ width: "100%" }}>
                                    <Typography component="h1" variant="h6" sx={{ margin: "1rem auto", color: "blue" }}>Site:{sitePreference.data.site}</Typography>
                                    <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>Q1:{sitePreference.data.q1}</Typography>
                                    <Typography component="h1" variant="body2" sx={{ margin: "1rem auto", color: "blue" }}>answer 1:{sitePreference.data.ans1}</Typography>
                                    <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>Q2:{sitePreference.data.q2}</Typography>
                                    <Typography component="h1" variant="body2" sx={{ margin: "1rem auto", color: "blue" }}>answer 2:{sitePreference.data.ans2}</Typography>
                                    <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>Q3:{sitePreference.data.q3}</Typography>
                                    <Typography component="h1" variant="body2" sx={{ margin: "1rem auto", color: "blue" }}>answer 3:{sitePreference.data.ans3}</Typography>
                                </Grid>

                            }
                        </Grid>
                    </>}
            </Stack>
        </Container>
    )
}

export default ShowInfo