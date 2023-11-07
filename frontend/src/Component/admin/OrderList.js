import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import "./productList.css";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, deleteAdminOrder, adminAllOrders} from "../../actions/orderAction";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from "./Sidebar";
import MetaData from '../Layout/MetaData';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error, orders} = useSelector(state => state.Orders);
  const {error:deleteError, isDeleted} = useSelector(state=> state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteAdminOrder(id));
  };

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
      alert.success("Ordee Status Has Been Deleted Successfully");
      navigate("/admin/orders");
      dispatch({type: DELETE_ORDER_RESET});
  }

  dispatch(adminAllOrders());
},[dispatch, alert, error, deleteError, isDeleted, navigate]);


  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth:300,
      flex: 1
    },
    {
      field: "status" ,
      headerName: "Status",
      minWidth:150,
      flex: 0.5,
      cellClassName: (params)=>{
        return(
          params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
        )
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth:150,
      flex: 0.4
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth:270,
      flex: 0.5
    },
    {
      field: "actions",
      headerName: "Action",
      type:"number",
      minWidth:150,
      flex:0.3,
      sortable:false,
      renderCell: (params)=>{
          return(
              <>
                  <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                      <EditIcon />
                  </Link>

                  <Button onClick={()=>{deleteOrderHandler(params.getValue(params.id, "id"))}}>
                      <DeleteIcon />
                  </Button>
              </>
          )
       }}
  ];


  const rows = [];

  orders && orders.forEach((item)=>{
      rows.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          amount: `Rs ${item.totalPrice/100}`,
          status: item.orderStatus
      });
  });

  return (
    <>
        <MetaData title="Admin -- Get All Orders" />

        <div className="dashboard">
            <SideBar />

            <div className="productListContainer">
                <h1 id='productListHeading'>ALL PRODUCTS</h1>

                <DataGrid rows={rows} 
                columns={columns} 
                pageSize={10}
                disableSelectionOnClick 
                className='productListTable' 
                autoHeight />
            </div>
        </div>
    </>
  )
}

export default OrderList