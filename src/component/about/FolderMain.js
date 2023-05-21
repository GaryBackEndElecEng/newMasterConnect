import React from "react";
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from "./about.module.css";
import styled from 'styled-components';
import folderContent from './folderContent';
import {Container} from '@mui/material';
import FolderItem from './FolderItem';

const CustFolderMain = styled.div`
margin:5rem auto;
width:100%;
position:relative;
overflow:hidden;
display:flex;
flex-direction:row;
flex-wrap:wrap;
display:flex;
flex-wrap:nowrap;
opacity:${({opacity})=>opacity};
transform:translateY(${({translatey})=>translatey});
transition:all 1s ease-in-out;
@media screen and (max-width:900px){
  flex-direction:column;
  align-items:stretch;
  justify-content:flex-start;
  margin:3rem auto;
  width:100%;
  scroll-snap-type: y mandatory !important;
  height:57vh !important;
  box-shadow:1px 1px 20px 1px blue;
  overflow-y:scroll !important;
  
}
@media screen and (max-width:800px){
  height:62vh !important;
}
@media screen and (max-width:600px){
  height:80vh !important;
  box-shadow:1px 1px 20px 1px blue;
  align-items:center;
  justify-content:flex-start;
  
}
@media screen and (max-width:380px){
  height:100vh !important;
  
  
}

`;

const FolderMain = ({getWidth,fontSize}) => {
  const folderRef=React.useRef(null);
    const {staticImage}=React.useContext(GeneralContext);
    const [getContent,setGetContent]=React.useState({loaded:false,data:[]});
    const [openFolder,setOpenFolder]=React.useState(null);
    const threshold = getWidth < 900 ? 0.3:0.7;

    React.useEffect(()=>{
      const observer = new IntersectionObserver(entries=>{
        let entry=entries[0];
        if(entry.isIntersecting){
          setOpenFolder(true);
        }
      },{threshold:threshold});

      if(folderRef.current){
        observer.observe(folderRef.current);
      }
    },[]);

    React.useEffect(()=>{
        setGetContent({loaded:true,data:folderContent});
    },[]);

  return (
    <Container maxWidth="xl" sx={{overflow:"hidden"}} ref={folderRef}>
    <CustFolderMain 
    className={styles.custFolderMain}
    translatey={openFolder ? "0%":"10%"}
    opacity={openFolder ? "1":"0"}
    >
        {getContent.loaded ?
        getContent.data.map((obj,index)=>(
          <div key={`${obj.id}--folderItem--${index}`}>
        <FolderItem 
        getWidth={getWidth}
        fontSize={fontSize}
        key={`${obj.id}--folderItem--${index}`}
        obj={obj}
        />
        </div>
        ))
        
        :

        <div><h3>loading...</h3></div>
        }
    </CustFolderMain>
    </Container>
  )
}

export default FolderMain