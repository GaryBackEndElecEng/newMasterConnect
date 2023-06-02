import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./process.module.css";
import wedesignContext from '../home/wedesignContext';
import styled from "styled-components";
import TopContainer from './TopContainer';
import Folder from './Folder';
import DiveIn from './DiveIn';
import ContactUs from './ContactUs';
import CoverPage from './CoverPage';
import ProcessHelmet from './ProcessHelmet';
import api from '../axios/api';

const CustProcess = styled.div`
margin:0;
min-height:100vh;
margin-top:-70px;
/* border:1px solid black; */
display:flex;
width:100vw;
flex-direction:column;
justify-content:center;
align-items:center;
background:var( --background-33);
animation:appearIn 1.5s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
`;

const Process = () => {
    const {staticImage,open, setOpen,generalInfo}=React.useContext(GeneralContext);
    const meet=`${staticImage}/process/meet.png`;
    const recommendation=`${staticImage}/process/recommendation.png`;
    const design=`${staticImage}/process/design.png`;
    const Program=`${staticImage}/process/program.png`;
    const Review=`${staticImage}/process/review.png`;
    const launch=`${staticImage}/process/launch.png`;
    const [getProcess,setGetProcess]=React.useState({loaded:false,data:[]});
    
    React.useEffect(()=>{
        if(window.scrollY){
            window.scroll(0,0);
        }
        
    },[]);
    const sortSlider =React.useCallback((body)=>{
        let arr=[],letArr=["1","2","3","4","5","6"];
        letArr.forEach((letter,index)=>{
        let tempOb=body.filter(obj=>(obj.subSectionTitle ===letter))[0]
            arr.push(tempOb);
        });
        console.log(arr)
        return arr;
    },[]);

    React.useEffect(()=>{
        const process= async ()=>{
            try {
                const res = await api.get("/category/");
                const body = res.data.filter(obj=>(obj.name === "process"))[0].catWordSnippet;
                setGetProcess({
                    loaded:true,
                    data:sortSlider(body) });
                            
            } catch (error) {
                console.error(error.message);
            }
        }
        process();
    },[]);

    

    const handleClose=(e)=>{
        e.preventDefault();
        if(open ===true){
          setOpen(false);
        }
      }
  return (
    <CustProcess >
        <ProcessHelmet 
        arr={getProcess.loaded ? getProcess.data:null}
        wedesignContext={wedesignContext ? wedesignContext :[]}
         generalInfo={generalInfo.loaded ? generalInfo.data :[]}
        />
    <div
    className={styles.mainProcess}
    onMouseOut={(e)=>handleClose(e)}
    >
        <CoverPage/>
        <TopContainer slideArr={getProcess.loaded && getProcess.data}/>
        <Folder slideArr={getProcess.loaded && getProcess.data}/>
        <DiveIn/>
        <ContactUs/>
    </div>
    </CustProcess>
  )
}

export default Process