import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import styles from "./design1.module.css";

const Star = ({star}) => {
const [groupStars,setGroupStars]=React.useState([]);
    React.useEffect(()=>{
        let arr=[];
        function arrStar(x){
            // let arr=[];
            if(star >0){
                if( Math.floor(star) <=5){
                    for(let i=0;i<Math.floor(x);i++){
                    arr.push(<StarIcon sx={{ml:0.5,mr:0.5,mt:1,mb:1,color:"goldenrod"}}/>)
                    }
                }if( star%2===1 && star <5){
                    arr.push(<StarHalfIcon sx={{ml:0.5,mr:0.5,mt:1,mb:1,color:"goldenrod"}}/>)
                }else if(5-Math.ceil(star)>0) {
                    for(let i=0;i<Math.floor(5-star);i++){
                        arr.push(<StarOutlineIcon sx={{ml:0.5,mr:0.5,mt:1,mb:1,color:"goldenrod"}}/>)
                     }
                }
            
            }
        }
        
        arrStar(star);
        setGroupStars(arr);
    },[star]);
  return (
    <span>
        {
        groupStars.length>0 &&
        groupStars.map((obj,index)=>(
            <span key={index}>
                {obj}
                </span>
        ))
    }
    </span>
  )
}

export default Star