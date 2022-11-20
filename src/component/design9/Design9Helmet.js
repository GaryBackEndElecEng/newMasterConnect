import React from 'react';
import {Helmet} from 'react-helmet';

const Design9Helmet = ({keywords,summary,desc,image,OBJ,average}) => {
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
        <title>Realtor Page </title>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href="http://www.master-connect.ca/design9" />
        <link rel="canonical" href="http://www.masterconnect.ca/design9" />
        <link rel="canonical" href="http://www.master-connect.com/design9" />
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content="www.master-connect.ca"/>
        <meta name="site" content="www.masterconnect.ca"/>
        <meta name="site" content="www.master-connect.com"/>
        <meta name="url" content="https://www.master-connect.ca"/>
        <meta name="url" content="https://www.masterconnect.ca"/>
        <meta name="url" content="https://www.master-connect.com"/>
        <meta name="image" content={image}/>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
    </Helmet>
  )
}

export default Design9Helmet