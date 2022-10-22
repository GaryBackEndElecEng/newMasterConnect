import styled from 'styled-components';
import {blue,grey} from '@mui/material/colors';

export const GlobalCardDiv1 = styled.div.attrs({className:"GlobalCardDiv1"})`
background:rgba(255,0,0,0.1);
color:${({color})=>color};
width:${({width})=>width};
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;
export const GlobalCardContent1 = styled.div.attrs({className:"GlobalCardContent1"})`
color:${({color})=>color};
padding:0.25rem;
display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;
box-shadow:1px 2px 5px ${blue[500]};
margin:0.5rem;
`;

export const GlobalPaper = styled.div.attrs({className:"GlobalPaper"})`

box-shadow: 1px 2px 3px grey;
background:rgba(255,0,0,0.1);

`;

export const GlobalCardDiv2 = styled.div.attrs({className:"GlobalCardDiv2"})`
background:${grey[50]};
color:${({color})=>color};
width:${({width})=>width};
display:flex;
flex-wrap:nowrap;
justify-content:space-between;
align-items:flex-start;
gap:5px;
padding:0.5rem 1rem;

@media screen and (max-width:500px){
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    gap:10px;
    padding:0.25rem 0.5rem;
}

`;
export const GlobalColFlex = styled.div.attrs({className:"GlobalColFlex"})`
display:flex;
position:relative;
flex-direction:column;
justify-content:flex-start;
align-items:center;



`;

export const GlobalRowFlex = styled.div.attrs({className:"GlobalRowFlex"})`
position:relative;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:flex-start;
width:100%;
flex:12;

@media screen and (max-width:600px){
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
}


`;