import React from 'react';
import {Helmet} from 'react-helmet';


const PolicyHelmet = ({conical}) => {
  return (
    <Helmet>
        <title>Policy</title>
        <meta name="description" content="www.master-connect.c policy"/>
        <canonical rel={`${conical}/privacy`}/>
    </Helmet>
  )
}

export default PolicyHelmet