//process.env.NODE_ENV==="PRODUCTION"=> WHEN BUILD IS COMPLETED points to newmasterconnect.herokuapp.com/api
//process.env.NODE_ENV==="development"=> not using build points to http://localhost:8000
import axios from 'axios';
// import {useParams} from 'react-router-dom';
const defaultURL = (process.env.NODE_ENV==="production") ? process.env.REACT_APP_URL : "http://localhost:8000/api";
axios.defaults.baseURL =defaultURL;
axios.defaults.baseURL ="http://localhost:8000/api";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfHeaderName = 'accept';
axios.defaults.xsrfHeaderName = 'accept-encoding';
axios.defaults.xsrfHeaderName = 'content-type';
axios.defaults.xsrfHeaderName = 'origin';
axios.defaults.xsrfHeaderName = 'dnt';
axios.defaults.xsrfHeaderName = 'user-agent';
axios.defaults.xsrfHeaderName = 'authorization';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.xsrfHeaderName = 'Access-Control-Allow-Origin';

const apiProtect = axios.create({
    // baseURL :"http://localhost:8000/api",
    timeout:10000,
    
    headers:{
        Authorization:localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` :null,
        'Content-Type':'application/json',
        "Accept":"*/*",
    },
    // credentials:"include",
    // mode:"cors"

});

apiProtect.interceptors.response.use(
    
    (response) => {return response},
    async (error)=>{
        const originalRequest = error.config;
        if(typeof error.response === 'undefined'){
            alert(`A server/network error ovcurred,looks like CORS issue, we will fix it shortly`);
            return Promise.reject(error)

        }
        ///detail/:id
        if(error.response.status===401 && originalRequest.url ===`${apiProtect.baseURL}/token/refresh`){
            window.location.href = '/signin';
            return Promise.reject(error);
        }
        if(error.response.statusText === 'unauthorized' && originalRequest.url ===`${apiProtect.baseURL}/signin`){
            window.location.href = `/signin`;
            return Promise.reject(error);
        }
        if(error.response.data.code ==='token_not_valid' && error.response.status === 401 && error.response.statusText === 'unauthorized'){
            const refresh_token = localStorage.getItem('refresh_token');
            if(refresh_token){
                const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]));
                //EXPIRE DATE IN TOKEN IN SECONDS
                const now = Math.ceil(Date.now() / 1000)
                // console.log(tokenParts.exp);
                if(tokenParts.exp > now){
                    return apiProtect.post('/token/refresh/',{refresh:refresh_token}).then((response)=>{
                        localStorage.setItem("access_token",response.data.access_token);
                        localStorage.setItem("refresh_token",response.data.refresh_token);
                        apiProtect.Instance.defaults.headers['Authorization']= `Bearer ${response.data.access}`
                        return apiProtect(originalRequest);
                    })
                    .catch(
                        (err)=>{console.log(err)}
                    );
                }else{
                    console.log('Refresh token has expired',tokenParts.exp,now);window.location.href = '/signin';
                }
            }else{
                console.log("refresh token not available.");
                window.location.href='/signin'
            }
        }
        return Promise.reject(error);
    }
);
export default apiProtect;