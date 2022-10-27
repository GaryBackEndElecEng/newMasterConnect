import React, {  useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './home.module.css';
import { Avatar, Fab } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';

const PopUpElement=styled.div.attrs({className:"home_popUp"})`
display:none;
position:absolute;
z-index:1000;
top:-50%;
left:30%;
width:90%;
text-transform:capitalize;
background:black;
padding:auto 0.5rem;
margin:0.5rem;
font-size:105%;
color:white;
font-weight:bold;
border-radius: 15% 5% 15% 5%;
box-shadow:5px 8px 40px whitesmoke,-5px -8px 40px whitesmoke;
animation: popUpgrow 0.75s ease-in;
padding: auto 0.75rem;

@keyframes popUpgrow {
    from {
        opacity:0;
       
    }
    to {
        opacity:1;
        
    }
}
@media screen and (max-width:600px){
    top:-60%;
    left:30%;
}
`;
const MsgPopper = ({ obj }) => {
    const navigate = useNavigate();
    let popUpRef = useRef();
    const { staticImage, setChangePage } = useContext(GeneralContext);
    const moon = `${staticImage}/images/moon.png`;
    const design=`${staticImage}/images/design.png`;

    const handleLink2 = (e, link) => {
        e.preventDefault();
        if(link.startsWith("https")){
           return  window.open(link)
        }
        navigate(link, setChangePage(true))
    }

    const handlePopper = (e,obj) => {
        if (e.currentTarget) {
            e.currentTarget.children.forEach((ele) => {
                if (ele.classList.contains("home_popUp")) {
                    ele.style.display = "block";
                    // if(obj.id%2 !==0 && window.innerWidth > 600){
                    //     ele.style.left="50%";
                    //     ele.style.top="-150%";
                    // }
                }
            })
            
            
        }
    }
    const handleClosePopper = (e) => {
        if (e.currentTarget) {
            e.currentTarget.children.forEach((ele) => {
                if (ele.classList.contains("home_popUp")) {
                    ele.style.display = "none";
                }
            })
        }
    }
    return (
        <Fab component="button" variant="extended"
            onClick={(e) => handleLink2(e, obj.link)}
            className={Styles.rentalBtn}
            onMouseOver={(e) => handlePopper(e,obj)}
            onMouseOut={(e) => handleClosePopper(e)}
            sx={{
                color: "blue", fontFamily: "Roboto", margin: " 1rem auto", position: "relative", width: "65%",
            }}
            key={obj.id}
        >
            <PopUpElement className={Styles.popUp} ref={popUpRef}>
                <h5 style={{ textDecoration: "underline", color: "white", fontFamily: "Cabin", fontSize: "20px" }}>{obj.name}</h5>
                {obj.summary}
            </PopUpElement>
            <Avatar src={design} className={Styles.design} sx={{mr:1, ml:0}} />
            <Avatar src={moon} className={Styles.avatar}  sx={{mr:2}}/>
            
            {obj.name}
        </Fab>
    )
}

export default MsgPopper