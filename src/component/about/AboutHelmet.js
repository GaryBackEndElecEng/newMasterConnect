import React from 'react';
import {Helmet} from 'react-helmet';



const AboutHelmet = ({categories,getGeneralInfo}) => {
  let articleJSON={}
  if(getGeneralInfo){
           articleJSON={
                          "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Master Connect",
                        "legalName" : "Digital Master Connect",
                        "url": "http://www.master-connect.ca",
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
                        "streetAddress": getGeneralInfo.address,
                        "addressLocality": getGeneralInfo.city,
                        "addressRegion": getGeneralInfo.provState,
                        "postalCode": getGeneralInfo.postal,
                        "addressCountry": getGeneralInfo.country
                        },
                        "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer support",
                        "telephone": getGeneralInfo.cell,
                        "email": "https://www.master-connect.ca/contact"
                        },
                        "sameAs": [ 
                          getGeneralInfo.siteArray
                        ]
            }
  }
  return (
    <Helmet>
        <title>About Us </title>
        <meta name="description" content="About Master-connect.All the Services you need at a very reasonable price! "/>
        <meta name="summary" content={categories.map(obj=>(obj.content))}/>
        <meta name="keywords" content={categories.map(obj=>(obj.subSection))}/>
        <link rel="canonical" href="http://www.master-connect.ca" />
        <script type="application/ld+json">
          {JSON.stringify(articleJSON)}
        </script>
        
    </Helmet>
  )
}

export default AboutHelmet