import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';
// import api from '../axios/api';


const BioHelmet = ({obj,intro,conical,getPathLocation}) => {
  let BioJSON={}
  if(obj){
    BioJSON={
            "@context": "https://schema.org",
            "@type": "Person",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": obj.city,
              "addressRegion": obj.provState,
              "postalCode": obj.postal,
              "streetAddress": obj.address
            },
            "openingHours":obj.extra,
            "email": obj.email,
            "image": "https://new-master.s3.ca-central-1.amazonaws.com/static/profilePic1.png",
            "jobTitle": "Developer",
            "name": obj.name,
            
            "birthPlace": "Etobicoke, ON",
            "birthDate": "1965-02-21",
            "height": "70 inches",
            "gender": "male",
            "memberOf": "Conservative Party",
            "nationality": "White",
            "telephone": obj.cell,
            "url": `${getPathLocation}/bio`,
            "sameAs" :  obj.siteArray
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
    </Helmet>
  )
}

export default BioHelmet