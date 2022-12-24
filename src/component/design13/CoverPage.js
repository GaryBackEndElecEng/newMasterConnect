import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Container, Stack, Grid, Typography, CardMedia, Card } from '@mui/material';
import { useEffect } from 'react';

const MainCover = styled(Container)`
min-height:46vh;


`;
const SliderStack = styled(Stack)`
width:1000px;
flex-direction:row;
flex-wrap:nowrap;
// align-items:center;
overflow-x:hidden;
position:relative;
justify-content:flex-start;
background:white;
@media screen and (max-width:900px){
    width:800px;
}
@media screen and (max-width:800px){
    width:780px;
}
@media screen and (max-width:600px){
    width:400px;
}


`;
const SlidesStack = styled(Stack)`
justify-content:center;
flex-direction:column;
width:${({ width }) => width}%;
position:relative;
text-align:center;
padding:1rem;
transform:translateX(${({ transx }) => (-transx * 100)}%);
transform-box:inherit;
transition:transform 2s ease-in-out;
-webkit-overflow-scrolling: touch;
align-items:center;
@media screen and (max-width:900px){
    width:870px;
}
@media screen and (max-width:800px){
    width:770px;
}
@media screen and (max-width:600px){
    width:570px;
}
@media screen and (max-width:400px){
    width:390px;
}

`;
const CustomImg=styled.img`
@media screen and (max-width:900px){
    width:870px;
}
@media screen and (max-width:800px){
    width:770px;
}
@media screen and (max-width:600px){
    width:570px;
}
@media screen and (max-width:400px){
    width:390px;
}
`;

let count = 0;
const CoverPage = ({ staticImage, getArray }) => {
    const [getWidth, setGetWidth] = useState(null);
    const [count1, setCount1] = useState(null);
    const frameStackWidth = getArray.length * getWidth;
    useEffect(() => {
        if (window.innerWidth < 400) {
            setGetWidth(400);
        } else if (window.innerWidth > 400 && window.innerWidth < 600) {
            setGetWidth(500);
        } else if (window.innerWidth > 600 && window.innerWidth < 980) {
            setGetWidth(800);
        } else {
            setGetWidth(1000);
        }
    }, [setGetWidth, getWidth]);

    useEffect(() => {
        const countAdder = () => {
            if (count < 9) {
                setTimeout(() => {
                    count++;
                    setCount1(count);
                    countAdder();
                }, 4000);
            }else{
                count=0;
                countAdder();
            }
        }
        countAdder();
    }, [setCount1]);
    

    return (
        <MainCover maxWidth="lg" sx={{display:"flex",flexDirection:"column",alignItems:"center",margin:"0px"}}>
            <SliderStack
                direction="row" spacing={0}
                width1={`${getWidth - 100}px`}
            >
                {getArray && getArray.map((obj, index) => (
                    <SlidesStack
                        direction="column"
                        transx={count}
                        width={frameStackWidth}
                        spacing={{ xs: 0, sm: 1 }}
                        key={`${obj.id}--solar--${index}`}
                        sx={{
                            justifyContent: "center", alignItems: "center", position: "relative",
                            width: `${getWidth}px`
                        }}
                    >

                        <CustomImg src={`${staticImage}/solar/${obj.image}`} alt="www.masterconnect.ca"
                            
                        />
                        <Typography component="h1" variant="h3"
                            sx={{ margin: "1rem auto" }}
                        >
                            {obj.title}
                        </Typography>
                        <Typography component="h1" variant="h6"
                            sx={{ margin: "auto" }}
                        >
                            {obj.summary}
                        </Typography>


                    </SlidesStack>
                ))}
            </SliderStack>

        </MainCover>
    )
}

export default CoverPage