import axios from "axios";
import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,
PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, CLEAR_ERRORS,
NEW_REVIEW_FAIL, NEW_REVIEW_SUCCESS, NEW_REVIEW_REQUEST,
ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,
NEW_ADMIN_PRODUCT_REQUEST,NEW_ADMIN_PRODUCT_SUCCESS,NEW_ADMIN_PRODUCT_FAIL,
ADMIN_PRODUCT_DELETE_REQUEST,ADMIN_PRODUCT_DELETE_SUCCESS,ADMIN_PRODUCT_DELETE_FAIL,
ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL,
ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS,
REVIEW_DELETE_FAIL} from "../constants/productConstants"

// Get All Products Action
export const getProduct = (keyword="",currentPage=1,price=[100,300000],category="",ratings=0) => async (dispatch) => {
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        let link = `http://localhost:5000/api/v1/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `http://localhost:5000/api/v1/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const {data} = await axios.get(link , {withCredentials:true});

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
           type:ALL_PRODUCT_FAIL,
           payload: error.response.data.error
        })
    }
};

// Get All Products For Admin Dashboard Action
export const getAllProducts = () => async (dispatch) => {
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST});
        
        const {data} = await axios.get("http://localhost:5000/api/v1/product/getAdminProducts" , {withCredentials:true});

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
           type:ADMIN_PRODUCT_FAIL,
           payload: error.response.data.error
        })
    }
};

// Create A New Product from Dashboard Action
export const createNewProduct = (productData) => async (dispatch) => {
    
    try{
        dispatch({type: NEW_ADMIN_PRODUCT_REQUEST});

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post("http://localhost:5000/api/v1/product/admin/createProduct", productData, {withCredentials:true}, config);

        dispatch({
            type: NEW_ADMIN_PRODUCT_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
           type: NEW_ADMIN_PRODUCT_FAIL,
           payload: error.response.data.error
        })
    }
};

// Get A Single Product Details
export const getProductDetails = (id) => async (dispatch) => {
    
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`http://localhost:5000/api/v1/product/getAProduct/${id}`, {withCredentials:true});

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
           type:PRODUCT_DETAILS_FAIL,
           payload: error.response.data.error
        })
    }
};

// Create A New Review
export const newReview = (reviewData) => async (dispatch) => {
    
    try{
        dispatch({type: NEW_REVIEW_REQUEST});

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.put("http://localhost:5000/api/v1/product/productreview", reviewData, {withCredentials:true}, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
           type: NEW_REVIEW_FAIL,
           payload: error.response.data.error
        })
    }
};

// Delete A Product from Dashboard
export const deleteAdminProduct = (id) => async (dispatch) => {
    try{
        dispatch({type: ADMIN_PRODUCT_DELETE_REQUEST});
        
        const {data} = await axios.delete(`http://localhost:5000/api/v1/product/admin/deleteProduct/${id}` , {withCredentials:true});

        dispatch({
            type:ADMIN_PRODUCT_DELETE_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type:ADMIN_PRODUCT_DELETE_FAIL,
           payload: error.response.data.error
        })
    }
};

// Update A Product from Dashboard
export const updateAdminProduct = (id,updatedData) => async (dispatch) => {
    try{
        dispatch({type: ADMIN_PRODUCT_UPDATE_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const {data} = await axios.put(`http://localhost:5000/api/v1/product/admin/updateProduct/${id}` ,updatedData, {withCredentials:true}, config);            

        dispatch({
            type: ADMIN_PRODUCT_UPDATE_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type: ADMIN_PRODUCT_UPDATE_FAIL,
           payload: error.response.data.error
        })
    }
};

// Get All Reviews for Dashboard
export const getAllReviews = (id) => async (dispatch) => {
    try{
        dispatch({type: ALL_REVIEW_REQUEST});

        const {data} = await axios.get(`http://localhost:5000/api/v1/product/getproductallreviews?id=${id}` ,{withCredentials:true});            

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload:data.productAllReviews
        })
    }
    catch(error){
        dispatch({
           type: ALL_REVIEW_FAIL,
           payload: error.response.data.error
        })
    }
};

// Delete A Review  
export const deleteReview = (reviewId,productId) => async (dispatch) => {
    try{
        dispatch({type: REVIEW_DELETE_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const {data} = await axios.delete(`http://localhost:5000/api/v1/product/deleteproductreview?productId=${productId}&id=${reviewId}` , {withCredentials:true}, config);            

        dispatch({
            type: REVIEW_DELETE_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type: REVIEW_DELETE_FAIL,
           payload: error.response.data.error
        })
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};