import React, { useEffect, useState } from 'react'
import {Carousel, CarouselItem} from "react-bootstrap"
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {clearErrors, getProductDetails, newReview} from "../../actions/productAction"
import "../../Component/ProductDetails/ProductDetails.css"
import ReviewCard from './ReviewCard'
import Loader from "../Layout/Loader/Loader"
import ProductCard from "../Home/ProductCard";
import {useAlert} from "react-alert";
import MetaData from "../Layout/MetaData";
import {addToCart} from "../../actions/cartAction";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {success,error: reviewError} = useSelector(state => state.newReview)
  const alert = useAlert();
  const {product, loading, error, relatedProducts} = useSelector((state) => state.productDetails)
  const {isAuthenticated} = useSelector(state=>state.user);
  const {id} = useParams();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating,setRating] = useState(0);
  const [comment, setComment] = useState("");

  const incQuantity = () => {
      if(quantity >= product.Stock)return;
      setQuantity(quantity + 1);
      
  };
  const decQuantity = () => {
    if(quantity <= 1)return;
      setQuantity(quantity - 1);
  }

  const addToCartHandler = () => {
    if(isAuthenticated){
    dispatch(addToCart(id, quantity));
    alert.success("Item Added To Cart Successfully");
    navigate("/cart");
    }
    else{
      alert.error("Please Login To Access Cart");
      setTimeout(()=>{navigate("/login");},5000)
    }
  }

  const submitReviewToggle = () =>{
    open ? setOpen(false) : setOpen(true)
  };

  const reviewSubmitHandler = () => {
      const myForm = new FormData();
      myForm.set("productID",id);
      myForm.set("rating",rating);
      myForm.set("comment",comment);
      
      dispatch(newReview(myForm));
      setOpen(false);
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if(success){
      alert.success("Review submitted Successfully");
      dispatch({type: NEW_REVIEW_RESET});
      window.location.reload();
    }

    dispatch(getProductDetails(id));

  },[dispatch,error,alert,id,quantity,reviewError,success]);

  const options = {
    value: product?.ratings,
    size: "large",
    readOnly: true,
    precision: 0.5
  }

  return (
    <>
      {loading ? <Loader/> : <>
      <MetaData title={`${product && product.name} -- Let Us Bring Them To You`} />
      <div className='productDetails'>

        <div>
            <Carousel fade>
            {
              product?.images && product?.images.map((item,index)=>{
                return(
                  <CarouselItem  interval={2000} key={index}>
                  <img className='carouselImage' src={item.url} alt={`Carousel ${index}`} />
                  </CarouselItem>
                )
              })
            }
            </Carousel>
        </div>

        <div>

          <div className='detailsBlock-1'>
          <h2>{product && product.name}</h2>
          <p>{`product # ${product._id}`}</p>
          </div>

          <div className='detailsBlock-2'>
          <Rating {...options} /><span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
          </div>

          <div className='detailsBlock-3'>
            <h1>&#8377; {product.price}</h1>
            <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button onClick={decQuantity}>-</button>
              <input readOnly type="number" value={quantity}/>
              <button onClick={incQuantity}>+</button>
            </div>
            <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add To Cart</button>
            </div>
            <p>
              Status :
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "In Stock"}
              </b>
            </p>
          </div>

          <div className='detailsBlock-4'>
            Description: <p>{product.description}</p>
          </div>
          
          <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
            
        </div>
      </div>

      <h3 className="reviewsHeading">Similar Products</h3>
      <div className='relatedProducts'>
          {
            relatedProducts && relatedProducts.map((item)=>{
              return <ProductCard key={item._id} product={item}/>
            })
          }
      </div>


      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className='submitDialog'>
            <Rating onChange={(e)=>{setRating(e.target.value)}}
              value={rating} size="large" />

              <textarea className='submitDialogTextArea'
               cols="30" rows="5" 
               value={comment} onChange={(e)=>{setComment(e.target.value)}}></textarea>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={submitReviewToggle} >Cancel</Button>
          <Button onClick={reviewSubmitHandler} color="primary" >Submit</Button>
        </DialogActions>

      </Dialog>

      {
        product.reviews && product.reviews[0] ? (
          <div className='reviews'>
            {
              product.reviews && product.reviews.map((review,index)=> <ReviewCard key={index} review={review} />)
            }
          </div>) : 
          (<p className='noReviews'> No Reviews </p>) 
      }

    </>
    }
    </>
  )
}

export default ProductDetails