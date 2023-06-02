import React from 'react';
import {Helmet} from "react-helmet";
import {GeneralContext} from '../../context/GeneralContextProvider';



const ProcessHelmet = ({arr,generalInfo,wedesignContext}) => {
    const {staticImage}=React.useContext(GeneralContext);
    const [getDesc,setGetDesc]=React.useState([]);
    const [wordList,setWordList]=React.useState([]);
    const [email,setEmail]=React.useState(null);
    let webPage="";

    React.useEffect(()=>{
          if(generalInfo.siteArray){
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
                descArr.push(obj.desc);
            });
            setWordList(wordArr);
            setGetDesc(descArr);
        }
    },[wedesignContext]);

    webPage={
      "@context": "http://schema.org",
      "@type": "WebPage",
      "url":"https://www.masterconnect.ca/process",
      "name": "process page - masterconnect.ca",
      "image":arr && arr.map(obj=>(`${staticImage}/${obj.webImage}`)),
      "description":arr && arr.map(obj=>(obj.content.slice(0,100))).join(",,,,,"),
      "publisher": {
          "@type": "Organization",
          "name": generalInfo.name,
          "email":email,
          "tel":generalInfo.cell
      }
  }

    
    
  return (
    <Helmet>
    <title>Process </title>
    <meta name="description" content={ arr && arr.map(obj=>(obj.content1.slice(0,100))).join(",,,,")}/>
        <meta name="summary" content={arr && arr.map(obj=>(obj.content.slice(0,100))).join(",,,")}/>
        <meta name="keywords" content={arr && arr.map(obj=>(obj.title))}/>
        <link rel="canonical" href={`https://www.masterconnect.ca/process`} />
        
        <script type="application/ld+json">
          {JSON.stringify(webPage)}
        </script>
        </Helmet>
  )
}

export default ProcessHelmet