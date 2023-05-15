import React from 'react';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import styles from './corporate.module.css';
import Scalable from './Scalable';
import {GeneralContext} from '../../context/GeneralContextProvider';
import SEOcommerce from './SEOcommerce';

const CustCorporate=styled.div`
margin:auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
position:relative;
overflow:hidden;
background:var(--background-scalable);
animation:appearInNow 1.5s ease-in;
@keyframes appearInNow {
    from {opacity:0;}
    to {opacity:1;}
}
`;

const Corporate = () => {
    const {generalInfo}=React.useContext(GeneralContext);
    const [start,setStart]=React.useState(null);
    const typoSize=window.innerWidth < 900 ? (window.innerWidth < 600 ? "h5":"h4"):"h3";

React.useEffect(()=>{
    if(!start){
        setTimeout(()=>{setStart(true);},1500);
    }
},[]);

  return (
    <CustCorporate
    className={styles.custCorporate}
    >
        <CoverPage typoSize={typoSize} start={start}/>
        <Scalable generalInfo={generalInfo} typoSize={typoSize}/>
        <SEOcommerce generalInfo={generalInfo} typoSize={typoSize}/>
        
    </CustCorporate>
  )
}

export default Corporate