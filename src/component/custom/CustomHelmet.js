import React from 'react';
import {Helmet} from 'react-helmet';


const CustomHelmet = ({keywords,summary,desc,image, products,average,getPathLocation,staticImage}) => {
  const review={
    "@type": "Review",
    "datePublished": `2022-04-01`,
    "reviewBody": "it allows someone to select a Contact template",
    "name": "Gary Wallace",
    "reviewRating": {
      "@type": "Rating",
      "bestRating": "5",
      "ratingValue": "4",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": "Gary Wallace"
    }
    }


const JSONProduct=products && products.map(obj=>(
{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": obj.name,
      "image": `${staticImage}/${obj.imageName}`,
      "description": obj.desc,
      "mpn": "N/A",
      "brand": {
        "@type": "Brand",
        "name": "Contact Custom Templates"
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
        "url":"https://www.master-connect.ca/design2",
        "priceCurrency": "CAD",
        "price": obj.monthly,
        "priceValidUntil": "N/A",
        "itemCondition": "http://schema.org/UsedCondition",
        "availability": "http://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Digital master Connect"
        }
      }
}));
  return (
    <Helmet>
        <title>CUSTOM PAGE </title>
        <script type="application/ld+json">
          {JSON.stringify(JSONProduct)}
        </script>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}/design2`} />
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        <meta name="image" content={image}/>
        
    </Helmet>
  )
}

export default CustomHelmet