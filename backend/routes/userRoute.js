const express = require('express');
const { createUser, userLogin, userLogout, forgotPassword, resetPassword, getUserProfile, userUpdatedPassword, userDetailsUpdate, getAllUsers, getAUser, updateAUser, deleteAUser } = require('../controller/userCtrl');
const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

const route = express.Router();

route.get("/userProfile",isAuthenticatedUser, getUserProfile);
route.post("/register",createUser);
route.post("/login",userLogin);
route.post("/forgotpassword",forgotPassword);
route.put("/forgotpassword/:token",resetPassword);
route.put("/updatepassword",isAuthenticatedUser, userUpdatedPassword);
route.put("/updateuserdetails",isAuthenticatedUser, userDetailsUpdate);
route.get("/logout",userLogout);

route.get("/admin/getallusers",isAuthenticatedUser, isAdmin("admin") ,getAllUsers);
route.get("/admin/getauser/:id",isAuthenticatedUser, isAdmin("admin") ,getAUser);
route.put("/admin/updateauser/:id",isAuthenticatedUser, isAdmin("admin") ,updateAUser);
route.delete("/admin/deleteauser/:id",isAuthenticatedUser, isAdmin("admin") ,deleteAUser);




module.exports = route;