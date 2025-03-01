import axios from "axios";
import { createContext, useState } from "react";
export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numberfCartItems, setNumbersOfCart] = useState(0)
  const [cartId, setcartId] = useState('')

  const headers = {
    token: localStorage.getItem("token") || "",

  };
function CashOrder(data){
  console.log(data);
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,data,{headers}).then((response)=>{
    console.log(response.data);
    console.log(cartId);
   
    return response.data;
  }).catch((error)=>{
    console.log(error,"request faild");
    throw error;
  })

}
function onlinePayment(data){
  console.log(data);
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,data,{headers}).then((response)=>{
    console.log(response.data);
    console.log(cartId);
    return response.data;
  }).catch((error)=>{
    console.log(error,"request faild");
    throw error;
  })

}

  function addCart(id) {
    if (!headers.token) {
      
      alert("You must be logged in to add products to your cart." ,);
      
      return Promise.reject(new Error("Missing token"));
    }

    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id }, 
        { headers, } 
      )
      .then((response) => {
    
        if(response.data.status=="success"){
          setNumbersOfCart(response.data.numOfCartItems)
        }
        console.log("Product added to cart successfully:", response.data);
        return response.data;
      })
      .catch((err) => {
        if (err.response) {
          console.error("Server error:", err.response.data);
          alert(`Error: ${err.response.data.message || "Failed to add product to cart."}`);
        } else if (err.request) {
          console.error("Network error:", err.request);
          alert("Network error. Please check your connection.");
        } else {
          console.error("Unexpected error:", err.message);
          alert("An unexpected error occurred. Please try again.");
        }
        throw err; 
      });
     
  }
  function getCart() {


    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",
       
        { headers, } 
      )
      .then((response) => {
    
        console.log(response);
        setNumbersOfCart(response.data.numberfCartItems);
        setcartId(response.data.cartId)
        return response.data;
      })
      .catch((err) => {
        if (err.response) {
          console.error("Server error:", err.response.data);
        } else if (err.request) {
          console.error("Network error:", err.request);
          alert("Network error. Please check your connection.");
        } else {
          console.error("Unexpected error:", err.message);
          alert("An unexpected error occurred. Please try again.");
        }
        throw err; 
      });
     
  }
  function deleteProduct(_id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${_id}`,
      {headers,}
    ).then((response)=>{console.log(response);
    return response.data;
    }).catch((error)=>{
      console.log("error fetching data" , error);
      throw error; 
    })
    
  }
  function upDateCount(_id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${_id}`,
      {count},
    {headers}
    ).then((response)=>{console.log(response);
    return response.data;
    }).catch((error)=>{
      console.log("error fetching data" , error);
      throw error; 
    })
    
  }
  return (
    <CartContext.Provider value={{ addCart,numberfCartItems,setNumbersOfCart ,getCart,deleteProduct,upDateCount,CashOrder,onlinePayment}}>
      {children}
    </CartContext.Provider>
  );
}
