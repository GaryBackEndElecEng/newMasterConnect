import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const ContactHelmet = ({keywords,content}) => {
  return (
    <Helmet>
        <title>Contact Us </title>
        <meta name="description" content="A Short-term Rental app for sale- automated display - out-of-This-World "/>
        <meta name="summary" content={content}/>
        <meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

export default ContactHelmet