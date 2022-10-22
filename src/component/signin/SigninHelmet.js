import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const SigninHelmet = () => {
  return (
    <Helmet>
        <title>Signin Page </title>
        <meta name="description" content="Signin page for viewing personal accounts"/>
        <meta name="url" content="https://www.master-connect.ca/signin"/>
    </Helmet>
  )
}

export default SigninHelmet

