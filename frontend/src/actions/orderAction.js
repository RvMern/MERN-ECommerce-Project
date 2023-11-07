import {CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,
CLEAR_ERRORS,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,MY_ORDERS_FAIL,
ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST,
ADMIN_ALL_ORDER_REQUEST, ADMIN_ALL_ORDER_SUCCESS, ADMIN_ALL_ORDER_FAIL,
UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL,
DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL} from "../constants/orderConstants";

import axios from "axios";

// Create A Order Action
export const createOrder = (order) => async(dispatch) => {
    try{
        dispatch({type:CREATE_ORDER_REQUEST});

        const config = {
            headers: {
                "Content-Type" : "application/json",
            }
        };

        const { data } = await axios.post("http://localhost:5000/api/v1/order/createorder",order, {withCredentials:true},config);

        dispatch({type:CREATE_ORDER_SUCCESS, payload:data});
    }
    catch(error){
        dispatch({type:CREATE_ORDER_FAIL, payload:error.response.data.error});
    }

};

// Get User Orders Action
export const myOrders = () => async(dispatch) => {
    try{
        dispatch({type:MY_ORDERS_REQUEST});

        const { data } = await axios.get("http://localhost:5000/api/v1/order/getmyorders", {withCredentials:true});

        dispatch({type:MY_ORDERS_SUCCESS, payload:data.orders});
    }
    catch(error){
        dispatch({type:MY_ORDERS_FAIL, payload:error.response.data.error});
    }

};

// Get All Orders For Admin Dashboard 
export const adminAllOrders = () => async(dispatch) => {
    try{
        dispatch({type: ADMIN_ALL_ORDER_REQUEST});

        const { data } = await axios.get("http://localhost:5000/api/v1/order/admin/getallorders", {withCredentials:true});

        dispatch({type: ADMIN_ALL_ORDER_SUCCESS, payload:data.allorders});
    }
    catch(error){
        dispatch({type: ADMIN_ALL_ORDER_FAIL, payload:error.response.data.error});
    }

};

// Update User Order Status from Admin Dashboard
export const updateAdminOrder = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });

      const config = {headers: {"Content-Type": "application/json"}};
      
      const { data } = await axios.put(`http://localhost:5000/api/v1/order/admin/updateorder/${id}`,order, {withCredentials:true}, config);
  
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Delete Admin Order from Dashboard
  export const deleteAdminOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });
  
      const { data } = await axios.delete(`http://localhost:5000/api/v1/order/admin/deleteorder/${id}` , {withCredentials:true});
  
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get A Single Order Details
export const orderDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:ORDER_DETAILS_REQUEST});

        const { data } = await axios.get(`http://localhost:5000/api/v1/order/getaorder/${id}`, {withCredentials:true});

        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data.order});
    }
    catch(error){
        dispatch({type:ORDER_DETAILS_FAIL, payload:error.response.data.error});
    }

};

export const clearErrors = () => async(dispatch) => {
    dispatch({tyoe:CLEAR_ERRORS});  
};