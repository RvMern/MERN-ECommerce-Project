import React,{useEffect, useState} from 'react'
import Loader from '../Layout/Loader/Loader'
import MetaData from "../Layout/MetaData";
import "./updatePassword.css";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, updatePassword} from "../../actions/useraction";
import {useAlert} from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from 'react-router-dom';


const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, isUpdated, loading} = useSelector(state=>state?.profile);
    const [oldpassword , setOldPassword] = useState("");
    const [newpassword , setNewPassword] = useState("");
    const [confirmnewpassword , setConfirmNewPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldpassword", oldpassword);
        myForm.set("newpassword", newpassword);
        myForm.set("confirmnewpassword", confirmnewpassword);

        dispatch(updatePassword(myForm));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Profile Updated Successfully");
            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }

    },[dispatch,alert,error,isUpdated,navigate])


    return (
        <>
            {
                loading ? <Loader/> : <>
                    <MetaData title="Update Password" />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
                        <h2 className='updatePasswordHeading'>Update Password</h2>
                        <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>


                        <div className='signUpPassword'>
                            <VpnKeyIcon />
                            <input type="password"
                            placeholder='Old Password'
                            required
                            name='oldpassword'
                            value={oldpassword}
                            onChange={(e)=>{setOldPassword(e.target.value)}}
                            />
                        </div>

                        <div className='signUpPassword'>
                            <LockOpenIcon />
                            <input type="password"
                            placeholder='New Password'
                            required
                            name='newpassword'
                            value={newpassword}
                            onChange={(e)=>{setNewPassword(e.target.value)}}
                            />
                        </div>

                        <div className='signUpPassword'>
                            <LockIcon />
                            <input type="password"
                            placeholder='Confirm New Password'
                            required
                            name='confirmnewpassword'
                            value={confirmnewpassword}
                            onChange={(e)=>{setConfirmNewPassword(e.target.value)}}
                            />
                        </div>
    
                        <input type="submit" value="NEW PASSWORD" className='updatePasswordBtn' />
                        </form>
                        </div>
                    </div>
                </>
            }
        </>
      )
}

export default UpdatePassword