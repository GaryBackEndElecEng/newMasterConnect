import {  Paper, Typography } from '@mui/material';
import React,{useState,} from 'react';
import { DivTranslate } from '../../styled/Container.styled';
import { useTheme } from '@mui/material/styles';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CameraIcon from '@mui/icons-material/Camera';
import CoffeeIcon from '@mui/icons-material/Coffee';
import styled from 'styled-components';

const FlexGrid = styled.div.attrs({className:"FlexGrid"})`
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

const GridLayer = () => {
    const theme = useTheme();
    const [shiftOn,setShiftOn]=useState(false);
    const [setColor,setSetColor]=useState(theme.palette.common.dark);
    const addFlex=shiftOn ? 'flex':'none';
    const handleShiftOn=(e)=>{
        if( e && shiftOn===false){
            setShiftOn(true);
            setSetColor(theme.palette.common.dark);
        }else{
            setSetColor(theme.palette.common.red);
            }
    }
    const handleShiftOn11=(e)=>{
        if( e && shiftOn===false){
            setShiftOn(true);
            setSetColor(theme.palette.common.dark);
        }else{
            setSetColor(theme.palette.common.red);
            }
    }
    const handleShiftOn22=(e)=>{
        if( e && shiftOn===false){
            setShiftOn(true);
            setSetColor(theme.palette.common.dark);
        }else{
            setSetColor(theme.palette.common.red);
            }
    }
    
    
    
    return (
        <FlexGrid>
            <Paper elevation={2} component="div" sx={{ width: '100%', minHeight: "200px", background: theme.palette.primary.main,color:"white" }} onMouseOver={(e)=>handleShiftOn(e)}>
                <Typography component="h2" variant="h4" sx={{ textAlign: "center", padding: "5px",color:setColor }}>
                    Card display
                </Typography>
                <DivTranslate block={addFlex} >
                    <BusinessCenterIcon sx={{ color: theme.palette.icon.purple.main ,fontSize:"40px",margin:"auto"}} />
                    <Typography component="h2" variant="body1" sx={{ textAlign: "center", padding: "2px 5px",margin:"auto" }}>
                    This can represent Type of advertising and or anoucement.
                    </Typography>
                </DivTranslate>
            </Paper>
            <Paper elevation={2} component="div" sx={{ width: '100%', minHeight: "200px", background: theme.palette.card.light,color:"black" }} onMouseOver={(e)=>handleShiftOn11(e)}>
                <Typography component="h2" variant="h4" sx={{ textAlign: "center", padding: "5px",color:setColor }}>
                    Card display
                </Typography>
                <DivTranslate block={addFlex} >
                    <CameraIcon sx={{ color: theme.palette.icon.indigo.main,fontSize:"100px",margin:"auto" }} />
                    <Typography component="h2" variant="body1" sx={{ textAlign: "center", padding: "2px 5px",margin:"auto" }}>
                        Possibly a mission statement and or a main driving statement.
                    </Typography>
                </DivTranslate>
            </Paper>
            <Paper elevation={2} component="div" sx={{ width: '100%', minHeight: "200px", background: theme.palette.secondary.main,color:"white" }} onMouseOver={(e)=>handleShiftOn22(e)}>
                <Typography component="h2" variant="h4" sx={{ textAlign: "center", padding: "5px",color:setColor }}>
                    Card display
                </Typography>
                <DivTranslate block={addFlex}>
                    <CoffeeIcon sx={{ color: theme.palette.icon.cyan.main,fontSize:"40px",margin:"auto"}} />
                    <Typography component="h2" variant="body1" sx={{ textAlign: "center", padding: "2px 5px",margin:"auto" }}>
                        This can represent Type of advertising and or anoucement.
                    </Typography>
                </DivTranslate>
            </Paper>
        </FlexGrid>
    )
}

export default GridLayer