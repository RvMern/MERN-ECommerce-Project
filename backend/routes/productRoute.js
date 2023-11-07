const express = require('express');
const route = express.Router();
const {createProduct,getAllProducts,updateProduct,deleteProduct, getAProduct, productReview, getProductAllReviews, deleteProductReview, getAdminProducts} = require("../controller/productCtrl");
const {isAuthenticatedUser,isAdmin} = require('../middleware/auth');

route.post('/admin/createProduct',isAuthenticatedUser,isAdmin("admin"),createProduct);
route.get('/getAllProducts',getAllProducts);
route.get('/getAdminProducts',isAuthenticatedUser,isAdmin("admin"),getAdminProducts);

route.get('/getAProduct/:id',getAProduct);

route.put('/admin/updateProduct/:id',isAuthenticatedUser,isAdmin("admin"),updateProduct);
route.delete('/admin/deleteProduct/:id',isAuthenticatedUser,isAdmin("admin"),deleteProduct);

route.put("/productreview",isAuthenticatedUser,productReview)
route.get("/getproductallreviews",getProductAllReviews)
route.delete("/deleteproductreview",isAuthenticatedUser,deleteProductReview)


module.exports = route;