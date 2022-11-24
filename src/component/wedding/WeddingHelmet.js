import React from 'react';
import {Helmet} from 'react-helmet';


const WeddingHelmet = ({keywords,summary,desc,image,OBJ,conical,getPathLocation}) => {
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
      "ratingValue": "4.4",
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
        <title>Wedding page </title>
        <meta name="site_name" content="Wedding Design"/>
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <link rel="canonical" href={`${getPathLocation}design6`} />
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        <meta name="image" content={image}/>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
    </Helmet>
    
  )
}

export default WeddingHelmet