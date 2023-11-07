import React,{useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import "./reviewList.css";
import {useSelector,useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import {Star} from "@material-ui/icons"
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from "./Sidebar";
import MetaData from '../Layout/MetaData';
import { clearErrors } from '../../actions/useraction';
import { deleteReview, getAllReviews } from '../../actions/productAction';
import { REVIEW_DELETE_RESET } from '../../constants/productConstants';

const ReviewList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [productId,setProductId ] = useState("");
  const {error , reviews} = useSelector(state => state.allReviews);

  const {error:deleteError, isDeleted, loading} = useSelector(state => state.review);

  const productReviewSubmitHandler = (e) =>{
      e.preventDefault();
      dispatch(getAllReviews(productId));
  }

  const deleteReviewHandler = (id) =>{
    dispatch(deleteReview(id,productId));
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
        alert.success("Review Has Been Deleted Successfully");
        navigate("/admin/reviews");
        dispatch({type:REVIEW_DELETE_RESET});
      }
  },[dispatch ,alert, isDeleted, deleteError, error, navigate]);

  const columns = [
      {
        field: "id",
        headerName: "Review ID",
        minWidth:200,
        flex: 0.5
      },
      {
          field: "name",
          headerName: "Username",
          minWidth:200,
          flex: 0.6
      },
      {
        field: "comment" ,
        headerName: "Comment",
        minWidth:350,
        flex: 1,
      },
      {
        field: "rating",
        headerName: "Rating",
        minWidth:180,
        flex: 0.4,
        cellClassName:(params)=>(
          params.getValue(params.id,"rating") <= 3 ? "redColor" : "greenColor"
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
                    <Button onClick={()=>{deleteReviewHandler(params.getValue(params.id,"id"))}} >
                        <DeleteIcon />
                    </Button>
                </>
            )
         }}
    ];

  const rows = [];
  
  reviews && reviews.forEach((rev)=>{
    rows.push({
      id:rev._id,
      name:rev.name,
      rating:rev.rating,
      comment:rev.comment
    });
  })

return (
   <>
      <MetaData title="Admin -- Get All Reviews" />

      <div className="dashboard">
          <SideBar />

          <div className="productReviewsContainer">
              <form className='productReviewsForm' encType='multipart/form-data' onSubmit={productReviewSubmitHandler}>
                    <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>
                    <div>
                        <Star />
                        <input type="text" 
                            placeholder='Enter ProductID...'
                            required
                            value={productId}
                            onChange={(e)=> setProductId(e.target.value)}
                        />
                    </div>

                    <Button
                    id='createProductBtn'
                    type='submit'
                    disabled={loading ? true : false || productId === "" ? true : false}>
                        SUBMIT
                    </Button>

                </form>

              {reviews && reviews.length > 0 ? 
              <DataGrid rows={rows} 
              columns={columns} 
              pageSize={10}
              disableSelectionOnClick 
              className='productListTable' 
              autoHeight />
              :
              <h1 className='productReviewFormHeading'>No Reviews Found</h1>
              }
            
          </div>
      </div>
    </>
  )
}

export default ReviewList