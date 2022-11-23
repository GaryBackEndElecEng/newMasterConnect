import React from 'react';
import {Helmet} from 'react-helmet';



const CalculatorHelmet = ({generalInfo,conical}) => {
    let url=`${conical}/calculate`;
  let articleJSON={}
  if(generalInfo){
           articleJSON={
                          "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Master Connect",
                        "legalName" : "Digital Master Connect",
                        "url": conical,
                        "logo": "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png",
                        "foundingDate": "2021",
                        "founders": [
                        {
                        "@type": "Person",
                        "name": "Gary Wallace"
                        },
                        {
                        "@type": "Person",
                        "name": "N/A"
                        } ],
                        "address": {
                        "@type": "PostalAddress",
                        "streetAddress": generalInfo.address,
                        "addressLocality": generalInfo.city,
                        "addressRegion": generalInfo.provState,
                        "postalCode": generalInfo.postal,
                        "addressCountry": generalInfo.country
                        },
                        "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer support",
                        "telephone": generalInfo.cell,
                        "email": `${conical}/contact`
                        },
                        "sameAs": [ 
                          generalInfo.siteArray
                        ]
            }
  }
  return (
    <Helmet>
        <title>About Us </title>
        <meta name="description" content="About Master-connect.All the Services you need at a very reasonable price! "/>
        <meta name="summary" content=" This calculates your estimate web-design cost. all you need is 5-minutes of your time."/>
        <meta name="keywords" content="calculator,find your cost,most respectable prices, industry best,why wait, Freedom to build,gary Wallace,master-connect, web-design"/>
        <link rel="canonical" href={url} />
        <script type="application/ld+json">
          {JSON.stringify(articleJSON)}
        </script>
        
    </Helmet>
  )
}

export default CalculatorHelmet