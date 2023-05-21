import React from 'react';
import {Helmet} from "react-helmet";



const AboutHelmet = ({productsArr,generalInfo}) => {

    const [getDesc,setGetDesc]=React.useState(null);
    const [wordList,setWordList]=React.useState(null);
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
        let wordproductsArr=["webdesign","masterconnect","master-connect"];
        let descproductsArr=[];
        if(productsArr){
            productsArr.forEach(obj=>{
                wordproductsArr.push(obj.name);
                descproductsArr.push(obj.desc.slice(0,100));

            });
        }
        setWordList(wordproductsArr);
        setGetDesc(descproductsArr);
    },[productsArr]);

    webPage={
      "@context": "http://schema.org",
      "@type": "WebPage",
      "url":"https://www.masterconnect.ca/designs",
      "name": "Our Designs page - masterconnect.ca",
      "image":productsArr ? productsArr.map(obj=>(obj.imageName)) : "",
      "description":productsArr ? productsArr.map(obj=>(obj.desc.slice(0,100))).join(",,,,,") : "",
      "publisher": {
          "@type": "Organization",
          "name": generalInfo ? generalInfo.name : "Gary Wallace",
          "email":email,
          "tel": generalInfo ? generalInfo.cell:"416-917-5768"
      }
  }

    
    
  return (
    <Helmet>
    <title>Designs </title>
    <meta name="description" content={getDesc && getDesc.map(obj=>(obj.slice(0,100))).join(",,,,")}/>
        <meta name="summary" content={"Master connect Designs for creative thinking"}/>
        <meta name="keywords" content={wordList && wordList.map(obj=>(obj))}/>
        <link rel="canonical" href={`https://www.masterconnect.ca/designs`} />
        <meta property="og:title" content="Masterconnect Designs" />
        <meta property="og:type" content="WebPage" />
        <meta property="og:url" content="https://www.masterconnect.ca/designs" />
        <meta property="og:image" content={"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"} />
        <script type="application/ld+json">
          {JSON.stringify(webPage)}
        </script>
        </Helmet>
  )
}

export default AboutHelmet