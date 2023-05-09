import React from 'react';
import {Helmet} from "react-helmet";

const HomeHelmet = () => {
  let articleJSON= " This is the script"
  return (
    <Helmet>
    <title>Home </title>
        <meta name="description" content="About Master-connect.All the Services you need at a very reasonable price! "/>
        <meta name="summary" content={"This is the summary"}/>
        <meta name="keywords" content={"This is the content"}/>
        <link rel="canonical" href={`http://localhost`} />
        <script type="application/ld+json">
          {JSON.stringify(articleJSON)}
        </script>
        </Helmet>
  )
}

export default HomeHelmet