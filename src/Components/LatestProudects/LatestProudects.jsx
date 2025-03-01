import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { WishlistContext } from '../context/WishlistContext';
export default function LatestProudects() {
  const [product, setProduct] = useState([])
    const {addCart} = useContext(CartContext);
const  { AddWishlist } =useContext(WishlistContext)

  const option={
    position:"bottom-right",


  }
  async function AddWishlistItem(id){
    try {
      if (!AddWishlist) {
        throw new Error("AddWishlist function is not available in context!");
      }
      
      const res = await AddWishlist(id);
      console.log(id);
      console.log(res.data ,"product added succ in wishlist");
      toast.success('Product added successfully to your WishList !',option);
    } catch (error) {
      console.log(error , "Failed to add product to wishlist");
    }
    
    }
 async function getProduct(){
 await axios.get('https://ecommerce.routemisr.com/api/v1/products',).then((response)=>{
  setProduct  (response.data.data);
  }).catch((err)=>{
console.log(err);

  })

}
useEffect(() => {
  getProduct();
}, [])
async function AddProductToCart(id) {
  if (!id) {
    alert("Product ID is missing!");
    return;
  }

  try {
    const res = await addCart(id); // إرسال المنتج إلى السلة
    console.log("Product added to cart:", res);
    if(res.status == "success"){
      toast.success('Product added successfully to your cart!',option);
      }
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    alert("Failed to add product to cart. Please try again."); 
    console.log(product.id);
    
  }
}
  
  //https://ecommerce.routemisr.com/api/v1/auth/signin'
  return (
    <div className='row justify-center'>
{product.length>0?
 product.map((product)=> (
  <div key={product.id} className='w-full md:w-1/2 l:w-1/3 xl:w-1/5 product  ' >
<ProductItem product={product} AddProductToCart={AddProductToCart} AddWishlistItem={AddWishlistItem}  />
  </div>
)
 
):
<Loader />
}
    </div>
  )
}