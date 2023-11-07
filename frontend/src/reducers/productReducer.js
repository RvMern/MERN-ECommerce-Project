import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS,NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,
    NEW_ADMIN_PRODUCT_REQUEST, NEW_ADMIN_PRODUCT_SUCCESS, NEW_ADMIN_PRODUCT_FAIL,
    NEW_ADMIN_PRODUCT_RESET, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS,
    ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL, ADMIN_PRODUCT_UPDATE_RESET,
    ADMIN_PRODUCT_UPDATE_REQUEST, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAIL,
    REVIEW_DELETE_RESET} from "../constants/productConstants"

//All Product Reducer
export const productReducer = (state = {products:[]}, action) =>{
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return({
                loading:true,
                products:[]
            })
        case ALL_PRODUCT_SUCCESS:
            return ({
                loading:false,
                products:action.payload.products,
                productsCount:action.payload.productCount,
                resultperPage : action.payload.productPerPage,
                filterCount: action.payload.filterCount
            });

        case ADMIN_PRODUCT_SUCCESS:
            return({
                loading:false,
                products: action.payload.products
            });

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return ({
                loading:false,
                error:action.payload
            })
        case CLEAR_ERRORS:
            return({
                ...state,
                error:null
            })
        default:
            return state;
    }

};

// A Single Product Reducer
export const productDetailsReducer = (state = {product:{}}, action) =>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return({
                loading:true,
                ...state
            })
        case PRODUCT_DETAILS_SUCCESS:
            return ({
                loading:false,
                product: action.payload.getaproduct,
                relatedProducts: action.payload.relatedProducts
            })
        case PRODUCT_DETAILS_FAIL:
            return ({
                loading:false,
                error:action.payload
            })
        case CLEAR_ERRORS:
            return({
                ...state,
                error:null
            })
        default:
            return state;
    }

};

// New Review Reducer
export const newReviewReducer = (state = { }, action) =>{
    switch(action.type){
        case NEW_REVIEW_REQUEST:
            return({
                loading:true,
                ...state
            })
        case NEW_REVIEW_SUCCESS:
            return ({
                loading:false,
                success:action.payload,
            })
        case NEW_REVIEW_FAIL:
            return ({
                loading:false,
                error:action.payload
            })
        case NEW_REVIEW_RESET:
            return({
                ...state,
                success:false
            })
        case CLEAR_ERRORS:
            return({
                ...state,
                error:null
            })
        default:
            return state;
    }

};

// Create New Product from Admin Dashboard Reducer
export const newProductReducer = (state = {product:{}}, action) =>{
    switch(action.type){
        case NEW_ADMIN_PRODUCT_REQUEST:
            return({
                loading:true,
                ...state
            })
        case NEW_ADMIN_PRODUCT_SUCCESS:
            return ({
                loading:false,
                success:action.payload.success,
                product:action.payload.product
            })
        case NEW_ADMIN_PRODUCT_FAIL:
            return ({
                loading:false,
                error:action.payload
            })
        case NEW_ADMIN_PRODUCT_RESET:
            return({
                ...state,
                success:false
            })
        case CLEAR_ERRORS:
            return({
                ...state,
                error:null
            })
        default:
            return state;
    }

};

// Delete Product from Admin Dashboard Reducer
export const deleteAdminProductReducer = (state = { }, action) =>{
    switch(action.type){
        case ADMIN_PRODUCT_DELETE_REQUEST:
        case ADMIN_PRODUCT_UPDATE_REQUEST:
            return({
                loading:true,
                ...state
            })
        case ADMIN_PRODUCT_DELETE_SUCCESS:
            return ({
                loading:false,
                isDeleted:action.payload,
            })
        case ADMIN_PRODUCT_UPDATE_SUCCESS:
            return ({
                loading:false,
                isUpdated:action.payload,
            })

        case ADMIN_PRODUCT_DELETE_FAIL:
        case ADMIN_PRODUCT_UPDATE_FAIL:
            return ({
                loading:false,
                error:action.payload
            })
        case ADMIN_PRODUCT_DELETE_RESET:
            return({
                ...state,
                isDeleted:false
            });
        case ADMIN_PRODUCT_UPDATE_RESET:
            return({
                ...state,
                isUpdated:false
            })
        case CLEAR_ERRORS:
            return({
                ...state,
                error:null
            })
        default:
            return state;
    }

};

// Get All Reviews Reducer
export const AllReviewsReducer = (state = {reviews:[]}, action) =>{
    switch(action.type){
        case ALL_REVIEW_REQUEST:
            return({
                loading:true,
                ...state
            });

        case ALL_REVIEW_SUCCESS:
            return ({
                loading:false,
                reviews:action.payload,
            });

        case ALL_REVIEW_FAIL:
            return ({
                ...state,
                loading:false,
                error:action.payload
            });
        
        case CLEAR_ERRORS:
            return({
                ...state,
                error:null
            });

        default:
            return state;
    }

};

// Delete A Review from Admin Dashboard Reducer
export const deleteReviewReducer = (state = { }, action) =>{
    switch(action.type){
        case REVIEW_DELETE_REQUEST:
            return({
                loading:true,
                ...state
            });

        case REVIEW_DELETE_SUCCESS:
            return ({
                loading:false,
                isDeleted:action.payload,
            });

        case REVIEW_DELETE_FAIL:
            return ({
                ...state,
                loading:false,
                error:action.payload
            });

        case REVIEW_DELETE_RESET:
            return({
                ...state,
                isDeleted:false
            });
        
        case CLEAR_ERRORS:
            return({
                ...state,
                error:null
            });

        default:
            return state;
    }

};

