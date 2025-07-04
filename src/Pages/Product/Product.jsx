import axios from 'axios'
import syle from'./Product.module.css'
import { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { CartContext } from '../../Components/context/CartContext';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
export default function Product() {
 const{addCart}= useContext(CartContext)
  async function AddProductToCart(id) {
    const option={
      position:"bottom-right",
  
    }
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
      console.log(Product.id);
      
    }
  }
    
  const [products, setProducts] = useState([])
  function getAllProduct(){
    axios.get('https://ecommerce.routemisr.com/api/v1/products').then((response)=>{
      console.log(response.data);
      setProducts(response.data.data)
    }).catch((error)=>{
      console.log(error ,"requst faild");
    })
  }
  useEffect(() => {
    getAllProduct();
  
   
  }, [])
  
  return (
    <div>
   <Helmet>
        <meta
          name="description"
          content={products.description}
        />
        <title>AllProduct</title>
        <meta
          name="keywords"
          content={`${products.title}, product products, ecommerce product`}
        />
        <meta property="og:title" content={products.title} />
        <meta
          property="og:description"
          content={products.description}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className='row '>
      {products.length>0? products.map((Product)=>(
  <div className='w-full product p-2 md:w-1/2 lg:w-1/4 ' key={Product._id}> 
<img className="w-full" src={Product.imageCover} alt="product" />
<small className="text-green-500 ">{Product.category?.name}</small>
<div className='flex justify-between items-center'>
  <h5>
    Price :{Product.price}$
  </h5>
  <h6 className='flex justify-center items-center'>
    {Product.ratingsAverage}
                <FaStar className="text-yellow-300 text-sm mr-1" />
  </h6>
</div>
<button onClick={()=>{AddProductToCart(Product.id)}} className="btn p-2 text-xl bg-green-500 text-white rounded-md hover:bg-green-600">
          Add To Cart
        </button>
  </div>
)):"no data found"}
    </div>
          <Footer />
        
      </div>

  )
}
