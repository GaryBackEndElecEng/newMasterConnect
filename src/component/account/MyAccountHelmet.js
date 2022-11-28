import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const MyAccountHelmet = ({getPathLocation}) => {
  return (
    <Helmet>
        <title>My Account </title>
        <meta name="description" content="user's account"/>
        <link rel="canonical" href={`${getPathLocation}MyAccount`} />
    </Helmet>
  )
}

export default MyAccountHelmet