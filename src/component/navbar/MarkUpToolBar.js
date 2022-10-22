import React,{useContext} from 'react';
import {useTheme} from '@mui/material/styles';
import {GeneralContext} from '../../context/GeneralContextProvider';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styled from 'styled-components'

const MarkUp=styled.span.attrs({className:"MarkUp"})`
color:${({color})=>color};
borderBottom:black;
display:flex;
align-items:center;
animation: borderTranslate 1s ease-out;

@keyframes borderTranslate {
    from {
        opacity:0.5;
        borderBottom:red;
        transform:translateX(100%);
    }
    to{
        opacity:1;
        borderBottom:black;
        transform:translateX(0%)
    }
}
`;
const MarkUpToolBar = ({pageName,pageLink}) => {
    const {page}=useContext(GeneralContext);
    const theme=useTheme();
    const Name=(page===pageLink)? pageName:null;
    
    
    
        return (
            <>
           {Name ? <MarkUp color={theme.palette.common.blueGrey} style={{borderBottom:"black"}}><ArrowRightIcon /></MarkUp>
        :""
            }
            </>
          )
    
}

export default MarkUpToolBar