import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {PriceContext} from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styles from './calculate.module.css';
import styled from 'styled-components';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';

const Products = () => {
    const theme=useTheme();
    const {getProductList}=useContext(PriceContext);
  return (
    <div>Products</div>
  )
}

export default Products