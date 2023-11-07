import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import "./ConfirmOrder.css";
import { Link } from 'react-router-dom';
import {Typography } from '@material-ui/core';

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const {cartItems,shippingInfo} = useSelector(state => state.cart);
    const {userData} = useSelector(state => state.user);

    const subTotal = cartItems.reduce((acc,item)=>
        acc= acc + (item.price * item.quantity),0
    );

    const shippingCharges = subTotal > 1000 ? 0 : 100;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`;

    const tax = subTotal * 0.18;

    const totalPrice = subTotal + tax + shippingCharges;

    const proceedToPayment = () => {
        const data = {
            subTotal,
            tax,
            shippingCharges,
            totalPrice
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/process/payment");
    };

  return (
    <>
        <MetaData title="Confirm Your Order" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>ShippingInfo</Typography>
                    <div className='confirmShippingAreaBox'>
                        <div>
                            <p>Name: </p>
                            <span>{userData?.name}</span>
                        </div>
                        <div>
                            <p>PhoneNo: </p>
                            <span>{shippingInfo?.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address: </p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>

                <div className='confirmCartItems'>
                    <Typography>Your Cart Items: </Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems && cartItems.map(item => (
                            <div key={item?.product}>
                                <img src={item?.image} alt={item?.name} />
                                <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                                <span>&#8377; {`${item?.price} * ${item?.quantity}`} = <b>&#8377; {item.quantity * item.price}</b></span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className='orderSummary'>
                <Typography>Order Summary</Typography>
                <div>
                    <div>
                        <p>Subtotal: </p>
                        <span>&#8377; {subTotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges: </p>
                        <span>&#8377; {shippingCharges}</span>
                    </div>
                    <div>
                        <p>GST: </p>
                        <span>&#8377; {tax}</span>
                    </div>
                </div>

                <div className='orderSummaryTotal'>
                    <p><b>Total: </b></p>
                    <span>&#8377; {totalPrice}</span>
                </div>

                <button onClick={proceedToPayment} >Proceed To Payment</button>
            </div>
        </div>
    </>
  )
}

export default ConfirmOrder