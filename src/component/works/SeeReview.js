import React from 'react';
import styled from 'styled-components';
import { Stack, Grid, Typography } from '@mui/material';
import Stars from './Stars';

const MainReview = styled(Grid)`
background:white;
padding:0.5rem;
animation: growUp 1s ease-in-out;
@keyframes growUp {
    from {transform:scale(0);}
    to {transform:scale(1);}
}
`;
const SeeReview = ({review}) => {
  return (
    <MainReview container spacing={{xs:0,sm:1}}>

        { review.slice(0,4).map((obj,index)=>(
            <Grid item xs={12} sm={6} key={`${obj.id}-eachReview-${index}`}
            sx={{width:"100%"}}
            >

                <Typography component="h1" variant="body1" >
                    <span style={{color:"blue"}}>name:</span>
                {obj.name}
                </Typography>
                <Typography component="h1" variant="body2">comment:{obj.comment}</Typography>
                <Stars rating={obj.rating}/>
                </Grid>
        ))}
        
    </MainReview>
  )
}

export default SeeReview