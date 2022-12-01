import React from 'react';
import {Helmet} from 'react-helmet';

const Design10Helmet = ({desc,keyWords,loadArr,average,conical,getPathLocation,pageRatings}) => {
  const review=pageRatings.map((obj,index)=>(
    {
    "@type": "Review",
    "datePublished": `2022-04-0${index}`,
    "reviewBody": obj.comment,
    "name": "REAL-ESTATE PAGE",
    "reviewRating": {
      "@type": "Rating",
      "bestRating": "5",
      "ratingValue": obj.rating,
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": obj.name
    }
    }

  ));
const JSONProduct=loadArr.map((obj,index)=>(
      {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": obj.name,
          "image": obj.image,
          "description": obj.desc,
          "mpn": "N/A",
          "brand": {
            "@type": "Brand",
            "name": "INTERIOR DESIGN"
          },
          review
          ,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": average,
            "reviewCount": "89"
          },
          "offers": {
            "@type": "Offer",
            "url":"https://www.master-connect.ca/design10",
            "priceCurrency": "CAD",
            "price": "20",
            "priceValidUntil": "N/A",
            "itemCondition": "http://schema.org/UsedCondition",
            "availability": "http://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Digital master Connect"
            }
          }
    }
));
  

   
  return (
    <Helmet>
        <title>INTERIOR DESIGN </title>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}/design10`} />
        <meta name="keywords" content={keyWords}/>
        <meta name="summary" content=" Interior Design"/>
        <meta name="description" content={desc}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        
    </Helmet>
  )
  }

export default Design10Helmet