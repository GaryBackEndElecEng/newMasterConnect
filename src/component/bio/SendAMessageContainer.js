import React, { useContext,} from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Divider,  Fab, Container, Typography, Stack,  Card, CardContent } from '@mui/material';
// import { ContainerFooterFluid } from '../../styled/Container.styled';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
// import { red } from '@mui/material/colors';
// import styles from './bio.module.css';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ImputForm from './ImputForm';

const StackOpenForm = styled(Stack)`
position:absolute;
width:100%;
background:${({ bg }) => bg};
top:-780%;
z-index:0;
transform:scale(0.7);
animation: scaleIn 1.5s ease-in-out;

@keyframes scaleIn {
    from {transform:scale(0);}
    to {transform:scale(.7);}
}
@media screen and (max-width:900px){
    top:-860%;
transform:scale(0.8);
 @keyframes scaleIn {
    from {transform:scale(0);}
    to {transform:scale(.8);}
}
@media screen and (max-width:600px){
    top:-970%;
    left:-0px;
transform:scale(1);
 @keyframes scaleIn {
    from {transform:scale(0);}
    to {transform:scale1);}
}
}
`;

const SendAMessageContainer = () => {
    const theme = useTheme();
    const { open, setOpen, isRequestInfo } = useContext(GeneralContext);
    const isOpenOpacity= open ? "0" : "1";



    const handleOpenQuote = (e) => {
        e.preventDefault();
        setOpen(true);

    }

    return (
        <Container maxWidth={"md"}
            sx={{ position: "relative" }}
        >
            <>
                <Divider sx={{ margin: "1rem auto" }} />
                <Stack direction={"column"} spacing={{ xs: 0, sm: 1,}}
                sx={{opacity:isOpenOpacity,display:"flex",alignItems:"center",}}
                >
                    <Fab variant="extended" color="info" onClick={(e) => handleOpenQuote(e)}>
                        Send developer a Msg <HowToRegIcon sx={{ ml: 1, color: "black" }} />
                    </Fab>
                </Stack>
                <Divider sx={{ margin: "1rem auto" }} />
            </>
            {open &&

                <StackOpenForm bg={theme.palette.common.fadeCharcoal}>
                    <ImputForm />
                </StackOpenForm>



            }
            {isRequestInfo &&
                <StackOpenForm bg={theme.palette.common.blueFade}>
                <Card elevation={10} sx={{ margin: "1rem auto", background: theme.palette.common.mediumTeal, padding: "1rem" }}>
                    <CardContent>
                        <Typography component="h1" variant="h4" sx={{ fontFamily: "Roboto" }}>
                            Your request has been recieved. We will responds as soon as possible!
                        </Typography>
                        <Typography component="h1" variant="h3" sx={{ fontFamily: "Roboto" }}>
                            Thank you for the request
                        </Typography>
                    </CardContent>
                </Card>
                </StackOpenForm>

            }
        </Container>
    )
}

export default SendAMessageContainer