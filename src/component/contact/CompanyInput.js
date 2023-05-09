import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
// import styles from "./contact.module.css";
import { Input, InputLabel, FormControl } from "@mui/material";
// import styled from "styled-components";

const CompanyInput = () => {
  const { coName, setCoName } = React.useContext(GeneralContext);
  return (
    <FormControl size="medium" variant="filled">
      <InputLabel
        focused={false}
        label="company"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        Company's name
      </InputLabel>
      <Input
        component="div"
        name="company"
        placeholder=" company"
        value={coName}
        onChange={(e) => setCoName(e.target.value)}
        margin={"dense"}
        required={true}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
    </FormControl>
  );
};

export default CompanyInput;