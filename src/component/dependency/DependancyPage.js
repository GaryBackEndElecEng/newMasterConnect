import React, { useContext, useState, useEffect } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useLocation } from 'react-router-dom';
import { Card, Container, Grid, Typography, Avatar, } from '@mui/material';
import {useTheme} from '@mui/material/styles';
import styled from 'styled-components';
import CoverPage from './CoverPage';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import DependentHelmet from './DependentHelmet';
import MainExpander from './MainExpander';

const MainDependant = styled.div`
width:100%;
margin:auto;
margin-top:2px;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
@media screen and (max-width:900px){
margin-top:-2px;
}
@media screen and (max-width:600px){
margin-top:-50px;
}
@media screen and (max-width:400px){
margin-top:-55px;
}
`;

const DependancyPage = () => {
    const location = useLocation();
    const theme=useTheme();
    const pathname = location.pathname
    const { setTitle, setStyleName, staticImage, serviceDependancy, average, getPathLocation, pageRatings, servDependantSummary, } = useContext(GeneralContext);
    const coverImage = `${staticImage}/serviceDependancyMain.png`;
    const [summary, setSummary] = useState("");
    const [desc, setDesc] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [wordCount,setWordCount]=useState(0);
    const [pageRatingHelmet, setPageRatingHelmet] = useState([]);
    const sendToHelmet= serviceDependancy.loaded ? serviceDependancy.data :null;

    useEffect(() => {
        if (pageRatings.loaded && pageRatings.data) {
            setPageRatingHelmet(pageRatings.data.filter(obj => (obj.page === pathname)))
        }
    }, [pathname, pageRatings]);

    useEffect(()=>{
        let text="",word=[],count=0;
     if(serviceDependancy.loaded){
        serviceDependancy.data.forEach((obj,index)=>{
           word.push(obj.category);
           text= text + ",,," + obj.desc.slice(0,120);
           count=index;
        });
        setKeywords(word);
        setDesc(text);
        setWordCount(count);
     }
     if ( servDependantSummary.loaded){
        setSummary(servDependantSummary.data.content)
     }
    },[serviceDependancy,servDependantSummary]);

    useEffect(() => {
        setTitle("Servs Dependencies");
        setStyleName("inter-related");
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, [setTitle, setStyleName]);
    

    return (
        <MainDependant
        >
            <RegisterPage />
            <GetRegisterPages />
            <PageRating />
            <CoverPage coverImage={coverImage} />
            <DependentHelmet
                summary={summary}
                desc={desc}
                wordCount={wordCount}
                image={coverImage}
                keywords={keywords}
                serviceDepends={sendToHelmet}
                getPathLocation={getPathLocation.loaded ? getPathLocation.data : ""}
                pageRatings={pageRatingHelmet}
            />
            <Container maxWidth="xl" sx={{padding:"1rem"}}>
                <Typography component="h1" variant="h3"
                    sx={{ textAlign: "center", margin: "1rem auto",padding:"1rem",colorr:theme.palette.common.blueGrey }}
                >
                    {servDependantSummary.loaded && servDependantSummary.data.title}
                </Typography>
                <Typography component="h1" variant="h6"
                    sx={{ textAlign: "left", margin: "0.5rem auto",padding:"1rem", }}
                >
                    {servDependantSummary.loaded && servDependantSummary.data.content}
                </Typography>
                <Typography component="h1" variant="h6"
                    sx={{ textAlign: "left", margin: "0.5rem auto",padding:"1rem", }}
                >
                    {servDependantSummary.loaded && servDependantSummary.data.content1}
                </Typography>
                {servDependantSummary.loaded && servDependantSummary.data.content2 && <Typography component="h1" variant="h6"
                    sx={{ textAlign: "left", margin: "0.5rem auto",padding:"1rem", }}
                >
                    {servDependantSummary.loaded && servDependantSummary.data.content2}
                </Typography>}
                {servDependantSummary.loaded && servDependantSummary.data.content3 && <Typography component="h1" variant="h6"
                    sx={{ textAlign: "left", margin: "0.5rem auto",padding:"1rem", }}
                >
                    {servDependantSummary.loaded && servDependantSummary.data.content3}
                </Typography>}
            </Container>
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 0, sm: 1 }}
                    sx={{ margin: "1rem auto" }}
                >
                    {serviceDependancy.loaded && serviceDependancy.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${obj.id}-Dependant-${index}`}>
                            <Card elevation={10}
                                sx={{ color: "black", padding: "1rem",position:"relative" }}
                            >
                                <Avatar src={coverImage}
                                    alt="www.master-connect.ca"
                                    sx={{ width: "75px", height: "75px", margin: "1rem" }}
                                />
                                <Typography component="h1" variant="h3"
                                    sx={{ margin: "1rem auto" }}
                                >
                                    {obj.category}
                                </Typography>
                                <Typography component="h1" variant="body1" >{obj.desc}</Typography>
                                <MainExpander obj={obj} staticImage={staticImage}/>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>


        </MainDependant>
    )
}

export default DependancyPage