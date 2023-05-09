
export const getArticImages = () => {
    const url="https://new-master.s3.ca-central-1.amazonaws.com/media/antarcticaShrink";
        let arr=[];
        for(let i =1;i<23;i++){
            arr.push({id:i,name:`${i}-years`,image:`${url}/antarcticaShrink${i}.png`})
        }
        return arr
    }
export const getLightningImages = () => {
    const url="https://new-master.s3.ca-central-1.amazonaws.com/boltStrike";
        let arr=[];
        for(let i =1;i<15;i++){
            arr.push({id:i,name:`${i}-frame-CG++ striking the lake`,image:`${url}/boltWater${i}.png`})
        }
        return arr
    }
  


