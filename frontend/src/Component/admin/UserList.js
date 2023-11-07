import React,{useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import "./productList.css";
import {useSelector,useDispatch} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from "./Sidebar";
import MetaData from '../Layout/MetaData';
import { adminDeleteAUser, adminGetAllUsers, clearErrors } from '../../actions/useraction';
import { DELETE_USER_RESET } from '../../constants/userConstants';


const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {users, error } = useSelector(state=>state.allUsers);
    const {isDeleted, error:deleteError} = useSelector(state => state.profile)

    const deleteUserHandler = (id) =>{
      dispatch(adminDeleteAUser(id));
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
          alert.success("User Has Been Deleted Successfully");
          navigate("/admin/users");
          dispatch({type:DELETE_USER_RESET});
        }
        dispatch(adminGetAllUsers());
    },[dispatch,alert,error,deleteError,isDeleted,navigate]);

    const columns = [
        {
          field: "id",
          headerName: "User ID",
          minWidth:180,
          flex: 0.8
        },
        {
            field: "name",
            headerName: "Name",
            minWidth:150,
            flex: 0.5
        },
        {
          field: "email" ,
          headerName: "Email",
          minWidth:200,
          flex: 1,
        },
        {
          field: "role",
          headerName: "Role",
          minWidth:150,
          flex: 0.3,
          cellClassName:(params)=>(
            params.getValue(params.id,"role") === "admin" ? "redColor" : "greenColor"
          )
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
                      <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                          <EditIcon />
                      </Link>
    
                      <Button onClick={()=>{deleteUserHandler(params.getValue(params.id,"id"))}} >
                          <DeleteIcon />
                      </Button>
                  </>
              )
           }}
      ];

    const rows = [];

    users && users.map((user)=>(
      rows.push({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      })
    ));



  return (
     <>
        <MetaData title="Admin -- Get All Users" />

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

export default UserList