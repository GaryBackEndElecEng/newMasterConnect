import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../../context/GeneralContextProvider';
import { Stack, Fab, Grid, Typography, Card, Avatar, CardMedia, Box } from '@mui/material';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CustBox=styled(Box)`
margin:0.5rem auto;
animation: slideDown 1s ease-in-out;
@keyframes slideDown {
    from {opacity:0; transform:translateY(-100%);}
    to {opacity:1; transform:translateY(0%);}
}

`;
const SpecialCreatValueCardProduct = ({ products, staticImage }) => {
    const { setChangePage } = useContext(GeneralContext);
    const [showService, setShowService] = useState({ loaded: false, id: null });
    const navigate = useNavigate();

    const handlePageChange = (e, link) => {
        e.preventDefault();
        if (link.startsWith("https")) {
            window.open(link);
        } else {
            navigate(link, setChangePage(true))
        }
    }
    const showProductServices = (e, obj) => {
        e.preventDefault();
        if (!showService.loaded) {
            setShowService({ loaded: true, id: obj.id });
        }else{setShowService({ loaded: false, id:null });}

    }
    return (
        <Stack direction="column" spacing={{ xs: 0, sm: 1 }}
            sx={{ justifyItems: "center", padding: "0.5rem 1rem" }}
        >
            <Grid container spacing={{ xs: 1, sm: 1 }}>
                {products && products.map((obj,index) => (
                    <Grid item xs={12} key={`${obj.id}--Prods-${index}`}
                        sx={{ margin: "0.5rem auto" }}
                    >
                        <Card elevation={3} 
                            sx={{
                                boxShadow: "1px 1px 10px 4px grey", padding: "0.5rem"
                            }}
                        >
                            <Box onClick={(e) => handlePageChange(e, obj.extra_kwargs)} sx={{ cursor: "pointer" }}>
                                <CardMedia  component="img" src={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" height="100px" />
                                <Typography component="h1" variant="h4" sx={{ margin: "1rem auto" }}>{obj.name}</Typography>
                                <Typography component="h1" variant="body1" sx={{ margin: " auto" }}>{obj.summary}</Typography>
                            </Box>
                            <Stack spacing={0} direction="column">
                                <Fab color="info" size="small" variant="extended" onClick={(e)=>showProductServices(e,obj)}>
                                    show <ExpandMoreIcon sx={{ml:1}}/>
                                </Fab>
                            </Stack>
                            {showService.loaded && showService.id===obj.id &&
                             <CustBox>
                                {obj.services.map((service,index)=>(
                                    <Box key={`${service.id}--${index}`}>
                                        <Avatar src={`${staticImage}/${service.image}`}/>
                                        <Typography component="h1" variant="h6" sx={{margin:"1rem auto"}}>{service.name}</Typography>
                                        <Typography component="h1" variant="body1" sx={{margin:"0.5rem auto"}}>{service.summary}</Typography>
                                        </Box>
                                ))}
                             </CustBox>
                            }
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}

export default SpecialCreatValueCardProduct