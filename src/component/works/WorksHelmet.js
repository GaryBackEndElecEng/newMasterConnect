import React from 'react';
import {Helmet} from 'react-helmet';


const WorksHelmet = ({keywords,summary,desc,products,staticImage,conical,getPathLocation,average}) => {
  let convertJSON=""
  if (products){
       convertJSON=products.map(obj=>(
                {
                "@context": "https://schema.org/",
                "@id":`${getPathLocation}/prices`,
                "@type": "Product",
                "name": obj.name,
                "image": `${staticImage}/${obj.imageName}`,
                "description":obj.desc,
                "brand": {
                  "@type": "Brand",
                  "name": obj.name
                },
                "review":obj.review.map((obj2,index)=>(
                  {
                    "@type": "Review",
                    "datePublished": `2022-12-01`,
                    "reviewBody": obj2.comment,
                    "reviewRating": {
                      "@type": "Rating",
                      "bestRating": "5",
                      "ratingValue": obj2.rating,
                      "worstRating": "1"
                    },
                    "author": {
                      "@type": "Person",
                      "name": obj2.name
                    }
                  }
                ))
                ,
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": average,
                    "reviewCount": "89"
                  },
    
                "offers": {
                  "@type": "Offer",
                  "url":`https://www.master-connect.ca${obj.extra_kwargs}`,
                  "priceCurrency": "CAD",
                  "price": obj.monthly,
                  "priceValidUntil":"2023-04-11",
                  "itemCondition": "http://schema.org/UsedCondition",
                  "availability": "http://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "master-connect"
                  }
                }
              }
              ));

  }

  return (
    <Helmet>
        <title>DESIGN PAGE </title>
        <script type="application/ld+json">
          {JSON.stringify(convertJSON)}
        </script>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}/works`} />
        <meta name="description" content="Home for all the designs you need to make your decision."/>
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
    </Helmet>
  )
}

export default WorksHelmet