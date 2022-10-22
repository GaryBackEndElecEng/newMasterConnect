import styled from 'styled-components';
// import {Box} from '@mui/material';

export const ContainerT = styled.div.attrs({className:"hello"})`
    width:1000px;
    max-width:100%;
    padding: 0 20px;
    margin: 0 auto;
    color:${({colore})=>colore};
    text-align:center;
    background:${({bg})=>bg};
    border-radius:2%;
    animation: name 1s ease-in;

@media screen and (max-width: 1000px){
@keyframes name {
 from {
    opacity:1;
 }
 to{
    opacity:0;
 }
}
}
@media screen and (max-width:600px){
   width:100%;
   display:flex;
   flex-direction:column;
   justify-content:flex-start;
   align-items:center;
   transform:scale(.8) translateX(25%) translateY(45%);
   max-height:20vh;
   background:transparent;
   color:white;

   
}
@media screen and (min-width: 600px) and (max-width:800px){
   display:'none';
}
`;

export const FlexGrid = styled.div.attrs({className:"FlexGrid"})`
display:grid;
width:100%;
grid-template-columns: 1fr 2fr 1fr;
grid-auto-rows: auto;
box-shadow:1px 2px 2px solid darkgrey;
column-gap:10px;
padding:1rem;

@media screen and (max-width:500px){
   display:flex;
   justify-content:flex-start;
   align-items:center;
   flex-direction:column;
   row-gap:1rem;

}
`;
export const DivTranslate=styled.div.attrs({className:"DivTranslate"})`
display:${({block})=>block};
width:100%;
justify-content:space-between;
align-items:center;
animation: shiftLeft 1s ease-in;


@keyframes shiftLeft {
   from{
      transform:translateX(100%);
      opacity:0;
   }
   to{
      transform:translateX(0%);
      opacity:1;
   }
}
`;
export const ContainerFluid=styled.div.attrs({className:" container-fluid ContainerFluid"})`
position:relative;
width:95vw;
margin:1rem 10px;
margin-top:4.5rem;
padding:10px;
display:flex;
flex-direction:column;
align-items:space-between;
justify-content:flex-start;

@media screen and (max-width:600px){
   margin-top:0;
}

`;
export const ContainerFooterFluid=styled.div.attrs({className:" container-fluid ContainerFluid"})`
position:relative;
width:100vw;
margin:0;
margin-top:0;
padding:10px;
display:flex;
flex-direction:column;
align-items:space-between;
justify-content:center;

@media screen and (max-width:600px){
   margin-top:0;
}

`;
export const ContainerFluidBgImage=styled.div.attrs({className:"containerFluidImage"})`
position:relative;
width:100vw;
height:100vh;
margin:0;
margin-top:0;
padding:10px;
display:flex;
flex-direction:column;
align-items:space-between;
justify-content:center;
background-image:url(${({bgImage})=>bgImage});
background-size: 100% 160%;

@media screen and (max-width:600px){
   margin-top:0;
}

`;

export const ContainerFlowersBgImage=styled.div.attrs({className:"containerFluidImage"})`
position:relative;
width:100vw;
height:auto;
margin:auto;
margin-top:0;
padding-top:5rem;
padding-bottom:2rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
background-image:url(${({bgImage})=>bgImage});
background-size: 25% 25%;

@media screen and (max-width:600px){
   margin-top:0;
   background-size: 100% 50%;
   padding-top:1rem;
}

`;

export const ContainerHomeFluid=styled.div.attrs({className:" container-fluid ContainerFluid1"})`
position:relative;
width:100vw;
min-height:100vh;
margin:0;padding:0;
margin-top:1vh;

display:flex;
background:${({bg})=>bg};

flex-direction:column;
align-items:space-between;
justify-content:center;

@media screen and (max-width:600px){
   margin-top:-1vh;
   height:auto;
}

`;
export const ContainerAboutFluid=styled.div.attrs({className:" container-fluid ContainerFluid2"})`
width:100vw;
position:relative;
margin:0;
// margin-top:4rem;
padding:10px;
display:flex;
flex-direction:column;
align-items:space-between;
justify-content:center;
overflow:hidden;

@media screen and (max-width:600px){
   margin-top:0;
}

`;
export const ContainerAboutFront=styled.div.attrs({className:" ContainerAboutFront"})`
position:absolute;
margin:auto;
width:150%;
height:50px;
margin-top:16rem;
z-index:-1;
left:-15%;
top:50px;
transform:rotate(165deg);
background: linear-gradient(${({alpha})=>alpha}deg, rgba(0,0,255,.8), rgba(0,0,255,0) 77%),
            linear-gradient(-${({alpha})=>alpha}deg, rgba(0,255,0,.3), rgba(255,0,0,0) 77%),
            linear-gradient(${({alpha})=>alpha}deg, rgba(0,0,255,.8), rgba(0,0,100,0) 77%);

animation: rotateColor 2s ease-in;
@keyframes rotateColor {
   from {
      transform:rotate(0deg);
   }
   to{
      transform: rotate(165deg);
   }
}
@media screen and (max-width:600px){
   margin-top:0;
}

@media screen and (max-width:700px){
   margin:auto;
width:220%;
height:150px;
margin-top:16rem;
z-index:-1;
left:-15%;
top:105px;
transform:rotate(98deg);
}
animation: rotateColor 2s ease-in;
@keyframes rotateColor {
   from {
      transform:rotate(0deg);
   }
   to{
      transform: rotate(98deg);
   }
}

`;

export const ContainerAboutFront2=styled.div.attrs({className:" ContainerAboutFront2"})`
position:absolute;
margin:auto;
width:150%;
height:50px;
margin-top:16rem;
z-index:-1;
left:-15%;
top:120vh;
transform:rotate(25deg);
background: linear-gradient(-${({alpha})=>alpha}deg, rgba(0,0,255,.8), rgba(0,0,255,0) 77%),
            linear-gradient(${({alpha})=>alpha}deg, rgba(0,255,0,.3), rgba(255,0,0,0) 77%),
            linear-gradient(-${({alpha})=>alpha}deg, rgba(0,0,255,.8), rgba(0,0,100,0) 77%);

animation: rotateColor2 2s ease-in;
@keyframes rotateColor2 {
   from {
      transform:rotate(0deg);
   }
   to{
      transform: rotate(25deg);
   }
}

@media screen and (max-width:700px){
   margin:auto;
width:190%;
height:150px;
margin-top:16rem;
z-index:-1;
left:-20%;
top:100vh;
transform:rotate(65deg);

animation: rotateColor2 2s ease-in;
@keyframes rotateColor {
   from {
      transform:rotate(0deg);
   }
   to{
      transform: rotate(65deg);
   }
}
}

`;
//NOT USED
export const HomeFlex=styled.div.attrs({className:"HomeFlex"})`
width:100%;
display:flex;
margin-top:5rem;
min-height:${({minHeight})=>minHeight}px;
justify-content:space-between;
align-items:flex-start;
@media screen and (max-width:600px){
   flex-direction:column;
   justify-content:flex-start;
   align-items:center;
}
`;



export const LogoWrapper=styled.div.attrs({className:"LogoWrapper"})`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
position:relative;
width:${({width})=>width}px;
margin:auto;
box-shadow:1px 2px 3px grey;


`;


