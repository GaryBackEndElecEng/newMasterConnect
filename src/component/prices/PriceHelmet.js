import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const PriceHelmet = ({keywords,summary,desc,image,price}) => {
  const convertJSON={
    "@context": "https://schema.org/",
    "@id":"https://www.master-connect.ca/prices",
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
  return (
    <Helmet>
        <title>Pricing Page </title>
        <meta name="site_name" content="Web Designs"/>
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content="www.master-connect.ca"/>
        <meta name="url" content="https://www.master-connect.ca"/>
        <meta name="image" content={image}/>
        <script type="application/ld+json">{JSON.stringify(convertJSON)}</script>
    </Helmet>
  )
}

export default PriceHelmet