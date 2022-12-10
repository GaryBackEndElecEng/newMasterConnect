import React from 'react';
import {Helmet} from 'react-helmet';

const Design11Helmet = ({desc,keyWords,loadArr,average,getPathLocation,pageRatings}) => {
  let JSONProduct=["Interior Design",];

  const review=pageRatings.map((obj,index)=>(
    {
    "@type": "Review",
    "datePublished": `2022-04-0${index}`,
    "reviewBody": obj.comment,
    "name": "RESTAURANT DISPLAY",
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
  if(loadArr){
    JSONProduct = loadArr.map(obj=>(
        {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": obj.title,
          "image": obj.image,
          "description": obj.desc,
          "mpn": "N/A",
          "brand": {
            "@type": "Brand",
            "name": "RESTAURANT DISPLAY"
          },
          review,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": obj.rating,
            "reviewCount": "89"
          },
          "offers": {
            "@type": "Offer",
            "url":"https://www.master-connect.ca/design11",
            "priceCurrency": "CAD",
            "price": obj.price,
            "priceValidUntil": "N/A",
            "itemCondition": "http://schema.org/UsedCondition",
            "availability": "http://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Digital master Connect"
            }
          },
        }
    ));
      }
  
  

   
  return (
    <Helmet>
        <title>RESTAURANT DISPLAY </title>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}/design11`} />
        <meta name="keywords" content={keyWords}/>
        <meta name="summary" content=" Interior Design"/>
        <meta name="description" content={desc}/>
        <meta name="rating" content={average}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        
    </Helmet>
  )
  }

export default Design11Helmet