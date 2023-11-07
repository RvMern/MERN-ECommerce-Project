import React,{useEffect,useState} from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Sidebar from './Sidebar';
import { ADMIN_PRODUCT_UPDATE_RESET} from '../../constants/productConstants';
import {clearErrors, updateAdminProduct, getProductDetails} from "../../actions/productAction";
import MetaData from '../Layout/MetaData';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import "./newProduct.css";
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error:updateError, isUpdated} = useSelector(state => state.deletedProduct);
    const {error, product} = useSelector(state=> state.productDetails);

    const alert = useAlert();
    const productID = useParams().id;

    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [Stock,setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ["Smartphone","Laptop","Smart TV", "Fiber"];

    useEffect(()=>{

        if(product && product._id !== productID){
            dispatch(getProductDetails(productID));
        }else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Product Has Been Updated Successfully");
            navigate("/admin/products");
            dispatch({type: ADMIN_PRODUCT_UPDATE_RESET});
        }
    },[dispatch,alert,error,isUpdated, updateError, navigate, productID, product])

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
            myForm.set("name",name);
            myForm.set("price",price);
            myForm.set("description",description);
            myForm.set("category",category);
            myForm.set("Stock",Stock);

        images.forEach((image)=>{
           myForm.append("images",image)
        });
        dispatch(updateAdminProduct(productID,myForm));

    };

        const updateProductImagesChange = (e) =>{
            const files = Array.from(e.target.files);
            setImages([]);
            setImagesPreview([]);
            setOldImages([]);

            files.forEach((file)=>{
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setImagesPreview((old) => [...old, reader.result]);
                        setImages((old) => [...old, reader.result]);
                    }
                };
                reader.readAsDataURL(file);
            });
        };


  return (
    <>
        <MetaData title="Admin -- Update Product"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='newProductContainer'>
                <form className='createProductForm' encType='multipart/form-data' onSubmit={updateProductSubmitHandler}>
                    <h1>Update Product</h1>
                    <div>
                        <SpellcheckIcon/>
                        <input type="text" 
                            placeholder='Product Name...'
                            required
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <AttachMoneyIcon/>
                        <input type="number" 
                            placeholder='Product Price...'
                            required
                            value={price}
                            onChange={(e)=> setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <DescriptionIcon/>
                        <textarea type="text" 
                            placeholder='Product Description...'
                            required
                            cols="30"
                            rows="1"
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div>
                        <AccountTreeIcon />
                        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                            <option>Choose Category</option>
                            {categories.map((cat) => {
                            return <option key={cat} value={cat}>{cat}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <StorageIcon />
                        <input type="number"
                            placeholder='Stock'
                            required
                            value={Stock}
                            onChange={(e)=> {setStock(e.target.value)}}
                         />
                    </div>

                    <div id='createProductFormFile'>
                        <input type="file"
                            name="avatar" 
                            accept='image/*' 
                            onChange={updateProductImagesChange}
                            multiple
                        />
                    </div>

                    <div id='createProductFormImage'>
                        {oldImages && oldImages.map((image, index)=>(
                             <img key={index} src={image.url} alt="Product Preview" />
                        ))}
                    </div>

                    <div id='createProductFormImage'>
                        {imagesPreview.map((image, index)=>(
                             <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button
                    id='createProductBtn'
                    type='submit'
                    disabled={loading ? true : false}>
                        Update Product
                    </Button>

                </form>
            </div>
        </div>
    </>
  )
}


export default UpdateProduct