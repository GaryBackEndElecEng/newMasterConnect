import React from 'react';
import { Helmet } from 'react-helmet';


const ProductHelmet = ({ keywords, summary, image, average, getPathLocation, pageRatings, getArray }) => {
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
                "name": obj.name,
                "image": obj.imageArr.map(obj=>(obj.image)),
                "description": `${obj.name} is used as a sample`,
                "mpn": "N/A",
                "brand": {
                    "@type": "Brand",
                    "name": "sample web design"
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
                    "price": "13",
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
            <title>PRODUCT ARRAY </title>
            <meta name="site_name" content="Web Designs" />
            <link rel="canonical" href={`${getPathLocation}/design14`} />
            <meta name="keywords" content={keywords} />
            <meta name="summary" content={summary} />
            <meta name="description" content={summary} />
            <meta name="site" content={getPathLocation} />
            <meta name="url" content={getPathLocation} />
            <meta name="image" content={image} />
            <script type="application/ld+json">
                {JSON.stringify(JSONProduct)}
            </script>
        </Helmet>
    )
}

export default ProductHelmet