import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./contact.module.css";
import { Input, InputLabel, FormControl } from "@mui/material";
// import styled from "styled-components";

const FullNameInput = () => {
  const { fullName, setFullName } = React.useContext(GeneralContext);
  return (
    <FormControl size="medium" variant="filled" className={styles.formControl}>
      <InputLabel
        focused={false}
        label="full name"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        Full Name
      </InputLabel>
      <Input
        component="div"
        name="fullName"
        placeholder=" full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        margin={"dense"}
        required={true}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
    </FormControl>
  );
};

export default FullNameInput;
