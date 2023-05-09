import React from 'react';
import styles from './design1.module.css';
import {Stack,Card,Typography,Container, CardContent, InputLabel} from '@mui/material';
import styled from 'styled-components';
import {Calendars,getMonth} from './tools';
import Form from './Form';


const CustCalendarCard=styled(Card)`
margin:0;
padding:1rem;
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

`;

const Calendar = ({staticImage}) => {
const [calMonth,setCalMonth]=React.useState({loaded:false,data:{}});
const plank=`${staticImage}/design1/plank.png`;
let date =new Date();
let month=date.getMonth();


  return (
    <Container maxWidth="sm">
        <CustCalendarCard
        elevation={10}
        className={styles.custCalendarCard}
        sx={{backgroundImage:`url(${plank})`,backgroundSize:"100% 100%"}}
        >
            <div>
                <Typography component="h1" variant="h3" style={{margin:"1rem auto"}}>Calendar</Typography>
                <Typography component="h1" variant="h4" style={{margin:"1rem auto",textAlign:"center"}}>pick a day!</Typography>
                <Typography component="h1" variant="h4" style={{margin:"auto",textAlign:"center"}}>{getMonth(date)}</Typography>
            </div>
            <div className={styles.calendarFlex}>
                <Calendars date={date}/>
            </div>
            <CardContent sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Form/>
            </CardContent>


        </CustCalendarCard>
    </Container>
  )
}

export default Calendar