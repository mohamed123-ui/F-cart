import axios from 'axios';
import React, { createContext, useState } from 'react'
 export const WishlistContext= createContext()
export default function WishlistContextProvider({children}) {
 const [wishlist, setWishlist] = useState(null)
const [numberOfWishlist, setNumberOfWishlist] = useState(0)
  const headers = {
    token: localStorage.getItem("token") || "",
  };
function AddWishlist(id){
return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
  { productId: id }, 
  { headers, } ).then((response)=>{
  console.log(response.data,"data");
  setWishlist(response.data)
  setNumberOfWishlist(response.data.count);

return response.data;
  
}).catch((error)=>{
  console.log(error ,"data faild");
  throw error;
})

}
function getLogedWislist(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
    { headers, } ).then((response)=>{
    console.log(response.data,"data");
    setNumberOfWishlist(response.data.count)
  return response.data;
    
  }).catch((error)=>{
    console.log(error ,"data faild");
    throw error;
  })
  
  }
  function deleteWishList(_id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${_id}`,
      { headers, } ).then((response)=>{
      console.log(response.data,"data");
  setNumberOfWishlist(response.data.count);
    return response.data;
    }).catch((error)=>{
      console.log(error ,"data faild");
      throw error;
    })
    
    }
  return (
< WishlistContext.Provider value={{AddWishlist,getLogedWislist,deleteWishList,numberOfWishlist,setNumberOfWishlist,setWishlist,wishlist}} >

{children}
</WishlistContext.Provider>  )
}
