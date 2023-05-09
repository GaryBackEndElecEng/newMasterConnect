import React from 'react';
import styles from './blog.module.css';
import styled from 'styled-components';
import {Stack,Container,Typography} from '@mui/material';

const CustGenImage=styled.div`
margin:0;
display:${({show})=>show ? "flex":"none"};
width:100%;
padding:0.5rem;
position:relative;
// border:1px solid red;
justify-content:center;
align-items:center;
flex-direction:column;
animation: appearIn 1s ease-in;
@keyframes appearIn {
from {opacity:0;}
to {opacity:1;}
}
`;
const CustImage=styled.img`
padding:0.25rem;
margin:0;
opacity:1;
max-width:80%;
max-height:80%;
animation: appearInOut 1s ease-in;
@keyframes appearInOut {
    0% {opacity:0;}
    100% {opacity:1;}
}
@media and (max-width:900px){
    max-width:100%;
    max-geight:100%
}
`;




const GenerateMovie = ({imageArray}) => {
    const [show,setShow]=React.useState(false);
    const[image,setImage]=React.useState({loaded:false,data:{}});
    React.useEffect(()=>{
        let count=0;
        setShow(true);
        const genCount=()=>{
            if(count<imageArray.length-1){
                setImage({loaded:true,data:{image:imageArray[count].image,name:imageArray[count].name}})
                count++;
                setTimeout(()=>{
                    genCount();
                    
                },1000);
            }else{
                setShow(false);
                setImage({loaded:false,data:[]});
            }
        }
        genCount();
    },[imageArray,setImage]);

  return (
    <CustGenImage
    className={styles.custGenImage}
    show={show}
    >
        
        <div className={styles.imageContainer}>
            {
                image.loaded && show &&
                <div>
                    <Typography component="h1" variant="h3">{image.data.name}</Typography>
                    <CustImage src={image.data.image} alt="www.masterconnect.ca"
                    key={`${2}-imageGen`}
                    className={styles.custImage}
                    />
                </div>    
            }
        </div>
        
    </CustGenImage>
  )
}

export default GenerateMovie