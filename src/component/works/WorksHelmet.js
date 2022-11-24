import React from 'react';
import {Helmet} from 'react-helmet';


const WorksHelmet = ({keywords,summary,desc,products,staticImage,conical,getPathLocation}) => {
  let convertJSON=""
  if (products){
       convertJSON= products.map(obj=>(
                {
                "@context": "https://schema.org/",
                "@id":`${conical}/prices`,
                "@type": "Product",
                "name": obj.name,
                "image": `${staticImage}/${obj.imageName}`,
                "description":obj.desc,
                "mpn": "N/A",
                "brand": {
                  "@type": "Thing",
                  "name": "Digital master Connect"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "CAD",
                  "price": obj.monthly,
                  "priceValidUntil":"N/A",
                  "itemCondition": "http://schema.org/UsedCondition",
                  "availability": "http://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "master-connect"
                  }
                }
              }
              ))
}
  return (
    <Helmet>
        <title>Design page </title>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href={`${getPathLocation}works`} />
        <meta name="description" content="Home for all the designs you need to make your decision."/>
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content={getPathLocation}/>
        <meta name="url" content={getPathLocation}/>
        <script type="application/ld+json">{JSON.stringify(convertJSON)}</script>
    </Helmet>
  )
}

export default WorksHelmet