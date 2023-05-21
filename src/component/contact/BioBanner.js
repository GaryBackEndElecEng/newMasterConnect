import React from 'react';
import {Stack,Container,Grid, Typography,Fab} from '@mui/material';
import styles from './contact.module.css';
import styled from 'styled-components';
import api from '../axios/api';
import {GeneralContext} from '../../context/GeneralContextProvider';
import UploadCV from "./UploadCV";

const CustBioBanner=styled(Container)`
margin:3rem auto;
padding-block:2rem;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:100%;
animation: slideIn 2.5s ease-in-out;
@keyframes slideIn {
    from {transform:translateX(-100%);}
    to {transform:translateX(0%);}
}
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){
   
}
`;
const GridChildPic=styled(Grid)`
margin:auto;
background-image:url(${({bgimage})=>bgimage});
background-size: 100% 100%;
background-position:50% 50%;
@media screen and (max-width:900px){
    height:43vh;
}
@media screen and (max-width:800px){
    height:45vh;
}
`;
const GridChild=styled(Grid)`
margin:auto;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
width:100%;
`;


const BioBanner = () => {
    const {staticImage}=React.useContext(GeneralContext);
    const [french,setFrench]=React.useState(false);
const [getIntro,setGetIntro]=React.useState({loaded:false,object:{}});
const [getIntroFr,setGetIntroFr]=React.useState({loaded:false,object:{}});
const bioPic=`${staticImage}/profilePic1.png`;

React.useEffect(()=>{
    const intro = async()=>{
        try {
            const res=await api.get('/category/');
            const body=res.data.filter(obj=>(obj.name==="main")).filter(obj=>(obj.section==="bio"))[0].catWordSnippet[0];
            const bodyFr=res.data.filter(obj=>(obj.name==="main")).filter(obj=>(obj.section==="bio"))[0].catWordSnippet[1];
            setGetIntro({loaded:true,object:body});
            setGetIntroFr({loaded:true,object:bodyFr});
        } catch (error) {
            console.error(error.message);
        }
    }
    intro();
},[]);

const handleCovert=(e)=>{
    e.preventDefault();
    if(!french){
        setFrench(true);
    }else{
        setFrench(false);
    }
}
  return (
    <CustBioBanner
    maxWidth="xl"
    >
        <div className={styles.hr_line}/>
        <Grid container spacing={{xs:2,md:4}} sx={{width:"100%",margin:"auto"}}>
            <GridChildPic item xs={12} md={4}
            bgimage={bioPic}
            />
            <GridChild item xs={12} md={8}
            className={styles.gridChild}
            >
                <Stack direction="column" sx={{width:"100%",justifyContent:"flex-start",alignItems:"center"}}
                >
                    {!french ? <Fab size="medium" color="info" variant="extended" onClick={(e)=>handleCovert(e)}>francais</Fab>
                    :
                    <Fab size="medium" color="info" variant="extended" onClick={(e)=>handleCovert(e)}>English</Fab>}
                    {
                    getIntro.loaded && getIntroFr.loaded && !french ? 
                    <div>
                    <Typography component="h2" variant={"h2"} sx={{margin:"2rem auto"}}>{getIntro.object.title}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntro.object.content}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntro.object.content1}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntro.object.content2}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntro.object.content3}</Typography>
                    </div>
                :
                <div>
                    <Typography component="h2" variant={"h2"} sx={{margin:"2rem auto"}}>{getIntroFr.object.title}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntroFr.object.content}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntroFr.object.content1}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntroFr.object.content2}</Typography>
                    <Typography component="h3" variant={"h6"}>{getIntroFr.object.content3}</Typography>
                    </div>
                }
                </Stack>
            </GridChild>
        </Grid>
<UploadCV/>
    </CustBioBanner>
  )
}

export default BioBanner