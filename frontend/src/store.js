import {createStore,combineReducers,applyMiddleware,} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { AllReviewsReducer, deleteAdminProductReducer, deleteReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer} from './reducers/productReducer';
import { forgotPasswordReducer, getAllUsersReducer, getUserDetailsReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { adminAllOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderAdminReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    deletedProduct:deleteAdminProductReducer,
    Orders:adminAllOrdersReducer,
    order: orderAdminReducer,
    allUsers:getAllUsersReducer,
    userDetails:getUserDetailsReducer,
    allReviews: AllReviewsReducer,
    review: deleteReviewReducer
});

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):
        [],
        shippingInfo: localStorage.getItem('shippingInfo') ?
        JSON.parse(localStorage.getItem('shippingInfo')) :
        {}
    }
};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;

