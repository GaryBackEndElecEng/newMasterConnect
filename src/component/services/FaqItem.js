import React from 'react';
import styles from './services.module.css';
import styled from 'styled-components';
import {Box,Typography,Stack} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CustFaqItem = styled(Box)`
margin:${({margin})=>margin};
opacity:${({opacity})=>opacity};
background:${({background})=>background };
height:auto;
transition:all 1s linear;
cursor:pointer;


`;
const CustFaqAnswer = styled(Box)`
margin:auto 2px;
opacity:${({opacity})=>opacity};
background:var(--background-FaqQuestion);
height:${({showitem})=>showitem ? "15vh":"0"};
transition:all 1s linear;
@media screen and (max-width:900px){
  transition:all 1s linear;
    height:${({showitem})=>showitem ? "20vh":"0"};
}
@media screen and (max-width:600px){
  transition:all 1s linear;
    height:${({showitem})=>showitem ? "80vh":"0"};
}

`;

const FaqItem = ({obj,getWidth}) => {
    const faq_item=React.useRef(null);
    const [openitem,setOpenitem]=React.useState(false);
    const [showitem,setShowitem]=React.useState(false);
    const fontSizeChange= openitem ? "120%":null;
    const threshold= getWidth <900 ? 0.2:0.8;
    

    React.useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            let entry = entries[0];
            if (entry.isIntersecting) {
                // entry.target.style.transform="scale(1.1)";
                setOpenitem(true);
            }else{
                // entry.target.style.transform="scale(1)";
                setOpenitem(false);
            }
          },
          { threshold: threshold }
        );
        if (faq_item.current) {
          observer.observe(faq_item.current);
          return () => observer.disconnect();
        }
      }, []);

    const handleClickShow=(e)=>{
        e.preventDefault();
        if(!showitem){
            setShowitem(true);
        }else{setShowitem(false);}
    }
  return (
    <CustFaqItem
    openitem={openitem}
    onClick={(e)=>handleClickShow(e)}
    margin={openitem ? "3rem 0":"2rem 0"}
    opacity={openitem ? "1":"0.5"}
    background={openitem ? "var(--background-FaqQuestion)":"black"}
    >
    <div ref={faq_item}>
        <Stack direction="row" spacing={{xs:1,sm:10}} sx={{alignItems:"center",justifyContent:"flex-start",width:"100%",margin:"auto 0",}}>
        <Typography
        component="h1"
        variant="h6"
        sx={{ margin: "0.5rem 2px",fontSize:fontSizeChange }}
        >
            {obj.question}
        </Typography>
           {showitem ? <ArrowDropDownIcon sx={{color:"white",fontSize:"190%"}}/> : <ArrowDropUpIcon sx={{color:"red",fontSize:"190%"}}/> }
        </Stack>
        

        <CustFaqAnswer
        opacity={showitem ? "1":"0"}
        showitem={showitem}
        // height={showitem ? "15vh":"0"}
        // heightsm={showitem ? "20vh":"0"}
        // heightxs={showitem ? "80vh":"0"}
        >
            {
            showitem && <Typography
            component="h1"
            variant="h6"
            sx={{ margin: "auto" }}
            >
                {obj.answer}
            </Typography>
            }
        </CustFaqAnswer>

    </div>
        
    </CustFaqItem>
  )
}

export default FaqItem