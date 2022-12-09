import React from 'react';
import {Helmet} from 'react-helmet';


const SigninHelmet = ({getPathLocation}) => {
  return (
    <Helmet>
        <title>Signin Page </title>
        <meta name="description" content="Signin page for viewing personal accounts"/>
        <meta name="url" content={`${getPathLocation}/signin`}/>
        <link rel="canonical" href={`${getPathLocation}/signin`}/>
    </Helmet>
  )
}

export default SigninHelmet

