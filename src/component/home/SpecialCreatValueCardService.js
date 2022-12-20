import React from 'react';
import {Stack,Fab,Grid,Typography,Card,Avatar,CardMedia} from '@mui/material';
import styled from 'styled-components';

const SpecialCreatValueCardService = ({services,staticImage}) => {
  return (
    <Stack direction="column" spacing={{xs:0,sm:1}}
    sx={{justifyItems:"center",padding:"0.5rem 1rem"}}
    >
        <Grid container spacing={{xs:1,sm:1}}>
            {services && services.map(obj=>(
                <Grid item xs={12}
                sx={{margin:"0.5rem auto"}}
                >
                    <Card elevation={3}>
                        <Avatar src={`${staticImage}/${obj.image}`} alt="www.master-connect.ca"/>
                    <Typography component="h1" variant="h4" sx={{margin:"1rem auto"}}>{obj.name}</Typography>
                    <Typography component="h1" variant="body1" sx={{margin:" auto"}}>{obj.summary}</Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Stack>
  )
}

export default SpecialCreatValueCardService