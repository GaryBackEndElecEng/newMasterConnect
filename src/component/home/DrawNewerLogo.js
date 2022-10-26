import React,{useState,useContext} from 'react';
import Sketch from "react-p5";
import TypeMConnect from './TypeMConnect';
import TypeHelpConnect from './TypeHelpConnect';
import {useTheme} from '@mui/material';
import {LogoBox} from '../../styled/Div.styled';
import {LogoWrapper} from '../../styled/Container.styled';
import {GeneralContext} from '../../context/GeneralContextProvider';
// var logoCount=0;

let x = window.innerWidth/4 > 375 ? window.innerWidth/4 : 375;
let fontSize=x >375 ? 40 :30;
let y = x;
const DrawNewerLogo = () => {
    
    //have to check on history to see if
    const theme=useTheme();
    const [load1,setLoad1]=useState(false); //INNERCIRCLE-RED
    const [load2,setLoad2]=useState(false); //OUTER-GREEN
    const {setLoad3,changePage,fadeLogo}=useContext(GeneralContext); //REMOVES LOGO
    const stopP5Looping= changePage || fadeLogo ? JSON.parse(sessionStorage.getItem('load3')) : false;
    // fadeLogo timer is set at <Home/>


    const setup = (p5, canvasParentRef) => {
        // console.log("stopP5Looping",stopP5Looping,"load3",load3)
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
        if(stopP5Looping){
            p5.noLoop()
        }
        p5.noFill();
        p5.angleMode(p5.DEGREES);
        p5.frameRate(20);
        p5.createCanvas(x, y).parent(canvasParentRef);
        
        
        }
    
    const draw = (p5) => {
        if(!stopP5Looping){
            // console.log("isLooping()",p5.isLooping())
            let degGap=5;
            let degGap1= 25;
            let a1=p5.frameCount*degGap1;
            let a=p5.frameCount*degGap;
            let Xo=x/2;
            let Yo=Xo;
            let blueGreen=theme.palette.logo.circleStroke;
            
            if(a>70 && a<=540 ){
                p5.beginShape();
                    let x=Xo/1*(1+Math.cos(a1));
                    let y=Yo/1*(1+Math.sin(1*a1));
                    let x1=Xo/1*(1+Math.cos(1*a1+12*degGap1));
                    let y1=Yo/1*(1+Math.sin(1*a1+12*degGap1));
                    p5.vertex(x,y);
                    p5.vertex(x1,y1);
                    p5.vertex(Xo,Yo);
                    p5.stroke(blueGreen);
                    p5.strokeWeight(1);
                p5.endShape();
                }
                if(a<=280+degGap){
                    // translate(Xo/(a),Yo/(a));
                    // translate(Xo/(3*a),Yo/(3*a));
                p5.beginShape();
                    let x1=(Xo-Xo*Math.cos(a)/2);
                    let y1=(Yo-Yo*Math.sin(a)/2);
                    let x2=(Xo-Xo*Math.cos(a)/4);
                    let y2=(Yo-Yo*Math.sin(a)/4);
                    // rotate(PI/a);
                    p5.vertex(x1/1,y1/1);
                    p5.vertex(x2,y1);
                    p5.vertex(Xo,Yo);
                    p5.vertex((Xo-Xo*Math.cos(a)/2),(Yo-Yo*Math.sin(a)/2))
                    p5.strokeWeight(1);
                    p5.stroke(theme.palette.logo.main);
                p5.endShape();
                }
                if(a>90 && a>170){
                    setLoad1(true);
                }
                if(a>100 && a>200){
                    setLoad2(true);
                }
                if(a%700===0){
                setLoad3(true);
                sessionStorage.setItem("load3",true)
                p5.noLoop()
                }
        }
            
	};
    if(!stopP5Looping){
            return (
                
                <LogoWrapper width={x}
                style={{
                    background:theme.palette.common.light,
                    position:"relative",
                    borderRadius:"50%"
                    }}
                    >
                    <LogoBox background={"transparent"} 
                    sx={{
                        width:"100%",
                        height:"100%",
                        margin:"auto",
                        }}
                        >
                    <TypeMConnect load1={load1} fontSize={fontSize} /><br/>
                    <TypeHelpConnect load2={load2} fontSize={fontSize + 5} />
                    </LogoBox>
                    <Sketch setup={setup} draw={draw} style={{margin:"auto"}}/>
                </LogoWrapper>
                
            )
        }
}

export default DrawNewerLogo


// const newerLogo =()=>{
//         // const logoPhrase= document.querySelector("section>#typeWord");
//         // const typeLogo = ()=>{
//         // const word= "Master-connect";
//         // const wordArray=word.split("");
//         // for(var i=0;i<wordArray.length;i++){
            
//         //     logoPhrase.innerHTML+=`<span>${wordArray[i]}</span>`;
//         //     console.log(logoPhrase.innerHTML);
//         //     // spanIt.style.position="absolute";
//         //     // spanIt.style.transform="translateY(-100%)";
//         // };
//         // const spanGroup=document.querySelectorAll("section #typeWord span");
//         // spanGroup.forEach((element,index) =>{
//         //     if(element.style.animation){
//         //     element.style.animation="";
//         //     }else{
            
//         //     element.style.transform="translate(-250%,-300%)";
//         //     element.style.top="15vh";
//         //     element.style.display="inline";
//         //     element.style.color="white";
//         //     element.classList.add("activate");
//         //     element.style.fontSize="6vw";
//         //     element.style.color="white";
//         //     element.style.textShadow="4px 4px 4px rgba(255,255,255,0.5)";
//         //     element.style.animation=`slideWord ${index/6 + 1.5}s ease-in-out`;
//         //     element.style.position="relative";
//         //     element.style.left="calc(4vw + 22px)";
//         //     element.style.top="calc(4vw )";

//         //     }
            
//         // });

//         }
//         // const Phrase= document.querySelector("section>#LogoPhrase");
//         const  phrase = ()=>{
//         // const word2= "Helping you connect";
//         // const wordArray2=word2.split("");
//         // for(var i=0;i<wordArray2.length;i++){
            
//         //     Phrase.innerHTML+=`<span>${wordArray2[i]}</span>`;
//         //     console.log(Phrase.innerHTML);
            
//         // };
//         // const spanGroup2=document.querySelectorAll("section #LogoPhrase span");
//         // spanGroup2.forEach((element,index) =>{
//         //     if(element.style.animation){
//         //     element.style.animation="";
//         //     }else{
//         //     element.style.transform="translate(-250%,-200px)";
//         //     element.style.display="inline";
//         //     element.style.color="black";
//         //     element.classList.add("activate");
//         //     element.style.fontSize="9vw";
//         //     // element.style.background="purple";
//         //     element.style.textShadow="8px 8px 8px rgba(0,0,0,0.5)";
//         //     element.style.animation=`slidePhrase ${index/6 + 1.5}s ease-in-out`;
//         //     element.style.position="relative";
//         //     element.style.left="calc(4vw + 22px)";
//         //     element.style.top="calc(5vw + 5vh )";
//         //     }
            
//         // });

//         }

//         function setup(){
//         noFill();
//         createCanvas(600,600);
//         background(15);
//         angleMode(DEGREES);
//         frameRate(20);
//         }
//         function draw(){
//         // background(0);
//         // let degGap=5;
//         // let degGap1= 35;
//         // let a1=frameCount*degGap1;
//         // let a=frameCount*degGap;
//         // let Xo=300;
//         // let Yo=300;
//         // let gold=color(212,175,55);
//         // let red=color(204, 26, 26);
//         // let blue=color(14, 18, 59);
//         // let green=color(46, 158, 23);
//         // let blueGreen=color(25, 182, 174);
//         // console.log(frameCount);
//         // if(a>370 && a<=720 ){
//             // beginShape();
//             // // for(let a=0;a<360+degGap1;a+=degGap1){
//             //     let x=Xo/1*(1+cos(a1));
//             //     let y=Yo/1*(1+sin(1*a1));
//             //     let x1=Xo/1*(1+cos(1*a1+6*degGap1));
//             //     let y1=Yo/1*(1+sin(1*a1+6*degGap1));
//             //     vertex(x,y);
//             //     vertex(x1,y1);
//             //     vertex(Xo,Yo);
//             //     stroke(blueGreen);
//             //     strokeWeight(1);
//             //     endShape(CLOSE)
                
//             // // }
//             // }
//             // if(a<=370+degGap){
                
//             //     beginShape();
//             //     // translate(Xo/(a),Yo/(a));
//             //     // translate(Xo/(3*a),Yo/(3*a));
//             //     x1=(Xo-Xo*cos(a)/2);
//             //     y1=(Yo-Yo*sin(a)/2);
//             //     x2=(Xo-Xo*cos(a)/4);
//             //     y2=(Yo-Yo*sin(a)/4);
//             //     // rotate(PI/a);
//             //     vertex(x1/1,y1/1);
//             //     vertex(x2,y1);
//             //     vertex(Xo,Yo);
//             //     vertex((Xo-Xo*cos(a)/2),(Yo-Yo*sin(a)/2))
//             //     endShape(CLOSE);
//             //     strokeWeight(2);
//             //     stroke(255);
//             // }
//             // if(a>720 && a<730){
//             //     typeLogo();
//             // }
//             // if(a>1050 && a<=1055){
//             //     phrase();
//             // }
//         }
