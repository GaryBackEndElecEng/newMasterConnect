import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import { Helmet } from 'react-helmet';

const HomeHelmet = ({ profileHelmet, generalInfoHelmet, conical, getPathLocation }) => {
  let contact = `${getPathLocation}/contact`
  const IdJson = {

    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digital Master Connect",
    "legalName": "Digital Master Connect inc",
    "url": "https://www.master-connect.ca",
    "logo": "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png",
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
      "addressLocality": generalInfoHelmet.city,
      "addressRegion": generalInfoHelmet.provState,
      "postalCode": generalInfoHelmet.postal,
      "addressCountry": generalInfoHelmet.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "telephone": generalInfoHelmet.cell,
      "email": contact,
    },


  }

  return (
    <Helmet>
      <title>master-connect</title>
      <meta name="description" content={"Full web services"} />
      <meta name="words" content="Web development, back-end database and front-end design" />
      <link rel="canonical" href={`${getPathLocation}`} />
      <meta name="image" content="https://master-connect.s3.ca-central-1.amazonaws.com/static/profilePic1.png" />
      <meta name="email" content={profileHelmet.content1} />
      <meta name="fb:site" content={profileHelmet.content2} />
      <meta name="linkedlin:site" content={profileHelmet.content3} />
      <meta name="profilePage" content={`${getPathLocation}/bio`} />
      <meta name="address" content={"133 Elmwood Avenue"} />
      <meta name="owner" content={generalInfoHelmet.name} />
      <meta name="buisness" content={generalInfoHelmet.extra} />
      <script type="application/ld+json">
        {JSON.stringify(IdJson)}
      </script>
    </Helmet>
  )
}

export default HomeHelmet