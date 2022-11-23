import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';

const HomeHelmet = ({profileHelmet,generalInfoHelmet,conical}) => {

    
  return (
    <Helmet>
        <title>master-connect</title>
        <meta name="description" content={"Full web services"} />
        <meta name="words" content="Web development, back-end database and front-end design"/>
        <link rel="canonical" href={`${conical}`} />
        <meta name="image" content="https://master-connect.s3.ca-central-1.amazonaws.com/static/profilePic1.png"/>
        <meta name="email" content={profileHelmet.content1}/>
        <meta name="fb:site" content={profileHelmet.content2}/>
        <meta name="linkedlin:site" content={profileHelmet.content3}/>
        <meta name="profilePage" content={`${conical}/bio`}/>
        <meta name="address" content={"133 Elmwood Avenue"}/>
        <meta name="owner" content={generalInfoHelmet.name}/>
        <meta name="buisness" content={generalInfoHelmet.extra}/>
        
    </Helmet>
  )
}

export default HomeHelmet