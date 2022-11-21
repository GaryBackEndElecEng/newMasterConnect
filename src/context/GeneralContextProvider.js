import React,{useState,useRef, useEffect} from 'react'
import api from '../component/axios/api';
export const GeneralContext=React.createContext();
export const GeneralContextProvider = (props) => {
  const url="http://localHost:3000";
  const serverUrl=(process.env.NODE_ENV==="production") ? "/api" :  "http://localhost:8000/api";
  // const serverUrl="/api";
  const staticImage="https://new-master.s3.ca-central-1.amazonaws.com/static"
  const initializeRequestInfo ={
    email:"",
    fullName:"",
    content:"",
    promotion:false
  }
  Object.freeze(initializeRequestInfo);
  const initializeRequestQuote ={
    email:"",
    cell:"",
    fullName:"",
    coName:"",
    coSite:"",
    content:"",
    promotion:false
  }
  Object.freeze(initializeRequestQuote);
  const initializeFAQS = [
    {
      data: {
        id: 0,
        question: "",
        answer: "",
        category: 0
      }
    },
    {loaded:false}
  ]
  Object.freeze(initializeFAQS);
  
  const initialRegister={
      data: {
        username:"",
        email:"",
        password:"",
        checked:false,
      },
      loaded:false
    }
  Object.freeze(initialRegister);
  const initializeProductList={
    data:{
      id:0,
      name:"",
      desc:"",
      price:0,
      monthly:0
    },loaded:false
  }
  const initializeAllCategory={
    loaded:false,
    data:[]
  }
  Object.freeze(initializeAllCategory);
  const initializeUserSelection={
    
      id:0,
      Q:"",
      ans:"",
      yesno:true
    
  }
  Object.freeze(initializeUserSelection);
  const [allCategory,setAllCategory]=useState(initializeAllCategory);
  const [title,setTitle]=useState("");
  const [hits,setHits]=useState({loaded:false,data:0});
  const [loaded,setLoaded]=useState(false);
  const[openGetQuote,setOpenGetQuote]=useState(false);
  const [load3,setLoad3]=useState(false);
  const [changePage,setChangePage]=useState(false);
  const [stopP5,setStopP5]=useState(false);
  const [stopP5Contact,setStopP5Contact]=useState(false);
  const [page,setPage]=useState("");
  const [styleName,setStyleName]=useState("home");
  const [turnOn,setTurnOn]=useState(false);
  const [zIndex,setZIndex]=useState("1");
  const [removeText,setRemoveText]=useState(false);
  const [loggedIn,setLoggedIn]=useState(false);
  const [activate,setActivate]=useState(false);
  const [error,setError]=useState(false);
  const [loginError,setLoginError]=useState(false);
  const [email,setEmail]=useState('');
  const [name,setName]=useState("");
  const [content,setContent]=useState("");
  const [requestInfo,setRequestInfo]=useState(initializeRequestInfo);
  const[isRequestInfo,setIsRequestInfo]=useState(false);
  const [requestQuote,setRequestQuote]=useState(initializeRequestQuote);
  const [ register,setRegister]=useState(initialRegister);
  const [registerConfirmed,setRegisterConfirmed]=useState(false);
  const[callbackQuoteRequest,setCallBackQuoteRequest]=useState(initializeRequestQuote);
  const [loadProduct,setLoadProduct]=useState(initializeProductList);
  const [resume,setResume]=useState({loaded:false,data:[]});
  const[callBackConfirmed,setCallBackConfirmed]=useState(false);
  const [removeApp,setRemoveApp]=useState(false);
  const [checkHeight, setCheckHeight] = useState("9vh");
  const [fadeLogo,setFadeLogo]=useState(false);
  const [removeBlock, setRemoveBlock] = useState(false);
  const [open, setOpen]=useState(false);
  const[infoOkay,setInfoOkay]=useState(false);
  const [issue,setIssue]=useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [getServiceArray,setGetServiceArray]=useState({loaded:false,data:[]});
  const[mainService,setMainService]=useState("");
  const [allServiceArray,setAllServiceArray]=useState({loaded:false,datat:[]});
  const [ourServices,setOurServices]=useState({loaded:false,datat:[]});
  const [extraServices,setExtraServices]=useState({loaded:false,datat:[]});
  const [whyWorkWithUs,setWhyWorkWithUs]=useState({loaded:false,data:[]});
  const [isCheckoutSuccess,setIsCheckoutSuccess]=useState(false);
  const [session_id,setSession_id]=useState();
  const [postSession_id,setPostSession_id]=useState();
  const [extraSession_id,setExtraSession_id]=useState("");
  const [registerPage,setRegisterPage]=useState({loaded:false,data:[]});
  const [showRegistration, setShowRegistration] = useState(false);
  const [openSignin,setOpenSignin]= useState(false);
  const [generalInfo,setGeneralInfo]=useState({loaded:false,data:{}});
  const [sponsor,setSponsor]=useState({loaded:false,data:[]});
  const [flowerImg,setFlowerImg]=useState({loaded:true,data:[]});
  const [special,setSpecial]=useState({loaded:false,data:{}});
  const [extraImages,setExtraImages]=useState({loaded:false,data:{}});
  const [privacy,setPrivacy]=useState({loaded:false,data:{}});
  const [termsOfSvc,setTermsOfSvc]=useState({loaded:false,data:{}});
  const [links,setLinks]=useState({loaded:false,data:[]});
  const [productInfo,setProductInfo]=useState({loaded:false,data:[]});
  const [success,setSuccess]=useState({loaded:false,data:[]});
  const [pageRatings,setPageRatings]=useState({loaded:false,data:[]});
  const [userSelection,setUserSelection]=useState(initializeUserSelection);
  const [userSelectionArray,setUserSelectionArray]=useState([]);
  const [opacity,setOpacity]=useState(0);
  const [answeredFilled, setAnsweredFilled]=useState(false);
  const [questionResults, setQuestionResults]=useState({loaded:false,data:[]});
  const [blogMain, setBlogMain]=useState({loaded:false,data:[]});
  const MyRef=useRef(null);
  const[UUID,setUUID]=useState({loaded:false,uuid:0});
  const [average,setAverage]=useState(0);

  const workArr = [ {id:0, "title": "HomeStyle", "link": "/design1" }, {id:1, "title": "Retrospect", "link": "/design2" },{id:2, "title": "ImageWall", "link": "/design3" }, {id:3, "title": "Space Frontier", "link": "/design4" }, {id:4, "title": "Flower Store", "link": "/design5" },{id:5,"title":"Store Front",link:"https://www.master-connect.ca"},{id:6,title:"Wedding",link:"design6/"}]
  
  const navItems = [{ id: 1, title: 'home', link: "/" }, { id: 2, title: 'about', link: "/about" }, { id: 3, title: 'Contact', link: "/contact" },{id:4,title:"Design",link:"/works"},{id:5,title:"Blog",link:"/blog"}]

  const dropDown=[{name:"register",link:"/register"},{name:"Sign in",link:"/signin"},{name:"Sign out",link:"/signout"},{name:"Design",link:"/works"},{name:"Pricing",link:"/prices"},{name:"Blog",link:"/blog"},{name:"My Account",link:"/MyAccount"},{name:"Articles",link:"/articles"},{name:"bio",link:"/bio"},]

  const linkArr=[{name:"design1",link:"/design1"},{name:"design2",link:"/design2"},{name:"design3",link:"/design3"},{name:"design4",link:"/design4"},{name:"design5",link:"/design5"},{name:"design8",link:"/design8"},{name:"My Account",link:"/MyAccount"}]

  const mainLinks = [{id:0, title: "home", link: "/" }, { id:1,title: "Contact", link: "/contact" }, {id:2, title: "bio", link: "/bio" }, {id:3, title: "Privacy", link: "/privacy" },{id:4, title: "terms of Svc", link: "/termsOfSvc" },]

    const footerLinks = [{id:0, title: "home", link: "/" }, { id:1,title: "Contact", link: "/contact" }, {id:2, title: "bio", link: "/bio" }, {id:3, title: "Privacy", link: "/privacy" },{id:4, title: "terms of Svc", link: "/termsOfSvc" },{ id:5,title: "Login", link: "/signin" }, {id:6, title: "register", link: "/register" }, {id:7, title: "about", link: "/about" },{id:8, title: "Designs", link: "/works" },{id:9, title: "prices", link: "/prices" },{id:10,title:"Blog",link:"/blog"},{id:11,title:"Articles",link:"/articles"}, ]

    
//*****THIS LOADS ALL PAGE DESIGNS AND SHOULLD REPLACE workArr******//
    useEffect(() => {
      const getProductList= async ()=>{
        try {
          const res=await api.get('/account/product/');
          const data=res.data;
          if(data && data?.length>0){
          setLoadProduct({
            loaded:true,
            data:data
          });
          localStorage.setItem("loadedProduct",JSON.stringify(data))
        }
          
        } catch (error) {
          console.error(error.message)
        }
      }
      getProductList();
    },[]);
//*****THIS DOWNLOADS, RESUME,FAQS,WORDSNIPPETS,SERVICES DESCRIPTIONS,ETC*******//
    useEffect(()=>{
      const getAllcategory= async()=>{
        try {
          const res= await api.get('/category/');
          
          const body=res.data;
          // console.log("Allcategories",body)
          if(body && body?.length >0){
            setAllCategory({loaded:true,data:body});
            let getInfo=body.filter(obj=>(parseInt(obj.id)===9))[0].categoryGeneralInfo[0]
            setGeneralInfo({loaded:true,data:getInfo})
            let spon=body.filter(obj=>(parseInt(obj.id)===10))[0].categorySponsor
            if(spon && spon.length){
            setSponsor({loaded:true,data:spon});
            }
            setFlowerImg({loaded:true,data:body.filter(obj=>(obj.name==="FlowerShop"))[0].imageCategory});
            setSpecial({loaded:true,data:body.filter(obj=>(parseInt(obj.id)===14))[0].catWordSnippet[0]});
            setExtraImages({loaded:true,data:body.filter(obj=>(parseInt(obj.id)===13))[0].imageCategory});
            setWhyWorkWithUs({loaded:true,data:body.filter(obj=>(parseInt(obj.id)===2))[0].categories});
            setOurServices({loaded:true,data:body.filter(obj=>(obj.name==="AllServices"))[0].categories});
            setPrivacy({loaded:true,data:body.filter(obj=>(parseInt(obj.id)===16))[0].catWordSnippet});
            setTermsOfSvc({loaded:true,data:body.filter(obj=>(parseInt(obj.id)===17))[0].catWordSnippet});
            setProductInfo({loaded:true,data:body.filter(obj=>(obj.id===19))[0].catWordSnippet});
            setSuccess({loaded:true,data:body.filter(obj=>(obj.name==="Success"))[0].catWordSnippet});
            let pageRates=body.filter(obj=>(obj.name==="feedback"))[0].pageFeedback
            if(pageRates){
            setPageRatings({loaded:true,data:body.filter(obj=>(obj.name==="feedback"))[0].pageFeedback});
            }
            
          }
        } catch (error) {
          console.error(error.message)
        }
      }
      getAllcategory();
    },[]);

    useEffect(()=>{
      const getRegisteredPages = async()=>{
        try {
          const res = await api.get('/pageCountGet/');
          const body=res.data
          if(body && body?.length>0){
          setRegisterPage({loaded:true,data:body})
          }else{setRegisterPage({loaded:false})}
        } catch (error) {
          console.error(error.message)
        }
      }
    
      getRegisteredPages();
    },[registerPage.loaded])
    


  return (
    <GeneralContext.Provider value={{allCategory,getServiceArray,setGetServiceArray,ourServices,setOurServices,whyWorkWithUs,setWhyWorkWithUs,mainService,setMainService,allServiceArray,setAllServiceArray,mainLinks,footerLinks,resume,setResume,title,setTitle,styleName,setStyleName,loaded,setLoaded,activate,setActivate,load3,setLoad3,url,changePage,setChangePage,stopP5,setStopP5,navItems,linkArr,dropDown,page,setPage,workArr,turnOn,setTurnOn,zIndex,setZIndex,removeText,setRemoveText,requestInfo,setRequestInfo,isRequestInfo,setIsRequestInfo,requestQuote,setRequestQuote,callbackQuoteRequest,setCallBackQuoteRequest,callBackConfirmed,setCallBackConfirmed,loadProduct,register,setRegister,registerConfirmed,setRegisterConfirmed,email,setEmail,name,setName,content,setContent,removeApp,setRemoveApp,checkHeight, setCheckHeight,stopP5Contact,setStopP5Contact,fadeLogo,setFadeLogo,removeBlock, setRemoveBlock,open, setOpen,infoOkay,setInfoOkay,issue,setIssue,loadingData, setLoadingData,serverUrl,loggedIn,setLoggedIn,error,setError,loginError,setLoginError,isCheckoutSuccess,setIsCheckoutSuccess,session_id,setSession_id,registerPage,setRegisterPage,showRegistration, setShowRegistration,openSignin,setOpenSignin,generalInfo,setGeneralInfo,sponsor,setSponsor,flowerImg,setFlowerImg,special,setSpecial,extraImages,MyRef,postSession_id,setPostSession_id,privacy,termsOfSvc,staticImage,links,setLinks,hits,setHits,extraServices,setExtraServices,extraSession_id,setExtraSession_id,productInfo,success,opacity,setOpacity,pageRatings,userSelection,setUserSelection,userSelectionArray,setUserSelectionArray,answeredFilled, setAnsweredFilled,questionResults, setQuestionResults,UUID,setUUID,blogMain, setBlogMain,average,setAverage,openGetQuote,setOpenGetQuote}}>
    {props.children}
    </GeneralContext.Provider>
  )
}

