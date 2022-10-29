import React, { useContext, useEffect, useState } from 'react';

import styles from './price.module.css';
import styled from 'styled-components';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import FoundationIcon from '@mui/icons-material/Foundation';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CheckIcon from '@mui/icons-material/Check';


const CoverContainer = styled.div.attrs({ className: "container-fluid priceContainer" })`
margin:0;
background-image:url(${({ bg }) => bg});
background-size:100% 100%;
width:100vw;
min-height:20vh;
padding:0;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;

`;
const CusGrid = styled(Grid).attrs({ className: "CusStack" })`
display:flex;
margin-top:6rem;
justify-content:center;
align-items:center;
animation: moveIn 1.5s ease-in-out;
@keyframes moveIn {
  from { opacity:0;transform:translateY(100%);}
  to { opacity:1;transform:translateY(0%);}
}
`;

const CoverPage = () => {
  const theme = useTheme();
  const { staticImage, } = useContext(GeneralContext);
  const { basePrice, baseServices, startingPrices } = useContext(PriceContext);
  const [activateTitle, setActivateTitle] = useState(false);
  

  const basePrice1 = basePrice.loaded ? basePrice.data : null;
  const baseServices1 = baseServices.loaded ? baseServices.data : null;
  const getStartingPrices = startingPrices.loaded ? startingPrices.data : null;

  const priceBg = `${staticImage}/prices.png`;


  useEffect(() => {
    setTimeout(() => {
      setActivateTitle(true);
    }, 1800);

  }, []);
  

  return (
    <CoverContainer bg={priceBg}>
      <Container maxWidth="xl"
        sx={{
          minHeight: "50vh", backgroundSize: "100% 100%", position: "relative",
        }}>
        <Paper elevation={10} component="div"
          sx={{
            textAlign: "center", marginTop: "3rem", background: theme.palette.common.blueGrey, color: theme.palette.common.lighter,
          }}>
          <Typography component="h1" variant="h4"
            sx={{
              fontFamily: "Roboto", zIndex: "20", margin: "auto", width: "80%", padding: "0.25rem 1rem",
            }}>
            Cost Effective Pricing
          </Typography>
        </Paper>
        <CusGrid container spacing={3}>


          {getStartingPrices && getStartingPrices.map(obj => (
            <Grid item xs={12} sm={6}
              sx={{
                margin: "2rem auto",position:"relative"
              }}
              key={`${obj.id}-${Math.ceil(Math.random() * 10000)}`}
            >
              <Paper elevation={10} 
                sx={{
                  background: theme.palette.common.blueGrey, color: theme.palette.common.lighter,
                }}>
                <Typography component="h1" variant="h4"
                  sx={{
                    fontFamily: "Roboto", zIndex: "20", margin: "auto", width: "100%", padding: "0.25rem 1rem",
                  }}>
                  {obj.name}  <FoundationIcon sx={{ color: "red", fontSize: "26px", ml: 2 }} />
                </Typography>
                <Typography component="div" variant="body2"
                  sx={{
                    fontFamily: "Roboto", zIndex: "20", margin: "auto", width: "100%", padding: "0.25rem 1rem", fontSize: { xs: "18px", sm: "20px" },
                  }}>
                  {obj.desc}
                </Typography>
              
                <Typography component="div" variant="h5"
                  sx={{
                    fontFamily: "Roboto", zIndex: "20", margin: "auto", width: "100%", padding: "0.25rem 1rem",
                  }}>
                  $ {obj.monthly}.<sup>00</sup> CAD
                </Typography>
              </Paper>
            </Grid>

          ))}



        </CusGrid>
      </Container>
      <Container maxWidth="xl" 
      sx={{ minHeight: "20vh", background: theme.palette.common.blueGrey, color: theme.palette.common.lighter,
       display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column",
       position: "relative"
       }}>
        {activateTitle && <Typography component="h1" variant="h4" sx={{ fontFamily: "Roboto", zIndex: "20", margin: "1rem  auto ", animation: `${styles.slideItems} 2.5s ease-in-out`,marginBottom:"2rem" }}>
          Save time and money - make the site work for you the 1<sup>st</sup> time.<CheckIcon sx={{ color: "red", fontSize: "36px", ml: 2 }} />
        </Typography>}
        <Grid container spacing={{sm:0,xs:0,md:2,lg:3}} 
        sx={{ margin: "1rem auto", jutifyContent: "center", alignItems: "flex-start",
         animation: `${styles.revealItems} 1.5s ease-in-out`,
         maxHeight:{sm:"30vh",xs:"40vh",md:"45vh"},overflowY:"scroll",
         boxShadow:"1px 2px 4px white" ,padding:"1rem",
        background:theme.palette.common.blueGreyDark,
        
        
        }}>
          {baseServices1 && baseServices1.map(obj => (
            <Grid item xs={12} sm={6} md={4} 
            sx={{ margin: "auto", textAlign: "center",padding:"0.5rem",
          boxShadow:"1px 1px 13px 5px white"
          }} 
            key={`${obj.id}-${Math.ceil(Math.random() * 10000)}`}
            >
              <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto", zIndex: "20", margin: " auto " }}>
                {obj.name} <HomeRepairServiceIcon sx={{ color: "blue", fontSize: "26px", ml: 2 }} />
              </Typography>
              <Typography component="h1" variant="body1" sx={{ fontFamily: "Roboto", zIndex: "20", margin: " auto ",padding:"0.5rem" }}>
                {obj.desc}
              </Typography>
              <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto", zIndex: "20", margin: " auto " }}>
                ${obj.monthly}.<sup>00</sup>
              </Typography>
            </Grid>
          ))}

        </Grid>

      </Container>
    </CoverContainer>
  )
}

export default CoverPage