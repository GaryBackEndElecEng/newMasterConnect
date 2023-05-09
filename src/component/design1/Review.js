import React from "react";
import { Typography,Container } from "@mui/material";
import styled from "styled-components";
import styles from "./design1.module.css";
import Rating from "./Rating";

const CustReview=styled.div`
margin:0;
padding:0;
scroll-snap-align: center;
/* scroll-padding-block: 0px; */
scroll-margin-bottom: 0px;
display:flex;
place-items:center;
flex-direction:column;
box-shadow:1px 1px 5px 1px black;
background:var(--background-44);
`;

const Review = ({ rating }) => {
  return (
    <Container maxWidth="xs">
    <CustReview  className={styles.custReview}>
      <Typography component="h1" variant="h3">
        Reviews
      </Typography>
      <div className={styles.reviews}>
        {rating.loaded ? (
          rating.data.map((obj, index) => (
            <div key={`${obj.id}-rating-${index}`}>
              <Rating obj={obj} />
            </div>
          ))
        ) : (
          <h3>loading...</h3>
        )}
      </div>
    </CustReview>
    </Container>
  );
};

export default Review;
