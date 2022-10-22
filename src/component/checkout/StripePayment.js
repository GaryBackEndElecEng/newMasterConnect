import React, {useContext} from 'react';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


export const StripePayment = () => {
    const { publicKey} = useContext(TokenAccessContext);
    
    const StripePromise = loadStripe(publicKey)
  return (
    <Elements stripe={StripePromise}>
      <CheckoutForm />
    </Elements>
  )
}
