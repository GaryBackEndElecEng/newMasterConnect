import React, { useContext, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import Amount from './Amount';
import ProductsAndServices from './ProductsAndServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Stack, Container, Paper, Typography, Grid, Card, CardContent, CardMedia, FormGroup, FormControl, InputLabel, Fab, Input } from '@mui/material';

import styles from './consult.module.css';
import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import TaskIcon from '@mui/icons-material/Task';

const AdditionalQuestions = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {  user_id,setUserAccount,setUserOptions  } = useContext(TokenAccessContext);
    const { loggedIn,  staticImage } = useContext(GeneralContext);
    const { getProductList, getServiceList } = useContext(PriceContext);
    const [ question1, setQuestion1 ] = useState("");
    const [ question2, setQuestion2 ] = useState("");
    const [ question3, setQuestion3 ] = useState("");
    const [ question4, setQuestion4 ] = useState("");
    const [ recieved, setRecieved ] = useState(false);
    const imgConsult3 = `${staticImage}/consult3.png`;
    const Question1="Ask us something1"
    const Question2="Ask us something2"
    const Question3="Ask us something3"
    const Question4="Ask us something4"
    const revievedQuests= setRecieved ? " We recieved your questions and will respond ASAP":"something went wrong. We will call you ASAP. Thank you for your input.";
    const isFilled=(question1 !=="" || question2 !=="" || question3 !=="" || question4 !=="" )  ? true:false;

    const handleSubmit = (e)=>{
        e.preventDefault();
        const submitQuestion= async ()=>{
            const params={
                "user_id":user_id,
                "question1":question1 ? question1 : "NA",
                "question2":question2 ? question2 : "NA",
                "question3":question3 ? question3 : "NA",
                "question4":question4 ? question4 : "NA",
            }
            try {
                const res = await apiProtect.post("/account/UserOptions/",params);
                const body=res.data;
                setUserAccount({loaded:true,data:body});
                setUserOptions({loaded:true,data:body.options})
                setQuestion1("");
                setQuestion2("");
                setQuestion3("");
                setQuestion4("");
                setTimeout(()=>{setRecieved(false)},6500)
                setRecieved(true);
            } catch (error) {
                console.error(error.message)
            }
        }
        if(loggedIn && isFilled){submitQuestion();}
    }

    return (
        <Container maxWidth="sm"
        sx={{margin:"1rem auto",marginBottom:"2rem"}}
        >
            <Card className={styles.QuestionFormCard}
            sx={{display:"flex",justifyContent: "center", alignItems: "center", flexDirection: "column",
            backgroundColor:theme.palette.common.shadeGrey,boxShadow:"1px 2px 10px 10px grey"
            }}>
                <CardMedia component="img" image={imgConsult3} alt="www.master-connect.ca" 
                sx={{width:"70%",height:"100%",}} 
                />
                <Typography component="h1" variant="h5">Your Thoughts</Typography>
                <CardContent
                    sx={{
                        display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding:"0.5rem",width:"100%",backgroundColor:theme.palette.common.shadeGrey,
                    }}>
                    <form className={styles.form} style={{background:theme.palette.common.darker,position:"relative"}}>
                        <FormControl
                        fullWidth={true}
                        variant="filled"
                        name="question1"
                        sx={{background:"white",borderRadius:"1%",margin:"0.5rem auto"}}
                        >
                            <InputLabel
                            htmlFor={"question1"}
                            >Question 1</InputLabel>
                            <Input
                            sx={{padding:"auto 10px",margin:"10px"}}
                            autoFocus={true}
                            id="question1"
                            name="question1"
                            aria-describedby="question1"
                            value={question1 }
                            onChange={(e) => setQuestion1(e.target.value)}
                            >

                            </Input>

                        </FormControl>
                        <FormControl
                        fullWidth={true}
                        variant="filled"
                        name="question2"
                        sx={{background:"white",borderRadius:"1%",margin:"0.5rem auto"}}
                        >
                            <InputLabel
                            htmlFor={"question2"}
                            >Question 2</InputLabel>
                            <Input
                            sx={{padding:"auto 10px",margin:"10px"}}
                            id="question2"
                            name="question2"
                            aria-describedby="question2"
                            value={question2 }
                            onChange={(e) => setQuestion2(e.target.value)}
                            >

                            </Input>

                        </FormControl>
                        <FormControl
                        fullWidth={true}
                        variant="filled"
                        name="question3"
                        sx={{background:"white",borderRadius:"1%",margin:"0.5rem auto"}}
                        >
                            <InputLabel
                            htmlFor={"question3"}
                            >Question 3</InputLabel>
                            <Input
                            sx={{padding:"auto 10px",margin:"10px"}}
                            id="question3"
                            name="question3"
                            aria-describedby="question3"
                            value={question3 }
                            onChange={(e) => setQuestion3(e.target.value)}
                            >

                            </Input>

                        </FormControl>
                        <FormControl
                        fullWidth={true}
                        variant="filled"
                        name="question4"
                        sx={{background:"white",borderRadius:"1%",margin:"0.5rem auto"}}
                        >
                            <InputLabel
                            htmlFor={"question4"}
                            >Question 4</InputLabel>
                            <Input
                            sx={{padding:"auto 10px",margin:"10px"}}
                            id="question4"
                            name="question4"
                            aria-describedby="question4"
                            value={question4 }
                            onChange={(e) => setQuestion4(e.target.value)}
                            >

                            </Input>

                        </FormControl>
                        <Stack direction="column" sx={{textAlign:"center",marginTop:"2rem"}}>
                            <Fab variant="extended" color={"secondary"} type="submit" onClick={(e)=>handleSubmit(e)}>
                                submit <TaskIcon sx={{ml:2}}/>
                            </Fab>
                        </Stack>
                        <div className={recieved ? styles.yesRecieved : styles.hidden}>{revievedQuests}</div>
                    </form>
                </CardContent>

            </Card>
        </Container>
    )
}

export default AdditionalQuestions