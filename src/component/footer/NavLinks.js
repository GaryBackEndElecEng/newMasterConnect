import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, IconButton, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GeneralContext } from '../../context/GeneralContextProvider';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';



const NavLinks = () => {
    const theme = useTheme();
    const MyRef = useRef();
    const navigate = useNavigate();
    const { setChangePage, footerLinks, } = useContext(GeneralContext);
    const getFooterLinks=footerLinks ? footerLinks:null;

    
    const handleLink = (e, link) => {
        e.preventDefault();
        navigate(link, setChangePage(true));

    }
    const handleHover = (e) => {
        e.preventDefault();
        // console.log(e.nativeEvent.clientX)

    }
    return (
        <div className="container-fluid"  style={{ width: "100vw", textAlign: "center", margin: "2rem 0px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding:"5px 0px" }}
            ref={MyRef} onMouseOver={(e) => handleHover(e)}
        >
            <Typography component="h1" variant="h4" color={theme.palette.primary} 
            sx={{ background: theme.palette.common.darkBlue, fontFamily: "Roboto", margin: "auto", width: "100%" }}>
                 Links
            </Typography>
            <Paper variant="outlined" component="div" 
            sx={{ margin: "auto", width: "100%", textAlign: "center", padding: "0.5rem",display:"flex",flexDirection:"column",justifyConetnt:"center",alignItems:"center",background:theme.palette.footer.mediumLight, }}>
                <Grid container spacing={0} sx={{ margin: "auto",textAlign:"center",width:"100%" }}>
                    
                        {getFooterLinks && getFooterLinks.map(obj => (
                            <Grid item xs={4} md={2} sx={{margin:"1rem auto",display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}key={obj.id} >
                            <IconButton color={'secondary'} onClick={(e) => handleLink(e, obj.link)} key={obj.id} sx={{  width: "100%", color: theme.palette.footer.dark, '&:hover': { cursor: "pointer",background:"black",color:theme.palette.footer.light},margin:"auto",fontSize:{xs:"18px",sm:"16px"} ,borderRadius:"0%"}}>
                                <LabelImportantIcon sx={{mr:2}}/>
                               {obj.title} 
                               
                            </IconButton>
                            </Grid>
                        ))
                        }
                </Grid>
            </Paper>

        </div>
    )
}

export default NavLinks