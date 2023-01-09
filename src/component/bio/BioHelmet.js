import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';
// import api from '../axios/api';


const BioHelmet = ({obj,intro,getPathLocation,CV}) => {
 
  let BioJSON={};
  let PDFJson={};
  if(obj){
    BioJSON={
            "@context": "https://schema.org",
            "@type": "Person",
            "name":obj.name,
            "gender": "male",
            "telephone": obj.cell,
            "image": "https://new-master.s3.ca-central-1.amazonaws.com/static/profilePic1.png",
            "email": obj.email,
            "openingHours":obj.extra,
            "url": `${getPathLocation}/bio`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": obj.city,
              "addressRegion": obj.provState,
              "postalCode": obj.postal,
              "streetAddress": obj.address
            },
            "sameAs" :  obj.siteArray
        }

         PDFJson={
          "@type": "DigitalDocument",
          "name": "Resume for Gary Wallace",
          "author": "gary Wallace",
          "encodingFormat":"application/pdf",
          "comment":"Available for Contract work",
          "identifier":CV,
          "publishingPrinciples":CV,
          "hasDigitalDocumentPermission": [
            {
              "@type": "DigitalDocumentPermission",
              "permissionType": "https://schema.org/WritePermission",
              "grantee": {
                "@type": "Person",
                "email": obj.email
              }
            },
            {
              "@type": "DigitalDocumentPermission",
              "permissionType": "https://schema.org/ReadPermission",
              "grantee": {
                "@type": "Audience",
                "audienceType": "public"
              }
            }
          ]
          
        }
  }
  
  return (
    <Helmet>
        <title>Biography</title>
        <meta name="description" content={intro.content + " " + intro.content1 + " " + intro.content2 }/>
        <link rel="canonical" href={`${getPathLocation}/bio`}/>
        <script type="application/ld+json">
          {JSON.stringify(BioJSON)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(PDFJson)}
        </script>
    </Helmet>
  )
}

export default BioHelmet