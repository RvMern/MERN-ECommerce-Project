import axios from "axios";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST,
    CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL} from "../constants/userConstants"

// User Login Action
export const userLogin = (email,password) => async (dispatch) => {
    try{
        dispatch({type:LOGIN_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.post(`http://localhost:5000/api/v1/user/login`,{email,password},{withCredentials:true},config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    }
    catch(error){
        dispatch({
           type:LOGIN_FAIL,
           payload:error.response.data.error
        })
    }
};

// User SignUp Action
export const userSignUp = (userData) => async (dispatch) => {
    try{
        dispatch({type:REGISTER_USER_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}}

        const {data} = await axios.post(`http://localhost:5000/api/v1/user/register`,userData,{withCredentials:true},config);

        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user
        })
    }
    catch(error){
        dispatch({
           type:REGISTER_USER_FAIL,
           payload: error.response.data.error
        })
    }
};

// Load User Action
export const loadUser = () => async (dispatch) => {
    try{
        dispatch({type:LOAD_USER_REQUEST});

        const {data} = await axios.get(`http://localhost:5000/api/v1/user/userProfile`,{withCredentials:true});

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.userProfile
        })
    }
    catch(error){
        dispatch({
           type:LOAD_USER_FAIL,
           payload: error.response.data.error
        })
    }
};

// Logout User Action
export const logOutUser = () => async (dispatch) => {
    try{
        const {data} = await axios.get(`http://localhost:5000/api/v1/user/logout`,{withCredentials:true});

        dispatch({
            type:LOGOUT_SUCCESS,
        })
    }
    catch(error){
        dispatch({
           type:LOGOUT_FAIL,
           payload: error.response.data.error
        })
    }
};

// Upadte User Details Action
export const updateProfile = (userData) => async (dispatch) => {
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}}

        const {data} = await axios.put(`http://localhost:5000/api/v1/user/updateuserdetails`,userData,{withCredentials:true},config);

        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type:UPDATE_PROFILE_FAIL,
           payload:error.response.data.message
        })
    }
};

// Update User Password Action
export const updatePassword = (passwords) => async (dispatch) => {
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.put(`http://localhost:5000/api/v1/user/updatepassword`,passwords,{withCredentials:true},config);

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type:UPDATE_PASSWORD_FAIL,
           payload: error.response.data.error
        })
    }
};

// Forgot Password Action
export const forgotPassword = (email) => async (dispatch) => {
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.post(`http://localhost:5000/api/v1/user/forgotpassword`,email,{withCredentials:true},config);

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })
    }
    catch(error){
        dispatch({
           type:FORGOT_PASSWORD_FAIL,
           payload: error.response.data.error
        })
    }
};

// Reset Password Action
export const resetPassword = (token,passwords) => async (dispatch) => {
    try{
        dispatch({type:RESET_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.put(`http://localhost:5000/api/v1/user/forgotpassword/${token}`,passwords,{withCredentials:true},config);

        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type:RESET_PASSWORD_FAIL,
           payload: error.response.data.error
        })
    }
};

// Get All Users for Admin Dashboard Action
export const adminGetAllUsers = () => async (dispatch) => {
    try{
        dispatch({type:ALL_USER_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/v1/user/admin/getallusers`,{withCredentials:true});

        dispatch({
            type:ALL_USER_SUCCESS,
            payload:data.allUsersDetails
        })
    }
    catch(error){
        dispatch({
           type:ALL_USER_FAIL,
           payload: error.response.data.error
        })
    }
};

// Get A Single User Action
export const adminGetAUser = (id) => async (dispatch) => {
    try{
        dispatch({type:USER_DETAILS_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/v1/user/admin/getauser/${id}`,{withCredentials:true});

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data.userDetail
        })
    }
    catch(error){
        dispatch({
           type:USER_DETAILS_FAIL,
           payload: error.response.data.error
        })
    }
};

// Update A User Action
export const adminUpdateAUser = (id,userData) => async (dispatch) => {
    try{
        dispatch({type:UPDATE_USER_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.put(`http://localhost:5000/api/v1/user/admin/updateauser/${id}`,userData,{withCredentials:true},config);

        dispatch({
            type:UPDATE_USER_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type:UPDATE_USER_FAIL,
           payload: error.response.data.error
        })
    }
};

// Delete User Action
export const adminDeleteAUser = (id) => async (dispatch) => {
    try{
        dispatch({type:DELETE_USER_REQUEST})

        const {data} = await axios.delete(`http://localhost:5000/api/v1/user/admin/deleteauser/${id}`,{withCredentials:true});

        dispatch({
            type:DELETE_USER_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
           type:DELETE_USER_FAIL,
           payload: error.response.data.error
        })
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};