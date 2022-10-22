import React, {useRef,useEffect} from 'react';
import {CanvasLogo} from '../../styled/Div.styled';
import {useTheme} from '@mui/material/styles';

const DrawLogo = () => {
    const theme=useTheme();
    const canvasRef=useRef(null);

    
    useEffect(()=>{
        const canvas=canvasRef?.current;
        const ctx = canvas.getContext('2d');
        
            const DrawFunction = (ctx)=> {
                var offset22 = 0;
                var timerStop = 0;
                var x = 140, y = 70, disp = 18, radius = 60;
                var circum = Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y - radius, 2));
            
            
                function draw() {
                    if (ctx) {
                        // let ctx = canvas.getContext('2d');
                        drawCircle(offset22);
                        //drawing lines
                        drawLines(offset22);
                        if (timerStop < 2) {
            
                        }
            
                        //shadow and Title
                        spell(offset22);
                        // draw circles at points of connections
                        //  dotsAndTrace(offset22);
                        drawUnderline(offset22);
                        //insert image
                        // insertImage(timerStop,offset22); 
                    } else {
                        // canvas-unsupported code here
                    }
            
                }
            
            
            
            
                const spell = () => {//This spells the Title
                    let word = '';
                    const spellArray = ["M", "", "a", "s", "t", "e", "r", "-", "c", "o", 'n', "n", "e", "c", "t"];
                    if (offset22 < spellArray.length) {
                        word = word + spellArray[offset22]
                        // console.log(offset);
                        ctx.font = '28px Times New Roman';
                        ctx.fillStyle = theme.palette.logo.dark;
                        return ctx.fillText(`${word}`, x / 2 - x / 7 - 2 + offset22 * 12 + 5, y / 4);
                    }
            
                }
            
              
            
                function drawCircle() {
                    // let ctx = canvas.getContext('2d');
                    //Draw circle
                    ctx.beginPath();
                    // ctx.arc(x, y+ disp, radius+1, 0, Math.PI * 2, true);
                    if (offset22 < 9) {
                        ctx.arc(x, y + disp, radius, 0, Math.PI * 2, true);
                    } else if (offset22 >= 9 && offset22 < 18) {
                        ctx.arc(x, y + disp, radius + 2, 0, Math.PI * 2, true);
                    }
            
                    ctx.globalAlpha = ".7";
                    ctx.fillStyle = theme.palette.logo.circleFill;
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = theme.palette.logo.circleStroke;
                    ctx.shadowOffsetY = 1;
                    ctx.shadowOffsetX = 1;
                    ctx.shadowBlur = 1;
                    ctx.shadowColor = theme.palette.logo.circleShadow;
                    ctx.stroke();
                }
            
                function drawLines() {
                    //Drawing Line
                    let color3 = theme.palette.logo.lines;
                    if (timerStop < 2) {
                        let color3 = `rgba(128, 0, 0, ${(offset22) / 200})`;
                    }
            
                    // ctx.clearRect(x-radius,y+disp,x+radius,(y+disp)-radius);
                    ctx.beginPath();
                    ctx.moveTo(x + (0), y + disp);
                    ctx.lineTo(x + circum - disp, circum + disp / 2 - 1);//1
                    ctx.lineTo(x + (0), y + radius + disp);//y+radius-2
                    ctx.closePath();
                    ctx.lineTo(x - radius, radius + y / 2 - y / 10); //3
                    ctx.lineTo(2 * radius + radius / 3, y + radius + disp);//4
                    ctx.moveTo(x + (0), y + disp); //5
                    ctx.lineTo(x, y - radius + disp); //6
                    ctx.lineTo(x - radius, y + disp); //7
                    ctx.moveTo(x, y - radius + disp);
                    ctx.lineTo(x + radius, y + disp);
                    ctx.moveTo(x + (0), y + (0) + disp);
                    ctx.lineTo((x + radius / 4 - 4) * Math.cos(45 / 180 * 3.14), (y + disp - 4) * (Math.sin(45 / 180 * 3.14)));//8
                    ctx.moveTo(x + (0), y + (0) + disp);
                    ctx.lineTo((x + 2 * radius - disp) * Math.cos(45 / 180 * 3.14), (y + radius / 3 - 6) * (Math.sin(45 / 180 * 3.14)));//9-upper inverted small triangle x+41
                    ctx.lineTo((x + radius / 4 - 4) * Math.cos(45 / 180 * 3.14), (y + disp - 4) * (Math.sin(45 / 180 * 3.14)));//-10-upper inverted small triangle
                    ctx.moveTo(x + (0), y + (0) + disp);
                    ctx.lineTo(x + (radius - radius / 6) * Math.cos(-45 / 180 * 3.14), y + (radius + radius / 10) * (Math.sin(+45 / 180 * 3.14)));//-10-innerbottom small Triangle
                    ctx.lineTo(x + (radius - radius / 4) * Math.cos(225 / 180 * 3.14), y - (radius + radius / 10) * (Math.sin(225 / 180 * 3.14)));//-11-innerbottom Triangle
                    ctx.lineTo(x + (0), y + (0) + disp);
                    ctx.moveTo(x + (radius - radius / 6) * Math.cos(-45 / 180 * 3.14), y + (radius + radius / 10) * (Math.sin(+45 / 180 * 3.14)));
                    ctx.lineTo(x, (y + disp) / 2);//-12-Overlapping triangle
                    ctx.lineTo(x + (radius - radius / 4) * Math.cos(225 / 180 * 3.14), y - (radius + radius / 10) * (Math.sin(225 / 180 * 3.14)));//innerbottom Triangle
                    ctx.moveTo((x + radius / 4 - 4) * Math.cos(45 / 180 * 3.14), (y + disp - 4) * (Math.sin(45 / 180 * 3.14)));
                    ctx.lineTo(x, (y + disp) + (y + disp) / 2);//-13-
                    ctx.lineTo((x + 2 * radius - disp) * Math.cos(45 / 180 * 3.14), (y + radius / 3 - 6) * (Math.sin(45 / 180 * 3.14)));//Overlapping inverted triangle
                    ctx.strokeStyle = color3;
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            
            
            
                function drawUnderline() {
                    // let ctx = canvas.getContext('2d');
                    let color3 = theme.palette.logo.lines;//circle
                    ctx.beginPath();
                    ctx.moveTo(x - radius - radius / 2 - radius / 4, y + disp / 2 - radius + 1);
                    ctx.lineTo(x + 2 * radius, y + disp / 2 - radius + 1);
                    ctx.lineJoin = "round";
                    ctx.strokeStyle = color3;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x - radius - radius / 2 - radius / 4, y + disp / 2 - radius + 4);
                    ctx.lineTo(x + 2 * radius, y + disp / 2 - radius + 4);
                    ctx.lineJoin = "round";
                    ctx.strokeStyle = color3;
                    ctx.lineWidth = 1;
                    ctx.shadowOffsetY = 2;
                    ctx.shadowOffsetX = 2;
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = color3;
                    ctx.stroke();
            
            
                }
            
                // TIMER
                const flash = ()=> {//=> animation driver( offset ++ draws rect,then timout(200ms)
                    if (offset22 > 30) { //This repeats the count so its only goes to 16 now}
                        offset22 = 0;
                        timerStop++;
                    }
                    if (timerStop < 8) { //stops the timer after three refresh-states
                        draw();
                        offset22++;
                        setTimeout(flash, 300);
                    }
            
                }
                flash();//activatesdraw
            
            
               
            
                function insertImage(timerStop, offset22) {
            
                    let img = new Image();
                    const imgWidth = 10;
                    const imgHeight = 10;
                    img.src = "static/iconComputer.png"; //is in static under App
                    img.onload = function () {
                        //Create pattern for
                        let ptrn = ctx.createPattern(img, "no-repeat");
            
                        ctx.fillStyle = ptrn;
                        ctx.drawImage(img, x - imgWidth / 2, y + disp - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x - imgWidth / 2, (y + radius + disp - 2) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, (x - radius) - imgWidth / 2, (radius + y / 2 - 6) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, (2 * radius + radius / 3) - imgWidth / 2, (y + radius + disp) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x - imgWidth / 2, (y - radius + disp) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, (x - radius) - imgWidth / 2, (y + disp) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, (x + radius / 4 - 4) * Math.cos(45 / 180 * 3.14) - imgWidth / 2, (y + disp - 4) * (Math.sin(45 / 180 * 3.14)) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, (x + 2 * radius - disp) * Math.cos(45 / 180 * 3.14) - imgWidth / 2, (y + radius / 3 - 6) * (Math.sin(45 / 180 * 3.14)) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x + (radius - radius / 6) * Math.cos(-45 / 180 * 3.14) - imgWidth / 2, y + (radius + radius / 10) * (Math.sin(+45 / 180 * 3.14)) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x + (radius - radius / 4) * Math.cos(225 / 180 * 3.14) - imgWidth / 2, y - (radius + radius / 10) * (Math.sin(225 / 180 * 3.14)) - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x - imgWidth / 2, (y + disp) / 2 - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x - imgWidth / 2, (y + disp) + (y + disp) / 2 - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x - imgWidth / 2, y + disp - imgHeight / 2, imgWidth, imgHeight);
                        ctx.drawImage(img, x + 1 * radius + 3 - imgWidth / 2, y + disp - imgHeight / 2, imgWidth, imgHeight);
            
            
                    }
            
                }
        
            }
            if(ctx){
                DrawFunction(ctx); // draws Logo
                }
    },[])
  




    return (
        <CanvasLogo 
        background={'lightgrey'} 
        borderColor={"black"} 
        shadow={"blue"} 
        id="drawLogo" 
        ref={canvasRef}
        />
    )

}


export default DrawLogo