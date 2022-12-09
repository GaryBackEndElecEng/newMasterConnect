import React from 'react';
import {Helmet} from 'react-helmet';


const RegisterHelmet = ({getPathLocation}) => {
  return (
    <Helmet>
        <title>Registration</title>
        <meta name="description" content=" www.master-connect.ca registration page"/>
        <meta name="url" content={`${getPathLocation}/register`}/>
        <link rel="canonical" href={`${getPathLocation}/register`}/>
    </Helmet>
  )
}

export default RegisterHelmet