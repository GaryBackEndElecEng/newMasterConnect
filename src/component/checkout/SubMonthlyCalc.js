import React, { useContext, useEffect,useState } from 'react'
import { TokenAccessContext } from '../../context/TokenAccessProvider';

const SubMonthlyCalc = ({loadInv}) => {

    const {selectedPayment } = useContext(TokenAccessContext);
    const [getSubTotal,setGetSubTotal]=useState(0);
    const getTotal= selectedPayment? selectedPayment.value:null;
    const getTax=loadInv ? loadInv.tax:null;
    
    useEffect(()=>{
        let subTotal=0;
        if(getTotal && getTax){
            let getFed=getTax.fed;
            let getProvState=getTax.provState;
            if ( getProvState === 0){
            subTotal = getTotal/(1 + getFed/100);
            }else{
               subTotal= getTotal/(1+getProvState/100);
               subTotal= subTotal/(1+getFed/100);
            }
            setGetSubTotal(Math.ceil(subTotal));
        }
    },[getTotal,getTax,setGetSubTotal]);


  return (
    <>{getSubTotal}</>
  )
}

export default SubMonthlyCalc