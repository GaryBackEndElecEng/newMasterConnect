import React, { useContext,useEffect, useState, useRef } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Grid, Divider, Typography, Stack, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from "./footer.module.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const FaqContainer= styled.div`
display:block;
width:95%;
background-image:url(${({bg})=>bg});
background-size:25% 25%;
background-color:${({bgc})=>bgc};
`;
const StackFAQS=styled(Stack)`
animation: revealThis 1s ease-in-out;

@keyframes revealThis {
    from { opacity:0;transform:translateY(20%);}
    to { opacity:1;}
}
`;


const Faqs = () => {
    const FAQSRef=useRef();
    const arrowDownRef = useRef();
    const arrowUpRef = useRef();
    const theme = useTheme();
    const [show, setShow] = useState(false);
    const [newArr,setNewArr]=useState([]);
    const {staticImage,allCategory} =useContext(GeneralContext);
    const bg2=`${staticImage}/middlebannerWallPaper.png`
    const moveLeft=!show ? "35%":"2%";
    const BtnColor= show ? "primary":"info";
    useEffect(()=>{
        const getFaq = async ()=>{
            const getFAQS2= await allCategory.data.filter(obj=>(obj.name==="footer"))[0].catFooter;
            // console.log("getFAQS2",getFAQS2)
            setNewArr(getFAQS2)
        }
        if(allCategory.loaded && allCategory?.data){
            getFaq();
        }
    },[setNewArr,allCategory.loaded,allCategory.data]);

    // console.log(newArr)
    

    const handleShow = (e, id) => {
        e.preventDefault();
        
        if (e.currentTarget) {
            let next = e.currentTarget.nextSibling;
            if (next) {
                next.style.display = 'block';
                if (next.nextSibling) {
                    next.nextSibling.style.display = "block";
                    e.currentTarget.style.display = "none";
                }
            }
        }

    }
    const handleHide = (e, id) => {
        e.preventDefault();
        
        if (e.currentTarget) {
            e.currentTarget.previousSibling.style.display = "block";
            e.currentTarget.nextSibling.style.display = "none";
            e.currentTarget.style.display = "none";
        }
    }
    const handleFAQS=(e)=>{ 
       if(show===false){
        setShow(true);
        }else{
            setShow(false);
        }
    }
    return (
        <FaqContainer bg={bg2} bgc={theme.palette.footer.light}>
            <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto", justifyContent:"flex-start",alignItems:"center" ,cursor:"pointer",position:"relative"}}>
                    <Fab variant="extended" color={BtnColor} onClick={(e)=>handleFAQS(e)}
                    sx={{marginLeft:moveLeft,transition:"margin-left 1s ease-in-out"}}
                    >
                    {show ? <ArrowDropDownIcon color={"black"} sx={{fontSize:"40px",}}/>
                    :
                    <ArrowDropUpIcon color={"black"}  sx={{fontSize:"40px"}}/>}
                        FAQS
                    </Fab>
                 
                </Typography>
            {show &&<StackFAQS direction={"column"} ref={FAQSRef} >
                <Divider sx={{ borderBottom: "3px solid blue", marginTop: "1rem", marginBottom: "1rem",fontFamily: "Roboto", }} />
                <Grid container spacing={3} sx={{margin:"auto"}}>
                    {newArr && newArr.map(obj => (
                        <Grid item md={6} xs={12} key={obj.id} sx={{ fontFamily: "Roboto" }}>
                            <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto",padding:"1rem" }}>
                                 {obj.question}
                            </Typography>

                            <KeyboardArrowUpIcon
                                onClick={(e) => handleShow(e, obj.id)}
                                ref={arrowDownRef}
                                sx={{ fontSize: { xs: "40px", sm: "40px" } ,color:theme.palette.footer.medium}}
                            />

                            <>
                                <KeyboardArrowDownIcon className={styles.arrowDown}
                                    ref={arrowUpRef}
                                    onClick={(e) => handleHide(e, obj.id)}
                                    sx={{ fontSize: { xs: "40px", sm: "40px" }, display: "none",color:theme.palette.footer.bannerWords }}
                                />
                                <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto", display: "none", animation: `${styles.showText} 1s ease-in-out;`,width:{xs:"90%",sm:"90%"},color:"blue"}}
                                    className={styles.answer}
                                >
                                    {obj.answer}
                                    <Divider sx={{ borderBottom: "2px solid red", width: "100%", marginTop: "1rem" }} />
                                </Typography>
                            </>

                        </Grid>

                    ))}
                </Grid>
            </StackFAQS> }

        </FaqContainer>
    )
}

export default Faqs