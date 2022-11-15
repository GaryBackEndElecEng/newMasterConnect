import React, { useContext,useEffect,useState} from 'react'
// import { useNavigate,useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Container,Fab,Typography,Grid,Stack,Box } from '@mui/material';
import styled from 'styled-components';
import BookIcon from '@mui/icons-material/Book';
import styles from './blog.module.css'


// import styles from './blog.module.css'


const MainCoverpage = styled(Container)`
margin:2rem auto;
display:flex;
position:relative;
justify-content:center;
align-items:center;
flex-direction:column;
background-image:url(${({pic})=>pic});
background-size:100% 100%;
min-height:40vh;
box-shadow: 1px 1px 8px 5px ${({bg})=>bg};

@media screen and (max-width:900px){
  min-height:30vh;
}
@media screen and (max-width:600px){
  min-height:30vh;
}
`;

const BlogBtnPage = ({blog1,blog2,blog3,blog4,blog5,blog6,blog7,blog8,blog9,blog10}) => {
    const theme=useTheme();
    const {setBlogMain}=useContext(GeneralContext);
    const pic=`https://new-master.s3.ca-central-1.amazonaws.com/blog/BlogBtnPage.JPG`;
    const [preMain,setPreMain]=useState({loaded:false,data:[]});
    const [getIndex,setGetIndex]=useState(0);
    

    useEffect(()=>{
        let Arr=[blog1,blog2,blog3,blog4,blog5,blog6,blog7,blog8,blog9,blog10];
        let Arr2=[];
        Arr.forEach((blog,index)=>{
            if (blog.loaded){
                Arr2.push(blog.data)
            }
        });
        setBlogMain({loaded:false,data:[]});
        setPreMain({loaded:true,data:Arr2});
    },[blog1,blog2,blog3,blog4,blog5,blog6,blog7,blog8,blog9,blog10,setPreMain]);

        const handleFeed=(e,index)=>{
            e.preventDefault();
            setBlogMain({loaded:true,data:preMain.data[index]});
            setGetIndex(index)

        }
  return (
    <MainCoverpage pic={pic} bg={theme.palette.common.blueGrey} maxWidth="lg">
       <Grid container spacing={{xs:1,sm:1,md:2}} sx={{padding:"1rem"}}>
        { preMain.loaded && preMain.data && preMain.data.map((obj,index)=>(
        <Grid item xs={12} sm={6} md={4} key={`${obj.id}-pre-${index}`}>
            <Fab variant="extended" sx={{color:"white"}} 
            className={getIndex===index ? styles.changeColor: styles.noChangeColor}
            onClick={(e)=>handleFeed(e,index)}>
                {obj.title} <BookIcon sx={{ml:1}} className={getIndex===index ? styles.changeIconColor: styles.noChangeIconColor}/>
            </Fab>
        </Grid>
        ))}
       </Grid>

    </MainCoverpage>
  )
}

export default BlogBtnPage