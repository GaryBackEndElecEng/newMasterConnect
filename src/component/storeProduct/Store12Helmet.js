import React from 'react';
import {Helmet} from 'react-helmet';

const Store12Helmet = ({desc,keyWords,helmetArr,average,getPathLocation,pageRatings,storeProd}) => {
  let JSONProduct=["Product Page",];

  const review=pageRatings.map((obj,index)=>(
    {
    "@type": "Review",
    "datePublished": `2022-04-0${index}`,
    "reviewBody": obj.comment,
    "name": "PRODUCT DETAIL DISPLAY",
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
  if(helmetArr && storeProd){
    JSONProduct ={
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": storeProd.name,
          "image":helmetArr.map(obj=>(obj.image)),
          "description": storeProd.desc,
          "mpn": "N/A",
          "brand": {
            "@type": "Brand",
            "name": storeProd.name
          },
          review,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": average,
            "reviewCount": "89"
          },
          "offers": {
            "@type": "Offer",
            "url":"https://www.master-connect.ca/design12",
            "priceCurrency": "CAD",
            "price": storeProd.monthly,
            "priceValidUntil": "N/A",
            "itemCondition": "http://schema.org/UsedCondition",
            "availability": "http://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Digital master Connect"
            }
          },
        }
    
      }
  
  

   
  return (
    <Helmet>
        <title>STORE PRODUCT </title>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}/design12`} />
        <meta name="keywords" content={keyWords}/>
        <meta name="summary" content=" Interior Design"/>
        <meta name="description" content={desc}/>
        <meta name="rating" content={average}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        
    </Helmet>
  )
  }

export default Store12Helmet