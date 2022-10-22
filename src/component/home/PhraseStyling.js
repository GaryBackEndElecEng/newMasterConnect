import React, { useEffect, useState,useMemo } from 'react';
import { Box, Grid, Divider, Link, Paper, Container, Typography, Stack, Fab, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from "./home.module.css";


const PhraseStyling = ({phrase}) => {
    const theme=useTheme();
    
    const [Period,setPeriod]=useState({index:[],phrase:[]});
    const [Arr,setArr]=useState([]);

    useMemo(()=>{
        const period=phrase.split(".")
        if(period.length>0){
            period.forEach((phrase,index)=>{
                setPeriod({phrase:[...Period.phrase,phrase],index:[...Period.index,index]})
            });
        }
      
        
    },[]);

    useMemo(()=>{
        let arr=[]
        if(Period.phrase.length>0){
            Period.phrase.forEach((phrase,index)=>{
                if(phrase.split("-")){
                    let getHyphen=phrase.split("-")[1]
                    arr.push(<span style={{fontFamily:"bold"}}>-{getHyphen}</span>)
                }
                else if(phrase.split("!")){
                    let getExclam=phrase.split("!")[0]
                    arr.push(<span style={{fontFamily:"bold"}}>{getExclam}!</span>)
                }
                else if(phrase.split("'")){
                    let getQuote=phrase.split("'")[1]
                    arr.push(<span style={{fontFamily:"bold"}}>{getQuote}</span>)
                }else{
                    arr.push(<span >.{phrase}.</span>)
                }
            });
            setArr(arr)
        }
    },[setArr,Period]);

  return (
    <>
    
        {Arr.length>0 && Arr.map(phrase=>(
            <Typography component="h1" variant="h6" key={Math.ceil(Math.random()*1000)}>{phrase}</Typography>
            ))}
        
    
    </>
  )
}

export default PhraseStyling