import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import {Paper} from '@mui/material';
// import {useTheme} from '@mui/material/styles';

import styled from 'styled-components';

const CustPaper2 = styled(Paper)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background:transparent;
position:absolute;
top:35%;
left:27%;



`;

const Internet = () => {
    // const theme=useTheme();
    return (
        <CustPaper2 elevation={0} component="div"
        sx={{left:{xs:"27%",sm:"30%",md:"24%"},borderRadius:"50%",
        top:{xs:"40%",sm:"34%",md:"32%"} ,width:{xs:"10%",sm:"20%"},background:"transparent"
            }}
        >
        
            <LanguageIcon 
            sx={{fontSize:{xs:"65px",sm:"140px",md:"160px"},color:{xs:"black",sm:"white",md:"black"},width:"150px",padding:"0",background:"transparant",borderRadius:"50%"
                    
        }}
            />
            </CustPaper2>
      )
}

export default Internet