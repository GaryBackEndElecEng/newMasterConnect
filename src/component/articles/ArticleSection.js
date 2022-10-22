import React, {  useEffect, useState, } from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
// import { useTheme } from '@mui/material/styles';
import {  Paper, Typography, } from '@mui/material';
import BoltStrike from './BoltStrike';
import InsertMessage from './InsertMessage';
import ShrinkingAntArctica from './ShrinkingAntArctica';
// import styled from 'styled-components';
import styles from './article.module.css';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// const  antarcticaShrink = "https://s3.console.aws.amazon.com/s3/buckets/master-connect?region=ca-central-1&prefix=media/authApp/thwaites/antarcticaShrink/&showversions=false"

const ArticleSection = ({ objArr,title }) => {
    const [activateDoom,setActivateDoom]=useState(false);
    const [activateLightning,setActivateLightning]=useState(false);
    // const [covid,setCovid]=useState(false);
    const [cognitive,setCognitive]=useState(false);
    const [message,setMessage]=useState(false);

    useEffect(()=>{
        if(title === "Dooms Day Glacier"){
            setActivateDoom(true)
            
        }else(setActivateDoom(false))

        if(title === "The Phenomena of lightning"){
            setActivateLightning(true)
            
        }else(setActivateLightning(false))

        if(title === "cognitive"){
            setCognitive(true)
            setMessage("The right image: easy view, where as the left image:strained view ")
            
        }else(setCognitive(false))
    },[title,setActivateDoom,setActivateLightning,setCognitive])

    function createMarkup(text1) {
        if(text1){
        return {__html: text1};
        }else{
            return {__html: <div></div>};
        }

      }
    return (
        <>
        {activateDoom && <ShrinkingAntArctica/>}
        {activateLightning && <BoltStrike/>}
            {objArr !==null && objArr.map(obj => (
                <div key={obj.id} className={styles.articleSection} style={{position:"relative",width:"100%",margin:{xs:"1rem auto",sm:"auto"}}}>
                    <div style={{position:"relative",with:"100%",textAlign:"center"}}>
                    {obj.imageSection && <img className={styles.imageSection} src={obj.imageSection} alt="www.master-connect.ca"/>}
                    {cognitive && <InsertMessage message={message} />}
                    </div>
                    <Paper elevation={10} sx={{padding:"1rem"}} className={styles.articleSectionDangerous}>
                    <div style={{padding:"0.5rem"}} className={styles.articleSectionDangerous} dangerouslySetInnerHTML={obj.summary ? createMarkup(obj.summary):false}/>
                    </Paper>
                    <Typography component="h1" variant="h4" sx={{ margin: "1rem auto",textAlign:"center" }}>
                        {obj.subSection && obj.subSection}
                    </Typography>
                    <Paper elevation={10} className={styles.articleSectionDangerous}>
                    <div style={{padding:"0.5rem"}} className={styles.articleSectionDangerous} dangerouslySetInnerHTML={obj.content ? createMarkup(obj.content): false}/>
                    </Paper>
                    <Typography component="h1" variant="h4" sx={{ margin: "1rem auto",textAlign:"center" }}>
                        {obj.subSection1 && obj.subSection1}
                    </Typography>
                    <Paper elevation={10} className={styles.articleSectionDangerous}>
                    <div style={{padding:"0.5rem"}} className={styles.articleSectionDangerous} dangerouslySetInnerHTML={obj.content1 ? createMarkup(obj.content1) : false}/>
                    </Paper>
                    <Typography component="h1" variant="h4" sx={{ margin: "1rem auto",textAlign:"center" }}>
                        {obj.subSection2 && obj.subSection2}
                    </Typography>
                    <Paper elevation={10} className={styles.articleSectionDangerous}>
                    <div  style={{padding:"0.5rem"}} className={styles.articleSectionDangerous}dangerouslySetInnerHTML={obj.content2 ? createMarkup(obj.content2) : false}/>
                    </Paper>
                </div>
            ))}
        </>
    )
}

export default ArticleSection