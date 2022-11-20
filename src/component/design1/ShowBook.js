import React from 'react';
import { Stack,Typography, Paper,} from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const BookPressStack = styled(Stack)`
margin:auto;
width:100%;
position:absolute;
top:20%;
background:url(${({ bg_img }) => bg_img});
background-size:100% 100%;
justify-content:center;
z-index:1000;
align-items:center;
min-height:30vh;
animation: GrowIn 1s ease-in-out;
@keyframes GrowIn {
    from {opacity:0;transform:scale(0);}
    to {opacity:1;transform:scale(1);}
}
`;
const ShowBook = ({ title }) => {
    const theme = useTheme();
    const pic = "https://source.unsplash.com/random/"
    return (
        <BookPressStack
            direction="column" spacing={{ xs: 0, sm: 1 }}
            bg_img={pic}
        >
            <Paper elevation={20}
                sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",background:theme.palette.common.shadeGrey, color:"white"}}
            >
                <Typography component="h1" variant="h6"
                sx={{padding:"1rem"}}
                >
                    Takes you to the {title} page."vous-remenez a la page {title}.
                </Typography>
            </Paper>

        </BookPressStack>
    )
}

export default ShowBook