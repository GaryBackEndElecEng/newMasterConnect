import React, {  useContext, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {Helmet} from 'react-helmet';


const PostHelmet = () => {
  return (
    <Helmet>
    <title>Post Account </title>
    </Helmet>
  )
}

export default PostHelmet