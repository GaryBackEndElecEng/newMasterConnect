import React from 'react';
import {Helmet} from 'react-helmet';

const Design10Helmet = ({desc,keyWords,loadArr,average,conical,getPathLocation}) => {
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
            "ratingValue": average,
            "reviewCount": "89"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "CAD",
            "price": 15,
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
        <title>Interior Design Page </title>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}/design10`} />
        <meta name="keywords" content={keyWords}/>
        <meta name="summary" content=" Interior Design"/>
        <meta name="description" content={desc}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
    </Helmet>
  )
  }

export default Design10Helmet