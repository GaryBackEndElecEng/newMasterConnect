import React, { useState, useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
// import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container, Fab } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const UploadCV = () => {
   
    const navigate=useNavigate();
    const {setChangePage}=useContext(GeneralContext);
    const [loadingData, setLoadingData ] =useState(false);
    const resume="https://new-master.s3.ca-central-1.amazonaws.com/static/files/Resume.pdf";
    
    useEffect(()=>{

        setTimeout(()=>{
            if(loadingData){
            let aExist=document.getElementById("download");
            document.body.remove(aExist);
            console.log("BELOW REMOVE aExist")
            }
        },0);
    },[loadingData]);

    const getFile = async (e) => {
        e.preventDefault();
        try {
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = resume;
            a.download = "Resume";
            a.id="download";
            document.body.appendChild(a);
            // a.download =resume;
            a.type="application/pdf";
            window.open(a,"_blank");
            navigate("/",setChangePage(true));
            // a.click();
            // console.log("below CLICK")
            setTimeout(()=>{
                let aExist=document.getElementById("download");
                if(aExist){
                setLoadingData(true);
                // console.log("INSIDE SET TIMEOUT")
                }
            },0);
            
        } catch (error) {
            console.error(error.message)
        }

    }
    return (
        <Container maxWidth={'md'} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Fab variant="extended" color="primary" onClick={(e) => getFile(e)}>
                    <CloudDownloadIcon sx={{mr:2}}/>
                    download Now
                </Fab>
        </Container>
    )
}

export default UploadCV