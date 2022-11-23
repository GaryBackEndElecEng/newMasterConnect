import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';
import {Card} from '@mui/material';

const HomeHelmet2 = ({generalInfoHelmet,conical}) => {
    
 const IdJson={
     
        "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Digital Master Connect",
      "legalName" : "Digital Master Connect inc",
      "url":conical,
      "logo":"https://master-connect.s3.ca-central-1.amazonaws.com/static/logoNew.png",
      "foundingDate": "2021",
      "founders": [
      {
      "@type": "Person",
      "name": "Gary Wallace, B.Eng,Rtr.Captain"
      }
      ],
      "address": {
      "@type": "PostalAddress",
      "streetAddress": generalInfoHelmet.address,
      "addressLocality":generalInfoHelmet.city,
      "addressRegion": generalInfoHelmet.provState,
      "postalCode": generalInfoHelmet.postal,
      "addressCountry": generalInfoHelmet.country
      },
      "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "telephone": generalInfoHelmet.cell,
      "email": `${conical}/contact`,
      },
      
    
 }

  return (
    <Card>
            
            <Helmet>
                <script type="application/ld+json">
               {JSON.stringify(IdJson)}
                </script>
            </Helmet>
        </Card>
  )
}

export default HomeHelmet2