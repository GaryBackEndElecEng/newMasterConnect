import React from 'react';
import {Helmet} from 'react-helmet';


const SigninHelmet = ({conical}) => {
  return (
    <Helmet>
        <title>Signin Page </title>
        <meta name="description" content="Signin page for viewing personal accounts"/>
        <meta name="url" content={`${conical}/signin`}/>
        <link rel="canonical" href={`${conical}/signin`}/>
    </Helmet>
  )
}

export default SigninHelmet

