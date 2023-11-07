import React, { useState } from 'react'
import "./Header.css";
import {SpeedDial, SpeedDialAction} from '@material-ui/lab';
import {Backdrop} from "@material-ui/core"
import {Dashboard, Person, ExitToApp, ListAlt, ShoppingCart, FindInPage} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../../actions/useraction";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';

const UserOptions = ({userData}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cartItems} = useSelector(state=> state?.cart);
  const [open, setOpen] = useState(false);
  const alert = useAlert();

  const iconOptions = [
    {icon: <ListAlt/>, name:"Orders", func: orders},
    {icon: <Person/>, name:"Profile",  func: account},
    {icon: <ShoppingCart  style={cartItems.length === 0 ? {color: "red"} : {color:"greenyellow"}}/> , name:`${cartItems.length}` , func:OpenCart},
    {icon: <ExitToApp/>, name:"Logout", func: logoutUser},
    {icon: <FindInPage/>, name:"Search", func: Search},
  ];
  
  if(userData?.role === "admin"){
    iconOptions.unshift({icon: <Dashboard/>, name:"Dashboard", func: dashboard })
  }
  
  function dashboard() {
    navigate('/admin/dashboard');
  };

  function orders() {
    navigate("/my/orders");
  };

  function OpenCart() {
    navigate('/cart');
  };

  function account() {
    navigate('/account');
  };

  function Search() {
    navigate('/search');
  };

  function logoutUser() {
    dispatch(logOutUser());
    alert.success("Logout Successfully");
    window.location.href = '/login';
  };

  return (
    <>
      <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
      ariaLabel='SpeedDial tootltip example'
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      direction='down'
      className='speedDial'
      open={open}
      icon={
        <img
        className='speedDialIcon'
        src={userData?.avatar?.url ? userData?.avatar?.url : "/Profile.png"}
        alt="Profile" 
        />
      }
    >

    {iconOptions && iconOptions.map(item=>{
      return <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item?.func} tooltipOpen={window.innerWidth <= 600 ? true : false } />
    })}

    </SpeedDial>
    </>
  )
}

export default UserOptions