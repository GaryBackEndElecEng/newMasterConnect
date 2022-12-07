import React, { useState, useContext, useEffect } from 'react';
import { Grid, Container, Typography, Box, Stack, Card, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styled from 'styled-components';

const CustStack = styled(Stack)`
margin:auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
animation: growIn 1s ease-in-out;
@keyframes growIn {
from {transform:scale(0);}
to {transform:scale(1);}
}
`;

const WhyChooseUs = ({ whyChooseUs }) => {
    const theme = useTheme();
    const [activate, setActivate] = useState({loaded:false,id:null});

    const handleSeeMore=(e,id)=>{
        e.preventDefault();
        if(activate.loaded){
        setActivate({loaded:false,id:null})
        }else{setActivate({loaded:true,id:id})}
    }

    return (
        <Container maxWidth="md">
            <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>Why Choose US?</Typography>
            <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ margin: "1rem auto",alignItems:"flex-start" }}>
                {whyChooseUs.loaded && whyChooseUs.data.map((obj, index) => (
                    <Grid item xs={12} key={`${obj.id}--WhyChooseUs-${index}`}
                        sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}
                    >
                        < Card elevation={10} sx={{ margin: "auto", padding: "0.5rem", border: "3px solid lightgrey" }}>
                            <Typography component="h1" variant="h5" sx={{ margin: "0.5rem auto", fontWeight: "bold" }}>{obj.title}</Typography>
                            <Typography component="h1" variant="h6" sx={{ margin: "0.5rem auto", textDecoration: "underline",color:theme.palette.common.blueGrey }}>{obj.subSection}</Typography>
                            <Typography component="h1" variant="body1" sx={{ margin: "0.5rem auto", alignSelf: "flex-start" }}>{obj.summary}</Typography>
                            {(activate.loaded && activate.id===obj.id) ?
                            <>
                            <Stack direction="column" spacing={{xs:0,sm:1}}>
                                <Fab variant="extended" color="warning" size="small" onClick={(e)=>handleSeeMore(e,obj.id)}>
                                    close <ArrowDownwardIcon sx={{ml:1,color:"yellow"}}/>
                                </Fab>
                            </Stack>
                            <CustStack direction="column" spacing={{ xs: 0, sm: 1 }}>
                            <Typography component="h1" variant="body2" sx={{ margin: "0.5rem auto", alignSelf: "flex-start" }}>{obj.content}</Typography>
                            </CustStack>
                            </>
                                :
                                <Stack direction="column" spacing={{ xs: 0, sm: 1 }}>
                                    <Fab variant="extended" color="warning" size="small" onClick={(e)=>handleSeeMore(e,obj.id)}>
                                        see more ? <ArrowUpwardIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </Stack>
                            }
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Container>
    )
}

export default WhyChooseUs