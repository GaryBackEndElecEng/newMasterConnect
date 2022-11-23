import React from 'react';
import {Helmet} from 'react-helmet';


const RegisterHelmet = ({conical}) => {
  return (
    <Helmet>
        <title>Registration</title>
        <meta name="description" content=" www.master-connect.ca registration page"/>
        <meta name="url" content={`${conical}/register`}/>
        <link rel="canonical" href={`${conical}/register`}/>
    </Helmet>
  )
}

export default RegisterHelmet