import React from 'react';
import {Helmet} from 'react-helmet';


const ContactHelmet = ({keywords,content,conical,generalInfo,getPathLocation}) => {
  let articleJSON={}
  if(generalInfo.loaded){
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
                        "streetAddress": generalInfo.data.address,
                        "addressLocality": generalInfo.data.city,
                        "addressRegion": generalInfo.data.provState,
                        "postalCode": generalInfo.data.postal,
                        "addressCountry": generalInfo.data.country
                        },
                        "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer support",
                        "telephone": generalInfo.data.cell,
                        "email": `${getPathLocation}/contact`
                        },
                        "sameAs": [ 
                          generalInfo.data.siteArray
                        ]
            }
  }
  return (
    <Helmet>
        <title>Contact Us </title>
        <meta name="description" content="A Short-term Rental app for sale- automated display - out-of-This-World "/>
        <meta name="summary" content={content}/>
        <meta name="keywords" content={keywords}/>
        <link rel="canonical" href={`${getPathLocation}/contact`}/>
        <script type="application/ld+json">
          {JSON.stringify(articleJSON)}
        </script>
    </Helmet>
  )
}

export default ContactHelmet