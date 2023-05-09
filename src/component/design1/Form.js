import React from 'react';
import styles from './design1.module.css';
import styled from "styled-components";
import {Stack,InputLabel,FormControl,Input, TextareaAutosize, Fab, Typography}from "@mui/material";

const Form = () => {
  return (
    <form className={styles.form} style={{ background: "white" }}>
                <FormControl
                  size="medium"
                  variant="filled"
                  className={styles.formcontrol}
                >
                  <InputLabel
                    focused={false}
                    label="from"
                    sx={{ color: "black", fontFamily: "Philosopher" }}
                  >
                    from
                  </InputLabel>
                  <Input
                    component="div"
                    name="from"
                    placeholder=" This can be configured"
                    margin={"dense"}
                    required={true}
                    sx={{ boxShadow: "1px 1px 3px 1px white" }}
                  />
                </FormControl>
                <FormControl
                  size="medium"
                  variant="filled"
                  className={styles.formcontrol}
                >
                  <InputLabel
                    focused={false}
                    label="to"
                    sx={{ color: "black", fontFamily: "Philosopher" }}
                  >
                    to
                  </InputLabel>
                  <Input
                    component="div"
                    name="to"
                    placeholder=" To suit your preference"
                    margin={"dense"}
                    required={true}
                    sx={{ boxShadow: "1px 1px 3px 1px white" }}
                  />
                </FormControl>
                <FormControl
                  size="medium"
                  variant="filled"
                  className={styles.formcontrol}
                >
                  <InputLabel
                    focused={false}
                    label="comment"
                    sx={{ color: "black", fontFamily: "Philosopher" }}
                  >
                    Preferences gets stored to your liking.
                  </InputLabel>
                  <TextareaAutosize
                    component="div"
                    aria-label="maximum height"
                    minRows={4}
                    margin={"dense"}
                    required={true}
                    style={{ boxShadow: "1px 1px 3px 1px white",width:320 }}
                />
                </FormControl>

                <Fab
                  color="primary"
                  size="medium"
                  variant="extended"
                  sx={{ margin: "1rem auto" }}
                >
                  <Typography component="h1" variant={"h6"}>
                    submit
                  </Typography>
                </Fab>
              </form>
  )
}

export default Form