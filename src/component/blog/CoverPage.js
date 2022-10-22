import React, { useContext} from 'react'
// import { useNavigate,useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import styled from 'styled-components';


// import styles from './blog.module.css'
import SpellType from './SpellType';

const MainCoverpage = styled(Container)`
margin:auto;
display:flex;
position:relative;
justify-content:flex-start;
align-items:center;
flex-direction:column;
background-image:url(${({pic})=>pic});
background-size:100% 100%;
min-height:40vh;
box-shadow: 1px 1px 8px 5px ${({bg})=>bg};

@media screen and (max-width:900px){
  min-height:30vh;
}
@media screen and (max-width:600px){
  min-height:30vh;
}
`;

const CoverPage = () => {
    const theme=useTheme();
    const {url,staticImage}=useContext(GeneralContext)
    const pic=`${staticImage}/GreatMountain.png`;
  return (
    <MainCoverpage pic={pic} bg={theme.palette.common.blueGrey}>
        <SpellType/>

    </MainCoverpage>
  )
}

export default CoverPage
