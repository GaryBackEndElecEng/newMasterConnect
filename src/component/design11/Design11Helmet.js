import React from 'react';
import {Helmet} from 'react-helmet';

const Design11Helmet = ({desc,keyWords,loadArr,average}) => {
  let JSONProduct=["Interior Design",];
  if(loadArr.loaded){
    JSONProduct = loadArr.data.map(obj=>(
        {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": obj.title,
          "image": obj.image,
          "description": obj.desc,
          "mpn": "N/A",
          "brand": {
            "@type": "Thing",
            "name": "Digital Master Connect"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": obj.rating,
            "reviewCount": "89"
          },
          "offers": {
            "@type": "Offer",
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
        <title>Restaurant Page </title>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href="http://www.master-connect.ca/design11" />
        <link rel="canonical" href="http://www.masterconnect.ca/design11" />
        <link rel="canonical" href="http://www.master-connect.com/design11" />
        <meta name="keywords" content={keyWords}/>
        <meta name="summary" content=" Interior Design"/>
        <meta name="description" content={desc}/>
        <meta name="rating" content={average}/>
        <meta name="site" content="www.master-connect.ca"/>
        <meta name="url" content="https://www.master-connect.ca"/>
        <meta name="url" content="https://www.masterconnect.ca"/>
        <meta name="url" content="https://www.master-connect.com"/>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
    </Helmet>
  )
  }

export default Design11Helmet