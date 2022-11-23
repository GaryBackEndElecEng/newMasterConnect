import React from 'react';
import {Helmet} from 'react-helmet';


const PriceHelmet = ({keywords,summary,desc,image,price,products,staticImage,conical}) => {
  const convertJSON={
    "@context": "https://schema.org/",
    "@id":`${conical}/prices`,
    "@type": "Product",
    "name": "Amazing design",
    "image": image,
    "description": "set your goals in Amazing Design - get a quote",
    "mpn": "N/A",
    "brand": {
      "@type": "Thing",
      "name": "Digital master Connect"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CAD",
      "price": price,
      "priceValidUntil":"N/A",
      "itemCondition": "http://schema.org/UsedCondition",
      "availability": "http://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "master-connect"
      }
    }
  }
  
  const convertJSON2=products.map(obj=>(
    {
      "@context": "https://schema.org/",
      "@id":`${conical}/${obj.extra_kwargs}`,
      "@type": "Product",
      "name": obj.name,
      "image": `${staticImage}/${obj.imageName}`,
      "description": obj.desc,
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
  ));
  return (
    <Helmet>
        <title>Pricing Page </title>
        <meta name="site_name" content="Web Designs"/>
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content="www.master-connect.ca"/>
        <meta name="url" content={conical}/>
        <link rel="canonical" href={`${conical}/prices`} />
        <meta name="image" content={image}/>
        <script type="application/ld+json">{JSON.stringify(convertJSON)}</script>
        <script type="application/ld+json">{JSON.stringify(convertJSON2)}</script>
    </Helmet>
  )
}

export default PriceHelmet