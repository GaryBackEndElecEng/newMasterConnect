import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import apiProtect from '../component/axios/apiProtect';
import api from '../component/axios/api';



export const TokenAccessContext=React.createContext();
export const TokenAccessProvider = (props) => {
  const navigate = useNavigate();
const url="http://localHost:3000";
const serverUrl="http://localHost:8000";
const initializeUserAccount={
    data:{
      id:0,
      name:"",
      cell:"",
      product:[],

    },loaded:false
  }
  Object.freeze(initializeUserAccount);
  const initializeUserProducts={
    data:[],loaded:false
  }
  Object.freeze(initializeUserProducts);
const [getVerifyToken,setGetVerifyToken]=useState({status:null,detail:null})
const [usersProducts,setUsersProducts]=useState(initializeUserProducts)
const [signin,setSignin]=useState(false);
const [goToSignin, setGoToSignin]=useState(false);
const [signout,setSignout]=useState(false);
const [tokenIsValid,setTokenIsValid]=useState(false);
const [loggedIn,setLoggedIn]=useState(false);
const [loginError,setLoginError]=useState(false);
const [deletedItem,setDeletedItem]=useState(false);
const [user_id,setUser_id]=useState(0);
const [email,setEmail]=useState("");
const [name,setName]=useState("");
const [cell,setCell]=useState("");
const [CDN,setCDN]=useState("");
const [website,setWebsite]=useState("");
const [industry,setIndustry]=useState("");
const [co,setCo]=useState("");
const [provState, setProvState] = useState("");
const [country, setCountry] = useState("");
const [postal, setPostal] = useState("");
const [formComplete,setFormComplete]=useState(false);
const [address,setAddress]=useState("");
const [viewAccount,setViewAccount]=useState(true);
const initializeServProd={data:[],loaded:false};
const [gmailUser,setGmailUser]=useState({loaded:false,data:{}});
Object.freeze(initializeServProd);
const [publicKey,setPublicKey]=useState("");
const[getUUID,setGetUUID]=useState({loaded:false,data:[]});
const [sentToServer, setSentToServer]=useState(false);
const [showCheckout,setShowCheckout]=useState(false);
const [userAccount,setUserAccount]=useState(initializeUserAccount);
const[usersService,setUsersService]=useState(initializeServProd);
const[usersProduct,setUsersProduct]=useState(initializeServProd);
const[usersPostService,setUsersPostService]=useState({loaded:false,data:[]});
const[usersExtraService,setUsersExtraService]=useState({loaded:false,data:[]});
const [userOptions,setUserOptions]=useState({loaded:false,data:{}})
const [reducedProduct, setReducedProduct] = useState([]);
const [usersInvoice,setUsersInvoice]=useState({data:{},loaded:false});
const [usersPostInvoice,setUsersPostInvoice]=useState({data:{},loaded:false});
const [usersExtraInvoice,setUsersExtraInvoice]=useState({data:{},loaded:false});
const [jobsService,setJobsService]=useState({data:[],loaded:false});
const [jobsPostService,setJobsPostService]=useState({data:[],loaded:false});
const [jobsExtraService,setJobsExtraService]=useState({data:[],loaded:false});
const [sitePreference,setSitePreference]=useState({data:{},loaded:false});
const [selectMonthlyValue,setSelectMonthlyValue]=useState("value");
const initializeSelectedPayment={loaded:false,numPayment:"",value:""};
const [credited, setCredited] = useState({loaded:false,data:{}});
const [paid, setPaid] = useState(false);
Object.freeze(initializeSelectedPayment);
const [selectedPayment,setSelectedPayment]=useState(initializeSelectedPayment);

const token =localStorage.getItem("access_token") ? localStorage.getItem("access_token"):null;
const refresh_token =localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token"):null;

useEffect(()=>{
  const getRefreshAccessToken= async ()=>{
    try {
      const res = await apiProtect.post('/token/refresh/',{"refresh":refresh_token});
      const access_token = res.data.access;
      localStorage.setItem("access_token",access_token);
      localStorage.setItem("tokenIsValid",true);
      setTokenIsValid(true);
      setGoToSignin(false);
      localStorage.setItem("goToSignin",false);
      // console.log("refreshed access_token",access_token);
    } catch (error) {
      if(error.response){
       setTokenIsValid(false);
       localStorage.setItem("tokenIsValid",false);
       setGoToSignin(true);
       localStorage.setItem("goToSignin",true);
      }else{
        localStorage.setItem("tokenIsValid",false);
        setGoToSignin(true)
        localStorage.setItem("goToSignin",true);
        console.error(error.message)
        //GOTO SIGNIN
        navigate("/signin");
      }
      
    }
  }

const verifyToken= async ()=>{
  const user_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
    if(token && user_id){
        setUser_id(user_id);
        console.log("CHECKED INSIDE")
        try {
            const res= await api.post('/token/verify/',{token:token});
            const code=res.status ? res.status:"";
            const detail=res.data.detail ? res.data.detail: "";
            // console.log("res.data.status",res.status)
            setGetVerifyToken({status:code,detail:detail});
            if(code ===200){
              setTokenIsValid(true);
              localStorage.setItem("tokenIsValid",true);
              return ;
            };
        } catch (error) {
              //GET REFRESH_TOKEN
                return getRefreshAccessToken();
           
        }
    }else{console.log("send to sigin")}
}
if((token !==null || token !=="undefined") && token){
verifyToken();
}
},[setTokenIsValid,setGetVerifyToken,token,refresh_token,navigate]);


//**** THIS DOWNLOADS USER'S PRODUCTS, ONCE LOGGED IN AT SIGIN BEFORE GOING TO MYACCOUNT****** */
useEffect(() => {
  const getUserproduct= async ()=>{
    const userID=parseInt(localStorage.getItem("user_id"))
    setUser_id(userID);
    try {
      const res= await apiProtect.post('account/userAllAccounts/',{"user_id":userID});
      const data= res.data;
      setUserAccount({loaded:true,data:data});
      if(data.service.length ===0){
        setUsersService({loaded:false,data:[]});
      }else{setUsersService({loaded:true,data:data.service});}
      if(data.product.length===0){
        setUsersProduct({loaded:false,data:[]});
      }else{setUsersProduct({loaded:true,data:data.product});}
      if(data?.postInvoice){
        // console.log(data.postInvoice)
        setUsersPostInvoice({loaded:true,data:data.postInvoice})
      }
      if(data?.invoice !==null){
        
        setUsersInvoice({loaded:true,data:data.invoice});
        if(data.invoice.paid ===true){setPaid(true)}
      }else{setUsersInvoice({loaded:false,data:[]})}

      if(data?.postService !==null){
        setUsersPostService({loaded:true,data:data.postService})
      }
      if(data?.extraInvoice !==null){
        setUsersExtraInvoice({loaded:true,data:data.extraInvoice})
      }
      if(data?.extraService){
        setUsersExtraService({loaded:true,data:data.extraService})
      }
      if(data?.credit){
        setCredited({loaded:true,data:data.credit})
      }
      if (data.jobs.length>0){
        let userServiceArr=data.jobs.filter(obj=>(parseInt(obj.userId)===user_id))[0].serviceArr;
        if(userServiceArr.length>0){
        setJobsService({loaded:true,data:userServiceArr});
        }
        let userPostServiceArr=data.jobs.filter(obj=>(parseInt(obj.userId)===user_id))[0].postServiceArr;
        if(userPostServiceArr.length>0){
        setJobsPostService({loaded:true,data:userPostServiceArr});
        }
        let userExtraServiceArr=data.jobs.filter(obj=>(parseInt(obj.userId)===user_id))[0].extraServiceArr;
        if(userExtraServiceArr.length>0){
        setJobsExtraService({loaded:true,data:userExtraServiceArr});
        
        }
      }
      localStorage.setItem("userAccount",JSON.stringify(data));
      setEmail(data?.email);
      setName(data?.name);
      setAddress(data?.address);
      setCell(data?.cell);
      setProvState(data?.provState);
      setCountry(data?.country);
      setPostal(data?.postal);
      setWebsite(data?.website);
      setCDN(data?.CDN);
      setIndustry(data?.industry);
      setCo(data?.co);
      if(data.sitePreference){
      setSitePreference({loaded:true,data:data.sitePreference});
      }

      if(data?.options){
      setUserOptions({loaded:true,data:data.options});
      }
      if(data.calcUUID){
        //ADD THE SERIALIZE OBJ
        setGetUUID({loaded:true,data:data.calcUUID})
      }
      
      // console.log(data)
    } catch (error) {
      console.error(error.message)
      
    }
  }
  const loggedIn =JSON.parse(localStorage.getItem("loggedIn"));
  setLoggedIn(loggedIn);
  if(loggedIn && user_id){getUserproduct();}
  
},[user_id,setUserAccount,loggedIn]);


  return (
    <TokenAccessContext.Provider value={{url,serverUrl,tokenIsValid,setTokenIsValid,getVerifyToken,loggedIn,setLoggedIn,gmailUser,setGmailUser,setUser_id,user_id,userAccount,setUserAccount,signin,setSignin,signout,setSignout,loginError,setLoginError,goToSignin,usersProducts,setUsersProducts,deletedItem,setDeletedItem,setGoToSignin,usersService,usersProduct,setUsersService,setUsersProduct,email,setEmail,name,setName,address,setAddress,cell,setCell,provState, setProvState,country, setCountry,postal, setPostal,formComplete,setFormComplete,reducedProduct, setReducedProduct,usersInvoice,setUsersInvoice,paid,setPaid,userOptions,setUserOptions,selectMonthlyValue,setSelectMonthlyValue,publicKey,setPublicKey,sentToServer,setSentToServer,showCheckout,setShowCheckout,selectedPayment,setSelectedPayment,usersPostService,setUsersPostService,usersPostInvoice,setUsersPostInvoice,usersExtraInvoice,setUsersExtraInvoice,usersExtraService,setUsersExtraService,jobsService,jobsPostService,jobsExtraService,website,setWebsite,CDN,setCDN,industry,setIndustry,co,setCo,sitePreference,setSitePreference,viewAccount,setViewAccount,getUUID,credited, setCredited}}>
        {props.children}
    </TokenAccessContext.Provider>
  )
}

