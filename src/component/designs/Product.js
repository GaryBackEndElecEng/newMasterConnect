import React from "react";
import styles from "./design.module.css";
import {
  Grid,
  Typography,
  Stack,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import styled from "styled-components";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useNavigate } from "react-router-dom";

const CustCardMedia = styled(CardMedia)`
  // box-shadow: 1px 1px 3px 1px white;
  width: 850px;
  height: 70%;
  @media screen and (max-width: 900px) {
    width: 780px;
  }
  @media screen and (max-width: 600px) {
    width: 350px;
  }
`;
const CustCard = styled(Card).attrs({ className: "productCard" })`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background: transparent;
  position: relative;
  height: 100%;
  width: 100%;
  box-shadow: 1px 1px 5px 1px black;
  @media screen and (max-width: 900px) {
    width: 800px;
  }
  @media screen and (max-width: 600px) {
    width: 350px;
  }
`;
const CustCardGrid = styled(Grid).attrs({ className: "childProductGrid" })`
  padding: auto 1rem;
`;

const Product = ({ product, staticImage, getId }) => {
  const navigate = useNavigate();
  const productRef = React.useRef(null);

  const handleDetail = (e, obj) => {
    e.preventDefault();
    if (obj && !obj.extra_kwargs.startsWith("http")) {
      navigate(obj.extra_kwargs);
    } else if (obj.extra_kwargs.startsWith("http")) {
      window.open(obj.extra_kwargs);
    }
  };

  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 6, md: 3 }}
      className={styles.mainProductGrid}
      sx={{ position: "relative" }}
      id={getId}
      ref={productRef}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
       
      >
        <Typography
          component="h1"
          variant={window.innerWidth < 600 ? "h3" : "h2"}
          className={styles.fontStyle}
        >
          Design
        </Typography>
        <div className={styles.hr_line2} />
        <Stack direction="row" className={styles.alignItem}>
          <Typography component="h1" variant="h4" className={styles.fontStyle}>
            scroll
          </Typography>
          <ImportExportIcon sx={{ ml: 3, color: "red", fontSize: "50px" }} />
        </Stack>
        <Typography
          component="h1"
          variant="h4"
          sx={{ marginLeft: { xs: "5px", sm: "10px", md: "auto" } }}
          className={styles.fontType}
        >
          summary
        </Typography>
        <Typography
          component="h1"
          variant="body1"
          sx={{ marginLeft: { xs: "5px", sm: "10px", md: "auto" } }}
          className={styles.fontType}
        >
          {product.summary}
        </Typography>
        <div className={styles.hr_line2} />
      </Grid>
      <CustCardGrid
        item
        xs={12}
        sm={12}
        md={8}
        className={styles.childProductGrid}
      >
        <CustCard
          onClick={(e) => handleDetail(e, product)}
          sx={{ background: "transparent" }}
        >
          <Typography
            component="h1"
            variant={window.innerWidth < 600 ? "h4" : "h2"}
            className={styles.fontStyle}
          >
            {product.name}
          </Typography>
          <CustCardMedia
            component="img"
            src={`${staticImage}/${product.imageName}`}
            height={"60%"}
            alt="www.masterconnect.ca"
            sx={{ marginBottom: "2rem", background: "transparent" }}
          />
          <CardContent className={styles.productCardContent}>
            <Typography component="h1" variant="h4" className={styles.fontType}>
              description
            </Typography>
            <div className={styles.hr_line2} />
            <Typography
              component="h1"
              variant="body1"
              className={styles.fontType}
            >
              {product.desc}
            </Typography>
          </CardContent>
        </CustCard>
      </CustCardGrid>
    </Grid>
  );
};

export default Product;
