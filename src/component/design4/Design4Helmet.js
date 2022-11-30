import React from 'react';
import {Helmet} from 'react-helmet';


const Design4Helmet = ({keywords,summary,desc,image,OBJ,average,getPathLocation}) => {
 
  const JSONProduct={
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": OBJ.name,
    "image": image,
    "description": desc,
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
      "price": OBJ.monthly,
      "priceValidUntil": "N/A",
      "itemCondition": "http://schema.org/UsedCondition",
      "availability": "http://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Digital master Connect"
      }
    }
}
  return (
    <Helmet>
        <title>Flower Store</title>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}/design4`} />
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        <meta name="image" content={image}/>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
    </Helmet>
  )
}

export default Design4Helmet