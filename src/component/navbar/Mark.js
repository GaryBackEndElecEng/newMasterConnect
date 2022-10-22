import React,{useContext} from 'react';
import {useTheme} from '@mui/material/styles';
import {GeneralContext} from '../../context/GeneralContextProvider';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {MarkUp} from '../../styled/Div.styled';

const Mark = ({pageName,pageLink}) => {
    const {page}=useContext(GeneralContext);
    const theme=useTheme();
    const Name=(page===pageLink)? pageName:null;
    
    
    
        return (
            <>
           {Name ? <MarkUp style={{color:theme.palette.common.red,borderBottom:"black"}}>{Name}<ArrowLeftIcon/></MarkUp>
        :pageName
            }
            </>
          )
    
}

export default Mark
