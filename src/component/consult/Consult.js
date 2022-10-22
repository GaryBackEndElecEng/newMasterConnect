import React, { useContext, useEffect,useState  } from 'react'
// import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
// import { useTheme } from '@mui/material/styles';
import Amount from './Amount';
import ProductsAndServices from './ProductsAndServices';
import AdditionalQuestions from './AdditionalQuestions';
import {   Container,} from '@mui/material';
import RegisterPage from '../RegisterPage';
import CreatInvoiceAndSendBack from './CreatInvoiceAndSendBack';
import GetRegisterPages from '../utils/GetRegisterPages';
import ConsultHelmet from './ConsultHelmet';
import {useTheme} from '@mui/material/styles';



const Consult = () => {
    const theme = useTheme();
    const { usersProduct, usersService, setUser_id, user_id,usersInvoice,usersPostInvoice,usersExtraInvoice } = useContext(TokenAccessContext);
    const { setTitle, setStyleName, setLoggedIn, loggedIn,setChangePage,staticImage } = useContext(GeneralContext);
    const [invoicePaid, setInvoicePaid] = useState(false);
  const [postInvoicePaid, setPostInvoicePaid] = useState(false);
  const [extraInvoicePaid, setExtraInvoicePaid] = useState(false);
    const { getProductList, getServiceList } = useContext(PriceContext);
    const userID = user_id ? user_id : parseInt(localStorage.getItem("user_id"));
    const userLoggedIn = loggedIn ? loggedIn : JSON.parse(localStorage.getItem("loggedIn"));
    

    useEffect(() => {
        //THIS IS ONLY USED WHEN THE CLIENT LOGS IN, MAINLY FOR invoice.paid,postInvoice.paid triggers 
            if (usersInvoice.loaded && usersInvoice.data.paid) {
              setInvoicePaid(usersInvoice.data)
            }
            if (usersPostInvoice.loaded && usersPostInvoice.data.paid) {
              setPostInvoicePaid(usersPostInvoice.data)
            }
            if (usersExtraInvoice.loaded && usersExtraInvoice.data.paid) {
                setExtraInvoicePaid(usersExtraInvoice.data)
            }
          }, [usersInvoice.loaded,usersPostInvoice.loaded,usersInvoice.data,usersPostInvoice.data,usersExtraInvoice.loaded,usersExtraInvoice.data]);

    useEffect(()=>{
        setTitle("Consult");
        setStyleName("Almost done");
        setUser_id(userID);
        setLoggedIn(userLoggedIn);
        setChangePage(false);
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    },[setTitle,setStyleName,setUser_id,userID,setLoggedIn,userLoggedIn,setChangePage])

    return (
        <Container maxWidth="xl"
            sx={{
                display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                marginTop:{xs:"-80px",sm:"-30px",md:"-40px"},background:theme.palette.common.light
            }}>
                <ConsultHelmet/>
                <RegisterPage/>
                <GetRegisterPages/>
                <CreatInvoiceAndSendBack/>
            <Amount 
                invoicePaid={invoicePaid} 
                postInvoicePaid={postInvoicePaid}
                usersInvoice={usersInvoice}
                extraInvoicePaid={extraInvoicePaid}
             />
            {!invoicePaid.paid && <ProductsAndServices/>}
            <AdditionalQuestions/>
        </Container>
    )

}

export default Consult;