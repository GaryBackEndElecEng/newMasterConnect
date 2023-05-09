import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
// import styles from "./contact.module.css";
import { Input, InputLabel, FormControl } from "@mui/material";
// import styled from "styled-components";

const CellInput = () => {
  const { cell, setCell } = React.useContext(GeneralContext);
  return (
    <FormControl size="medium" variant="filled">
      <InputLabel
        focused={false}
        label="Cell"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        cell number
      </InputLabel>
      <Input
        component="div"
        name="cell"
        placeholder=" cell"
        value={cell}
        onChange={(e) => setCell(e.target.value)}
        margin={"dense"}
        required={true}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
    </FormControl>
  );
};

export default CellInput;