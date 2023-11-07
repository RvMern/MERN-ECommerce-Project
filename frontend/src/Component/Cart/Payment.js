import React, { useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps';
import { useSelector,useDispatch } from 'react-redux';
import MetaData from '../Layout/MetaData';
import {Typography } from '@material-ui/core';
import {useAlert} from "react-alert";
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import {CreditCard,Event,VpnKey} from "@material-ui/icons"
import { clearErrors, createOrder } from '../../actions/orderAction';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {userData} = useSelector(state => state.user);
    const {error} = useSelector(state => state.newOrder);
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice * 100,
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try{
            const config = {
                headers : {"Content-Type": "application/json"}
            }
            const {data} = await axios.post("http://localhost:5000/api/v1/payment/process", paymentData,{withCredentials:true},config,);

            const client_secret = data.client_secret;

            if(!stripe || !elements)return;

            const result = await stripe.confirmCardPayment(client_secret ,{
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: userData.name,
                        email: userData.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                },
            });

            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }
            else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    dispatch(createOrder(order));
                    navigate("/success");
                }
                else{
                    alert.error("Something Went Wrong While Processing Your Payment");
                }
            }

        }
        catch(error){
            payBtn.current.disabled = false;
            alert.error(error.response.data.error);
        }
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch, error,alert])

  return (
    <>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
            <form onSubmit={(e)=>{submitHandler(e)}} className='paymentForm'>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCard />
                    <CardNumberElement className='paymentInput' />
                </div>
                <div>
                    <Event />
                    <CardExpiryElement className='paymentInput' />
                </div>
                <div>
                    <VpnKey />
                    <CardCvcElement className='paymentInput' />
                </div>

                <input type="submit" value={`Pay - Rs ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentFormBtn' />
            </form>
        </div>
    </>
  )
}

export default Payment