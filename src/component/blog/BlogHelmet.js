import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const BlogHelmet = ({blogBodys,keywords,conical,getPathLocation,blogPhrase,SEOBlog}) => {
 let articleJSON="";
 let blogTitle =blogBodys.loaded ? blogBodys.data.title : "Our Blogs"

    articleJSON= SEOBlog.map(obj=>(
            
      { 
                  "@context": "https://schema.org", 
                  "@type": "Article",
                  "headline": obj.title,
                  "image": obj.mainImage,
                  "author": "Gary Wallace", 
                  "award": "Best Article For The Mind",
                  "editor": "Gary Wallace", 
                  "genre": "Technology, Education", 
                  "keywords":obj.keywords, 
                  "wordcount":"200",
                "publisher": {
                    "@type": "Organization",
                    "name": "Master Digital connect",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://new-master.s3.ca-central-1.amazonaws.com/static/profilePic1.png"
                    }
                  },
                  "url": `${getPathLocation}/blog`,
                    "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://google.com/article"
                  },
                  "datePublished": "2022-12-2",
                  "description": obj.intro,
                  "articleBody": obj.intro.slice(0,150)
      }
      ));

  return (
    <Helmet>
        <title>{blogTitle ? blogTitle:"ourBlog"} </title>
        <meta name="description" content={blogPhrase}/>
        <meta name="genre" content="Technology and Education"/>
        <meta name="summary" content={blogPhrase.slice(0,150)}/>
        <meta name="title" content="Best Blogs for the educated and the intrigued "/>
        <meta name="keywords" content={keywords}/>
        <link rel="canonical" href={`${getPathLocation}/blog`}/>
        <script type="application/ld+json">
          {JSON.stringify(articleJSON)}
        </script>
    </Helmet>
  )
}

export default BlogHelmet