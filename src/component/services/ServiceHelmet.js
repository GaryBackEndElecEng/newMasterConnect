import React from 'react';
import {Helmet} from "react-helmet";



const ServiceHelmet = ({arr,generalInfo,wedesignContext,topStuff}) => {

    const [getDesc,setGetDesc]=React.useState([]);
    const [wordList,setWordList]=React.useState([]);
    const [email,setEmail]=React.useState(null);
    let webPage="",nameDesc="";

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
        let wordArr=["webdesign","masterconnect","master-connect"];
        let descArr=[];
        if(wedesignContext){
            wedesignContext.forEach((obj,index)=>{
                wordArr.push(obj.object);
            
            });
            
        }
        if(arr){
            arr.forEach(obj=>{
                wordArr.push(obj.name);
                descArr.push(obj.desc.split(0,50));
            });
        }
        setWordList(wordArr);
        setGetDesc(descArr);
    },[]);
    
    if(topStuff){
    nameDesc=topStuff.map(obj=>(
    {
        "@context": "https://schema.org",
        "@type": "QAPage",
        "mainEntity": {
          "@type": "Question",
          "name": obj.name,
          "text":obj.name,
          "answerCount": 1,
          "dateCreated": "2023-05-10T21:11Z",
          "author": {
            "@type": "Person",
            "name": "Gary Wallace"
          },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": obj.desc,
            "upvotecount": 1,
            "dateCreated": "2023-05-10T21:11Z",
            "url": "https://www.masterconnect.ca/services",
            "author": {
              "@type": "Person",
              "name": "Gary Wallace"
            }
          }
        }
      }
      ));
    }
   

    webPage={
      "@context": "http://schema.org",
      "@type": "WebPage",
      "url":"https://www.masterconnect.ca/services",
      "name": "Service page - masterconnect.ca",
      "image":wedesignContext.map(obj=>(obj.image)),
      "description": arr.map(obj=>(obj.desc.slice(0,100))).join(",,,,,"),
      "publisher": {
          "@type": "Organization",
          "name": generalInfo ? generalInfo.name : "Gary Wallace",
          "email":email,
          "tel": generalInfo ? generalInfo.cell:"416-917-5768"
      }
  }

    
    
  return (
    <Helmet>
    <title>Services </title>
    <meta name="description" content={getDesc.map(obj=>(obj.slice(0,100))).join(",,,,")}/>
        <meta name="summary" content={arr.map(obj=>(obj.desc.slice(0,100))).join(",,,")}/>
        <meta name="keywords" content={wordList.map(obj=>(obj))}/>
        <link rel="canonical" href={`https://www.masterconnect.ca/services`} />
        
        <script type="application/ld+json">
          {JSON.stringify(webPage)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(nameDesc)}
        </script>
        </Helmet>
  )
}

export default ServiceHelmet