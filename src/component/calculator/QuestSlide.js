import React, { useContext, useEffect, useState, useRef } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import styles from './calculate.module.css';
import { Stack, Typography, Container, Fab, FormLabel, FormControl, InputLabel, Select, MenuItem, Input, Box, Paper } from '@mui/material';
import questArrayFalse from './questArrayFalse';
import questArrayTrue from './questArrayTrue';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustFormLabel = styled(FormLabel)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:90%;
padding:1rem;
margin:auto 16px;
`;
const CustStackSmall = styled(Stack)`
justify-self:flex-start;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:100%;
height:auto;
color:white;
text-align:center;
padding:1rem;
padding:1rem;
transform:translateX(${({ next }) => next * 100.85 * -1}%);
transition: transform 1s ease-in-out;
@media screen and (max-width:600px){
    transform:translateX(${({ next }) => next * 102 * -1}%); 
}
`;
const CustStack = styled(Stack)`
display:flex;
width:calc(${({ cust_width }) => (cust_width * (110.0))}% );
justify-content:flex-start;
align-items:center;
flex-direction:row;
flex-wrap:nowrap;
min-height:30vh;
animation: appearIn 1.5s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:600px){
    width:calc(${({ cust_width }) => (cust_width * (108.0))}% );
    margin-left:0px;
}

`;
const CustStackSmall1 = styled(Stack)`
justify-self:flex-start;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:100%;
height:auto;
color:white;
text-align:center;
padding:1rem;
transform:translateX(${({ next }) => next * 102.5 * -1}%);
transition: transform 1s ease-in-out;

@media screen and (max-width:600px){
    transform:translateX(${({ next }) => next * 106 * -1}%); 
}
`;
const CustStack1 = styled(Stack)`
display:flex;
width:calc(${({ cust_width }) => (cust_width * (122.0))}% );
justify-content:flex-start;
align-items:center;
flex-direction:row;
flex-wrap:nowrap;
min-height:30vh;
gap:1rem;
animation: appearIn 1.5s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:600px){
    width:calc(${({ cust_width }) => (cust_width * (122.0))}% );
    margin-left:0px;
}


`;
const QuestSlide = () => {

    const theme = useTheme();
    const getRefYesno = useRef();
    const getRefFill = useRef();
    const { userSelection, setUserSelection, userSelectionArray, setUserSelectionArray, setAnsweredFilled,userQuestionArray } = useContext(GeneralContext);
    const [next, setNext] = useState(0);
    const [answeredYesno, setAnsweredYesno] = useState(false);
    const [fillOutLength, setFillOutLength] = useState(0);
    const [yesnoLength, setYesnoLength] = useState(0);
    const [yesno, setYesno] = useState({loaded:false,data:[]});
    const [fillOut, setFillOut] = useState({loaded:false,data:[]});

    useEffect(() => {
        // let filloutObj = (userQuestionArray.loaded && userQuestionArray.data) ? userQuestionArray.data.filter(obj=>(JSON.parse(obj.yesno)===false)):null;
        // let yesnoObj = (userQuestionArray.loaded && userQuestionArray.data) ? userQuestionArray.data.filter(obj=>(JSON.parse(obj.yesno)===true)):null;
        // if(filloutObj && yesnoObj){
        setYesnoLength(questArrayTrue.length);
        setFillOutLength(questArrayFalse.length);
        setYesno({loaded:true,data:questArrayTrue});
        setFillOut({loaded:true,data:questArrayFalse});
        // }
    }, [userQuestionArray,setYesno,setFillOut]);

    const handleNextYesNo = (e, id) => {
        e.preventDefault();
        let lastLength = userSelectionArray.length;
        // console.log(userSelectionArray,"ID",id)

        if (lastLength < yesnoLength - 1) {
            setUserSelectionArray([...userSelectionArray, userSelection]);
            setNext(id => id + 1);
            // console.log(userSelectionArray)
        } else if (lastLength === yesnoLength - 1) {
            // console.log("'FINISHED!!")
            setAnsweredYesno(true)
            setNext(0);
        }


    }

    const handleNextFalse = (e, id) => {
        e.preventDefault();
        let lastLength = userSelectionArray.length
        setUserSelectionArray([...userSelectionArray, userSelection]);
        setNext(next => next + 1)
        // console.log(userSelectionArray)
        if (lastLength === (fillOutLength - 1 + yesnoLength - 1)) {
            // console.log("'FINISHED!!")
            setNext(0);
            setAnsweredFilled(true)

        }


    }
    const handleOnChange = (e, obj) => {
        if (e.target.value) {
            setUserSelection({ id: obj.id, Q: obj.Q, ans: e.target.value });


        }
    }


    return (
        <Box sx={{ margin: "2rem auto" }}>
            {!answeredYesno ?
                <Container maxWidth="md" sx={{ overflowX: "hidden", overflowY: "hidden", position: "relative", minHeight: { sm: "30vh" },
                }} >
                    <Paper elevation={20} >
                    <CustStack direction="row" spacing={{xs:1,sm:1}} cust_width={yesnoLength - 1} ref={getRefYesno} sx={{background:theme.palette.common.fadeCharcoal3}} >

                        {(questArrayTrue && questArrayTrue) && questArrayTrue.map((obj, index) => (
                            <CustStackSmall direction="column"
                                className={styles.question}
                                key={`${obj.id}-QA-${index}`}
                                next={next}
                                sx={{color:"white"}}
                            >
                                <Typography component="h1" variant="h4" sx={{margin:"1rem auto"}}>Yes No Question</Typography>
                                <Typography component="h1" variant="h6" sx={{ width: "100%",margin:"1rem auto" }}>{obj.Q}</Typography>
                                <CustFormLabel sx={{color:"white"}}>

                                    <FormControl fullWidth sx={{ width: "100%",color:"white" }}>

                                        <InputLabel id="yesno">Yes OR No</InputLabel>
                                        <Select
                                            type="text"
                                            defaultValue={"select"}
                                            sx={{color:"white"}}
                                            id="yesno"
                                            label="yes"
                                            name={userSelection.ans}
                                            onChange={(e) => handleOnChange(e, obj)}
                                        >
                                            <MenuItem disable value={"select"}>select</MenuItem>
                                            <MenuItem value={"yes"}>yes</MenuItem>
                                            <MenuItem value={"no"}>no</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Stack direction="column" sx={{marginTop:"2rem"}}>
                                        <Fab variant="extended" color="info" type="submit" onClick={(e) => handleNextYesNo(e, obj.id)}>
                                            next <NavigateNextIcon sx={{ ml: 1, color: "red" }} />
                                        </Fab>
                                    </Stack>


                                </CustFormLabel>


                            </CustStackSmall>

                        ))}



                    </CustStack>
                    </Paper>
                </Container>

                :

                <Container maxWidth="md" sx={{ overflowX: "hidden", overflowY: "hidden", position: "relative", minHeight: { sm: "30vh" }, marginTop: "2rem", margin: "1rem auto" }} >
                    <Paper elevation={20}>
                    <CustStack1 direction="row" spacing={1} 
                    cust_width={fillOutLength - 1} ref={getRefFill}
                    sx={{background:theme.palette.common.fadeCharcoal3,color:"white"}}
                    >
                        {(questArrayFalse && questArrayFalse) && questArrayFalse.map((obj, index) => (


                            <CustStackSmall1 direction="column"
                                className={styles.question}
                                key={`${obj.id}-QA-${index}`}
                                next={next}
                                sx={{color:"white"}}
                            >

                                <Typography component="h1" variant="h6">Fill in Question</Typography>
                                <Typography component="h1" variant="h6" sx={{ width: "100%" }}>{obj.Q}</Typography>
                                <CustFormLabel sx={{color:"white"}}>

                                    <FormControl fullWidth sx={{ width: "100%",color:"white" }}>

                                        <InputLabel id="yesno">Fill in The below</InputLabel>
                                        <label htmlFor="typeHere">Answer</label>
                                        <Input
                                            id="typeHere"
                                            type="text"
                                            sx={{color:"white"}}
                                            value={userSelection.ans}
                                            default={"choose/type"}
                                            label="ANSWER"
                                            name={userSelection.ans}
                                            onChange={(e) => setUserSelection({ id: obj.id, Q: obj.Q, ans: e.target.value })}
                                        />
                                    </FormControl>


                                </CustFormLabel>


                                <Stack direction="column">
                                    <Fab variant="extended" color="info" onClick={(e) => handleNextFalse(e, obj.id)}>
                                        next <NavigateNextIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </Stack>
                            </CustStackSmall1>

                        ))}
                    </CustStack1>
                    </Paper>
                </Container>
            }
        </Box>
    )
}

export default QuestSlide