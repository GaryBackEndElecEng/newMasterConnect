import React, {  useContext, } from 'react';
import { Stack, Grid, Typography, FormControl, Input, InputLabel, FormHelperText, Fab, Container, } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import styles from './wedding.module.css';
import BackupIcon from '@mui/icons-material/Backup';
// import FavoriteIcon from '@mui/icons-material/Favorite';

const MainDiv=styled.div`  
margin:0 auto;
padding-top:4rem;
padding-bottom:4rem;
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:linear-gradient(136deg,${({bg})=>bg}, rgb(233, 240, 241) 50% );
`; 

const InnerContainer = styled(Container)`
margin: auto;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
flex-direction:center;
// border:1px solid red;
@media screen and (max-width:900px){
   
}
@media screen and (max-width:600px){

}
`;


const Contribute = ({bg}) => {
    const theme = useTheme();
    const {staticImage } = useContext(GeneralContext);
    const extraImg = `${staticImage}/Memories.png`;

    


    return (
        <MainDiv
        className={styles.mainDiv}
        bg={bg}
        >
        <InnerContainer
            maxWidth="xl"
            className={styles.innerContainer}
        >
            <div className={styles.skewBox}>
                <Grid container spacing={{ xs: 0, sm: 1, md: 3 }}
                    sx={{ margin: "1rem auto" }}
                >
                    <Grid item xs={12} md={8}

                    >
                        <Grid container spacing={{ xs: 0, sm: 1 }}>
                            <Grid item xs={12} md={6}
                                sx={{ backgroundImage: `url(${extraImg})`, backgroundSize: "100% 100%",
                            minHeight:{xs:"30vh",sm:"46vh",md:"auto",width:"100%"}
                            }}
                            >

                            </Grid>
                            <Grid item xs={12} md={6}>

                            <hr style={{ width: "50%", color: theme.palette.common.blueGrey, height: "0.5rem" }} />

                            <Stack direction="column" spacing={{ xs: 0, sm: 1 }}
                                sx={{ justifyContent: "flex-start", alignItems: "center", width: "75%", margin: "1rem auto" }}
                            >

                                <Typography component="h1" variant="h3" sx={{ margin: "1rem auto" }}>Contact</Typography>

                                <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" } }}>Your Address</Typography>
                                <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" } }}>City, Postal</Typography>

                            </Stack>
                            <Stack direction="column" spacing={{ xs: 0, sm: 1 }}
                                sx={{ justifyContent: "flex-start", alignItems: "center", width: "75%", margin: "1rem auto" }}>

                                <Typography component="h1" variant="body2" sx={{ margin: { xs: "2rem auto", sm: "1rem auto" } }}>Tel: Telephone</Typography>
                                <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" } }}>Fax: your Fax</Typography>
                                <Typography component="h1" variant="body2" sx={{ margin: { xs: "1rem auto", sm: "1rem auto" } }}>email: email</Typography>

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
                        <Container maxWidth="md">
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
                                <FormControl size="medium" variant="filled" sx={{ flexGrow: 1, width: "100%",  }}>
                                    
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4" cols="50"
                                        aria-describedby="valid message"
                                    />
                                    <FormHelperText id="valid-message">your Message</FormHelperText>
                                </FormControl>
                                <FormControl size="medium" variant="filled" sx={{ flexGrow: 1, width: "100%", }}>
                                    <InputLabel htmlFor="contribution">Contribute</InputLabel>
                                    <Input
                                        id="contribution"
                                        name="contribution"
                                        aria-describedby="valid contribution"
                                    />
                                    <FormHelperText id="valid-contribution">Contribute</FormHelperText>
                                </FormControl>
                                <Stack direction="column"
                                    sx={{
                                        textAlign: "center", margin: "1rem auto",
                                        alignItems: "center",
                                    }}>
                                    <Fab variant="extended" color="primary" sx={{ width: { xs: "100%", sm: "50%", md: "100%" }, padding: "1rem" }}>
                                        Contribution <BackupIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </Stack>
                            </form>
                        </Container>
                    </Grid>

                </Grid>
            </div>
            <Stack direction="column" spacing={{xs:0,md:3}} sx={{justifyContent:"center",alignItems:"center"}}>
                <Typography component="h1" variant="h5" sx={{margin:"1rem auto",fontStyle:"italic"}}>
                                We thank you for your kindness and Gengerousity.
                </Typography>
                <Typography component="h1" variant="body2" sx={{margin:"1rem auto",fontStyle:"italic"}}>
                                Contributions can be made by credit card and or debit
                </Typography>
            </Stack>


        </InnerContainer>
        </MainDiv>
    )
}

export default Contribute