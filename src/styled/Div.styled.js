import styled from 'styled-components';



export const TextSlider=styled.div.attrs({className:"TextSlider"})`
position:absolute;
opacity:1;
top:0%;
left:0px;
width:100%;
display:${({show})=>show};
z-index:1000;
color:white;
animation: name2 1s ease-in;


@keyframes name2 {
    from { 
        opacity:0;
        transform:translateX(100%);
    }
    to{
        opacity:1;
        transform:translateX(0%);
    }
}
`;
export const GraphicWord = styled.span.attrs({className:"GraphicWord"})`
position:absolute;
top:40%;
left:20%;
background:transparent;

@media screen and (max-width:700px){
    position:absolute;
    top:30%;
    left:43%;
}

@media screen and (max-width:600px){
    position:absolute;
    top:10%;
    left:43%;
}
@media screen and (max-width:500px){
    position:absolute;
    top:8%;
    left:43%;
}
`;
export const GridData = styled.div.attrs({className:"GridData"})`
display:grid;
grid-template-columns:2fr 1fr;
grid-auto-rows:auto;
place-items:center;
grid-gap:0.5rem;

@media screen and (max-width:850px){
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
}
`;

export const HeaderEffect = styled.div.attrs({className:"HeaderEffect"})`
display:${({show})=>show};
text-align:center;
color:${({color})=>color};
background:${({bg})=>bg};
padding:0 1.5rem;
border-radius:5%;
width:100%;
margin:0 auto;
animation: shiftHeader 1.5s ease-in;

@keyframes shiftHeader {
    from {
        opacity:0;
        transform:scale(0) ;
    }
    to {
        opacity:1;
        transform:scale(1) ;
    }
}
`;
export const MoonWalk = styled.div.attrs({className:"MoonWalk"})`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:1rem;
border-radius:50%;
height:600px;
width:600px;
margin:auto;
display:${({display})=>display};
alt:www.master-connect.ca;

animation:moonMove 3s ease-in;

@keyframes moonMove {
    from {
        opacity:0;
        transform:scale(0.5) translateX(-300%);
    }
    to {
        opacity:1;
        transform:scale(1) translateX(0%);

    }
}
@media screen and (max-width:780px){
    flex-direction:column;
    justify-content:flex-end;
    padding:0.5rem;
    height:350px;
    width:350px;
    position:absolute;
    left:50%;
    top:-160px;

    @keyframes moonMove {
        from {
            opacity:0;
            transform:scale(0.5) translate(-300%,-500%);
        }
        to {
            opacity:1;
            transform:scale(1) translate(0%,-10%);
    
        }
    }
}

@media screen and (max-width:600px){
    flex-direction:column;
    justify-content:flex-end;
    padding:0.5rem;
    height:200px;
    width:200px;
    position:absolute;
    left:50%;
    top:-160px;

    @keyframes moonMove {
        from {
            opacity:0;
            transform:scale(0.5) translate(-300%,-500%);
        }
        to {
            opacity:1;
            transform:scale(1) translate(0%,-10%);
    
        }
    }
}
`;
export const BoxAutomate = styled.h6.attrs({className:"BoxAutomate"})`
font-size:20px;
display:${({display})=>display};
position:absolute;
animation:showPara 1.5s ease-in;
transition:width 1.5s ease-in;
left:-100%;
top:100%;

@keyframes showPara {
    from {
        opacity:0;
        transform:scale(0);
    }
    to {
        opacity:1;
        transform:scale(1);
    }
}

`;
export const PictureEffect =styled.img.attrs({className:"PictureEffect"})`
src:${({src})=>src};
alt:"www.master-connect.com";
animation:easeIn 1s ease-in;
width:100%;
height:100%;
filter: contrast(126%);
@keyframes easeIn {

    from {
        transform:scale(0.85);
        opacity:0;
    }
    to{
        transform:scale(1);
        opacity:1;
    }
}
`;
export const CanvasLogo =styled.canvas.attrs({className:"CanvasLogo"})`
background:${({background})=>background};
border-style:groove;
border-color:${({borderColor})=>borderColor};
border-radius:15%;
box-shadow:1px 2px 3px ${({shadow})=>shadow};


`;
//LOGO MESSAGES
export const LogoSpan=styled.span.attrs({className:"LogoSpan activate"})`

top:15vh;
display:inline;
color:${({color})=>color};
font-size:${({fontSize})=>fontSize}px;
text-shadow:4px 4px 4px ${({shadow})=>shadow};
animation:slideWord ${({index})=>index/6 + 1.5}s ease-in-out;



@keyframes slideWord {
    from {
        opacity:0;
        transform:translate(300%,-300%);

    }
    to{
        opacity:1;
        transform:translate(0%,0%);
    }
}
`;
//LOGO
export const LogoBox=styled.div.attrs({className:"LogoBox"})`
display:flex;
width:auto;
justify-content:center;
flex-direction:column;
align-items:center;
background:${({background})=>background};
position:absolute;
top:32%;
left:10%;

`;
//REMOVES LOGO
export const RemoveLogo = styled.div.attrs({className:"LogoBox"})`
display:${({display})=>display};
width:auto;
justify-content:center;
flex-direction:column;
align-items:center;
background:transparent;
margin:auto;
animation: mkVanish 1.5s ease-out;

@keyframes mkVanish{
    from {
        opacity:1;
        transform:translate(0%,0%) scale(1);
    }
    to {
        opacity:0.5;
        transform:translate(-200%,-75%) scale(0);
    }
}
`;
//GROWS MENU LOGO
export const MenuLogoBox = styled.div.attrs({className:"MenuLogoBox"})`
display:${({display})=>display};
width:${({width})=>width}px;
height:auto;
justify-content:center;
flex-direction:column;
align-items:center;
background:transparent;
margin:auto;
animation: grow 1.5s ease-out;

@keyframes grow{
    from {
        opacity:0;
        transform:translate(-90%,-90%) scale(0);
    }
    to {
        opacity:1;
        transform:translate(0%,0%) scale(1);
    }
}
`;
export const NavDropDown=styled.div.attrs({className:"NavDropDown"})`
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
padding:0;
width:250px;
background:${({background})=>background};
animation: growWidth 1.5s eas-in;


@keyframes growWidth {
    from {
        opacity:0;
        padding:0;
    
        transform:scale(0) translateX(-50%);
    }
    to{
        opacity:0;
    
        padding:0 2rem;
        transform:scale(1) translateX(0%);
    }
}

`;

export const MarkUp=styled.span.attrs({className:"MarkUp"})`
color:${({color})=>color};
borderBottom:black;
display:flex;
align-items:center;
animation: borderTranslate 1s ease-out;

@keyframes borderTranslate {
    from {
        opacity:0.5;
        borderBottom:red;
        transform:translateX(100%);
    }
    to{
        opacity:1;
        borderBottom:black;
        transform:translateX(0%)
    }
}
`;
