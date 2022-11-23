import React, { useContext, useMemo, useState } from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
// import styles from './footer.module.css';

const CustomContainer = styled(Container)`
margin:0px;
width:100vw;
display:flex;
justify-content:flex-start;
align-items:center;
padding: 1rem 0.5rem;
background:${({ bg }) => bg};
flex-direction:column;


`;

const Sponsors = () => {
    const theme = useTheme();
    const { sponsor } = useContext(GeneralContext);
    const [getSponsor, setGetSponsor] = useState(null);

    useMemo(() => {
        if (sponsor.loaded && sponsor.data) {
            setGetSponsor(sponsor.data);
        }
    }, [sponsor.loaded]);

    const handleLink = (e,link)=>{
        e.preventDefault();
        if(link.startsWith("http")){
            window.open(link)
        }
    }

    return (
        <CustomContainer bg={"white"}>
            {getSponsor && <Typography component="h1" variant="h3"
            sx={{width:"100%", textAlign:"center",margin:"1rem auto",
            background:theme.palette.splash,boxShadow:"1px 1px 8px 10px white"
            }}
            >Contributors</Typography>}
            <Grid container spacing={0} rowSpacing={2}
                sx={{
                    padding: { xs: "5px", sm: "10px", md: "12px" },
                    overflowY: "scroll", maxHeight: "20vh"

                }}>
                {getSponsor && getSponsor.map(obj => (
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