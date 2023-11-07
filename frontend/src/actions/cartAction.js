import axios from "axios";
import {ADD_TO_CART,REMOVE_FROM_CART, SAVE_SHIPPING_INFO} from "../constants/cartConstants";

// Add To Cart Action
export const addToCart = (id,quantity) => async (dispatch,getState) => {

        const {data} = await axios.get(`http://localhost:5000/api/v1/product/getAProduct/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload:{
                product: data.getaproduct._id,
                name: data.getaproduct.name,
                price: data.getaproduct.price,
                image: data.getaproduct.images[0].url,
                stock: data.getaproduct.Stock,
                quantity
            }
        });
    window.localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove From Cart Action
export const removeFromCart = (id) => async (dispatch,getState) => {

dispatch({
    type: REMOVE_FROM_CART,
    payload: id
});
 window.localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch,getState) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    window.localStorage.setItem("shippingInfo", JSON.stringify(data));
};

