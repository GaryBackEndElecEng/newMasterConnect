import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Card, CardMedia, Fab, Stack, Container, Paper } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const MainContainer = styled(Container)`
margin: 1rem auto;

display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
position:relative;
min-height:80vh;
box-shadow:1px 1px 10px 4px lightgrey;
background:${({ bg }) => bg};

`;
const Contract = () => {
    const navigate = useNavigate();
    const myRef = useRef();
    const {  loggedIn } = useContext(TokenAccessContext);
    const { setChangePage, setTitle, setStyleName } = useContext(GeneralContext);
    const [file, setFile] = useState({ loaded: false, data: "" });
    const [content, setContent] = useState('');
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;

    useEffect(() => {
        // const pdf="https://new-master.s3.ca-central-1.amazonaws.com/static/pdf/Untitled+document+-+Google+Docs.pdf";
        const file2 = "https://docs.google.com/document/d/e/2PACX-1vSa0rXGhNN4xGMocxaXugKBXdlaSNYkkqPugDIWqGOmZUelKrldRoe797-g7MfCb6QYWUBvAmlO-rti/pub?embedded=true"
        const fileNoEmbed = "https://docs.google.com/document/d/e/2PACX-1vSa0rXGhNN4xGMocxaXugKBXdlaSNYkkqPugDIWqGOmZUelKrldRoe797-g7MfCb6QYWUBvAmlO-rti/pub?print=true"

        if (file2) {
            setFile({ loaded: true, data: file2 })
        }
        setTitle("agreement");
        setStyleName("contract");
        setContent(fileNoEmbed)
    }, []);

    const getElement = useCallback((ele) => {

        // console.log(ele)
    }, []);

    const handlePrint = (e) => {
        e.preventDefault();
        const a_anchor = document.createElement("a");
        a_anchor.href = content;
        document.body.appendChild(a_anchor);
        // a_anchor.ref=myRef;
        a_anchor.click();
        document.body.remove(a_anchor);
    }

    const handleReturn = (e) => {
        e.preventDefault();
        navigate("/MyAccount", setChangePage(true))
    }
    return (
        <MainContainer maxWidth="md"

        >
            <iframe
                ref={getElement}
                title="Agreement"
                id="iframe_"
                src={file.loaded ? file.data : ""}
                style={{ width: "100%", height: "80vh", boxShadow: "1px 1px 10px 4px lightgrey" }}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center",justifyContent:"center",margin:"1rem auto",padding:"1rem" }}>
                <Fab variant="extended" size="medium" color="primary" onClick={(e) => handleReturn(e)}>
                    return <KeyboardReturnIcon sx={{ ml: 1, color: "green" }} />
                </Fab>
                <Fab variant="extended" size="medium" color="primary" onClick={(e) => handlePrint(e)}>
                    print <LocalPrintshopIcon sx={{ ml: 1, color: "red" }} />
                </Fab>
            </Stack>
        </MainContainer>
    )
}

export default Contract