import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const BlogHelmet = ({blogBodys,keywords}) => {
 let articleJSON=" commin soon"
  const wordCount=(phrase)=>{
    let arr=phrase.split(" ");
    let count=0;
    if(arr.length>0){
    arr.forEach((word,index)=>{
      count=index;
    });
  }
    return count
  }
let wordTitle="Blog page";
  if(blogBodys && blogBodys.loaded){
    const blogShow=blogBodys.loaded ? [blogBodys.data]:null;
    wordTitle=blogBodys.data.title;
    // console.log("hello",blogShow[0].sectionBlog)
    if(blogShow){
        // console.log("hello",blogShow[0].sectionBlog)
           articleJSON= blogShow.map(obj=>(
            
          { 
                      "@context": "https://schema.org", 
                      "@type": "Article",
                      "headline": obj.title,
                      "alternativeHeadline": "This article is also about robots and stuff",
                      "image": obj.mainImage,
                      "author": "Gary Wallace", 
                      "award": "Best Article For The Mind",
                      "editor": "Gary Wallace", 
                      "genre": "Technology, Education", 
                      "keywords": [obj.title ,obj.sectionBlog[0].subSection,], 
                      "wordcount":[ wordCount(obj.sectionBlog[0].summary),wordCount(obj.sectionBlog[0].content),wordCount(obj.sectionBlog[0].content1),wordCount(obj.sectionBlog[0].content2)].reduce((a,b)=>(a+b),0),
                    "publisher": {
                        "@type": "Organization",
                        "name": "Google",
                        "logo": {
                          "@type": "ImageObject",
                          "url": "https://google.com/logo.jpg"
                        }
                      },
                      "url": "http://www.example.com",
                        "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": "https://google.com/article"
                      },
                      "datePublished": "2015-09-20",
                      "dateCreated": obj.sectionBlog[0].date,
                      "dateModified": obj.sectionBlog[0].date,
                      "description": obj.sectionBlog[0].content.slice(0,150),
                      "articleBody": obj.sectionBlog[0].summary.slice(0,150)
          }
          ));
  }
}

  return (
    <Helmet>
        <title>{wordTitle} </title>
        <meta name="description" content="A Short-term Rental app for sale- automated display - out-of-This-World "/>
        <meta name="genre" content="Technology and Education"/>
        <meta name="summary" content="Do you want to better your life and grow your mind?- well this place is for you!!- Truly. Dive into the unknown and intrigued ideas for the mind. Gary Wallace reveals The Best of revealing mind bending thoughts and wonderful revelations- Its Worth Your Time! "/>
        <meta name="title" content="Best Blogs for the educated and the intrigued "/>
        <meta name="keywords" content={keywords}/>
        <script type="application/ld+json">
          {JSON.stringify(articleJSON)}
        </script>
    </Helmet>
  )
}

export default BlogHelmet