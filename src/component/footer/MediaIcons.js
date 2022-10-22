import React, {useContext,useMemo,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Box, Grid, Divider, Link, Paper, Stack, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ContainerFooterFluid } from '../../styled/Container.styled';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {GeneralContext} from '../../context/GeneralContextProvider';
import HomeIcon from '@mui/icons-material/Home';

const MediaIcons = () => {
    const theme=useTheme();
    const {staticImage,generalInfo}=useContext(GeneralContext);
    const getSiteArray= generalInfo.loaded ? generalInfo.data.siteArray:null;
    const [sites,setSites]=useState({loaded:false,data:[]});
    useMemo(()=>{
      if(getSiteArray){
        let arr=[]

          getSiteArray.forEach(obj=>{
            if(obj.site ){
              arr.push({id:0,site:obj.site,icon:<HomeIcon sx={{ml:2,'&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" }}}/>})
            }
            if(obj.fb){
              arr.push({id:1,site:obj.fb,icon:<FacebookIcon sx={{ml:2,'&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" }}}/>})
            }
            if(obj.twitter){
              arr.push({id:2,site:obj.twitter,icon:<TwitterIcon sx={{ml:2,'&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" }}}/>})
            }
            if(obj.linkedln){
              arr.push({id:3,site:obj.linkedln,icon:<LinkedInIcon sx={{ml:2,'&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" }}}/>})
            }
            if(obj.instagram){
              arr.push({id:4,site:obj.instagram,icon:<InstagramIcon sx={{ml:2,'&:hover': { color: theme.palette.footer.main, transform: "translateY(-15%)" }}}/>})
            }
          });
        setSites({loaded:true,data:arr})
      }
    },[getSiteArray,setSites]);

  return (
    <ContainerFooterFluid style={{ background: theme.palette.common.medium, minHeight: { xs: "15vh", md: "15vh" }, color: theme.palette.common.light }}>
        <Stack direction={"row"} spacing={2} sx={{ margin: "auto", }}>
          {sites.loaded && sites.data.map(obj=>(
            <Link href={obj.site} key={`${obj.id}-${Math.ceil(Math.random()*10000)}`}>
              {obj.icon}
            </Link>
            
          ))}
        </Stack>
      </ContainerFooterFluid>
  )
}

export default MediaIcons