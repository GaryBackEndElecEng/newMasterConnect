import React, {  useRef, useContext } from 'react';
// import Styles from './home.module.css';
import { Avatar, Fab } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';


const PopUpArticleElement = styled.div.attrs({ className: "home_ArticlePopUp" })`
display:none;
position:absolute;
z-index:10000;
top:-180%;
left:0%;
width:100%;
text-transform:capitalize;
background:black;
padding:1rem;
margin:0.5rem;
font-size:100%;
text-align:left;
font-family:Roboto,sans-serif;
color:${({color})=>color};
font-weight:bold;
border-radius: 15% 5% 15% 5%;
box-shadow:5px 8px 40px whitesmoke,-5px -8px 40px whitesmoke;
animation: popUpgrow 0.75s ease-in;
padding: auto 0.5rem;

@keyframes popUpgrow {
    from {
        opacity:0;
        
    }
    to {
        opacity:1;
        
    }
}
@media screen and (max-width:600px){
    left:0%;
    top:-220%;
    @keyframes popUpgrow {
        from {
            opacity:0;
           
        }
        to {
            opacity:1;
           
        }
    }
}
`;
const MsgArticlePopper = ({ obj }) => {
    const theme = useTheme();
    let popUpRef = useRef();
    const { staticImage, setChangePage } = useContext(GeneralContext);
    const article = `${staticImage}/article.png`;

    const handlePopper = (e, obj) => {
        if (e.currentTarget) {
            
            e.currentTarget.children.forEach((ele) => {
                if (ele.classList.contains("home_ArticlePopUp")) {
                    ele.style.display = "block";
                    if (obj.id % 2 !== 0) {
                        // ele.style.left = "300%";
                        // ele.style.top = "-50%";
                    }
                }
            })


        }
    }
    const handleClosePopper = (e) => {
        if (e.currentTarget) {
            e.currentTarget.children.forEach((ele) => {
                if (ele.classList.contains("home_ArticlePopUp")) {
                    ele.style.display = "none";
                }
            })
        }
    }
    const handleLinkArticle = (e, link) => {
        e.preventDefault();
        window.open(link)
        // setChangePage(false);
    }
    return (
        <Fab component="button" variant="extended"
            onClick={(e) => handleLinkArticle(e, obj.link)}
           
            onMouseOut={(e) => handleClosePopper(e)}
            onMouseOver={(e) => handlePopper(e, obj)}
            sx={{
                color: "blue", fontFamily: "Roboto", margin: " 1rem auto", position: "relative",width:"100%",

            }}
            key={obj.id}
        >
            <PopUpArticleElement
                ref={popUpRef}
                color={theme.palette.home.light}
            >
                <h5 style={{ textDecoration: "underline", color: "white", fontFamily: "Cabin", fontSize: "20px" }}>{obj.name}</h5>
                {obj.summary}
            </PopUpArticleElement>
            <Avatar src={article}  sx={{width:"85px",mr:1,height:"55px",padding:"10px",borderRadius:"25%",}} />
            {obj.name}
        </Fab>
    )
}

export default MsgArticlePopper