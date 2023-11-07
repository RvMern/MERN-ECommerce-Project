import React,{useState, useEffect} from 'react';
import Loader from '../Layout/Loader/Loader'
import MetaData from "../Layout/MetaData";
import "./ResetPassword.css";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, resetPassword} from "../../actions/useraction";
import {useAlert} from "react-alert"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import {useNavigate, useParams} from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const token = useParams().token
    const {error, success, loading} = useSelector(state=>state?.forgotPassword);
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token,myForm));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Profile Updated Successfully");
            navigate("/login");
        }

    },[dispatch,alert,error, success,navigate])


    return (
        <>
            {
                loading ? <Loader/> : <>
                    <MetaData title="Reset Password" />
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>
                        <h2 className='resetPasswordHeading'>Reset Password</h2>
                        <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>

                        <div className='signUpPassword'>
                            <LockOpenIcon />
                            <input type="password"
                            placeholder='Password'
                            required
                            name='newpassword'
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>

                        <div className='signUpPassword'>
                            <LockIcon />
                            <input type="password"
                            placeholder='Confirm Password'
                            required
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                            />
                        </div>
    
                        <input type="submit" value="RESET" className='resetPasswordBtn' />
                        </form>
                        </div>
                    </div>
                </>
            }
        </>
      )
}

export default ResetPassword