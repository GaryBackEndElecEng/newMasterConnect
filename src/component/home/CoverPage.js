import React, {  useContext,  } from 'react';

import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { Typography, Box } from '@mui/material';
import Styles from './home.module.css';


const CustBox = styled(Box).attrs({ className: "customSiteTitle" })`
margin:1rem auto;
margin-top:2rem;
 width:100%;
 height:20vh;
 box-shadow:1px 2px 3px 15px black,-1px -2px 3px 15px black,
animation: mergeBelow 1.25s ease-in;
@keyframes mergeBelow {
    from {opacity:0;transform:translateY(100%)}
    to {opacity:1;transform:translateY(0%)}
}
`;
const WebDesign = styled(Typography)`
display:block;
animation: webDesign 1.5s ease-in-out;
@keyframes webDesign {
    from { transform:scale(0);opacity:0;}
    to {transform:scale(1);opacity:1;}
}
`;
const PersonBack = styled.img.attrs({ className: "persBack" })`
position:absolute;
top:12%;
left:75%;
transform:scale(1.2);
animation: mergePersBack 1.25s ease-in;
@keyframes mergePersBack {
    from {opacity:0;transform:translateX(20%) scale(0.8)}
    to {opacity:1;transform:translateY(0%) scale(1.2)}
}
@media screen and (max-width:900px){
    top:42%;
    left:70%;
    transform:scale(1.5);

    @keyframes mergePersBack {
        from {opacity:0;transform:translateX(20%) scale(1);}
        to {opacity:1;transform:translateY(0%) scale(1.5);}
    }
}

@media screen and (max-width:780px) {
    top:33%;
    left:70%;
    transform:scale(1.5);

    @keyframes mergePersBack {
        from {opacity:0;transform:translateX(20%) scale(1);}
        to {opacity:1;transform:translateY(0%) scale(1.5);}
    }
}
@media screen and (max-width:500px){
    top:32%;
    left:70%;
    transform:scale(1);

    @keyframes mergePersBack {
        from {opacity:0;transform:translateX(20%) scale(1);}
        to {opacity:1;transform:translateY(0%) scale(1);}
    }
}


`;

const CoverPage = ({makeEasy}) => {
    const { staticImage } = useContext(GeneralContext);
    const persBack = `${staticImage}/persBack.png`;
    const landScape = `${staticImage}/landscape.png`;
    return (
        <div
            style={{
                width: "100%", margin: "auto 0px", backgroundImage: `url(${landScape})`, minHeight: "40vh", backgroundSize: "100% 100%", display: "flex", flexDirection: "column", justisfyContent: "flex-start", alignItems: "center", position: "relative",padding:"0px",boxShadow:"1px 1px 10px 8px grey",

            }}
        >
            <CustBox >
                <Typography
                    component="h1" variant="h3"
                    sx={{
                        color: "white", padding: { xs: "1rem 10px", sm: "1rem" }, zIndex: "100",
                        fontSize: { xs: "28px", sm: "30px" }, fontFamily: "Roboto",marginTop:{xs:"0px",sm:"0.5rem",md:"-10px"}
                        ,marginLeft:{md:"3rem"}
                    }}
                >
                    The Freedom to Get Exactly What You Want- Hassle-Free!
                </Typography>
                <Typography
                    component="h1" variant="h5"
                    className={makeEasy ? Styles.customSiteTitle2 : Styles.noShow}
                    sx={{
                        color: "white", padding: { sm: "1rem", xs: "0" }, zIndex: "100",
                        fontSize: { xs: "18px", sm: "20px" }, margin: "2rem auto", fontFamily: "Roboto"
                        ,marginLeft:{md:"3rem"}

                    }}
                >
                    Making Life Easy!
                </Typography>
                {makeEasy && <WebDesign
                    component="h1" variant="h1"
                    className={makeEasy ? Styles.customSiteTitle2 : Styles.noShow}
                    sx={{
                        color: "white", padding: { sm: "1rem", xs: "0" }, zIndex: "100",
                        fontSize: { xs: "30px", sm: "40px" }, margin: "1rem", fontFamily: "Roboto"
                        ,marginLeft:{md:"3rem"}

                    }}
                >
                    Custom Web Design
                </WebDesign>}
            </CustBox>
            {makeEasy && <PersonBack src={persBack} alt="www.master-connect.ca" />}


        </div>
    )
}

export default CoverPage