import React from 'react';
import {Helmet} from "react-helmet";



const ContactHelmet = ({generalInfo}) => {

    
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
      "url":"https://www.masterconnect.ca/contact",
      "name": "Contact page - masterconnect.ca",
      "image":"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png",
      "description":" masterconnect Contact & start up Page",
      "publisher": {
          "@type": "Organization",
          "name": generalInfo ? generalInfo.name : "Gary Wallace",
          "email":email,
          "tel": generalInfo ? generalInfo.cell:"416-917-5768"
      }
  }

    
    
  return (
    <Helmet>
    <title>Contact & start project Page </title>
    <meta name="description" content={"Master connect's contact page - send us a message"}/>
        <meta name="summary" content={"Master connect contact page"}/>
        <meta name="keywords" content={"Best masterconnect  website in North America."}/>
        <link rel="canonical" href={`https://www.masterconnect.ca/contact`} />
        <meta property="og:title" content="Masterconnect contact page messaging" />
        <meta property="og:type" content="WebPage" />
        <meta property="og:url" content="https://www.masterconnect.ca/contact" />
        <meta property="og:image" content={"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"} />
        <script type="application/ld+json">
          {JSON.stringify(webPage)}
        </script>
        </Helmet>
  )
}

export default ContactHelmet