import React from 'react'

// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Grid, ListItem, } from '@mui/material';
// import styles from './account.module.css';
// import styled from 'styled-components';
import InvoiceTotal from './InvoiceTotal';

const ParticularsUsersProdsServs = ({ usersProduct, usersService }) => {
    const theme = useTheme();
    return (
        <>
            <Grid container spacing={0}>
                {(usersProduct.loaded && usersProduct.data) && usersProduct.data.map((obj,index) => (
                    <Grid item xs={12} sm={6} key={`${obj.id}-product-${Math.ceil(Math.random()*100000)}`}>
                        <ListItem sx={{ color: theme.palette.common.mediumGreen, fontWeight: "bold", textDecoration: "underline", fontSize: { xs: "80%", sm: "120%" } }}>product:{obj.name},</ListItem>
                        <Stack sx={{ fontSize: "100%" }}>
                            <ListItem>
                                <span style={{ fontSize: "80%", color: "blue" }}>Each:</span>${obj.price}.<sup>00</sup>
                            </ListItem>
                            <ListItem>
                                <span style={{ fontSize: "80%", color: "blue" }}>Month:</span>${obj.monthly}.<sup>00</sup>
                            </ListItem>
                        </Stack>

                    </Grid>

                ))}


                {(usersService.loaded && usersService.data) && usersService.data.map(obj => (
                    <Grid item xs={12} sm={6} key={`${obj.id}-usersServices-${Math.ceil(Math.random()*100000)}`}>
                        <ListItem sx={{ color: theme.palette.common.lightRed, fontWeight: "bold", textDecoration: "underline", fontSize: { xs: "80%", sm: "120%" } }}>Service:{obj.name},</ListItem>
                        <Stack sx={{ fontSize: "100%" }}>
                            <ListItem>
                                <span style={{ fontSize: "80%", color: "blue" }}>Each:</span>${obj.price}.<sup>00</sup>
                            </ListItem>
                            <ListItem>
                                <span style={{ fontSize: "80%", color: "blue" }}>Month:</span>${obj.monthly}.<sup>00</sup>
                            </ListItem>
                        </Stack>

                    </Grid>

                ))}

            </Grid>
            <InvoiceTotal usersProduct={usersProduct} usersService={usersService} />
        </>
    )
}

export default ParticularsUsersProdsServs