import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Box, Grid, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ContainerFooterFluid } from '../../styled/Container.styled';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ButtonMailto from '../utils/ButtonMailto';
import Works from './Works';
import {GeneralContext} from '../../context/GeneralContextProvider';


const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {changepage,setChangePage}=useContext(GeneralContext);
  const colunm1Arr = [{ title: "home", link: "/" }, { title: "Contact", link: "/contact" }, { title: "Support", link: "/support" }, { title: "Privacy", link: "/privacy" },]
  const colunm2Arr = [{ title: "Login", link: "/" }, { title: "register", link: "/" }, { title: "features", link: "/" }, { title: "news", link: "/" },]
  const colunm3Arr = [{ title: "design3", link: "/design3" }, { title: "design1", link: "/design1" }, { title: "design2", link: "/design2" }, { title: "home", link: "/" }, { title: "design4", link: "/design4" }, { title: "design5", link: "/design5" }]

  const handleLink= (e,link)=>{
    e.preventDefault();
    navigate(link,setChangePage(true));
    
    
  }
  return (
    <footer style={{ maxWidth: "100vw", height: "auto", marginTop: "3rem" }}>
      <Paper
        sx={{ boxShadow: `3px 3px ${theme.palette.common.medium}`, background: theme.palette.footer.lighter }}>
        <Box className="container-fluid" sx={{ width: "100%", textAlign: "center" }}
          px={{ xs: 3, sm: 5 }} py={{ xs: 3, sm: 1 }}
        >
          <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Grid container columns={3} sx={{ margin: "auto", }}>
              <Grid borderBottom={1} color={theme.palette.common.light} item xs={12} sm={4} sx={{ background: theme.palette.footer.medium }}> Home</Grid>
              {colunm1Arr.map(obj => (
                <Grid item xs={12} sm={4} key={`${obj.title}${Math.ceil(Math.random * 1000)}`} >

                  <Box>
                    <Link sx={{ color: theme.palette.footer.dark,'&:hover':{cursor:"pointer"} }} onClick={(e)=>handleLink(e,obj.link)} >{obj.title}</Link>
                  </Box>
                </Grid>
              ))
              }
            </Grid>
            <Grid container columns={3} sx={{ margin: "auto" }}>
              <Grid borderBottom={1} item xs={12} sm={4} color={theme.palette.common.light}
                sx={{
                  background: theme.palette.footer.medium
                }}
              >
                Registration
              </Grid>
              {colunm2Arr.map(obj => (
                <Grid item xs={12} sm={4} key={`${obj.title}${Math.ceil(Math.random * 1000)}`} >

                  <Box>
                    <Link sx={{ color: theme.palette.footer.dark }} onClick={(e)=>handleLink(e,obj.link)} >{obj.title}</Link>
                  </Box>
                </Grid>
              ))
              }
            </Grid>
            
          </Grid>
        </Box>
      </Paper>
      <Works/>
      <ContainerFooterFluid
        style={{
          background: theme.palette.footer.lighter,
          minHeight: { xs: "10vh", md: "10vh" },
          color: theme.palette.common.light
        }}
      >
        <Grid container spacing={3} direction={"row"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto"
          }}
        >
          <Grid item xs={12} md={3}
            sx={{
              alignSelf: "center",
              justifySelf: "center",
              margin: "auto"
            }}
          >
            <Stack direction="column">
              <Divider />
              <br />
              <Typography component="h1" variant="h3" sx={{ color: theme.palette.footer.bannerWords }} >OUR</Typography>
              <Typography component="h1" variant="h3" sx={{ color: theme.palette.footer.bannerWords }}>LOCATION</Typography>
              <br />
              <Divider />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} sx={{ margin: "auto" }}>
            <Typography component="h1" variant="h4" sx={{ color: theme.palette.secondary.main }}>133 Elmwood Avenue, Richmond Hill, On</Typography>

          </Grid>
          <Grid item xs={12} md={2} sx={{ margin: "auto" }}>

            <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="h1" variant="h6" sx={{ color: theme.palette.secondary.main }}>Contact:</Typography>
              <Typography component="h1" variant="body2" sx={{ color: theme.palette.footer.medium ,'&:hover':{cursor:"pointer"}}}>
                <Link
                onClick={(e)=>handleLink(e,"/contact")}
                >Contact</Link>
                </Typography>
            </Stack>
          </Grid>
        </Grid>

      </ContainerFooterFluid>
      <ContainerFooterFluid style={{ background: theme.palette.common.medium, minHeight: { xs: "15vh", md: "15vh" }, color: theme.palette.common.light }}>
        <Stack direction={"row"} spacing={2} sx={{ margin: "auto", }}>
          <FacebookIcon sx={{ '&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" } }} />
          <InstagramIcon sx={{ '&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" } }} />
          <LinkedInIcon sx={{ '&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" } }} />
          <TwitterIcon sx={{ '&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" } }} />

        </Stack>
      </ContainerFooterFluid>
    </footer>
  )
}

export default Footer