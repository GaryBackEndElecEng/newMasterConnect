import axios from 'axios';
// import {useParams} from 'react-router-dom';

// const HandleGetId=()=>{
//     const {id}=useParams();
//     return id
// }
axios.defaults.baseURL =process.env.REACT_APP_API_URL || "http://localhost:8000/api";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfHeaderName = 'accept';
axios.defaults.xsrfHeaderName = 'accept-encoding';
axios.defaults.xsrfHeaderName = 'content-type';
axios.defaults.xsrfHeaderName = 'origin';
axios.defaults.xsrfHeaderName = 'dnt';
axios.defaults.xsrfHeaderName = 'user-agent';
axios.defaults.xsrfHeaderName = 'authorization';
axios.defaults.xsrfHeaderName = 'Access-Control-Allow-Origin';

const api = axios.create({
    // baseURL :"http://localhost:8000/api",
    timeout:5000,
    headers:{
        // Authorization:localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` :null,
        
        'Content-Type':'application/json',
        "Accept":"*/*",
        
        // accept:'application/json'

    },

});

export default api;
