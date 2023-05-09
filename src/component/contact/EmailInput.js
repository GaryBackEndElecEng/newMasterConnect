import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./contact.module.css";
import { Input, InputLabel, FormControl } from "@mui/material";
// import styled from "styled-components";

const EmailInput = () => {
  const { email, setEmail } = React.useContext(GeneralContext);
  return (
    <FormControl size="medium" variant="filled" className={styles.formControl}>
      <InputLabel
        focused={false}
        label="email"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        email
      </InputLabel>
      <Input
        component="div"
        name="email"
        placeholder=" email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin={"dense"}
        required={true}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
    </FormControl>
  );
};

export default EmailInput;