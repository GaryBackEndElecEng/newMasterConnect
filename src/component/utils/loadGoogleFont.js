// import api from '../axios/api';
// import React from 'react';
// export const loadGoogleFont = async (family) => {
//     const errorReturn=(status)=>{
//         switch (status){
//             case 400:
//                 alert("Server error, please try again")
//                 break;
//             case 401:
//                 break;
//             case 404:
//                 alert("Check your connections. if persist try again later")
//                 break;
//             case 0:
//                 console.log("wrong family name")
//                 break;
//             default:
//                 break;
//         }
//     }
    
//         let urlCallBack=`https://fonts.googleapis.com/css?family=${family}`;
//         try {
//             const response = await api.get(urlCallBack);
//             const callback= response.data
//                 return installFont(callback,family)
//         } catch (error) {
//             errorReturn(error.response.status);
//             // console.error("POST ERROR", error.message, dispatchEvent);
//         }
        

    
  
// }
// function installFont(callBack,family){
//     if(document.getElementById(family)) return
//     const style=document.createElement("style");
//     style.id=family
//     style.textContent=callBack;
//     return document.head.appendChild(style)
// }

// @font-face {
//   font-family: 'Cabin';
//   font-style: normal;
//   font-weight: 400;
//   font-stretch: 100%;
//   src: url(https://fonts.gstatic.com/s/cabin/v26/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkV2EH7mlx17r.woff2) format('woff2');
//   unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
// }
