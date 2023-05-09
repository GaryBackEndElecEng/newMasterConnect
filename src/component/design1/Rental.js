import React from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Fab,
} from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider.js";
import styled from "styled-components";
import styles from "./design1.module.css";
import imageArr from "./imageArr";

const Rental = () => {
  const [rentals, setRentals] = React.useState({ loaded: false, data: [] });
  React.useEffect(() => {
    if (imageArr.length > 0) {
      setRentals({ loaded: true, data: imageArr });
    }
  }, []);
  return (
    <Container maxWidth="xl">
      <Typography component="h1"variant='h2' className={styles.title} sx={{color:"black"}}> Available</Typography>
      <Grid
        container
        spacing={{ xs: 2, sm: 1, md: 3 }}
        className={styles.rentalContGrid}
      >
        {rentals.loaded ? (
          rentals.data.map((obj, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={`${obj.id}--rentals--${index}`}
              sx={{justifyContent:"flex-start"}}
            >
              <Card elevation={3} style={styles.ratingCard} >
                <Typography component={"h1"} variant={"h4"}>
                  {obj.title}
                </Typography>
                <CardMedia
                  component="img"
                  src={obj.image}
                  alt="www.masterconnect.ca"
                  height={"63%"}
                  sx={{ width: "100%" ,}}
                />
                <CardContent sx={{margin:"1rem auto"}}>
                  <Typography component={"h1"} variant={"body1"}>
                    {obj.comment}
                  </Typography>
                  <Fab variant="extended" color="secondary" size="medium" sx={{margin:"1rem auto"}}>
                    <Typography component={"h1"} variant="h6">Detail</Typography>
                </Fab>
                </CardContent>
                
              </Card>
            </Grid>
          ))
        ) : (
          <h3>loading...</h3>
        )}
      </Grid>
    </Container>
  );
};

export default Rental;
