import React, { useEffect, useState, useContext } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import BlogBody from './BlogBody';
import CoverPage from './CoverPage';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageFeedback from '../utils/PageFeedback';
import api from '../axios/api';
import BlogHelmet from './BlogHelmet';
import { Typography } from '@mui/material';
import BlogBtnPage from './BlogBtnPage';


const MainBlog = styled.div.attrs({ className: "container-fluid" })`
width:100vw;
margin:2rem auto;
margin-top:5px;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}

@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:600px){
    margin-top:-50px;
}
`;

const Blog = () => {
  const { blogMain, setTitle, setStyleName,conical,getPathLocation } = useContext(GeneralContext);
  const [blogBodys, setBlogBodys] = useState({ loaded: false, data: [] });
  const [keywords, setKeywords] = useState([]);
  const [blog1, setBlog1] = useState({ loaded: false, data: [] });
  const [blog2, setBlog2] = useState({ loaded: false, data: [] });
  const [blog3, setBlog3] = useState({ loaded: false, data: [] });
  const [blog4, setBlog4] = useState({ loaded: false, data: [] });
  const [blog5, setBlog5] = useState({ loaded: false, data: [] });
  const [blog6, setBlog6] = useState({ loaded: false, data: [] });
  const [blog7, setBlog7] = useState({ loaded: false, data: [] });
  const [blog8, setBlog8] = useState({ loaded: false, data: [] });
  const [blog9, setBlog9] = useState({ loaded: false, data: [] });
  const [blog10, setBlog10] = useState({ loaded: false, data: [] });
  const [SEOBlog, setSEOBlog] = useState({ loaded: false, data: [] });
  const [SEOMain, setSEOMain] = useState({ loaded: false, data: [] });
  const [blogPhrase,setBlogPhrase]=useState({loaded:false,data:""});
  // console.log(blogMain)
  const generateKeyWords = (phrase) => {
    let arr = phrase.split(" ");
    return arr
  }

  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);

    }
    setTitle("The Blogger");
    setStyleName("Learning is Living")
  }, []);
  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await api.get('/blog/');
        const body = res.data;
        let ShowBlogs=body.filter(obj => (obj.show === true))
        setBlogBodys({ loaded: true, data:ShowBlogs.filter(obj=>(obj.title!=="Our Blogs!")) });
        setSEOMain({loaded:true,data:ShowBlogs.filter(obj=>(obj.title==="Our Blogs!"))})
        // console.log(body)
      } catch (error) {
        console.error(error.message)
      }
    }
    getBlog();
  }, [setBlogBodys]);

  useEffect(()=>{
    //THIS IS FOR THE SEO. This only abstract the top portion(intro only) and not the 'sectionBlog[array]'
    let arr=[],arr2=["Welcome to the Blog page.This page gives the Reader an insight on all the Evergreen topics of WHY?,like,,"];
    let phrase="";
    if( SEOMain.loaded){
      const removeTags = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g;
      let SEOMain1=SEOMain.data[0]
      let SEO=SEOMain1.intro
      if(removeTags.test(SEO)){
        let filterOutTags = SEO.split(removeTags).filter(snippet=>(snippet !== "\r\n\r\n"));
        filterOutTags.forEach((snippet,index)=>{
          if(snippet !=="" || index!==0){
          arr.push(snippet)
          }
        });
        arr2=arr2.concat(arr)
        arr2.forEach((phrase1,index)=>{
          phrase=phrase + phrase1
        });
        setBlogPhrase({loaded:true,data:phrase})
      }

setSEOBlog({loaded:true,data:[{"mainImage":SEOMain1.mainImage,"intro":phrase,"title":SEOMain1.title,"keywords":arr2}]})
setKeywords(arr2)
    }
  },[SEOMain.loaded,SEOMain.data]);
  useEffect(() => {
    let arr = ["blog", "Gary Wallace Blogs"];
    const removeTags = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g;
    let showBlog = blogMain.loaded ? [blogMain.data].filter(obj => (obj.show === true))[0] : null;
    // console.log(showBlog,blogBodys.loaded)
    if (showBlog) {
      let intro = "blog";
      if (removeTags.test(showBlog.intro)) {

        let filterOutText = showBlog.intro.split(removeTags).filter(obj => (obj !== ""))[0];
        if (filterOutText) {
          intro = filterOutText.split(" ");

        }
      }
      arr = arr.concat(intro)

      arr = arr + "," + intro;
      arr = arr + generateKeyWords(showBlog.sectionBlog[0].section);
      arr = arr + generateKeyWords(showBlog.sectionBlog[0].subSection);
      arr = arr + generateKeyWords(showBlog.sectionBlog[0].subSection2);
      setKeywords(arr.slice(0, 150))
    }
  }, [blogMain.loaded, blogMain.data]);

  useEffect(() => {
    if (blogBodys.loaded) {
      blogBodys.data.forEach((blog, index) => {
        if (blogBodys.data.length < 11 && blogBodys.data[0]) {
          setBlog1({ loaded: true, data: blogBodys.data[0] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[1]) {
          setBlog2({ loaded: true, data: blogBodys.data[1] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[2]) {
          setBlog3({ loaded: true, data: blogBodys.data[2] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[3]) {
          setBlog4({ loaded: true, data: blogBodys.data[3] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[4]) {
          setBlog5({ loaded: true, data: blogBodys.data[4] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[5]) {
          setBlog6({ loaded: true, data: blogBodys.data[5] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[6]) {
          setBlog7({ loaded: true, data: blogBodys.data[6] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[7]) {
          setBlog8({ loaded: true, data: blogBodys.data[7] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[8]) {
          setBlog9({ loaded: true, data: blogBodys.data[8] });
        }
        if (blogBodys.data.length < 11 && blogBodys.data[9]) {
          setBlog10({ loaded: true, data: blogBodys.data[9] });
        }

      });
    }
  }, [blogBodys.loaded, blogBodys.data]);

  return (
    <MainBlog>
      <BlogHelmet 
      blogBodys={blogMain}
       keywords={keywords}
       getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
       blogPhrase={blogPhrase.loaded ? blogPhrase.data:""}
       SEOBlog={SEOBlog.loaded ? SEOBlog.data :[]}
       />
      <RegisterPage />
      <GetRegisterPages />
      <CoverPage />
      <BlogBtnPage
        blog1={blog1} blog2={blog2} blog3={blog3}
        blog4={blog4} blog5={blog5} blog6={blog6}
        blog7={blog7} blog8={blog8} blog9={blog9}
        blog10={blog10}
      />
      <BlogBody blogBodys={blogMain} />
      <Typography component="h1" variant="h5" sx={{ textAlign: "center", margin: "1rem auto" }}>Please comment on the design,below. We strive to improve.</Typography>
      <PageFeedback />
    </MainBlog>
  )
}

export default Blog