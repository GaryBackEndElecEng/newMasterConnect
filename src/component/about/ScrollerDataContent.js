import React from "react";
import styles from "./about.module.css";
import styled from "styled-components";
import { Typography } from "@mui/material";

const ScrollerDataContent = ({ obj }) => {
  return (
    <div className={styles.flexColumn}>
      <div className={styles.flexColumn}>
      <a
        href={`${obj.type}:${obj.value}`}
        className={styles.link}
        data-content={obj.content}
      >
        <div>
          {obj.type !== "media" && (
            <Typography
              component="h1"
              variant="h5"
              sx={{ margin: "1rem auto" }}
            >
              {obj.name} : {obj.value}
            </Typography>
          )}
        </div>
      </a>
      </div>
      <div>
        {obj.type === "media" && (
          <div>
            <Typography
              component="h1"
              variant="h5"
              sx={{ margin: "1rem auto" }}
            >
              {obj.name}
            </Typography>
            <div className={styles.media}>
              {obj.value.map((ob, index) => (
                <div key={index}>
                  <small style={{ color: "white" }}> {ob}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollerDataContent;
