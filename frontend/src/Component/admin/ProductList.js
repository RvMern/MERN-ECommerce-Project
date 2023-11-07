import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import "./productList.css";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors,deleteAdminProduct, getAllProducts} from "../../actions/productAction";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from "./Sidebar";
import MetaData from '../Layout/MetaData';
import { ADMIN_PRODUCT_DELETE_RESET } from '../../constants/productConstants';

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {products , error} = useSelector(state => state.products);

    const {error:deleteError, isDeleted} = useSelector(state => state.deletedProduct);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Product Has Been Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({type: ADMIN_PRODUCT_DELETE_RESET});
        }
        dispatch(getAllProducts());
    },[dispatch, alert, error, deleteError, isDeleted, navigate])

    const deleteProduct = (id) => {
        dispatch(deleteAdminProduct(id));
    };

    const columns = [
        {field:"id", headerName:"Product ID", minWidth:200, flex:0.5},
        {field: "name", headerName: "Name", minWidth:350, flex:1},
        {field: "stock", headerName: "Stock", type:"number", minWidth:150, flex:0.3},
        {field: "price", headerName: "Price", type:"number", minWidth:270, flex:0.5},
        {field: "actions", headerName: "Action",
         type:"number", minWidth:150,
         flex:0.3, sortable:false,
         renderCell: (params)=>{
            return(
                <>
                    <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button onClick={()=>{deleteProduct(params.getValue(params.id, "id"))}}>
                        <DeleteIcon />
                    </Button>
                </>
            )
         }}
    ];

    const rows = [];

    products && products.forEach((item)=>{
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: `Rs ${item.price}`,
            name: item.name
        })
    })

  return (
    <>
        <MetaData title="Admin -- Get All Products" />
        <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
                <h1 id='productListHeading'>ALL PRODUCTS</h1>
                <DataGrid rows={rows} 
                columns={columns} pageSize={10}
                disableSelectionOnClick 
                className='productListTable' 
                autoHeight />
            </div>
        </div>
    </>
  )
}

export default ProductList