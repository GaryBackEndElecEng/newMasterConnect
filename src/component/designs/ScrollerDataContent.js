import React from "react";
import styles from "./design.module.css";
import styled from "styled-components";
import { Typography, } from "@mui/material";

const ScrollerDataContent = ({obj}) => {
  return (
    <a href={`${obj.type}:${obj.value}`} className={styles.link}
                  data-content={obj.content}
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{ margin: "1rem auto" }}
                    >
                      {obj.name} : {obj.type}
                    </Typography>
                  </a>
  )
}

export default ScrollerDataContent