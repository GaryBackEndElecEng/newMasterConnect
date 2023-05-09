import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./contact.module.css";
import { Input, InputLabel, FormControl,TextareaAutosize } from "@mui/material";
// import styled from "styled-components";

const ContentInput = () => {
  const { content, setContent } = React.useContext(GeneralContext);
  return (
    <div className={styles.contentInput}>
    <FormControl size="medium" variant="filled"  style={{margin:"0.5rem auto",}}>
      <InputLabel
        focused={false}
        label="content"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        Message
      </InputLabel>
      <TextareaAutosize
        component="div"
        aria-label="maximum height"
        minRows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin={"dense"}
        required={true}
        style={{ boxShadow: "1px 1px 3px 1px white",minWidth:"300px",width:"100%" }}
      />
    </FormControl>
    </div>
  );
};

export default ContentInput;