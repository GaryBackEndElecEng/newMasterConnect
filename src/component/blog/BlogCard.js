import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContextProvider";
// import styles from "./blog.module.css";
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
opacity:${({show})=>show ? "1":"0"};
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

const BlogCard = ({ obj ,getWidth}) => {
  const navigate = useNavigate();
  const cardRef=React.useRef(null);
  const { setSectionBlog } =React.useContext(GeneralContext);
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

  const createMarkup = (text1) => {
    let len = text1.split(" ");
    if (len.length > 0) {
      return { __html: text1 };
    } else {
      return { __html: "" };
    }
  };

  const handleDetailBlogs = (e, obj) => {
    e.preventDefault();
    setSectionBlog({ loaded: true, data: obj.sectionBlog, id: obj.id });
    navigate(`/section-blog/?id=${obj.id}`);
  };
  return (
    <CustCard
    ref={cardRef}
    show={show}
    >
      <Typography component={"h1"} variant="h3" sx={{color:"black"}}>
        {obj.title}
      </Typography>
      <CardMedia
        src={obj.mainImage}
        component={"img"}
        alt="www.masterconnect.ca"
        height="50%"
      />
      <CardContent>
        <div
          style={{ padding: "0.5rem", textAlign: "left",color:"black" }}
          dangerouslySetInnerHTML={createMarkup(obj.intro)}
        />
        <Stack direction="column" spacing={2} sx={{ margin: "1rem auto" }}>
          <Fab
            size="medium"
            color="primary"
            variant="extended"
            onClick={(e) => handleDetailBlogs(e, obj)}
            sx={{ margin: "auto" }}
          >
            details
          </Fab>
        </Stack>
      </CardContent>
    </CustCard>
  );
};

export default BlogCard;
