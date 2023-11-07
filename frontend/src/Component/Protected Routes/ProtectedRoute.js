import React from "react";
import { Navigate} from "react-router-dom";
import {useAlert} from 'react-alert';

export const OpenRoute = ({isAuthenticated, component:Component}) => {

  if(isAuthenticated){
    console.log(<Component/>)
    return <Component />;
  }
};

export const PrivateRoute = ({isAuthenticated, userData, component:Component}) => {
  const alert = useAlert();
  if(isAuthenticated){
      if(userData && userData.role === "admin"){
        return <Component />;
      }
      else{
        alert.error("You are not eligible for this feature")
        return <Navigate to="/account" />
      }
  }
};


