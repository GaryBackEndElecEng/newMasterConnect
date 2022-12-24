import React, { useContext, useMemo, useState } from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
// import styles from './footer.module.css';

const CustomContainer = styled.div`
margin:0px;
width:100vw;
display:flex;
justify-content:flex-start;
align-items:center;
padding: 1rem 0.5rem;
background:${({ bg }) => bg};
flex-direction:column;


`;

const Sponsors = ({sponsor}) => {
    const theme = useTheme();
    
    const hasLength=sponsor.length >0 ? sponsor:false;
    const boxShadow= hasLength ? "1px 1px 8px 10px lightgrey":"none";
    const display = hasLength ? "block":"none";
    const displayFlex = hasLength ? "flex":"none";


    const handleLink = (e,link)=>{
        e.preventDefault();
        if(link.startsWith("http")){
            window.open(link)
        }
    }

    return (
        <CustomContainer bg={"white"}>
            <Typography component="h1" variant="h4"
            sx={{width:"100%", textAlign:"center",margin:"1rem auto",
            background:theme.palette.splash,boxShadow:boxShadow,display:display
            }}
            >Contributors</Typography>
            <Grid container spacing={0} rowSpacing={2}
                sx={{
                    padding: { xs: "5px", sm: "10px", md: "12px" },
                    overflowY: "scroll", maxHeight: "20vh",display:displayFlex

                }}>
                {sponsor && sponsor.map(obj => (
                    <Grid item xs={12} sm={6} md={4} key={obj.id}
                        sx={{ textAlign:"center",margin:"auto",padding:"2px 3px",zIndex:"1000"
                    }}
                    >

                        <Button component="a"  onClick={(e)=>handleLink(e,obj.site)} sx={{ background: theme.palette.common.background, color: "white", padding: "0.5rem", margin:"1rem",
                        backgroundImage: `url(${obj.logo})`, backgroundSize: "100% 100%" ,width:"50%",height:"100%"
                    
                    }}>
                            <Typography component="h1" variant="h6" sx={{ color: "red", padding: "0.5rem" }}>
                                {obj.name}
                            </Typography>
                        </Button>

                    </Grid>
                ))}
            </Grid>
        </CustomContainer>
    )
}

export default Sponsors