import React, {  useContext, } from 'react';
import { Stack, Grid, Typography, FormControl, Input, InputLabel, FormHelperText, Fab, Container, } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import styles from './design8.module.css';
import BackupIcon from '@mui/icons-material/Backup';

const MainBanner3Container = styled(Container)`
margin:1rem auto;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
flex-direction:center;
@media screen and (max-width:900px){
   
}
@media screen and (max-width:600px){

}
`;


const BannerThree = () => {
    const theme = useTheme();
    const {  staticImage } = useContext(GeneralContext);
    const extraImg = ` ${staticImage}/design8/successPic.png`;
    


    return (
        <MainBanner3Container
            maxWidth="md"
        className={styles.mainContainer}
        >

            <Grid container spacing={{ xs: 0, sm: 1, md: 3 }}
                sx={{ margin: "1rem auto" }}
            >
                <Grid item xs={12} md={8}

                >
                    <Grid container spacing={{ xs: 0, sm: 1 }}>
                        <Grid item xs={12} md={6}
                            sx={{ backgroundImage: `url(${extraImg})`, backgroundSize: "100% 100%",
                        minHeight:{xs:"30vh",sm:"46vh",md:"auto"}
                        }}
                        >

                        </Grid>
                        <Grid item xs={12} md={6}>

                        <hr style={{ width: "50%", color: theme.palette.common.blueGrey, height: "0.5rem" }} />

                        <Stack direction="column" spacing={{ xs: 0, sm: 1 }}
                            sx={{ justifyContent: "flex-start", alignItems: "center", width: "75%", margin: "1rem auto" }}
                        >

                            <Typography component="h1" variant="h3" sx={{ margin: "1rem auto",color:"black" }}>Contact</Typography>

                            <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" },color:"black" }}>Your Address</Typography>
                            <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" },color:"black" }}>City, Postal</Typography>

                        </Stack>
                        <Stack direction="column" spacing={{ xs: 0, sm: 1 }}
                            sx={{ justifyContent: "flex-start", alignItems: "center", width: "75%", margin: "1rem auto" }}>

                            <Typography component="h1" variant="body2" sx={{ margin: { xs: "2rem auto", sm: "1rem auto" },color:"black" }}>Tel: Telephone</Typography>
                            <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" },color:"black" }}>Fax: your Fax</Typography>
                            <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" },color:"black" }}>email: email</Typography>

                        </Stack>

                        <hr style={{ width: "50%", color: theme.palette.common.blueGrey, height: "0.5rem" }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}
                    sx={{
                        position: "relative",
                        display: "flex", alignItems: "flex-start", justifyContent: "center", overflow: "hidden", flexDirection: "column"
                    }}

                >
                    <Container maxWidth="sm">
                        <form>
                            <FormControl size="medium" variant="filled" sx={{ flexGrow: 1, width: "100%", position: "relative" }}>
                                <InputLabel htmlFor="name">Your Name</InputLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    aria-describedby="valid name"
                                />
                                <FormHelperText id="valid-name">Your  name</FormHelperText>
                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ flexGrow: 1, width: "100%", position: "relative" }}>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    aria-describedby="valid email"
                                />
                                <FormHelperText id="valid-email">Your Email</FormHelperText>
                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ flexGrow: 1, width: "100%", position: "relative" }}>
                                <InputLabel htmlFor="subject">subject</InputLabel>
                                <Input
                                    id="subject"
                                    name="subject"
                                    aria-describedby="valid subject"
                                />
                                <FormHelperText id="valid-email">Subject</FormHelperText>
                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ flexGrow: 1, width: "100%", position: "relative" }}>
                                <InputLabel htmlFor="message">Message</InputLabel>
                                <textarea
                                    id="message"
                                    name="message"
                                    aria-describedby="valid message"
                                />
                                <FormHelperText id="valid-message">your Message</FormHelperText>
                            </FormControl>
                            <Stack direction="column"
                                sx={{
                                    textAlign: "center", margin: "1rem auto",
                                    alignItems: "center"
                                }}>
                                <Fab variant="extended" color="primary" sx={{ width: { xs: "50%", sm: "25%", md: "50%" }, padding: "1rem" }}>
                                    submit <BackupIcon sx={{ ml: 1, color: "red" }} />
                                </Fab>
                            </Stack>
                        </form>
                    </Container>
                </Grid>

            </Grid>


        </MainBanner3Container>
    )
}

export default BannerThree