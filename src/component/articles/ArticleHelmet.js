import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import { Helmet } from 'react-helmet';
// import { Card, CardMedia } from '@mui/material';


const ArticleHelmet = ({ summary, desc, images, OBJs, keywords,article }) => {
  let articleJSON=[" testing"];

  if(OBJs.length > 0){
    // console.log(OBJs)
    articleJSON = OBJs.map(obj=>( {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.master-connect.ca/articles"
      },
      "headline": obj.title,
      "image": [
        obj.article[0].imageSection
      ],
      "datePublished": obj.article[0].date,
      "author": {
        "@type": "Person",
        "name": "Gary Wallace"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Digital Master Connect",
        "logo": {
          "@type": "ImageObject",
          "url": "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"
        }
      },
      "description": obj.article[0].subSection
    }))
}
  return (
    <Helmet>
      <title>{article} </title>
      <meta name="description" content={desc} />
      <meta name="summary" content={summary} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href="http://www.master-connect.ca" />
      
        <script>
          {JSON.stringify(articleJSON)}
        </script>
      
    </Helmet>
  )
}

export default ArticleHelmet