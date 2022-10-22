import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const Design3Helmet = ({keywords,summary,desc,image,OBJ}) => {
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
        <title>Moon page </title>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href="http://www.master-connect.ca" />
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content="www.master-connect.ca"/>
        <meta name="url" content="https://www.master-connect.ca"/>
        <meta name="image" content={image}/>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
    </Helmet>
  )
}

export default Design3Helmet