import React from 'react';
import { Helmet } from 'react-helmet';


const SolarHelmet = ({ keywords, summary, staticImage, desc, image, average, getPathLocation, pageRatings, getArray }) => {
    let review = "N/A";
    if (pageRatings) {
         review = pageRatings.map((obj, index) => (
            {
                "@type": "Review",
                "datePublished": `2022-04-0${index}`,
                "reviewBody": obj.comment,
                "name": obj.name,
                "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": obj.rating,
                    "worstRating": "1"
                },
                "author": {
                    "@type": "Person",
                    "name": obj.name
                }
            }

        ));
    } else { review = pageRatings }

    let JSONProduct = "N/A";

    if (getArray) {
        JSONProduct = getArray.map(obj => (
            {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": obj.title,
                "image": `${staticImage}/solar/${obj.image}`,
                "description": obj.desc,
                "mpn": "N/A",
                "brand": {
                    "@type": "Brand",
                    "name": "MACABRE DESIGN"
                },
                review
                ,
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": average,
                    "reviewCount": "89"
                },
                "offers": {
                    "@type": "Offer",
                    "url": "https://www.master-connect.ca/design13",
                    "priceCurrency": "CAD",
                    "price": obj.monthly,
                    "priceValidUntil": "N/A",
                    "itemCondition": "http://schema.org/UsedCondition",
                    "availability": "http://schema.org/InStock",
                    "seller": {
                        "@type": "Organization",
                        "name": "Digital master Connect"
                    }
                }
            }));
    }
    return (
        <Helmet>
            <title>SOLAR </title>
            <meta name="site_name" content="Web Designs" />
            <link rel="canonical" href={`${getPathLocation}/design3`} />
            <meta name="keywords" content={keywords} />
            <meta name="summary" content={summary} />
            <meta name="description" content={desc} />
            <meta name="site" content={getPathLocation} />
            <meta name="url" content={getPathLocation} />
            <meta name="image" content={image} />
            <script type="application/ld+json">
                {JSON.stringify(JSONProduct)}
            </script>
        </Helmet>
    )
}

export default SolarHelmet