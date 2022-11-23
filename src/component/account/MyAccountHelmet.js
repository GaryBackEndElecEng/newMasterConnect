import React from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const MyAccountHelmet = ({conical}) => {
  return (
    <Helmet>
        <title>My Account </title>
        <meta name="description" content="user's account"/>
        <link rel="canonical" href={`${conical}/MyAccount`} />
    </Helmet>
  )
}

export default MyAccountHelmet