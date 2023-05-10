import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Typography,Stack,Fab} from '@mui/material';
import styled from 'styled-components';
import styles from './design.module.css';

const CustStackStartNow=styled(Stack)`
margin:auto;
opacity:${({turnon})=>turnon ? "1":"0"};
width:100%;
transform:${({turnon})=>turnon ? "translateX(0%)": "translateX(-20%)"};
transition:all 1.5s ease-in;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
position:relative;
`;

const StartNow = () => {
    const navigate=useNavigate();
    const paraLeftRef = React.useRef();
    const [turnon,setTurnon]=React.useState(null);
    const threshold= window.innerWidth <600 ? 0.2 :0.7;

    React.useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            let entry = entries[0];
            if (entry.target) {
              if (entry.isIntersecting) {
                setTurnon(true);
              }
            }
          },
          { threshold: threshold }
        );
          if(paraLeftRef.current){
        observer.observe(paraLeftRef.current);
        return ()=>observer.disconnect();
          }
      }, []);

    const handleRequest = (e) => {
        e.preventDefault();
        navigate("/start-project");
      };
      const handleProcess = (e) => {
        e.preventDefault();
        navigate("/process");
      };

  return (
    <CustStackStartNow
    direction={{xs:"column"}}
    turnon={turnon}
    className={styles.custStackStartNow}
    ref={paraLeftRef}
    >
        <Stack direction={{xs:"column",sm:"row"}} spacing={{xs:1,sm:2}} sx={{alignItems:"center",justifyContent:"center",margin:"0.5rem auto"}} >
            <Typography
                component={"h1"}
                variant={"h3"}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnon ? styles.fontStyle_2 : null}
            >
                Start a project
            </Typography>
            <Fab
                size="large"
                color="secondary"
                variant="extended"
                sx={{ margin: "1rem auto" }}
                onClick={(e) => handleRequest(e)}
            >
                start now!
            </Fab>
        </Stack>
        <Stack direction={{xs:"column",sm:"row"}} spacing={{xs:1,sm:2}} sx={{alignItems:"center",justifyContent:"center",margin:"0.5rem auto"}}>
            <Typography
                component={"h1"}
                variant={"h3"}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnon ? styles.fontStyle_2 : null}
            >
                Our Process
            </Typography>
            <Fab
                size="large"
                color="info"
                variant="extended"
                sx={{ margin: "1rem auto" }}
                onClick={(e) => handleProcess(e)}
            >
                What We provide!
            </Fab>
        </Stack>
              
    </CustStackStartNow>
  )
}

export default StartNow