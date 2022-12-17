import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Container, Stack, Grid, Typography, Paper, Fab, Avatar } from '@mui/material';
import api from '../axios/api';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LoginIcon from '@mui/icons-material/Login';
import { Box } from '@mui/system';


const ShowResultsMain = styled(Container)`
margin:2rem auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
max-height:50vh;
overflow-y:scroll;
background:${({ bg }) => bg};
animation:appearIn 1s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const CustomGrid = styled(Grid)`

display:flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:row;
color:white;
background:${({ bg1 }) => bg1};
box-shadow:1px 1px 5px 2px ${({ bs }) => bs};
@media screen and (max-width:900px){
    flex-direction:column;
}

`;

const ShowResults = styled(Box)`
margin:2rem auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
padding:2rem;
animation: appearIn 1s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const ShowQAResults = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { userSelectionArray, questionResults, setQuestionResults, setChangePage, UUID, setUUID, staticImage } = useContext(GeneralContext);
    const [sent, setSent] = useState(false)
    const [seeResults, setSeeResults] = useState(false);
    const [truncDigit, setTruncDigit] = useState(0);
    const logo="logo.png"
    useEffect(() => {
        const sendInfo = async () => {
            try {
                const res = await api.post('/account/postCalculatorResults/', userSelectionArray);
                const body = res.data.data;
                // console.log("BODY RESULTS", body)
                setQuestionResults({ loaded: true, data: body })
                setTruncDigit(Math.trunc(body.total / 10));
                setUUID({ loaded: true, uuid: body.uuid });
                localStorage.setItem("UUID", JSON.stringify(body.uuid))
                setSent(true);
            } catch (error) {
                console.error(error.message)
            }
        }
        if (userSelectionArray) {
            sendInfo();
        }
    }, []);

    const handleResults = (e) => {
        e.preventDefault();
        if (sent) {
            setSeeResults(true);
        }

    }
    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/register", setChangePage(true));
    }
    return (
        <ShowResultsMain
            maxWidth="xl"
            bg={"white"}
            sx={{
                maxHeight: "50vh",
                overflowY: "scroll",
            }}
        >
            <Typography component="h1" variant="h3" sx={{ margin: "2rem auto", textAlign: "center", }}>
                Results
            </Typography>
            {!seeResults ?
                <Box>
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>

                        {userSelectionArray && userSelectionArray.map((obj, index) => (
                            <CustomGrid item xs={12} sm={6} md={4}
                                bs={theme.palette.common.mediumBlue2}
                                key={`${index}-Results-${obj.id}`}
                                sx={{
                                    background: theme.palette.common.blueGrey,
                                    boxShadow: `1px 1px 5px 2px ${theme.palette.common.blueFade}`,
                                    color: "white", paddingdisplay: "flex", flexDirection: "column"
                                }}
                            >
                                <Stack direction="column" spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "auto" }}>
                                    <Paper elevation={3} sx={{ textAlign: "center" }}>
                                        <Typography component="h1" variant="h5" sx={{ padding: "0.5rem" }}>
                                            Question
                                        </Typography>
                                    </Paper>
                                    <Typography component="h1" variant="h6" sx={{ padding: "0.5rem" }}>
                                        {obj.Q}
                                    </Typography>
                                </Stack>
                                <Stack direction="column" spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "auto" }}>
                                    <Paper elevation={3} sx={{ textAlign: "center" }}>
                                        <Typography component="h1" variant="h5" sx={{ padding: "0.5rem" }}>
                                            answer
                                        </Typography>
                                    </Paper>
                                    <Typography component="h1" variant="h6" sx={{ padding: "0.5rem" }}>
                                        {obj.ans}
                                    </Typography>
                                </Stack>
                            </CustomGrid>

                        ))}
                    </Grid>
                    <Stack direction="column" sx={{ margin: "2rem auto" }}>
                        <Fab variant="extended" color="info" onClick={(e) => handleResults(e)}>
                            see Results <QuestionAnswerIcon sx={{ ml: 1, color: "green" }} />
                        </Fab>
                    </Stack>
                </Box>
                :
                <ShowResults>
                    <Typography component="h1" variant="h4" sx={{ margin: "2rem auto", textAlign: "center", }}>
                        Based on your answers
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{ margin: "2rem auto", textAlign: "center", }}>
                        The services will provide you with a good foundation. Adding additional services is very dynamic based on your selection
                    </Typography>
                    <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "auto" }}>
                        {(questionResults.loaded && questionResults.data) && questionResults.data.data.map((obj, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}
                                sx={{ background: "white", boxShadow: "1px 2px 6px 8px blue", padding: "1rem" }}
                            >
                                <Avatar src={`${staticImage}/logo.png`} alt="www.master-connect.ca" />
                                <Typography component="h1" variant="h5" sx={{ margin: "1rem auto", color: "black" }}>
                                    {obj.name}
                                </Typography>
                                <Typography component="h1" variant="h6" sx={{ color: "black" }}>
                                    {obj.summary}
                                </Typography>
                            </Grid>

                        ))}
                    </Grid>
                    <Typography component="h1" variant="h3" sx={{ margin: "2rem auto", color: "black" }}>
                        Your total is,
                        ${truncDigit}...
                    </Typography>
                    <Typography component="h1" variant="h4" sx={{ margin: "2rem auto", color: "black" }}>
                        your info is stored in an id :{UUID.loaded && UUID.uuid}
                    </Typography>
                    <Typography component="h1" variant="h6" sx={{ margin: "2rem auto", textAlign: "center", color: "black" }}>
                        Your long awaited data is temporarily saved within our server.We need to assign your data to your account. Your information is important to us and personal to you.You need to register so we know where to place it.
                    </Typography>
                    <Stack direction="column" sx={{ margin: "2rem auto" }} onClick={(e) => handleLogin(e)}>
                        <Fab variant="extended" color="primary">
                            Register to view results <LoginIcon sx={{ color: "green", ml: 1 }} />
                        </Fab>
                    </Stack>
                </ShowResults>
            }

        </ShowResultsMain>
    )
}

export default ShowQAResults