import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Typography, Grid, Container, Paper, Box, Stack } from '@mui/material';


const contactInf = [{ id: Math.ceil(Math.random() * 10000), name: "email", value: "masterconnect919@gmail.com" }, { id: Math.ceil(Math.random() * 1000), name: "tel", value: "416-917-5768" }, { id: Math.ceil(Math.random() * 1000), name: "site", value: "www.master-connect.ca" }, { id: Math.ceil(Math.random() * 100), name: "site", value: "www.master-sale.ca" }]

const ContactInfo = () => {
    const theme = useTheme();
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
            <Grid container spacing={{xs:0,sm:1}}>
            {contactInf && contactInf.map(obj => (
              <Grid item xs={12} sm={6} key={obj.id} sx={{
                margin: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center",
                flexDirection: { xs: "column", sm: "row" }, padding: "1rem",
                borderTop:"1px solid white"
              }}>

                <Stack direction={{xs:"column"}} spacing={{xs:0,sm:2}}>
                  <Typography component={"h1"} variant={"h5"} sx={{color:"blue"}}>{obj.name}:</Typography>
                
                  <Typography component={"h1"} variant={"h5"}>{obj.value}</Typography>
                </Stack>
                
              </Grid>
            ))
            }
            </Grid>
            <Typography component={"h1"} variant={"body1"} sx={{margin:"1rem",borderTop:"1px solid white",borderBottom:"1px solid white"}}>Please leave a message. We will get right back with you ASAP!</Typography>
          </Paper>
          </Container>
  )
}

export default ContactInfo