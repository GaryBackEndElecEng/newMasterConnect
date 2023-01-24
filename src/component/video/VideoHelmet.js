import React from 'react';
import { Helmet } from 'react-helmet';


const VideoHelmet = ({ keywords, summary, desc, image, getPathLocation, getVideo, average,staticImage }) => {

  let JSONVideo = {
    "@context": "https://schema.org/",
    "@type": "VideoObject",
    "name": "Learn JSON-LD",
    "@id": "http://example.com/video",
    "datePublished": "2015-10-02",
    "description": "In this video, we'll teach you how to use json ld and get 6 pack abs.",
    "thumbnailURL": "http://placehold.it/350x150",
    "thumbnail": "http://placehold.it/350x150",
    "duration": "T1M33S",
    "uploadDate": "2015-10-02",
    "author": {
      "@type": "Person",
      "name": "Jason Lord"
    }
  }
  if (getVideo) {
    JSONVideo = getVideo.map(obj => (
      {
        "@context": "https://schema.org/",
        "@type": "VideoObject",
        "name": obj.name,
        "@id": `${staticImage}/${obj.imageName}`,
        "datePublished": "2015-10-02",
        "description": "In this video, we'll teach you how to use json ld and get 6 pack abs.",
        "thumbnailURL": {image},
        "thumbnail": {image},
        "duration": "T1M45S",
        "uploadDate": "2023-01-26",
        "author": {
          "@type": "Person",
          "name": "Gary Wallace, masterconnect.ca"
        }
      }
    ));
  }

  return (

    <Helmet>
      <title>VIDEOS-masterconnect </title>
      <meta name="site_name" content="Master Connect" />
      <meta name="keywords" content={keywords} />
      <meta name="summary" content={summary} />
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${getPathLocation}/video`} />
      <meta name="site" content={getPathLocation} />
      <meta name="url" content={getPathLocation} />
      <meta name="image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify(JSONVideo)}
      </script>
    </Helmet>

  )
}

export default VideoHelmet