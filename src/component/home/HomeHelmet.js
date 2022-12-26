import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import { Helmet } from 'react-helmet';

const HomeHelmet = ({ profileHelmet, generalInfoHelmet, getPathLocation, FAQS, newDate }) => {
  let contact = `${getPathLocation}/contact`;
  let IdJson = "general info"
  if (generalInfoHelmet) {
     IdJson = {

      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Digital Master Connect",
      "legalName": "Digital Master Connect inc",
      "url": `${getPathLocation && getPathLocation}`,
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
        "streetAddress": `${generalInfoHelmet && generalInfoHelmet.address}`,
        "addressLocality": `${generalInfoHelmet && generalInfoHelmet.city}`,
        "addressRegion": `${generalInfoHelmet && generalInfoHelmet.provState}`,
        "postalCode": `${generalInfoHelmet && generalInfoHelmet.postal}`,
        "addressCountry": `${generalInfoHelmet && generalInfoHelmet.country}`
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "telephone": `${generalInfoHelmet && generalInfoHelmet.cell}`,
        "email": contact,
      },
      "sameAs": generalInfoHelmet.siteArray


    }
  }
  let JSONFAQS = "";
  if (FAQS) {
    JSONFAQS = FAQS.map(obj => (
      {
        "@context": "https://schema.org",
        "@type": "QAPage",
        "mainEntity": {
          "@type": "Question",
          "name": "Web development",
          "text": obj.question,
          "answerCount": 1,
          "dateCreated": newDate,
          "author": {
            "@type": "Person",
            "name": "Client from request form"
          },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": obj.answer,
            "upvotecount": 1,
            "dateCreated": newDate,
            "url": `${getPathLocation && getPathLocation}`,
            "author": {
              "@type": "Person",
              "name": `Developer-${generalInfoHelmet && generalInfoHelmet.name}`
            }
          }
        }
      }
    ));
  }


  return (
    <Helmet>
      <title>master-connect</title>
      <meta name="description" content={`FULL WEB SERVICE:${getPathLocation && getPathLocation}:${profileHelmet && profileHelmet.content1}`} />
      <meta name="words" content="Web development, back-end database and front-end design" />
      <link rel="canonical" href={`${getPathLocation && getPathLocation}`} />
      <meta name="image" content="https://master-connect.s3.ca-central-1.amazonaws.com/static/profilePic1.png" />
      <meta name="email" content={`${getPathLocation && getPathLocation}/contact`} />
      <meta name="fb:site" content={profileHelmet && profileHelmet.content2} />
      <meta name="linkedlin:site" content={profileHelmet && profileHelmet.content3} />
      <meta name="profilePage" content={`${getPathLocation && getPathLocation}/bio`} />
      <meta name="address" content={generalInfoHelmet && generalInfoHelmet.address} />
      <meta name="owner" content={generalInfoHelmet && generalInfoHelmet.name} />
      <meta name="buisness" content="master-connect" />
      <script type="application/ld+json">
        {JSON.stringify(JSONFAQS)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(IdJson)}
      </script>
    </Helmet>
  )
}

export default HomeHelmet