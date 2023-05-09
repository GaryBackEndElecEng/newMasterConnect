import React from 'react'

export const intersectionTool = ({reference,state,threshold}) => {
    const observer=new IntersectionObserver((entries)=>{
        let entry=entries[0];
        if(entry.isIntersecting){
           return state(true);
        }
    },{threshold:threshold});
    if(reference.current){

        observer.observe(reference.current);
        return ()=>observer.disconnect();
    }
}

export const scrollEffect=(tickfalsetrue,lastPosition)=>{
    let ticker=tickfalsetrue;
    let lastPos=lastPosition;

    function activateScroll(lastPos){
        if(lastPos >0 && lastPos <900){
            //-40<x<40
                let value=Math.floor(lastPos);
                return value;
                // let value=Math.floor(45-setValue);
                // console.log("lastPos:",lastPos,"seValue",value)
        };
    };
    document.addEventListener("scroll",()=>{
        ticker=false;
        window.requestAnimationFrame(()=>{
            lastPos=Math.ceil(window.scrollY);
            
            if(!ticker){
                activateScroll(lastPos)
            }
            ticker=true;
        });
    });
    return activateScroll(lastPos);
};


export const processCoverWordFeed = (size) => {
//size is md,sm,xs
const returnArr=[];
    const arr=[
        {id:1,name:"Process",size:{md:"1000%",sm:"600%",xs:"400%"},top:{md:"10%",sm:"15%",xs:"15%"},left:{md:"1%",sm:"0%",xs:"1%"},color:"transparent",backgroundImage:"var(--background-image-1-left)",rotate:"200deg"},
        {id:2,name:"Design",size:{md:"900%",sm:"400%",xs:"380%"},top:{md:"22%",sm:"29%",xs:"21%"},left:{md:"19%",sm:"15%",xs:"16%"},color:"red",backgroundImage:null,rotate:"400deg"},
        {id:3,name:"Improve",size:{md:"700%",sm:"350%",xs:"300%"},top:{md:"10%",sm:"25%",xs:"28%"},left:{md:"30%",sm:"27%",xs:"38%"},color:"transparent",backgroundImage:"var(--background-555)",rotate:"180deg"},
        {id:4,name:"Custom",size:{md:"1100%",sm:"650%",xs:"390%"},top:{md:"40%",sm:"40%",xs:"47%"},left:{md:"35%",sm:"23%",xs:"23%"},color:"transparent",backgroundImage:"var(--background-image-1-turn)",rotate:"-40deg"},
        {id:5,name:"Maximize",size:{md:"950%",sm:"550%",xs:"460%"},top:{md:"30%",sm:"30%",xs:"36%"},left:{md:"46%",sm:"42%",xs:"17%"},color:"transparent",backgroundImage:"var(--background-image-1-turn)",rotate:"127deg"},
        {id:6,name:"Experience",size:{md:"750%",sm:"420%",xs:"355%"},top:{md:"20%",sm:"24%",xs:"32%"},left:{md:"65%",sm:"60%",xs:"1%"},color:"transparent",backgroundImage:"var(--background-1)",rotate:"270deg"},
        {id:7,name:"Skilled",size:{md:"835%",sm:"520%",xs:"285%"},top:{md:"40%",sm:"34.5%",xs:"43%"},left:{md:"10%",sm:"6%",xs:"3%"},color:"white",backgroundImage:null,rotate:"80deg"},
        {id:8,name:"Engineered",size:{md:"985%",sm:"460%",xs:"345%"},top:{md:"56%",sm:"56%",xs:"64%"},left:{md:"1%",sm:"1%",xs:"1%"},color:"transparent",backgroundImage:"var(--background-image-1-left)",rotate:"-300deg"},
        {id:9,name:"Developed",size:{md:"655%",sm:"380%",xs:"225%"},top:{md:"10%",sm:"17%",xs:"14%"},left:{md:"55%",sm:"52%",xs:"55%"},color:"blue",backgroundImage:null,rotate:"-45deg"},
        {id:10,name:"SEO",size:{md:"1055%",sm:"690%",xs:"485%"},top:{md:"40%",sm:"38%",xs:"41.5%"},left:{md:"75%",sm:"72%",xs:"57%"},color:"transparent",backgroundImage:"var(--background-hopefulHarvest)",rotate:"62deg"},
        {id:11,name:"Data",size:{md:"705%",sm:"380%",xs:"285%"},top:{md:"52%",sm:"50%",xs:"26%"},left:{md:"65%",sm:"57%",xs:"2%"},color:"transparent",backgroundImage:"var(--background-hopefulHarvest)",rotate:"105deg"},
        {id:12,name:"Discovery",size:{md:"705%",sm:"440%",xs:"245%"},top:{md:"69%",sm:"63.5%",xs:"62%"},left:{md:"35%",sm:"31%",xs:"30%"},color:"aquamarine",backgroundImage:null,rotate:"180deg"},
        {id:13,name:"Secure",size:{md:"1200%",sm:"620%",xs:"465%"},top:{md:"57%",sm:"55%",xs:"54%"},left:{md:"67%",sm:"56%",xs:"43%"},color:"transparent",backgroundImage:"var(--background-text-1)",rotate:"20deg"},
        {id:13,name:"Optimize",size:{md:"900%",sm:"480%",xs:"320%"},top:{md:"70%",sm:"70%",xs:"69%"},left:{md:"5%",sm:"5%",xs:"45%"},color:"blue",backgroundImage:null,rotate:"180deg"},
        {id:14,name:"Progressive",size:{md:"720%",sm:"465%",xs:"350%"},top:{md:"92%",sm:"90%",xs:"92%"},left:{md:"12%",sm:"5%",xs:"16%"},color:"transparent",backgroundImage:"var(--background-image-1-turn)",rotate:"0deg"},
        {id:15,name:"Published",size:{md:"920%",sm:"585%",xs:"370%"},top:{md:"76%",sm:"69.5%",xs:"74%"},left:{md:"63%",sm:"50%",xs:"2%"},color:"transparent",backgroundImage:"var(--background-hopefulHarvest)",rotate:"-45deg"},
        {id:16,name:"Managed",size:{md:"820%",sm:"505%",xs:"320%"},top:{md:"83%",sm:"79%",xs:"85%"},left:{md:"33%",sm:"15%",xs:"15%"},color:"white",backgroundImage:null,rotate:"70deg"},
        {id:17,name:"Contracted",size:{md:"820%",sm:"415%",xs:"220%"},top:{md:"90%",sm:"82%",xs:"80%"},left:{md:"60%",sm:"60%",xs:"52%"},color:"yellow",backgroundImage:null,rotate:"-200deg"},
        {id:18,name:"Clean",size:{md:"980%",sm:"525%",xs:"350%"},top:{md:"55.5%",sm:"48.5%",xs:"53.5%"},left:{md:"43%",sm:"11%",xs:"3%"},color:"transparent",backgroundImage:"var(--background-33-light)",rotate:"290deg"},
        {id:19,name:"Recommend",size:{md:"780%",sm:"425%",xs:"300%"},top:{md:"97.5%",sm:"94.5%",xs:"97.5%"},left:{md:"43%",sm:"31%",xs:"3%"},color:"transparent",backgroundImage:"var(--background-33-light)",rotate:"290deg"},
        {id:20,name:"Program",size:{md:"620%",sm:"385%",xs:"220%"},top:{md:"26%",sm:"88.5%",xs:"71%"},left:{md:"3%",sm:"66%",xs:"3%"},color:"transparent",backgroundImage:"var(--background-hopefulHarvest)",rotate:"290deg"},
        {id:21,name:"Review",size:{md:"920%",sm:"485%",xs:"320%"},top:{md:"17%",sm:"10%",xs:"19%"},left:{md:"39%",sm:"11%",xs:"47%"},color:"transparent",backgroundImage:"var(--background-image-1-left)",rotate:"290deg"},
    ];
    arr.forEach(word=>{
        if(size==="md"){
            returnArr.push(
                {id:word.id,name:word.name,size:word.size.md,top:word.top.md,left:word.left.md,color:word.color,backgroundImage:word.backgroundImage,rotate:word.rotate}
            )
        }else if(size==="sm"){
            returnArr.push(
                {id:word.id,name:word.name,size:word.size.sm,top:word.top.sm,left:word.left.sm,color:word.color,backgroundImage:word.backgroundImage,rotate:word.rotate}
            )
        }else {
            returnArr.push(
                {id:word.id,name:word.name,size:word.size.xs,top:word.top.xs,left:word.left.xs,color:word.color,backgroundImage:word.backgroundImage,rotate:word.rotate}
            )
        }
    });
    return returnArr;
  
}

