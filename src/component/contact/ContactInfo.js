import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import { Typography, Grid, Container, Paper, Box, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import InstagramIcon from '@mui/icons-material/Instagram';


const contactInf = [{ id: Math.ceil(Math.random() * 10000), name: "email", value: "masterconnect919@gmail.com" }, { id: Math.ceil(Math.random() * 1000), name: "tel", value: "416-917-5768" }, { id: Math.ceil(Math.random() * 1000), name: "site", value: "www.master-connect.ca" }, { id: Math.ceil(Math.random() * 100), name: "site", value: "www.master-sale.ca" }]

const ContactInfo = ({ generalInfo }) => {
  const theme = useTheme();
  const [siteArr, setSiteArr] = useState([]);
  const [info, setInfo] = useState([]);
  const getContactInfo = generalInfo.loaded ? generalInfo.data : [];

  useEffect(() => {
    let arr = [], particArr = [];
    if (generalInfo.loaded) {
      //PARTICULARS
      particArr.push(
        { id: 0, name: "name", value: generalInfo.data.name },
        { id: 1, name: "address", value: generalInfo.data.address + "," + generalInfo.data.city + "," + generalInfo.data.provState + "," + generalInfo.data.country },
        { id: 2, name: "Postal code", value: generalInfo.data.postal },
        { id: 3, name: "Business Hours", value: generalInfo.data.extra },

      )
      setInfo(particArr)
      //SITE
      generalInfo.data.siteArray.forEach((ele, index) => {
        let site = ele.split("site:")[1];
        if (site && site.split("").length > 0) return arr.push({ id: index, site: site, icon: <WebIcon sx={{ ml: 1, mr: 1, color: "blue",fontSize:"180%" }} /> });
        let fb = ele.split("fb:")[1];
        if (fb && fb.split("").length > 0) return arr.push({ id: index, media: fb, icon: <FacebookIcon sx={{ ml: 1, mr: 1, color: "blue",fontSize:"180%" }} /> });
        let twitter = ele.split("twitter:")[1];
        if (twitter && twitter.split("").length > 0) return arr.push({ id: index, media: twitter, icon: <TwitterIcon sx={{ ml: 1, mr: 1, color: "blue",fontSize:"180%" }} /> });
        let linkedln = ele.split("linkedin:")[1];
        if (linkedln && linkedln.split("").length > 0) return arr.push({ id: index, media: linkedln, icon: <LinkedInIcon sx={{ ml: 1, mr: 1, color: "blue",fontSize:"180%" }} /> });
        let instagram = ele.split("instagram:")[1];
        if (instagram && instagram.split("").length > 0) return arr.push({ id: index, media: instagram, icon: <InstagramIcon sx={{ ml: 1, mr: 1, color: "blue",fontSize:"180%" }} /> });
      });
      setSiteArr(arr);

    }

  }, [generalInfo.loaded, generalInfo.data]);

  const handleLink = (e, link) => {
    e.preventDefault();
    window.open(link)
  }

  return (
    <Container maxWidth={"md"}>
      <Paper elevation={2}
        sx={{
          margin: "auto", background: theme.palette.common.blueGrey, color: theme.palette.common.light,
          display: "flex", justifyContent: "center", alignItems: "center",
          flexDirection: "column", width: "100%"
        }}
      >
        <Typography component="h1" variant="h2"
          sx={{ fontFamily: "Roboto", margin: "auto", textAlign: "center" }}
        >
          Our Contact Info
        </Typography>
        <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ padding: "0.5rem", justifyContent: "flex-start" }}>
          {info && info.map((obj, index) => (
            <Grid item xs={12} sm={6} key={`${obj.id}-particular-${index}`} sx={{
              margin: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center",
              flexDirection: { xs: "column", sm: "row" }, padding: "1rem",
              borderTop: "1px solid white"
            }}>

              <Stack direction={{ xs: "column" }} spacing={{ xs: 0, sm: 2 }}>
                <Typography component={"h1"} variant={"h5"} sx={{ color: "blue" }}>{obj.name}:</Typography>
                <Typography component={"h1"} variant={"body1"}>{obj.value}</Typography>
              </Stack>

            </Grid>
          ))
          }
        </Grid>
        <Grid container spacing={{ xs: 0, sm: 2 }} sx={{ padding: "0.5rem", justifyContent: "flex-start" }}>
          {siteArr && siteArr.map((obj, index) => (
            <Grid item xs={12} sm={6} key={`${obj.id}-particular-${index}`} sx={{ borderTop: "1px solid white", padding: "1rem" }}>
              {obj.site && <Typography component="h1" variant="body1">{obj.site}-{obj.icon}</Typography>}
              {obj.media && <Typography component="h1" variant="body1" onClick={(e)=>handleLink(e,obj.media)}>VIEW-{obj.icon}</Typography>}
            </Grid>
          ))}
        </Grid>
        <Typography component={"h1"} variant={"body1"} sx={{ margin: "1rem", borderTop: "1px solid white", borderBottom: "1px solid white" }}>Please leave a message. We will get right back with you ASAP!</Typography>
      </Paper>
    </Container>
  )
}

export default ContactInfo