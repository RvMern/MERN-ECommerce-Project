import React, { useEffect } from 'react';
import "./Home.css";
import ProductCard from "./ProductCard";
import Loader from "../Layout/Loader/Loader"
import MetaData from '../Layout/MetaData';
import {clearErrors,getProduct} from "../../actions/productAction";
import {useSelector ,useDispatch} from "react-redux";
import {useAlert} from "react-alert";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector(state=>state.products)
  
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  },[dispatch,error,alert])
  return (
    loading ? <Loader/> : <>

    <MetaData title="EShopping || Platform Of All Products At Reasonable Price With Assured Quality Goods"/>

      <div className="banner">
          <p>Welcome To EShopping</p>
          <h1>Home Of All Products From Across All Brands With Assured Quality Check</h1>
          <a href="#featured-products"><button>Browse Below</button></a>
      </div>

      <h2 className='home-heading'>Featured Products</h2>

      <div id='featured-products' className='card-container'>
      {
        products && products.map((product,index)=>(
          <ProductCard key={index} product={product}/>
        ))
      }
      </div>
      
  </>
  )
}

export default Home