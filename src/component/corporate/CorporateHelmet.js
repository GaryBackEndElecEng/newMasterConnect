import React from 'react';
import {Helmet} from "react-helmet";



const CorporateHelmet = ({generalInfo}) => {

    
    const [email,setEmail]=React.useState(null);
    let webPage="";

    React.useEffect(()=>{
          if(generalInfo){
            generalInfo.siteArray.forEach((obj,index)=>{
                if(obj.startsWith("email")){
                    setEmail(obj.split("::")[1]);
                }
            });
          }
        
    },[generalInfo]);


    webPage={
      "@context": "http://schema.org",
      "@type": "WebPage",
      "url":"https://www.masterconnect.ca/corporate",
      "name": "corporate page - masterconnect.ca",
      "image":"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png",
      "description":" masterconnect corporate & start up Page",
      "publisher": {
          "@type": "Organization",
          "name": generalInfo ? generalInfo.name : "Gary Wallace",
          "email":email,
          "tel": generalInfo ? generalInfo.cell:"416-917-5768"
      }
  }

    
    
  return (
    <Helmet>
    <title>Corporate Page </title>
    <meta name="description" content={"Master connect's corporate page - send us a message"}/>
        <meta name="summary" content={"Master connect corporate page"}/>
        <meta name="keywords" content={"Best masterconnect  website in North America."}/>
        <link rel="canonical" href={`https://www.masterconnect.ca/corporate`} />
        <meta property="og:title" content="Masterconnect corporate page messaging" />
        <meta property="og:type" content="WebPage" />
        <meta property="og:url" content="https://www.masterconnect.ca/corporate" />
        <meta property="og:image" content={"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"} />
        <script type="application/ld+json">
          {JSON.stringify(webPage)}
        </script>
        </Helmet>
  )
}

export default CorporateHelmet