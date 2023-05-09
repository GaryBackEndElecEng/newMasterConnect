import React from 'react';
import {Helmet} from 'react-helmet';


const Design3Helmet = ({keywords,summary,desc,image,OBJ,average,getPathLocation,pageRatings}) => {
  const review=pageRatings.map((obj,index)=>(
    {
    "@type": "Review",
    "datePublished": `2022-04-0${index}`,
    "reviewBody": obj.comment,
    "name": OBJ.name,
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
const JSONProduct={
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": OBJ.name,
      "image": image,
      "description": desc,
      "mpn": "N/A",
      "brand": {
        "@type": "Brand",
        "name": "RETROSPECT"
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
        "url":"https://www.master-connect.ca/design4",
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
        <title>MOON STRUCK </title>
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

export default Design3Helmet