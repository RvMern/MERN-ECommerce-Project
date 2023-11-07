import React, { useState } from 'react'
import "./Search.css"
import MetaData from "../Layout/MetaData"
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate();
    const [keyword,setKeyword] = useState("");

    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate(`/products`);
        }
    }

  return (
    <>
        <MetaData title="Search Your Favourite Products Here" />
        <form className='searchBox' onSubmit={searchSubmitHandler} >
            <input type="text" 
             placeholder='Search Products Here...' 
             onChange={(e)=>setKeyword(e.target.value)}
            />        
            <input type="submit" value="Search" />
        </form>
    </>
  )
}

export default Search