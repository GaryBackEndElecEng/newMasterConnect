import React from 'react';
import { Typography, Container, Stack } from '@mui/material';
import styled from 'styled-components';
// import styles from './article.module.css';
import ArticleSection from './ArticleSection'


const ArticlePageContainer = styled(Container)`
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
margin:1rem auto;
`;
const ArticlePage = ({ getArticle }) => {
    return (
        <ArticlePageContainer maxWidth="lg">
            {getArticle &&
                <Stack direction="column"  spacing={{ xs: 0, sm: 1, md: 2 }}>
                    <Typography component="h1" variant="h3" sx={{textAlign:"center"}}>
                        {getArticle.title}
                    </Typography>
                    <ArticleSection objArr={getArticle.article} title={getArticle.title} />
                </Stack>
        }

        </ArticlePageContainer>
    )
}

export default ArticlePage