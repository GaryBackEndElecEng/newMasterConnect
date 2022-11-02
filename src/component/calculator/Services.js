import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {PriceContext} from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styles from './calculate.module.css';
import styled from 'styled-components';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';

const Services = () => {
    const theme=useTheme();
    const {getServiceList}=useContext(PriceContext);
  return (
    <Stack direction="column"
    sx={{alignItems:"center",justifyContent:"flexStart",margin:"1rem auto"}}
    >
        <Grid container spacing={{xs:0,sm:1,md:2}}>
            {(getServiceList.loaded && getServiceList.data) 
            && 
            getServiceList.data.map(obj=>(
                <Grid item xs={12} sm={6} md={4}>
                    
                </Grid>

            ))}
        </Grid>
    </Stack>
  )
}

export default Services