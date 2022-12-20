import React, { useContext, useEffect,  } from 'react'

import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import {  Stack, Container,} from '@mui/material';
// import styles from './postAccount.module.css';
import styled from 'styled-components';
import Particulars from '../postAccount/Particulars';
import Services from './Services';
import UserSelected from './UserSelected';
import SumaryCost from './SumaryCost';
import PostHelmet from './PostHelmet';



const MainPostAccount = styled.div`
margin:1rem 0px;
width:100vw;
background-image:url(${({ bg }) => bg});
background-size:100% 100%;
min-height:36vh;
box-shadow:1px 2px 13px 8px ${({ color }) => color};


`;

const PostAccount = () => {
    const theme = useTheme();
    const {usersPostService,usersService}=useContext(TokenAccessContext);
    const { staticImage, setStyleName, setTitle,serviceDependancy } = useContext(GeneralContext);
    const coverpage = `${staticImage}/homeBg3.png`;


    useEffect(() => {
        setTitle("post Account");
        setStyleName("We are almost there");
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    }, [setTitle,setStyleName]);

    return (
        <>
        <PostHelmet/>
            <MainPostAccount color={theme.palette.common.blue} bg={coverpage}>
                <Container maxWidth="lg"
                    sx={{
                        margin: "2rem auto", marginTop: { xs: "4rem", sm: "1rem" },
                        minHeight: { xs: "30vh", sm: "" },
                        display: 'flex', justifyContent: "flex-start", alignItems: "center", flexDirection: "column",
                        fontFamily: "Roboto", marginBottom: { xs: "2rem", sm: "3rem" }
                    }}>
                    <Particulars />
                </Container>
            </MainPostAccount>
            <Container maxWidth={"xl"} sx={{position:"relative"}}>
                <Stack direction={{xs:"column",md:"row"}} spacing={{ xs: 1,md:2, lg: 2 }}
                sx={{alignItems:"center",justifyContent:"center"}}
                >
                    <Services />
                    <UserSelected serviceDependences={serviceDependancy} />
                </Stack>
            </Container>
            <SumaryCost/>
            
        </>

    )
}

export default PostAccount