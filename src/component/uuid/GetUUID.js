import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import { Grid, Stack, Typography, Card, Container, Paper, Fab } from '@mui/material';
import apiProtect from '../axios/apiProtect';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const MainUUID = styled(Container)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
margin:2rem auto;

@media screen and (max-width:900px){
  
}
@media screen and (max-width:600px){

}
@media screen and (max-width:400px){

}
`;
const GetUUID = () => {
  const navigate = useNavigate();
  const { getUUID, user_id } = useContext(TokenAccessContext);
  const { setTitle, setStyleName, setChangePage } = useContext(GeneralContext);
  const { userQuestionArray } = useContext(PriceContext);
  const [storeUUID, setStoreUUID] = useState({ loaded: false, data: [] });
  const [questAns, setQuestAns] = useState({ loaded: false, data: [] });

  useEffect(() => {
    setTitle("Q && A");
    setStyleName("only written answers are shown");
  }, [setTitle, setStyleName]);


  useEffect(() => {

    const getUuid = async () => {
      const params = { "user_id": user_id, "uuid": getUUID.data }
      try {
        const res = await apiProtect.post('account/getUuid/', params);
        const body = res.data;
        setStoreUUID({ loaded: true, data: body });
      } catch (error) {
        console.error(error.message)
      }
    }
    if (getUUID.loaded) {
      getUuid();
    }

  }, [getUUID, user_id]);

  useEffect(() => {
    let arr = [];
    if (userQuestionArray.data && storeUUID.loaded) {
      userQuestionArray.data.filter(obj => (JSON.parse(obj.yesno) === false)).forEach((obj, index) => {
          if (obj.Q.includes("industry")) {
            arr.push({ "Q": obj.Q, "ans": storeUUID.data.industry })
          }
          if (obj.Q.includes("existing site")) {
            arr.push({ "Q": obj.Q, "ans": storeUUID.data.website })
          }
          if (obj.Q.includes("company")) {
            arr.push({ "Q": obj.Q, "ans": storeUUID.data.co })
          }
      });

      setQuestAns({ loaded: true, data: arr })
    }

  }, [setStoreUUID, storeUUID, userQuestionArray.loaded, userQuestionArray.data]);

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/MyAccount", setChangePage(true))
  }

  return (
    <MainUUID
      maxWidth="xl"
    >
      <Typography component="h1" variant="h4" sx={{ textAlign: "center", margin: "2rem auto" }}> Your written answers are only shown</Typography>
      <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
        {(questAns.loaded && questAns.data) &&
          questAns.data.map((obj, index) => (
            <Grid item xs={12} sm={6} key={`${index}-${obj}`}>
              <Card elevation={3}>
                <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
                  <Typography component="h1" variant="h6">{obj.Q}</Typography>
                  <Typography component="h1" variant="body1"><span style={{ color: "blue" }}>Your ans:</span>{obj.ans}</Typography>
                </Stack>

              </Card>
            </Grid>
          ))}
      </Grid>
      <Stack direction="column" sx={{ textAlign: "Center", alignItems: "center", margin: "2rem auto" }}>
        <Fab variant="extended" color="primary" size="large" onClick={(e) => handleReturn(e)}>
          return <KeyboardReturnIcon sx={{ ml: 1, color: "red" }} />
        </Fab>
      </Stack>
      <Paper elevation={3} sx={{ margin: "1rem auto", padding: "0.5rem" }}>
        <Typography component="h1" varaint="h3" sx={{ margin: "2rem auto", textAlign: "center" }}> True/False Questions</Typography>
        <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "1rem auto", justifyContent: "flex-start", alignItems: "flex-start" }}>
          {(userQuestionArray.loaded && userQuestionArray.data) &&
            userQuestionArray.data.filter(obj => (JSON.parse(obj.yesno) === true)).map((obj, index) => (
              <Grid item xs={12} sm={6} key={`${index}-${obj}`} sx={{ margin: { xs: "1rem auto", sm: "1rem auto", md: "auto" } }}>
                <Card elevation={3}>
                  <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
                    <Typography component="h1" variant="h6">{obj.Q}</Typography>

                  </Stack>

                </Card>
              </Grid>
            ))}

        </Grid>
      </Paper>

    </MainUUID>
  )
}

export default GetUUID