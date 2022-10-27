import React, {useContext} from 'react';
// import styles from './postAccount.module.css';
import styled from 'styled-components';
import { Container, Paper, Stack, Typography } from '@mui/material';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {useTheme} from '@mui/material/styles';


const CustomContainer = styled(Container)`
justify-content:center;
align-items:center;
flex-direction:column;
position:absolute;
min-height:15vh;
top:10%;
left:-0%;
width:100%;
font-size:70%;
background:${({bg})=>bg};
animation: growInto 1.5s ease-in-out;
@keyframes growInto {
    from { opacity:0;transform:scale(0);}
    to { opacity:1;transform:scale(1);}
}
@media screen and (max-width:860px){
    top:5%;
    left:-2%;
}
@media screen and (max-width:600px){
    top:4%;
    left:-0%;
}
`;

const SummaryDesc = ({ staticImage,desc,summary}) => {
    const theme=useTheme();
    const {MyRef}=useContext(GeneralContext);
    const design = `${staticImage}/design.png`

    

 
    return (
        <>
          <CustomContainer bg={theme.palette.common.blueGrey} ref={MyRef}>
            <Stack direction={{xs:"column"}}>
            <Paper elevation={10} 
            sx={{ textAlign: "center", width: "100%", margin: "0.25rem auto", fontFamily: "Roboto",
             padding: "0.5rem"
              }}>
                    <Typography component="h1" variant="h4" 
                    sx={{fontSize:{xs:"180%",sm:"200%",md:"160%"},
                    textDecoration:"underline",fontWeight:"bold"
                    
                    }}>
                        
                        summary</Typography>
                    <Typography component="h1" variant="h4" 
                    sx={{fontSize:{xs:"160%",sm:"180%",md:"130%"}
                    
                    }}>
                        
                        {summary}</Typography>

            </Paper>
            <Paper elevation={10} 
            sx={{ textAlign: "center", width: "100%", margin: "0.25rem auto", fontFamily: "Roboto",
             padding: "0.5rem"
              }}>
                <Typography component="h1" variant="h4" 
                    sx={{fontSize:{xs:"180%",sm:"200%",md:"160%"},
                    textDecoration:"underline",fontWeight:"bold"
                    
                    }}>
                        
                        description</Typography>
                    <Typography component="h1" variant="h4" 
                    sx={{fontSize:{xs:"160%",sm:"180%",md:"130%"}
                    
                    }}>
                        
                        {desc}</Typography>

            </Paper>
            </Stack>
        </CustomContainer>
        </>
        
    )
}

export default SummaryDesc