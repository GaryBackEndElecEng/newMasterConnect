import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
// import styles from "./contact.module.css";
import { Input, InputLabel, FormControl } from "@mui/material";
// import styled from "styled-components";

const CompanyInput = () => {
  const { coSite, setCoSite } = React.useContext(GeneralContext);
  return (
    <FormControl size="medium" variant="filled">
      <InputLabel
        focused={false}
        label="company's site"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        company's site
      </InputLabel>
      <Input
        component="div"
        name="coSite"
        placeholder=" company's site"
        value={coSite}
        onChange={(e) => setCoSite(e.target.value)}
        margin={"dense"}
        required={true}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
    </FormControl>
  );
};

export default CompanyInput;