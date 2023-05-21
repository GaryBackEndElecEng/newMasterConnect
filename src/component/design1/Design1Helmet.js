import React from 'react';
import {Helmet} from 'react-helmet';


const Design1Helmet = ({generalInfo, product,pageRate}) => {
  const [getDesc,setGetDesc]=React.useState(null);
    const [wordList,setWordList]=React.useState(null);
    const [email,setEmail]=React.useState(null);
    

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
      let descproductsArr=[" Design1: its an STA example perfect for businesses with more than 5 units"];
      if(product){
              wordproductsArr.push(product.name);
              descproductsArr.push(product.desc);
              descproductsArr.push(product.summary);

  
      }
      setWordList(wordproductsArr);
      setGetDesc(descproductsArr);
  },[product]);

  const review= pageRate && pageRate.map((obj)=>(
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": obj.rating
      },
      "name": "STA",
      "author": {
        "@type": "Person",
        "name": obj.name
      },
      "datePublished": `2023-0${Math.ceil(Math.random()*5)}-0${Math.ceil(Math.random()*5)}`,
      "reviewBody": obj.comment,
      "publisher": {
        "@type": "Organization",
        "name": "masterconnect.ca",
        "email":email,
        "tel":generalInfo.cell
      }
    }
  ));

let Review= {
  "@context": "https://schema.org/",
  "@type": "Product",
  "image": "http://www.example.com/iphone-case.jpg",
  "name": "Design 1 - STA",
  "review":review
}

  

  
return (
<Helmet>
<title>STA  </title>
<meta name="site_name" content="Web Designs"/>
<link rel="canonical" href={`https://www.masterconnect.ca/design1`} />
<meta name="keywords" content={wordList}/>
<meta name="summary" content={"masterconnect.ca design1- STA"}/>
<meta name="description" content={getDesc}/>
<meta name="site" content={"https://www.masterconnect.ca"}/>
<meta name="url" content={"https://www.masterconnect.ca/design1"}/>
<meta name="image" content={product ? product.imageName :""}/>
<script type="application/ld+json">
  {JSON.stringify(Review)}
</script>
</Helmet>
)
}

export default Design1Helmet