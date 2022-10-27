import React from 'react'
import {Stack,} from '@mui/material';
import {LogoSpan} from '../../styled/Div.styled';
import {useTheme} from '@mui/material/styles' ;

const TypeHelpConnect = ({load2,fontSize}) => {
    const theme=useTheme();
    const word2= "Helping-you-connect";
    const wordArray2=word2.split("");
    const arr=[];
    if(load2){
    
        for(var i=0;i<wordArray2.length;i++){
            arr.push({id:i,word:wordArray2[i]})
        };
    }
    return (
        <Stack direction={"row"} sx={{width:"100%",margin:"auto",padding:"auto 1rem"}}>
        {arr && arr.map(obj=>(
        <LogoSpan
        color={theme.palette.logo.help}
        shadow={theme.palette.logo.light}
        fontSize={fontSize}
        index={obj.id}
        key={obj.id}
        >
            {obj.word}
            </LogoSpan>))}
        </Stack>
        )
  
}

export default TypeHelpConnect