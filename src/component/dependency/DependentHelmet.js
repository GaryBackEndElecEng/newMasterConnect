import React from 'react';
import { Helmet } from 'react-helmet';

const DependentHelmet = ({ getPathLocation, keywords,wordCount, serviceDepends, image, desc, summary }) => {
  let JSONDependency = ""
  if (serviceDepends) {
    JSONDependency = serviceDepends.map(obj => (
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": obj.category,
        "alternativeHeadline": "Service related dependancies",
        "image": image,
        "award": "Best service explanation",
        "editor": "Gary Wallace",
        "genre": "web service explanation",
        "keywords": keywords,
        "wordcount": wordCount,
        "url": `${getPathLocation}/dependency`,
        "datePublished": "2022-12-16",
        "description": obj.desc,
        "articleBody": summary,
        "author": {
          "@type": "Person",
          "name": "Gary"
        }
      }
    ))
  }
  return (
    <Helmet>
      <title> SERVICE DEPENDENCY </title>
      <meta name="site_name" content="Web Designs" />
      <link rel="canonical" href={`${getPathLocation}/design1`} />
      <meta name="keywords" content={keywords} />
      <meta name="summary" content={summary} />
      <meta name="description" content={desc} />
      <meta name="site" content={getPathLocation} />
      <meta name="url" content={getPathLocation} />
      <meta name="image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify(JSONDependency)}
      </script>
    </Helmet>
  )
}

export default DependentHelmet