import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from '@material-ui/core';
import {Link, Navigate} from "react-router-dom";
import {Doughnut,Line} from "react-chartjs-2";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../actions/productAction.js";
import {adminAllOrders} from "../../actions/orderAction.js";
import { adminGetAllUsers } from '../../actions/useraction.js';

const Dashboard = () => {
  const dispatch  = useDispatch();
  const {products} = useSelector(state => state?.products);
  const {orders} = useSelector(state => state?.Orders);
  const {users} = useSelector(state => state?.allUsers);

  useEffect(()=>{
    dispatch(getAllProducts());
    dispatch(adminAllOrders());
    dispatch(adminGetAllUsers());
  },[dispatch])


  let outOfStock = 0;
  products && products.forEach((item)=>{
    if(item.Stock === 0){
      return (outOfStock += 1);
    }
  });

  let totalEarning = 0;
  orders && orders.forEach((item) =>(
    totalEarning += (item.totalPrice/100)
  ));

  const lineState = {
    labels:["Initial Amount", "Amount Earned"],
    datasets: [
      { 
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data:[0, totalEarning]
      },
    ],
  };  

  const doughnutState = {
    labels:["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock]
      }
    ]
  };

  return (
    <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer'>
            <Typography component="h1">Dashboard</Typography>

            <div className='dashboardSummary'>
                <div>
                  <p>Total Amount <br/> &#8377; {totalEarning}</p>
                </div>

                <div className='dashboardSummaryBox2'>
                  <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                  </Link>

                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                  </Link>

                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
                  </Link>
                </div>
            </div>

          <div className="lineChart">
              <Line data={lineState} />
          </div>

          <div className="doughnutChart">
              <Doughnut data={doughnutState} />
          </div>
        </div>
    </div>
  )
}

export default Dashboard