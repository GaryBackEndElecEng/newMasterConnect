import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';

const NewChecked=styled(CheckIcon).attrs({className:"NewCheckedIcon"})`
color:red;
position:absolute;
margin:1rem auto;
// top:20%;
right:5%;
font-size:32px;
animation:${({bool})=>(bool==='true' ? 'rotate360 0.5s ease-in-out;' : "")};

@keyframes rotate360 {
    from {
        
        transform:rotate(0deg) scale(1);
    }
    to{
        
        transform:rotate(360deg) scale(1.5);
    }
}

`;

const Checked = ({bool}) => {
  return (
    <NewChecked bool={bool}/>
  )
}

export default Checked