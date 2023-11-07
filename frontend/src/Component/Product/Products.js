import React, { useEffect, useState } from 'react'
import "../Product/Products.css"
import {useDispatch,useSelector} from "react-redux"
import {getProduct, clearErrors} from "../../actions/productAction"
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import {useParams} from "react-router-dom"
import Pagination from "react-js-pagination";
import {Typography,Slider} from "@material-ui/core";
import {useAlert} from "react-alert";
import MetaData from "../Layout/MetaData"

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([100,300000]);
    const [ratings, setRatings] = useState(0);

    const categories = ["Smartphones","Laptops","SmartTV", "Speakers", "Tabs", "TShirts", "Watches", "Shampoo", "Serum", "HeadPhones"];
    const [category,setCategory] = useState("");

    const {loading,products,error,resultperPage,productsCount,filterCount} = useSelector(state=>state.products);
    const keyword = useParams().keyword;

    const setCurrentPageNum = (e) =>{
        setCurrentPage(e);
    }

    const priceHandler = (e,newPrice) =>{
        setPrice(newPrice);
    }


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,alert,error])
  return (
    <>
     {loading ? <Loader/> : 
        <>
            <MetaData title="All EShopping Products -- Browse Your Favourite Products"/>
            <h2 className='productsHeading'>Products</h2>
            <div className='products'>
                {
                    products && products.map((product)=>{
                       return <ProductCard key={product._id} product={product} />
                    })
                }
            </div>
            
            <div className='filterBox'>
                <Typography>Price</Typography>
                <Slider 
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                />

                <Typography>Categories</Typography>
                <ul className='categorieslist'>
                    {
                        categories && categories.map((category,index)=>{
                           return <li onClick={()=>{setCategory(category)}} className='category-link' key={category}>{category}</li>
                        })
                    }
                </ul>

                    <Typography>Ratings</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e,newRating)=>{
                            setRatings(newRating);
                        }}
                        min={0}
                        max={5}
                        aria-labelledby='continuous-slider'
                        valueLabelDisplay='auto'
                    />

            </div>

           {
            resultperPage < productsCount && filterCount >= resultperPage ?  
                    <div className='paginationBox d-flex justify-content-center'>
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultperPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNum}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    ItemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass = "pageLinkActive" 
                />
                </div>
                :
                filterCount === 0?
                <h1 style={{textAlign:"center", font:"600 2vmax Roboto", color:"rgba(126,126,126,.6)", width:"60%", margin:"auto", position:"absolute", top:"24vw", left:"19vw" }}>No Such Product Found</h1>
                :
                ""
           }
        </>
    }   
    </>
  )
}

export default Products