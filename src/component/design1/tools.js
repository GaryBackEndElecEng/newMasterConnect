import React from 'react';
import styles from './design1.module.css'

function sortwkday(day){
    //Shift day to right
    const weekDay=[{id:0,name:" mon "},{id:1,name:"tues "},{id:2,name:" wed "},{id:3,name:"thur"},{id:4,name:" fri "},{id:5,name:" sat "},{id:6,name:" sun "},]
    let id=day%7;
    return weekDay[id].name
}
const Day=({day,getDate,getDay})=>{
    const [highlight,setHighlight]=React.useState(false);

    const dayStyle={display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}
    const dayStyleDate={color:"red",fontSize:"105%",flexGrow:1,padding:"0.25rem"}

    React.useEffect(()=>{
        if(day===getDate){
            setHighlight(true);
        }else{setHighlight(false);}
    },[]);

    return(
        <div style={dayStyle}>
            <div style={highlight ? dayStyleDate :{flexGrow:1,padding:"0.25rem"}}>{sortwkday(day)}</div>
            <div>{day}</div>
        </div>
        )
}

export const Calendars = ({date}) => {
    const [getNewDate,setGetNewDate]=React.useState({loaded:false,date:null});
const month=date.getMonth();
const getDate=date.getDate();
const getDay=date.getDay();

let arr=[];
  const monthArr=[
    {id:0,month:"January",days:31},
    {id:1,month:"Febuary",days:28},
    {id:2,month:"March",days:31},
    {id:3,month:"April",days:30},
    {id:4,month:"May",days:31},
    {id:5,month:"June",days:30},
    {id:6,month:"July",days:31},
    {id:7,month:"August",days:31},
    {id:8,month:"September",days:30},
    {id:9,month:"October",days:31},
    {id:10,month:"November",days:30},
    {id:11,month:"December",days:31},
  ]
  monthArr.forEach(monthEle=>{
    if(monthEle.id===month){
        
        for(let i=0;i<monthEle.days;i++){
            arr.push(
                {
                    id:i+1,
                    element:<Day day={i+1} getDate={getDate} getDay={getDay}/>
                }
            )
        }
        
    }else{return;}
    
  });
  const handleMouseOver=(e)=>{

    e.currentTarget.style.background="rgba(0,0,0,0.3)";
    e.currentTarget.style.cursor="pointer";
  }
  const handleMouseOut=(e)=>{
    e.currentTarget.style.background="transparent";
  }
  const getDateStamp=(e,id)=>{
    e.preventDefault();
    let thisDay=id;
    let newDay=new Date(`${monthArr[month].month} ${thisDay},2023`);
    setGetNewDate({loaded:true,date:newDay});
    alert(`new date:${newDay}- Call Us:416-917-5768, Gary Wallace`);

  }

  return (
    <div style={{margin:0,padding:"5px",display:"flex",flexWrap:"wrap",alignItems:"center",width:"100%",justifyContent:"center",border:"1px solid black",boxShadow:"1px 1px 10px 1px black",position:"relative",placeContent:"center start"}}>
    {arr && arr.map((obj,index)=>(
        <div key={`${obj.id}-day-${index}`}
        id={obj.id}
        style={{margin:"2px",border:"1px solid black",boxShadow:"1px 1px 5px 1px white",borderRadius:"10%",flex:"0 0 12.3%"}}
        onMouseOver={(e)=>handleMouseOver(e)}
        onMouseOut={(e)=>handleMouseOut(e)}
        onClick={(e)=>getDateStamp(e,obj.id)}
        >
            {obj.element}
            </div>
    ))}
    </div>
  );
  
}

export const getMonth=(date)=>{
    const month=date.getMonth();
    const getDate=date.getDate();
    const getDay=date.getDay();
    let haveMonth="not found";
      const monthArr=[
        {id:0,month:"January",days:31},
        {id:1,month:"Febuary",days:28},
        {id:2,month:"March",days:31},
        {id:3,month:"April",days:30},
        {id:4,month:"May",days:31},
        {id:5,month:"June",days:30},
        {id:6,month:"July",days:31},
        {id:7,month:"August",days:31},
        {id:8,month:"September",days:30},
        {id:9,month:"October",days:31},
        {id:10,month:"November",days:30},
        {id:11,month:"December",days:31},
      ]
      monthArr.forEach(monthEle=>{
            if(monthEle.id===month){
                haveMonth= monthEle.month;
            }
        });
        return haveMonth;
}

