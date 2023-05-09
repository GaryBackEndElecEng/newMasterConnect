import React from "react";
import styles from "./design3.module.css";
import styled from "styled-components";
import { GeneralContext } from "../../context/GeneralContextProvider";
import { Stack, Typography, IconButton } from "@mui/material";
import SelectCard from "./SelectCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustSelectArr = styled(Stack)`
  margin: auto;
  margin-top: 5vh;
  justify-content: center;
  align-items: center;
`;

const SelectMainArr = ({ arr, getWidth, type }) => {


  return (
    <CustSelectArr direction="column" className={styles.selectCenter}>
      <p
      className={styles.selectionType}
      >
        {type}
      </p>
      <Stack direction="row" className={styles.selectRowParent}>
        {arr.loaded ? (
          arr.data.map((obj, index) => (
            <div
              key={`${obj.id}--select--${index}`}
              className={styles.selectRowChild}
              id={index}
            >
              <SelectCard obj={obj} getWidth={getWidth} />
            </div>
          ))
        ) : (
          <div>
            <h5>loading...</h5>
          </div>
        )}
      </Stack>
    </CustSelectArr>
  );
};

export default SelectMainArr;
