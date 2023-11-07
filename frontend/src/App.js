import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Component/Layout/Header/Header";
import Home from "./Component/Home/Home";
import axios from "axios";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Footer from "./Component/Layout/Footer/Footer";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import Products from "./Component/Product/Products"
import Search from "./Component/Product/Search"
import MyProfile from "./Component/User/MyProfile";
import LoginSignUp from "./Component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/useraction";
import UserOptions from "./Component/Layout/Header/UserOptions";
import {useSelector} from "react-redux";
import UpdateProfile from "./Component/User/UpdateProfile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPassword from "./Component/User/ForgotPassword"
import ResetPassword from "./Component/User/ResetPassword";
import OrderSuccess from "./Component/Cart/OrderSuccess";
import MyOrders  from "./Component/Order/MyOrders";
import OrderDetails  from "./Component/Order/OrderDetails";
import Dashboard from "./Component/admin/Dashboard";
import ProductList from "./Component/admin/ProductList";
import NewProduct from "./Component/admin/NewProduct";
import UpdateProduct from "./Component/admin/UpdateProduct";
import OrderList from "./Component/admin/OrderList";
import ProcessOrder from "./Component/admin/ProcessOrder";
import UserList from "./Component/admin/UserList";
import UpdateUser from "./Component/admin/UpdateUser";
import ReviewList from "./Component/admin/ReviewList";
import NotFound from "./Component/Layout/Not Found/NotFound.js";
// import ProtectedRoute from "./Component/Protected Routes/ProtectedRoute";

import {OpenRoute,PrivateRoute} from "./Component/Protected Routes/ProtectedRoute";


import Cart from "./Component/Cart/Cart";
import Shipping from "./Component/Cart/Shipping";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import Payment from "./Component/Cart/Payment.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";


function App() {
  const {isAuthenticated, userData} = useSelector(state=>state.user);
  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get('http://localhost:5000/api/v1/payment/stripeapikey',{withCredentials:true});
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  window.addEventListener("contextmenu",(e)=>{
      e.preventDefault();
  });

  const PaymentWrapper = () => {
    return (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    )
  }



  return ( 
    <>
      <BrowserRouter>

        <Header/>

        {isAuthenticated && <UserOptions userData={userData} />}

        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:keyword" element={<Products/>}/>
          <Route path="/search" element={<Search/>}/>
          
          <Route path="/account" element={<OpenRoute isAuthenticated={isAuthenticated} component={MyProfile} />} />
          <Route path="/user/update" element={<OpenRoute isAuthenticated={isAuthenticated} component={UpdateProfile} />} />   
          <Route path="/password/update" element={<OpenRoute isAuthenticated={isAuthenticated} component={UpdatePassword} />} /> 

          <Route path="password/forgot" element={<ForgotPassword />} />
          <Route path="password/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/login" element={<LoginSignUp/>} />

          <Route path="/cart" element={<OpenRoute isAuthenticated={isAuthenticated} component={Cart} /> } />
          <Route path="/shipping" element={<OpenRoute isAuthenticated={isAuthenticated} component={Shipping} />} />
          <Route path="/success" element={<OpenRoute isAuthenticated={isAuthenticated} component={OrderSuccess} />} />
          <Route path="/my/orders" element={<OpenRoute isAuthenticated={isAuthenticated} component={MyOrders} /> } />

          <Route path="/order/confirm" element={<OpenRoute isAuthenticated={isAuthenticated} component={ConfirmOrder} /> } />


          <Route path="/process/payment" element={<OpenRoute isAuthenticated={isAuthenticated} component={PaymentWrapper} />} />
          <Route path="/order/:id" element={<OpenRoute isAuthenticated={isAuthenticated} component={OrderDetails} />} />

          <Route path="/admin/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={Dashboard} /> } />
          <Route path="/admin/products" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={ProductList} /> } />
          <Route path="/admin/product" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={NewProduct } /> } />

          <Route path="/admin/product/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={UpdateProduct} />} />
          <Route path="/admin/orders" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={OrderList} /> } />
          <Route path="/admin/order/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={ProcessOrder} />} />

          <Route path="/admin/users" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={UserList} />} />
          <Route path="/admin/user/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={UpdateUser} />} />
          <Route path="/admin/reviews" element={<PrivateRoute isAuthenticated={isAuthenticated} userData={userData} component={ReviewList} />} />

          <Route path="*" element={<NotFound/>} />

        </Routes>

        <Footer/>

      </BrowserRouter>
   </>
  );
}

export default App;
