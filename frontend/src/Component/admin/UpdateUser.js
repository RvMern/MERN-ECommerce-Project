import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Sidebar from './Sidebar';
import {clearErrors} from "../../actions/productAction";
import MetaData from '../Layout/MetaData';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Loader from "../Layout/Loader/Loader"

import { useAlert } from 'react-alert';
import "./newProduct.css";
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { useParams } from 'react-router-dom';
import { adminGetAUser, adminUpdateAUser } from '../../actions/useraction';

const UpdateUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error, user} = useSelector(state => state.userDetails);
    const {loading:updateLoading, error:updateError, isUpdated} = useSelector(state => state.profile)
    const alert = useAlert();

    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userID = useParams().id;

    useEffect(()=>{
        if(user && user._id !== userID){
            dispatch(adminGetAUser(userID));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        };

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            navigate("/admin/users");
            alert.success("User Has Been Updated Successfully");
            dispatch({type: UPDATE_USER_RESET});
        }
    },[dispatch,alert,error,isUpdated,updateError,user,userID,navigate])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
            myForm.set("name",name);
            myForm.set("email",email);
            myForm.set("role",role)

        dispatch(adminUpdateAUser(userID,myForm));

    };

  return (
    <>
        <MetaData title="Admin -- Update Users"/>
        {loading ? <Loader/> :
        <div className='dashboard'>
            <Sidebar/>
            <div className='newProductContainer'>
                <form className='createProductForm' encType='multipart/form-data' onSubmit={updateUserSubmitHandler}>
                    <h1>Update User</h1>
                    <div>
                        <PersonIcon/>
                        <input type="text" 
                            placeholder='Username...'
                            required
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <MailOutlineIcon />
                        <input type="email"
                            placeholder='Useremail'
                            required
                            value={email}
                            onChange={(e)=> {setEmail(e.target.value)}}
                         />
                    </div>

                    <div>
                        <VerifiedUserIcon/>
                        <select value={role} onChange={(e)=>{setRole(e.target.value)}} >
                            <option value="">Choose Role</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </div>

                    <Button
                    id='createProductBtn'
                    type='submit'
                    disabled={updateLoading ? true : false || role === "" ? true : false}>
                        Update User
                    </Button>

                </form>
            </div>
        </div>}
    </>
  )
}

export default UpdateUser