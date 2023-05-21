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
    
    React.useEffect(()=>{
        if(window.scrollY){
            window.scroll(0,0);
        }
        
    },[]);

    const slideArr=[
        {
            id:1,name:"1.Discovery",size:"h4",comment:" Get to know you",image:meet,
         desc:"The first phase of a good web development project is Discovery. In Short, its the theprocess of learning. ",
         desc1:" We need to learn about you, your organization's goals and users so that we can begin to lay an optimal website that caters to your audience.",
         desc2:" The Discovery phase begins with gathering information in the aim to determine key user personas, and site functionality in view of the finished product. This will alow us to derive recommendations to maximize a great user experience."
        },

        {
            id:2,name:"2.Recommend",size:"h5",comment:" Provide you options and enhancements",image:recommendation,
            desc:"From our discoveries, we will use the resolved findings as the basis for strategy and recommendations for the site. ",
            desc1:"This phase consists of making recommendations for the user experience and information architecture, including site map, core features and functionality. This will allow us to derive content visual displays intuitive, engaging to enhance page exposure from great user experience",
            desc2:" Once completed, we can then proceed with the actual design."
        },

        {
            id:3,name:"3.Design",size:"h4",comment:" Build the front end with options",image:design,
            desc:"This creative process will begin with deriving a few designs for the home page. ",
            desc1:" This stage consists of finding the right color, typography, spacing, imagery and animation to help determine the desired website's look and feel that will perfectly cater to your audience.",
            desc2:" Once the home has been approved by you, we will then design the remaining pages for your site."
        },

        {
            id:4,name:"4.Program",size:"h4",comment:" Build the code , both frontend and backend",image:Program,
            desc:"This process consists of deep routed programming, using HTML, CSS, React, JQuery and other programming languages. This stage consists of building and testing the code and performance with the latest browser versions. ",
            desc1:" The choose content will also be custumized to allow easy updates and site content management after the launch. This involves transferring all your content to a designated repositoire and site for security your safety concerns.",
            desc2:"Once the programming is complete, a review is needed by us to ensure that all processes has been completed with high assurance."
        },

        {
            id:5,name:"5.Review",size:"h4",comment:" apply extensive testing to determine its performance and data capture",image:Review, 
            desc:" ",
            desc1:" This critical step insures that all facets are catered and verified. as a whole before the launch stage.",
            desc2:" You will have 100% transparency on the bugs and refinements during this stage. testing clients will test the site for bug discovies during this QA process. Once complete and all bugs has been resolved, we can now launch the site, upon your approval."
    },

        {
            id:6,name:"6.Launch",size:"h4",comment:" Build SEO to help grow your connections on the web and then publish",image:launch,
            desc:"This final stage, includes a launch plan for finally launching the site. ",
            desc1:" This stage, includes reviewing all files and confirming one last time that all content is as viewable, accurate and functional as it was on the development server.",
            desc2:" Once your site is live ( FANATASTIC!), our team is available for ongoing website optimization and support when request"
        }

    ];

    const handleClose=(e)=>{
        e.preventDefault();
        if(open ===true){
          setOpen(false);
        }
      }
  return (
    <CustProcess >
        <ProcessHelmet 
        arr={slideArr}
        wedesignContext={wedesignContext ? wedesignContext :[]}
         generalInfo={generalInfo.loaded ? generalInfo.data :[]}
        />
    <div
    className={styles.mainProcess}
    onMouseOut={(e)=>handleClose(e)}
    >
        <CoverPage/>
        <TopContainer slideArr={slideArr}/>
        <Folder slideArr={slideArr}/>
        <DiveIn/>
        <ContactUs/>
    </div>
    </CustProcess>
  )
}

export default Process