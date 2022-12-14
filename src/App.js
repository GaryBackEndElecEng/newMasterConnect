import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout.js'
import './App.css';
import Page1 from './component/page_style3/Page1';
import Design1 from './component/design1/Design1';
import Design2 from './component/design2/Design2';
import Miscel from './component/Miscel';
import { ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { theme } from './context/theme';
import Home from './component/home/Home';
import About from './component/about/About';
import Contact from './component/contact/Contact';
import Design3 from './component/design3/Design3';
import Design4 from './component/design4/Design4';
import MyAccount from './component/account/MyAccount';
import Article from './component/articles/Article';
import Design6Wedding from './component/wedding/Design6Wedding';
import Bio from './component/bio/Bio';
import WorkFeatures from './component/works/WorkFeatures';
import Prices from './component/prices/Prices';
import Register from './component/register/Register';
import Signin from './component/signin/Signin';
import Signout from './component/signin/Signout';
import LayoutSecure from './component/LayoutSecure';
import Checkout from './component/checkout/Checkout';
import Consult from './component/consult/Consult';
import Success from './component/payment/Success';
import Cancelled from './component/payment/Cancelled';
import PostAccount from './component/postAccount/PostAccount';
import SuccessPost from './component/payment/SuccessPost';
import Blog from './component/blog/Blog';
import Privacy from './component/policy/Privacy';
import TermsOfSvc from './component/policy/TermsOfSvc';
import SuccessExtra from './component/payment/SuccessExtra';
import Design8 from './component/design8/Design8';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/articles" element={<Article />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/termsOfSvc" element={<TermsOfSvc />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/" element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/works" element={<WorkFeatures />} />
            <Route path="/design6" element={<Design6Wedding />} />
            <Route path="/design5" element={<Design4 />} />
            <Route path="/design4" element={<Design3 />} />
            <Route path="/design2" element={<Design2 />} />
            <Route path="/design1" element={<Design1 />} />
            <Route path="/design8" element={<Design8 />} />
            <Route path="/design3" element={<Page1 />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/MyAccount" element={<LayoutSecure />}>
              <Route path="/MyAccount" element={<MyAccount />} />
              <Route path ="/MyAccount/postAccount/" element={<PostAccount/>}/>
              <Route path="/MyAccount/checkout" element={<Checkout />} />
              <Route path="/MyAccount/consult" element={<Consult />} />
              <Route path ="/MyAccount/success/" element={<Success/>}/>
              <Route path ="/MyAccount/successPost/" element={<SuccessPost/>}/>
              <Route path ='/MyAccount/successExtra' element={<SuccessExtra/>}/>
              <Route path ="/MyAccount/canceled/" element={<Cancelled/>}/> 
            </Route>
            

          </Route>
          <Route path="*" element={<Miscel />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
