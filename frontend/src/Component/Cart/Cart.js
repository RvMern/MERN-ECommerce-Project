import React from 'react';
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import {useDispatch, useSelector} from "react-redux";
import { addToCart } from '../../actions/cartAction';
import {removeFromCart} from "../../actions/cartAction";
import {RemoveShoppingCart} from "@material-ui/icons";
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {cartItems} = useSelector(state=>state?.cart);
  const dispatch = useDispatch();

  const incQuantity = (id, quantity, stock) => {
    if(quantity >= stock){
      return ;
    }
    else{
      quantity += 1;
    }
    dispatch(addToCart(id, quantity));
  }

  const decQuantity = (id, quantity) => {
    if(quantity <= 1){
      return ;
    }
    else{
      quantity -= 1;
    }
    dispatch(addToCart(id, quantity));
  }

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  }

  return (
    <>
      {
        cartItems.length === 0 ? (
        <div className='emptyCart'>
          <RemoveShoppingCart />
          <Typography>Empty Cart</Typography>
          <Link to='/products'>Browse Our Products</Link>
        </div> ) : (
        <>
        <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {
              cartItems && cartItems.map((item) => (
              <div key={item.product} className='cartContainer'>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                    <button onClick={()=>{decQuantity(item.product, item.quantity)}}>-</button>
                    <input readOnly value={item.quantity} type="number" />
                    <button onClick={()=>{incQuantity(item.product, item.quantity, item.stock)}}>+</button>
                </div>
                <p className="cartSubtotal">&#8377; {item.quantity * item.price}</p>  
              </div>
              ))
            }

            <div className="cartGrossTotal">
              <div></div>
              <div className='cartGrossTotalBox'>
                <p>Gross Total</p>
                <p>{`${cartItems.reduce((acc, item)=> 
                  acc + (item.quantity * item.price),
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkoutBtn">
                <button onClick={checkoutHandler}>CHECK OUT</button>
              </div>
            </div>
        </div>
    </> )
      }
    </>
  )
}

export default Cart