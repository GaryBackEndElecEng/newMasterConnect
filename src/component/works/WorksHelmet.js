import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const WorksHelmet = ({keywords,summary,desc,products,staticImage}) => {
  let convertJSON=""
  if (products){
       convertJSON= products.map(obj=>(
                {
                "@context": "https://schema.org/",
                "@id":"https://www.master-connect.ca/prices",
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
        <title>design page </title>
        <meta name="site_name" content="Web Designs"/>
        <link rel="canonical" href="http://www.master-connect.ca" />
        <meta name="description" content="Home for all the designs you need to make your decision."/>
        <meta name="keywords" content={keywords}/>
        <meta name="summary" content={summary}/>
        <meta name="description" content={desc}/>
        <meta name="site" content="www.master-connect.ca"/>
        <meta name="url" content="https://www.master-connect.ca"/>
        <script type="application/ld+json">{JSON.stringify(convertJSON)}</script>
    </Helmet>
  )
}

export default WorksHelmet