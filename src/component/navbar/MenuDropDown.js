import React, { useState, useContext, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { IconButton, Link } from '@mui/material';
import Logo from './Logo';
import MenuLogo from './MenuLogo';
import { useTheme } from '@mui/material/styles';
import {GeneralContext} from '../../context/GeneralContextProvider';
import Mark from './Mark';
import {NavDropDown} from '../../styled/Div.styled';



const MenuDropDown = () => {
  const navigate=useNavigate();
  const {setChangePage,setPage,setZIndex,dropDown}=useContext(GeneralContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [getWidth,setGetWidth]=useState(200);
  const [getHeight,setGetHeight]=useState(430);
  const anchorRef = useRef(null);
  const MyDropDown=useRef(null);
  const dropDownArea=useRef(null);

  const getAuthentication=()=>{
    let accessT=localStorage.getItem("access_token");
    let refreshT=localStorage.getItem("refresh_token");
    if(accessT && refreshT){
      return dropDown.filter(obj=>(obj.link !=='/signin')).filter(obj=>(obj.link !=="/register"))
    }
    return dropDown.filter(obj=>(obj.link !=='/MyAccount')).filter(obj=>(obj.link !=='/signout'))
}
  useEffect(()=>{
    setOpen(false);
  },[])

  const handleMouseOver =(e)=>{
    if (
      MyDropDown.current &&
      (prevOpen===true || open===true) &&
       (e.clientX >=getWidth || e.clientY >=getHeight)
    ) {
      setOpen(false);
      setZIndex("1");
    }
  }


  const handleToggle = (e) => {
    setOpen((prevOpen) => !prevOpen);
    if(prevOpen===false){
    setZIndex("-1");
    }else{
      setZIndex("1");
    }
  };

  const handleClose = (e,link) => {
    e.preventDefault();
    
    if (
      link
    ) {
      navigate(link,setChangePage(true))
      setPage(link)
      setZIndex("1");
      setOpen(false);
    }
    else{
      setOpen(false)
    }
    
    
  };

  function handleListKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setZIndex("1");
    }
  };
  useEffect(()=>{
    const getRef=dropDownArea?.current;
    if(getRef){
      const height=parseInt(window.getComputedStyle(getRef).getPropertyValue("height").split("px")[0]);
      const width=parseInt(window.getComputedStyle(getRef).getPropertyValue("width").split("px")[0]);
      setGetHeight(height);
      setGetWidth(width);
      
    }
  },[dropDownArea,setGetHeight,setGetWidth])

 


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    // if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    // }
    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={{xs:0,sm:1}} sx={{mr:{xs:1,sm:2},ml:{xs:0},}}>
      <div>
          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(e)=>handleToggle(e)}
            sx={{ color: "white", background: theme.palette.navBar.light, borderRadius: "50%", margin: {xs:"1px 1px",sm:"1px 2px"} }}
            arai-label="something"
            edge="start"
          >
            <Logo />
          </IconButton>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper elevation={20} ref={dropDownArea} component="div" id="dropDownLIst" sx={{display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",position:"relative",background:theme.palette.navBar.lightBlueGrey,borderRadius:"3%"}} >
              <MenuLogo/>
                <ClickAwayListener onClickAway={handleClose}>
                <NavDropDown background={theme.palette.common.light}>
                  <MenuList
                    ref={MyDropDown}
                    onMouseOver={(e) => handleMouseOver(e)}
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}

                  >
                    {getAuthentication().map(obj => (
                      <Link href={obj.link} key={obj.link}
                      sx={{fontFamily:"Oxygen"}}
                      >
                        <MenuItem onClick={(e) => handleClose(e, obj.link)}
                        sx={{fontFamily:"Cantarell",fontSize:"22px",color:theme.palette.navBar.dropDown}}
                        >
                          <Mark pageName={obj.name} pageLink={obj.link} />
                        </MenuItem>
                      </Link>
                    ))}
                    
                  </MenuList>
                  </NavDropDown>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        
      </div>
    </Stack>
  );
}

export default MenuDropDown