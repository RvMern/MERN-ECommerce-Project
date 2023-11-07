const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncError = require("../middleware/asyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');

// Create A Product
const createProduct = AsyncError(
    async(req, res,next) =>{

        let images = [];
        if(typeof(req.body.images) === "string"){
            images.push(req.body.images)
        }
        else{
            images = req.body.images;
        }

        const imagesLinks = [];
        for(let i=0; i< images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder: "products"
            });
            imagesLinks.push({
                public_id: result.public_id,
                url:result.secure_url
            });
        }

        req.body.images = imagesLinks;
        req.body.user = req.user.id;
        
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
});

// Get All Products
const getAllProducts = AsyncError(async(req,res,next) =>{

    const productPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(productPerPage)

   const products = await apiFeature.query;
    const filterCount = await products.length;
    res.status(200).json({
        success:true,
        products,
        productCount,
        productPerPage,
        filterCount
    });
});

// Get All Products For Admin Dashboard
const getAdminProducts = AsyncError(async(req,res,next) =>{

    const products = await Product.find();
    if(!products){
        return next(new ErrorHandler("Products Not Found",404));
    };
    res.status(200).json({
        success:true,
        products
    });
});

// Get A Product
const getAProduct = AsyncError(async(req,res,next) =>{
    const getaproduct = await Product.findById(req.params.id);

    if(!getaproduct){
        return next(new ErrorHandler("Product Not Found",404));
    };

    let prodCategory = getaproduct.category;

    let relatedProd = [];
    relatedProd = await Product.find({category: prodCategory});

    const relatedProducts = relatedProd.filter((item)=>{
        return item._id.toString() !== getaproduct._id.toString();
    })

    res.status(200).json({
        success:true,
        getaproduct,
        relatedProducts
    });
});

// Update A Product For Admin Dashboard
const updateProduct = AsyncError(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    };

        let images = [];

        if(typeof(req.body.images) === "string"){
            images.push(req.body.images);
        }
        else{
            images = req.body.images;
        }

        if(images !== undefined){
            for(let i = 0; i < product.images.length; i++){
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imagesLinks = [];
            for(let i=0; i< images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder: "products"
            });
            imagesLinks.push({
                public_id: result.public_id,
                url:result.secure_url
            });
            }
            req.body.images = imagesLinks;
        };

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true, runValidators:true,useFindAndModify:false});
    
    res.status(200).json({
        success:true,
        message:"Product Updated Successfully",
        product
    })
});


// Delete A Product
const deleteProduct = AsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    };

    for(let i =0; i < product.images.length; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.findByIdAndDelete(product);
    
    res.status(200).json({
        success:true,
        message:"Product has been deleted successfully",
    })
});

// Product Review
const productReview = AsyncError(async(req,res,next)=>{
    const {rating,comment,productID} = req.body;
    const review = {
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product = await Product.findById(productID);

    const isReviewed = product.reviews.find(rev =>  (rev.user.toString() === req.user._id.toString()));

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev=> {avg += rev.rating});
    product.ratings = avg/product.reviews.length;
    
    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
        message:"Rating Has Been Given Successfully"
    });
});

// Get A Single Product All Reviews
const getProductAllReviews = AsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    };
    const productAllReviews = product.reviews;
    res.status(200).json({
        success:true,
        productAllReviews
    });
});


// Delete A Product Review
const deleteProductReview = AsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    const reviews = product.reviews.filter(
        (rev) => (rev._id.toString() !== req.query.id.toString())
    );
    

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    }); 

    let ratings = 0;
    if(reviews.length === 0){
        ratings = 0;
    }
    else{
        ratings = avg/reviews.length;
    }
        
    const numOfReviews = reviews?.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {reviews, ratings, numOfReviews},
        {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        message: "Review has been deleted successfully"
    });
});


module.exports = {
createProduct,
getAllProducts,
updateProduct,
deleteProduct,
getAProduct,
productReview,
getProductAllReviews,
deleteProductReview,
getAdminProducts
};