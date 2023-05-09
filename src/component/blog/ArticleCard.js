import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./blog.module.css";
import styled from "styled-components";
import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Fab,
} from "@mui/material";
// import api from '../axios/api';
// import BlogBody from './BlogBody';

const CustCard = styled(Card)`
margin:auto;
opacity:${({show})=>show ? "1":"1"};
padding:0.5rem;
display flex;
justify-content:center;
align-items:center;
flex-direction:column;
animation: showUp 1s ease-in;
@keyframes showUp { 
    from { opacity:0;}
    to { opacity:1;}
}
`;

const ArticleCard = ({obj,getWidth}) => {
    const navigate = useNavigate();
  const cardRef=React.useRef(null);
  const {  setSectionBlog } =React.useContext(GeneralContext);
    const [show,setShow]=useState(false);
    const threshold=getWidth <900 ? (getWidth <600 ? 0.1:0.2) :0.2;

    React.useEffect(()=>{
        const observer=new IntersectionObserver(entries=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setShow(true);
            }
        },{threshold:threshold});
        if(cardRef.current){
            observer.observe(cardRef.current);
            return ()=>observer.disconnect();
        }
    },[]);

      const handleDetailArticle = (e, obj) => {
        e.preventDefault();
        setSectionBlog({ loaded: true, data: obj.sectionBlog, id: obj.id });
        navigate(`/section-article/?id=${obj.id}`);
      };
  return (
    <CustCard
    ref={cardRef}
    show={show}
    className={styles.custCard}
    >
      <Typography component={"h1"} variant="h3">
        {obj.title}
      </Typography>
      <CardMedia
        src={obj.article[0].imageSection}
        component={"img"}
        alt="www.masterconnect.ca"
        height="50%"
      />
      <CardContent>
        <Stack direction="column" spacing={2} sx={{ margin: "1rem auto" }}>
          <Fab
            size="medium"
            color="primary"
            variant="extended"
            onClick={(e) => handleDetailArticle(e, obj)}
            sx={{ margin: "auto" }}
          >
            details
          </Fab>
        </Stack>
      </CardContent>
    </CustCard>
  )
}

export default ArticleCard