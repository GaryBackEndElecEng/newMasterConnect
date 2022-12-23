import React, { useEffect, useState } from 'react'
import PackageHelmet from './PackageHelmet';

const HelmetPrep = ({ getPackages, staticImage, image, average, getPathLocation, pageRatings }) => {
    const [desc, setDesc] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [summary, setSummary] = useState([]);
    const [pageRating,setPageRating]=useState({loaded:false,data:[]});


    useEffect(() => {
        let arr = [];
        let pageRate=[];
        let descTemp = "";
        let summaryTemp = "";
        if (getPackages.loaded) {
            
                getPackages.data.forEach((obj, index) => {
                    arr.push(obj.name);
                    arr.push(obj.desc.slice(0, 20));
                    descTemp= descTemp + obj.desc.slice(0,50) + ",,,";
                    summaryTemp= summaryTemp + obj.summary + ",,,";
                    if(pageRatings){
                        pageRatings.forEach((rating,index)=>{
                            let product=obj.products.filter(product=>(product.extra_kwargs===rating.page))[0]
                            if(product){
                                pageRate.push(rating)
                            }
                        });
                    }
                });
                setPageRating({loaded:true,data:pageRate});
                setDesc(descTemp);
                setKeywords(arr);
                setSummary(summaryTemp);
        }
    }, [getPackages,setSummary,setKeywords,setDesc,setPageRating,pageRatings]);
    
    return (
        <PackageHelmet
            keywords={keywords}
            desc={desc}
            image={image}
            average={average}
            summary={summary}
            staticImage={staticImage}
            getPathLocation={getPathLocation.loaded ? getPathLocation.data:"https://www.master-connect.ca"}
            pageRatings={pageRating.loaded ? pageRating.data:null}
            packages={getPackages.loaded ? getPackages.data:null}
        />
    )
}

export default HelmetPrep