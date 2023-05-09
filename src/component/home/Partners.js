import React from 'react';
import styles from './home.module.css';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {Stack,Card,Typography, Container,Grid,CardMedia} from "@mui/material";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import styled from "styled-components";

const LogoStackChild=styled(Stack)`
padding:10px;
animation: slideLogo 35s ease-in-out infinite;
animation-direction:alternate;
background:var(--background-33);
@keyframes slideLogo {
    from {transform:translateX(0%);}
    to {transform:translateX(${({transformx})=>transformx}%);}
}
@media screen and (max-width:900px){
    @keyframes slideLogo {
        from {transform:translateX(0%);}
        to {transform:translateX(${({transformx})=>(transformx -50)}%);}
    }
}
@media screen and (max-width:600px){
    @keyframes slideLogo {
        from {transform:translateX(0%);}
        to {transform:translateX(${({transformx})=>(transformx -200)}%);}
    }
}

`;

const Partners = () => {
    const {staticImage}=React.useContext(GeneralContext);
    const url=`${staticImage}/logo`;
    const width="96%";
    const height="56%";
    const arr=[
        {id:1,name:"Adobe",icon:<CardMedia component="img" src={`${url}/adobe.png`} className={styles.cardMedia} sx={{width:width,height:height}}/>},
        {id:2,name:"Magnento",icon:<CardMedia component="img" src={`${url}/magnento.png`}  className={styles.cardMedia}/>},
        {id:3,name:"MS 365",icon:<CardMedia component="img" src={`${url}/ms365.png`}   className={styles.cardMedia}/>},
        {id:4,name:"Sales force",icon:<CardMedia component="img" src={`${url}/salesForce.png`}   className={styles.cardMedia}/>},
        {id:5,name:"SAP",icon:<CardMedia component="img" src={`${url}/sap.png`}  className={styles.cardMedia}/>},
        {id:6,name:"Shopify",icon:<CardMedia component="img" src={`${url}/shopify.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        {id:7,name:"Django",icon:<CardMedia component="img" src={`${url}/django.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        {id:8,name:"Python",icon:<CardMedia component="img" src={`${url}/python.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        {id:9,name:"Javascript",icon:<CardMedia component="img" src={`${url}/javascript.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        {id:10,name:"Postgres",icon:<CardMedia component="img" src={`${url}/psql.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        {id:11,name:"SQL",icon:<CardMedia component="img" src={`${url}/sql.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        {id:12,name:"React",icon:<CardMedia component="img" src={`${url}/react.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        {id:13,name:"Figma",icon:<CardMedia component="img" src={`${url}/figma.png`}   className={styles.cardMedia}  sx={{width:width,height:height}}/>},
        
    ]
  return (
    <div  className={styles.section5Container} style={{background:"var(--background-111)",zIndex:"100"}}>
    <Container maxWidth="md" sx={{margin:"auto"}} >
        <Typography component="h1" variant="h5" className={styles.section5Title} sx={{margin:"1rem auto",marginBottom:"2rem",fontFamily:"'Philosopher', sans-serif"}}>
        WE PARTNERED WITH THE BEST-IN-CLASS OF TECHNOLOGY PLATFORMS.
        </Typography>
        <Stack direction="row" className={styles.stackParent} spacing={2}>
            {
                arr.length > 0 && arr.map((obj,index)=>(
                    <LogoStackChild transformx={-arr.length*80} direction="column" key={`${obj.id}--${index}`}
                    sx={{flex:{md:"0 0 250px",sm:"0 0 250px",xs:"0 0 175px"},}}
                    
                    >
                        <Card component="div" elevation={2} className={styles.card} sx={{backgroundColor:"transparent"}}>
                            <Typography component="h1" variant="h5" className={styles.write} >{obj.name}</Typography>
                        
                        {obj.icon}
                        
                        </Card>
                    </LogoStackChild>
                ))
            }
        </Stack>
    </Container>
    </div>
  )
}

export default Partners;