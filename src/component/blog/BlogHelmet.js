import React from 'react';
import {Helmet} from "react-helmet";



const BlogHelmet = ({generalInfo}) => {

    
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
      "url":"https://www.masterconnect.ca/blog",
      "name": "Our Blog page - masterconnect.ca",
      "image":"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png",
      "description":" masterconnect BEST blogs and videos to view",
      "publisher": {
          "@type": "Organization",
          "name": generalInfo ? generalInfo.name : "Gary Wallace",
          "email":email,
          "tel": generalInfo ? generalInfo.cell:"416-917-5768"
      }
  }

    
    
  return (
    <Helmet>
    <title>Blog Page </title>
    <meta name="description" content={"masterconnect BEST blogs and videos to view"}/>
        <meta name="summary" content={"Master connect Designs for creative thinking"}/>
        <meta name="keywords" content={"Best, Blogs, masterconnect, We services, How to create a website."}/>
        <link rel="canonical" href={`https://www.masterconnect.ca/blog`} />
        <meta property="og:title" content="Masterconnect Best Blogs" />
        <meta property="og:type" content="WebPage" />
        <meta property="og:url" content="https://www.masterconnect.ca/blog" />
        <meta property="og:image" content={"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"} />
        <script type="application/ld+json">
          {JSON.stringify(webPage)}
        </script>
        </Helmet>
  )
}

export default BlogHelmet