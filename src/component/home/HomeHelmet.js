import React from 'react';
import {Helmet} from "react-helmet";
import wedesignContext from './wedesignContext';
import {GeneralContext} from '../../context/GeneralContextProvider';

const HomeHelmet = () => {
  const {generalInfo}=React.useContext(GeneralContext);
    const [getDesc,setGetDesc]=React.useState([]);
    const [wordList,setWordList]=React.useState([]);
    const [email,setEmail]=React.useState(null);
    let infoJson="";
    React.useEffect(()=>{
        if(generalInfo.loaded){
            generalInfo.data.siteArray.forEach((obj,index)=>{
                if(obj.startsWith("email")){
                    setEmail(obj.split("::")[1]);
                }
            });
        }
    },[]);

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
    },[]);

    infoJson = {

        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Digital Master Connect",
        "legalName": "Digital Master Connect inc",
        "url": `www.masterconnect.ca`,
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
          "streetAddress": `${generalInfo.loaded && generalInfo.data.address}`,
          "addressLocality": `${generalInfo.loaded && generalInfo.data.city}`,
          "addressRegion": `${generalInfo.loaded && generalInfo.data.provState}`,
          "postalCode": `${generalInfo.loaded && generalInfo.data.postal}`,
          "addressCountry": `${generalInfo.loaded && generalInfo.data.country}`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "telephone": `${generalInfo.loaded && generalInfo.data.cell}`,
          "email": email,
        },
        "sameAs": generalInfo.data.siteArray
  
  
      }
  return (
    <Helmet>
    <title>Home </title>
    <meta name="description" content="About Masterconnect.All Web Services at very reasonable price!-416-917-5768 "/>
        <meta name="summary" content={getDesc.join(",,,")}/>
        <meta name="keywords" content={wordList}/>
        <link rel="canonical" href={`https://www.masterconnect.ca`} />
        <script type="application/ld+json">
          {JSON.stringify(infoJson)}
        </script>
        </Helmet>
  )
}

export default HomeHelmet