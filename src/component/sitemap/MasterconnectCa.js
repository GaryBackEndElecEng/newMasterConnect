import React,{useState,useEffect} from "react";
import api from '../axios/api';




const MasterconnectCa = () => {
    const [sitemap, setSitemap]=useState({loaded:false,data:[]});
// console.log(sitemap.data[0].lastmod.split("T")[0]);
const formatDate=(date)=>{
    var Date_ = new Date(date);
    var year = Date_.toLocaleString("default", { year: "numeric" });
    var month = Date_.toLocaleString("default", { month: "2-digit" });
    var day = Date_.toLocaleString("default", { day: "2-digit" });
    return year + "-" + month + "-" + day;
}
    useEffect(()=>{
        const getSitemap= async()=>{
            try {
                const res= await api.get("/getSitemap/");
                const body=res.data;
                setSitemap({loaded:true,data:body});
            } catch (error) {
                console.error(error.message)
            }
        }
        getSitemap();
    },[]);

    
     const masterconnectCa =()=>{
        let char=""
        if(sitemap.loaded && sitemap.data){
            let generateUrl = sitemap.data.map(obj=>(
                `
                <url>
                <loc>http://www.masterconnect.ca${obj.loc}</loc>
                <lastmod>${formatDate(obj.lastmod)}</lastmod>
                <changefreq>${obj.changefreq}</changefreq>
                <priority>${obj.priority/10}</priority>
                </url>`
                
            ));
            generateUrl.forEach((obj,index)=>{
                char =char + obj
            });
            return char
        }
     }
    
  return (
    
    <div><pre> {
                `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${masterconnectCa()}
                </urlset>
                `
              }</pre></div>
    
    )

}

export default MasterconnectCa