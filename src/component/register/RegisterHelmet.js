import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const RegisterHelmet = () => {
  return (
    <Helmet>
        <title>Registration</title>
        <meta name="description" content=" www.master-connect.ca registration page"/>
        <meta name="url" content="https://www.master-connect.ca/register"/>
    </Helmet>
  )
}

export default RegisterHelmet