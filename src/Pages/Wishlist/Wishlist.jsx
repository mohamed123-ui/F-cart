import { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Components/context/WishlistContext';
import { FaHeart, FaStar } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { CartContext } from '../../Components/context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
export default function Wishlist(AddProductToCart) {
  
const{getLogedWislist,deleteWishList} =useContext(WishlistContext)
const [products, setProducts] = useState([])
const{addCart}=useContext(CartContext)
const navigate= useNavigate()
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
  async function getDetailsWishList() {
try {
  const res=await getLogedWislist();
  console.log(res);
  setProducts(res.data)
} catch (error) {
  console.log(error);
  
}
}  
async function deteteItem(_id) {
  try {
    const res=await deleteWishList(_id);
    console.log(res,"data dellted");
    toast.success("Product removed successfully to your wishlist ")
    setProducts(res.data)
  } catch (error) {
    console.log(error);
    
  }
  }  
useEffect(() => {
  
  getDetailsWishList();

 
}, [])

  return (
    <div>
         <Helmet>
       <meta
          name="description"
          content={products.description}
        />
        <title>wishlist </title>

        <meta
          name="keywords"
          content={`${products.title}, product details, ecommerce product`}
        />
        <meta property="og:title" content={products.title} />
        <meta
          property="og:description"
          content={products.description}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

<div className="relative overflow-x-auto py-8 w-full my-5">
  <h2 className='py-5 text-2xl font-thin flex justify-center items-center gap-2 '> My WishList <FaHeart /></h2>
  <table className=" w-full   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

    <thead className="w-full  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" className="px-6 py-3">
          Product Imge
        </th>
        <th scope="col" className="px-6 py-3">
          Product name
        </th>
        <th scope="col" className="px-6 py-3">
        ratingsAverage
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
        <th scope="col" className="px-6 py-3 text-red-600">
          REMOVE
        </th>
      </tr>
    </thead>
    <tbody className='w-full' >
{products.length>0? products.map((product)=>(
  <tr key={product._id} className="   bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
<img className='w-[200px]' src=  {product.imageCover} alt=        {product.category?.name} />

        </th>
        <td className="px-6 py-4">
        {product.category?.name}

        </td>
         <td className="px-6 py-4  ">
  <p className='flex justify-center items-center'>{product.ratingsAverage}
                    <FaStar className="text-yellow-200" />
  </p>
        </td>
        <td className="px-6 py-4">
         $ {product.price}
        </td>
        
         <td className="px-6 py-4 text-red-500 cursor-pointer">
         <button onClick={()=>{
          AddProductToCart(product._id)
         }} className="btn w-full p-2"> Add To Cart </button>
        </td>
        <td className="px-6 py-4 text-red-500 cursor-pointer">
 <button onClick={()=>{
  deteteItem(product._id)
 }} className="flex justify-center items-center gap-2">
 
 <MdDelete className='text-xl' />
  Remove


 </button>
        </td>
      </tr>
      
)):"not data found"}
    </tbody>
  
  </table>
  <button  onClick={()=>{navigate("/checkout")}} className="btn w-full  p-3 text-xl" >CheckOut</button>

</div>
  <Footer />

    </div>
  )
}