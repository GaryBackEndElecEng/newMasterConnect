//process.env.NODE_ENV==="PRODUCTION"=> WHEN BUILD IS COMPLETED points to newmasterconnect.herokuapp.com/api
//process.env.NODE_ENV==="development"=> not using build points to http://localhost:8000
import axios from 'axios';
const defaultURL = (process.env.NODE_ENV==="production") ? "https://newmasterconnect.herokuapp.com/api" :  "http://localhost:8000/api";
axios.defaults.baseURL = defaultURL;
// axios.defaults.baseURL ="http://localhost:8000/api";
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
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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
