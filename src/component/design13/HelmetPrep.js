import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import PackageHelmet from './SolarHelmet';

const HelmetPrep = ({ getArray, staticImage, image, average, getPathLocation, pageRatings }) => {
    const location=useLocation();
  const pathname=location.pathname
    const [desc, setDesc] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [summary, setSummary] = useState([]);
    const [pageRatingSolar,setPageRatingSolar]=useState({loaded:false,data:[]});

    useEffect(() => {
        if (pageRatings) {
            let arr=pageRatings.filter(obj => (obj.page === pathname))
            setPageRatingSolar({loaded:true,data:arr})
           
        }
    }, [pathname, pageRatings]);

    useEffect(() => {
        let arr = [];
        let descTemp = "";
        let summaryTemp = "";
        if (getArray) {
            
                getArray.forEach((obj, index) => {
                    arr.push(obj.title);
                    arr.push(obj.desc.slice(0, 20));
                    descTemp= descTemp + obj.desc.slice(0,50) + ",,,";
                    summaryTemp= summaryTemp + obj.summary + ",,,";
                });
                setDesc(descTemp);
                setKeywords(arr);
                setSummary(summaryTemp);
        }
    }, [getArray,setSummary,setKeywords,setDesc,pageRatings]);
    
    return (
        <PackageHelmet
            keywords={keywords}
            desc={desc}
            getArray={getArray ? getArray:null}
            image={image}
            average={average}
            summary={summary}
            staticImage={staticImage}
            getPathLocation={getPathLocation.loaded ? getPathLocation.data:"https://www.master-connect.ca"}
            pageRatings={pageRatingSolar.loaded ? pageRatingSolar.data : null}
        />
    )
}

export default HelmetPrep