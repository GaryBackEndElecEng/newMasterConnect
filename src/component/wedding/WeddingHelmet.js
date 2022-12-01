import React from 'react';
import {Helmet} from 'react-helmet';


const WeddingHelmet = ({keywords,summary,desc,image,OBJ,getPathLocation,pageRatings,average}) => {
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
        "name": "WEDDING DESIGN"
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
        "url":"https://www.master-connect.ca/design6",
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
        <title>WEDDING DESIGN </title>
        <meta name="site_name" content="Wedding Design"/>
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <link rel="canonical" href={`${getPathLocation}/design6`} />
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