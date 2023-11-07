import React, { useEffect } from 'react';
import {DataGrid} from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography"
import "./myOrders.css";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors, myOrders} from "../../actions/orderAction";
// import Loader from "../Layout/Loader/Loader";
import {Link} from "react-router-dom";
import MetaData from "../../Component/Layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {

  const {error, orders} = useSelector(state => state.myOrders);
  const {userData} = useSelector(state=> state?.user);
  const dispatch = useDispatch();

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth:150,
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
      minWidth:150,
      flex: 0.5
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      type: "number",
      minWidth:150,
      sortable: false,
      renderCell: (params)=>{
        return(
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        )
      }
    }
  ];
  const rows = [];

  orders && orders.forEach((item,index)=>{
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice/100

      })
  })

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  },[dispatch,error])


  return (
   <>
    <MetaData title={`${userData?.name} -- View Placed Orders`} />
  
    <Typography id="myOrdersHeading">{userData?.name} Orders</Typography>
    {orders && orders.length < 1 ?
      <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center"}}>
        <h1 style={{}}>No Orders</h1>
      </div> :
    <div className='myOrdersPage'>
        <DataGrid 
        rows={rows} columns={columns} 
        pageSize={10} 
        disableSelectionOnClick
        className="myOrdersTable"
        autoHeight
      />
    </div>
    }

   </>
  )
}

export default MyOrders