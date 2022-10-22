import React from 'react'
import {LogoSpan} from '../../styled/Div.styled';
import {Stack,Box} from '@mui/material';
import {useTheme} from '@mui/material/styles' ;

const TypeMConnect = ({load1,fontSize}) => {
    const theme=useTheme();
    let arr=[];
        const word= "Master-connect";
        const wordArray=word.split("");
        if(load1){
            for(var i=0;i<wordArray.length;i++){
                arr.push({id:i,word:wordArray[i]})
            }
    }
return (

    <Stack direction={"row"} sx={{width:"100%",margin:"auto",padding:"auto 1rem"}}>
        {arr && arr.map(obj=>(
            <LogoSpan
            color={theme.palette.logo.dark}
            shadow={theme.palette.logo.light}
            fontSize={fontSize}
            index={obj.id}
            key={obj.id}
            style={{marginLeft:"5px"}}
            >
                {obj.word}
            </LogoSpan>
            ))}
    </Stack>
)
  
}

export default TypeMConnect