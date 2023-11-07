import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import MetaData from "../Layout/MetaData";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import "./MyProfile.css"

const MyProfile = () => {
    const navigate = useNavigate();
    const {loading, userData} = useSelector(state=>state?.user);

  useEffect(()=>{
    if(userData === null){
        navigate("/login");
    }
  },[userData,navigate])

  return (
    <>
        {loading ? <Loader/> : 
        <>
        <MetaData title = {`${userData?.name} --- Profile`} />
        <div className="profileContainer">
        <div>
            <h1>My Profile</h1>
            <img src={userData?.avatar?.url} alt={userData?.name} />
            <Link to="/user/update" >Edit Profile</Link>
        </div>
        <div>
            <div>
                <h4>Username: </h4>
                <p>{userData?.name}</p>
            </div>

            <div>
                <h4>Useremail: </h4>
                <p>{userData?.email}</p>
            </div>

            <div>
                <h4>Joined On: </h4>
                <p>{String(userData?.createdAt)?.substr(0,10)}</p>
            </div>

            <div>
                <Link to="/my/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
            </div>
        </div>
        </div>
        </>
    }
    </>
  )
}

export default MyProfile