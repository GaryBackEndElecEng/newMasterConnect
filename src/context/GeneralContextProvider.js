import React,{useState,useRef, useEffect,useMemo} from 'react'
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
    preferredComms:"",
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
  const [getPathLocation,setGetPathLocation]=useState({loaded:false,data:""});
  const [allCategory,setAllCategory]=useState(initializeAllCategory);
  const [title,setTitle]=useState("");
  // const [conical,setConical]=useState({loaded:false,data:""});
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
  const [whyChooseUs,setWhyChooseUs]=useState({loaded:false,data:[]});
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
  const [templates,setTemplates]=useState({loaded:false,data:{}});
  const [privacy,setPrivacy]=useState({loaded:false,data:{}});
  const [termsOfSvc,setTermsOfSvc]=useState({loaded:false,data:{}});
  const [links,setLinks]=useState({loaded:false,data:[]});
  const [productInfo,setProductInfo]=useState({loaded:false,data:[]});
  const [getProductDesigns,setGetProductDesigns]=useState({loaded:false,data:[]});
  const [success,setSuccess]=useState({loaded:false,data:[]});
  const [pageRatings,setPageRatings]=useState({loaded:false,data:[]});
  const [userSelection,setUserSelection]=useState(initializeUserSelection);
  const [customTemplates,setCustomTemplates]=useState({loaded:false,data:[]});
  const [getAboutList,setGetAboutList]=useState({loaded:false,data:[]});
  const [getContactList,setGetContactList]=useState({loaded:false,data:[]});
  const [userSelectionArray,setUserSelectionArray]=useState([]);
  const [opacity,setOpacity]=useState(0);
  const [answeredFilled, setAnsweredFilled]=useState(false);
  const [questionResults, setQuestionResults]=useState({loaded:false,data:[]});
  const [serviceDependancy, setServiceDependancy]=useState({loaded:false,data:[]});
  const [myAccount, setMyAccount]=useState({loaded:false,data:{}});
  const [blogMain, setBlogMain]=useState({loaded:false,data:[]});
  const MyRef=useRef(null);
  const[UUID,setUUID]=useState({loaded:false,uuid:0});
  const [average,setAverage]=useState(0);

  const workArr = [ {id:0, "title": "HomeStyle", "link": "/design1" }, {id:1, "title": "Retrospect", "link": "/design2" },{id:2, "title": "ImageWall", "link": "/design3" }, {id:3, "title": "Space Frontier", "link": "/design4" }, {id:4, "title": "Flower Store", "link": "/design5" },{id:5,"title":"Store Front",link:"https://www.master-connect.ca"},{id:6,title:"Wedding",link:"design6/"}]
  
  const navItems = [{ id: 1, title: 'home', link: "/" }, { id: 2, title: 'about', link: "/about" }, { id: 3, title: 'Designs', link: "/works" },{id:4,title:"contact",link:"/contact"},{id:5,title:"Blog",link:"/blog"}]

  const dropDown=[{name:"register",link:"/register"},{name:"Sign in",link:"/signin"},{name:"Sign out",link:"/signout"},{name:"Design",link:"/works"},{name:"Pricing",link:"/prices"},{name:"Contact",link:"/contact"},{name:"Blog",link:"/blog"},{name:"My Account",link:"/MyAccount"},{name:"Articles",link:"/articles"},{name:"bio",link:"/bio"},]

  const linkArr=[{name:"design1",link:"/design1"},{name:"design2",link:"/design2"},{name:"design3",link:"/design3"},{name:"design4",link:"/design4"},{name:"design5",link:"/design5"},{name:"design8",link:"/design8"},{name:"My Account",link:"/MyAccount"}]

  const mainLinks = [{id:0, title: "home", link: "/" }, { id:1,title: "Contact", link: "/contact" }, {id:2, title: "bio", link: "/bio" }, {id:3, title: "Privacy", link: "/privacy" },{id:4, title: "terms of Svc", link: "/termsOfSvc" },]

    const footerLinks = [{id:0, title: "home", link: "/" }, { id:1,title: "Contact", link: "/contact" }, {id:2, title: "bio", link: "/bio" }, {id:3, title: "Privacy", link: "/privacy" },{id:4, title: "terms of Svc", link: "/termsOfSvc" },{ id:5,title: "Login", link: "/signin" }, {id:6, title: "register", link: "/register" }, {id:7, title: "about", link: "/about" },{id:8, title: "Designs", link: "/works" },{id:9, title: "prices", link: "/prices" },{id:10,title:"Blog",link:"/blog"},{id:11,title:"Articles",link:"/articles"}, ]

    

//*****THIS LOADS ALL FULL PRODUCTS TYPES!!!!!!!******//
    useEffect(() => {
      const getAllProductList= async ()=>{
        try {
          const res=await api.get('/account/product/');
          const products=res.data;
          if(products && products?.length>0){
          setLoadProduct({
            loaded:true,
            data:products
          });
          localStorage.setItem("loadedProduct",JSON.stringify(products));
          let aboutPage=products.filter(obj=>(obj.category==="aboutPage")).filter(obj=>(obj.type==="pageTemplate"))
          if(aboutPage.length>0){
            setGetAboutList({loaded:true,data:aboutPage})
          }
          let contactPage=products.filter(obj=>(obj.category === "contactPage")).filter(obj=>(obj.type==="pageTemplate"))
          if(contactPage.length > 0){
            setGetContactList({loaded:true,data:contactPage});
          }
           let pageTemplate=products.filter(obj=>(obj.type==="pageTemplate")).filter(obj=>(obj.category==="frontPage"))
           if(pageTemplate.length > 0){
            setCustomTemplates({loaded:true,data:pageTemplate});
           }
           let pageDesign=products.filter(obj=>(obj.type==="pageDesign"))
           if(pageDesign.length>0){
            setGetProductDesigns({loaded:true,data:pageDesign})
           }
        }
          
        } catch (error) {
          console.error(error.message)
        }
      }
      getAllProductList();
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
            let whyChooseUs=body.filter(obj=>(obj.name==="Why Choose Us?"))
            if(whyChooseUs.length>0){
              setWhyChooseUs({loaded:true,data:whyChooseUs[0].categories});
            }
            let getInfo=body.filter(obj=>(parseInt(obj.id)===9))
            if(getInfo.length>0){
              setGeneralInfo({loaded:true,data:getInfo[0].categoryGeneralInfo[0]})
            }
            
            let spon=body.filter(obj=>(parseInt(obj.id)===10))
            if(spon.length>0){
            setSponsor({loaded:true,data:spon[0].categorySponsor});
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
              let rating=body.filter(obj=>(obj.name==="feedback"))[0].pageFeedback
            setPageRatings({loaded:true,data:rating});
            setAverage(rating[0].average)
            
            }
            setMyAccount({loaded:true,data:body.filter(obj=>(obj.name === "myAccount"))[0].catWordSnippet})
            let custTemplate=body.filter(obj=>(obj.name==="templates"))
            if(custTemplate.length>0){
              setTemplates({loaded:true,data:custTemplate[0].imageCategory})
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
    },[registerPage.loaded]);

    useEffect(()=>{
      const getServiceDependency = async()=>{
        try {
          const res = await api.get('/account/serviceDependency/');
          const body=res.data
          if(body){
            
            setServiceDependancy({loaded:true,data:body})
          }else{setServiceDependancy({loaded:false})}
        } catch (error) {
          console.error(error.message)
        }
      }
    
      getServiceDependency();
    },[]);
    


  return (
    <GeneralContext.Provider value={{allCategory,getServiceArray,setGetServiceArray,ourServices,setOurServices,whyWorkWithUs,setWhyWorkWithUs,mainService,setMainService,allServiceArray,setAllServiceArray,mainLinks,footerLinks,resume,setResume,title,setTitle,styleName,setStyleName,loaded,setLoaded,activate,setActivate,load3,setLoad3,url,changePage,setChangePage,stopP5,setStopP5,navItems,linkArr,dropDown,page,setPage,workArr,turnOn,setTurnOn,zIndex,setZIndex,removeText,setRemoveText,requestInfo,setRequestInfo,isRequestInfo,setIsRequestInfo,requestQuote,setRequestQuote,callbackQuoteRequest,setCallBackQuoteRequest,callBackConfirmed,setCallBackConfirmed,loadProduct,register,setRegister,registerConfirmed,setRegisterConfirmed,email,setEmail,name,setName,content,setContent,removeApp,setRemoveApp,checkHeight, setCheckHeight,stopP5Contact,setStopP5Contact,fadeLogo,setFadeLogo,removeBlock, setRemoveBlock,open, setOpen,infoOkay,setInfoOkay,issue,setIssue,loadingData, setLoadingData,serverUrl,loggedIn,setLoggedIn,error,setError,loginError,setLoginError,isCheckoutSuccess,setIsCheckoutSuccess,session_id,setSession_id,registerPage,setRegisterPage,showRegistration, setShowRegistration,openSignin,setOpenSignin,generalInfo,setGeneralInfo,sponsor,setSponsor,flowerImg,setFlowerImg,special,setSpecial,extraImages,MyRef,postSession_id,setPostSession_id,privacy,termsOfSvc,staticImage,links,setLinks,hits,setHits,extraServices,setExtraServices,extraSession_id,setExtraSession_id,productInfo,success,opacity,setOpacity,pageRatings,userSelection,setUserSelection,userSelectionArray,setUserSelectionArray,answeredFilled, setAnsweredFilled,questionResults, setQuestionResults,UUID,setUUID,blogMain, setBlogMain,average,setAverage,openGetQuote,setOpenGetQuote,getPathLocation,setGetPathLocation,myAccount,templates,whyChooseUs,getAboutList,getContactList,customTemplates,getProductDesigns,serviceDependancy,}}>
    {props.children}
    </GeneralContext.Provider>
  )
}

