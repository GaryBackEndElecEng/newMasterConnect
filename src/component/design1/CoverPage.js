import React from "react";
import styled from 'styled-components';
import styles from './design1.module.css';


const CustCoverPage=styled.section`
margin:0;
position:relative;
padding:0;
margin-bottom:12rem;
width:100vw;
height:70dvh;
display: flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-image:url(${({bgimage})=>bgimage});
background-position: 50% 50%;
background-size:100% 100%;
animation: fallIn 3s ease-in-out;
@keyframes fallIn { 
    from {opacity:0;background-size:200% 200%;background-position:50% 0%;}
    to {opacity:1;background-size:100% 100%;background-position:50% 50%;}
}
@media screen and (max-width:900px){
    background-position: 50% 50%;
    background-size:150% 100%;
    margin-bottom:5rem;
    @keyframes fallIn { 
    from {opacity:0;background-size:250% 200%;background-position:50% 0%;}
    to {opacity:1;background-size:150% 100%;background-position:50% 50%;}
}
}
@media screen and (max-width:600px){
    background-position: 50% 50%;
    background-size:200% 100%;
    @keyframes fallIn { 
    from {opacity:0;background-size:300% 200%;background-position:50% 0%;}
    to {opacity:1;background-size:200% 100%;background-position:50% 50%;}
}
}
`;

const CoverPage = ({staticImage}) => {
    const mainDesign1=`${staticImage}/design1/mainDesign1.png`;
    const blueEffect=`${staticImage}/extra/blueEffect.png`;
    const [startText,setStartText]=React.useState(false);
React.useEffect(()=>{
    setTimeout(()=>{setStartText(true)},2500);
},[]);
    
  return (
    <CustCoverPage
    bgimage={mainDesign1}
    className={styles.custCoverPage}
    >
        <div>
            <p className={startText ? styles.fontStyleCoverPage: styles.hidden} style={{backgroundImage:`url(${blueEffect})`}} >
                GreatgetAway For You
            </p>
            <p className={startText ? styles.subFontStyle : styles.hidden}>
                The Best Short Term Vacation in the World
            </p>
            <p className={startText ? styles.subFontStyle : styles.hidden}>
                Discovery Is Yours
            </p>
        </div>
        
    </CustCoverPage>
  )
}

export default CoverPage