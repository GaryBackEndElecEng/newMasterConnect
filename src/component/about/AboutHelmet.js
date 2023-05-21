import React from 'react';
import {Helmet} from "react-helmet";



const AboutHelmet = ({arr,generalInfo}) => {

    const [getDesc,setGetDesc]=React.useState([]);
    const [wordList,setWordList]=React.useState([]);
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

    React.useEffect(()=>{
        let wordArr=["webdesign","masterconnect","master-connect","Connect","Design","ownership"];
        let descArr=[];
        if(arr){
            arr.forEach(obj=>{
                wordArr.push(obj.name);
                descArr.push(obj.content.split(0,50));
            });
        }
        setWordList(wordArr);
        setGetDesc(descArr);
    },[]);

    webPage={
      "@context": "http://schema.org",
      "@type": "WebPage",
      "url":"https://www.masterconnect.ca/about",
      "name": "About Us page - masterconnect.ca",
      "image":arr.map(obj=>(obj.image)),
      "description": arr.map(obj=>(obj.content.slice(0,100))).join(",,,,,"),
      "publisher": {
          "@type": "Organization",
          "name": generalInfo ? generalInfo.name : "Gary Wallace",
          "email":email,
          "tel": generalInfo ? generalInfo.cell:"416-917-5768"
      }
  }

    
    
  return (
    <Helmet>
    <title>About Us </title>
    <meta name="description" content={getDesc.map(obj=>(obj.slice(0,100))).join(",,,,")}/>
        <meta name="summary" content={"about Master connect Custom web services for low cost"}/>
        <meta name="keywords" content={wordList.map(obj=>(obj))}/>
        <link rel="canonical" href={`https://www.masterconnect.ca/about`} />
        <meta property="og:title" content="Masterconnect Us" />
        <meta property="og:type" content="WebPage" />
        <meta property="og:url" content="https://www.masterconnect.ca/about" />
        <meta property="og:image" content={"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"} />
        <script type="application/ld+json">
          {JSON.stringify(webPage)}
        </script>
        </Helmet>
  )
}

export default AboutHelmet