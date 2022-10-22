import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const PolicyHelmet = () => {
  return (
    <Helmet>
        <title>Policy</title>
        <meta name="description" content="www.master-connect.c policy"/>
    </Helmet>
  )
}

export default PolicyHelmet