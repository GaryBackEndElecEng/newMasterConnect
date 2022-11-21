import React,{useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { AppBar, Typography, Divider,  List, ListItem, Toolbar, ListItemButton, ListItemText, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {GeneralContext} from '../../context/GeneralContextProvider'
import MenuDropDown from './MenuDropDown'; //HAS ALL LINKS
import MarkUpToolBar from './MarkUpToolBar';
import { useEffect,useState } from 'react';


const NavBar = () => {
    const {styleName,setChangePage,navItems,setPage,hits} =useContext(GeneralContext);
    const navigate=useNavigate();
    const theme = useTheme();
    const [modHits,setModHits]=useState({loaded:false,data:""});
    const cutNav600=window.innerWidth < 600 ? navItems.slice(0,3):navItems;

    const handleNavigate=(e,link)=>{
        e.preventDefault();
        navigate(link,setChangePage(true))
        setPage(link)
    }

    useEffect(()=>{
        const hitsLoaded= async ()=>{
            try {
                setTimeout(()=>{
                    let modHold=hits.data;
                    if(hits.data > 1000){
                        let mod=`${Math.ceil(modHold/1000)}K`;
                        setModHits({loaded:true,data:mod})
                    }else{setModHits({loaded:true,data:hits.data})}
                },200);
                
            } catch (error) {
                setModHits({loaded:false,data:[]})
            }
        }
        if(hits.loaded){
            hitsLoaded();
        }
    },[hits.loaded,hits.data]);
   
    return (
        
            <AppBar component="nav" position={"sticky"}
             sx={{ 
                background: theme.palette.navBar.lightBlueGrey,
                 color: theme.palette.navBar.light,
                 margin:"0px",width:"100%"
                 
                 }} >
                <Toolbar sx={{width:"100%",}}>
        
                    <MenuDropDown/>
                    {modHits.loaded ?
                    <Typography component="h1" variant="body2" sx={{mr:1}}>
                        hits:
                    <span style={{fontSize:"12px"}}>
                        {modHits.data}
                    </span>
                    </Typography>
                    :
                    <Typography component="h1" variant="body2" sx={{mr:1}}>
                        hits:
                    <span style={{fontSize:"12px"}}>
                        {hits.data}
                    </span>
                    </Typography>
                    
                    }
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" },fontFamily:"Roboto"}}>
                        {styleName}
                    </Typography>
                    
                    <Divider />
                    <List sx={{ display:"flex",padding:{xs:"1px",sm:"1px 5px"} }}>
                        {cutNav600 && cutNav600.map((obj) => (
                            <ListItem key={obj.id} disablePadding >
                                <ListItemButton dense={true} sx={{ textAlign: "center",padding:{xs:"5px 10px",sm:"5px 7px",md:" 5px 15px",lg:"7px 18px"}}} >
                                    <Link 
                                    onClick={(e)=>handleNavigate(e,obj.link)} 
                                    sx={{
                                        color:theme.palette.navBar.light,
                                        display:"flex",listStyle:"none",flexDirection:"row",flexWrap:"nowrap",
                                        }}
                                        >
                                        <MarkUpToolBar pageName={obj.title} pageLink={obj.link} />
                                        <ListItemText primary={obj.title.toUpperCase()} />
                                        
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Toolbar>
            </AppBar>

        
    )
}

export default NavBar