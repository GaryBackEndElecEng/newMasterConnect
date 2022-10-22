import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const ConsultHelmet = () => {
  return (
    <Helmet>
        <title>Design1 page </title>
        <meta name="description" content="A Short-term Rental app for sale- automated display - out-of-This-World "/>
    </Helmet>
  )
}

export default ConsultHelmet