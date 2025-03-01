import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Components/context/CartContext";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast } from "react-toastify";

export default function Cart() {
  const { getCart } = useContext(CartContext);
  const [cartdata, setCartdata] = useState(null);
  const { deleteProduct ,upDateCount} = useContext(CartContext);
const navigate=useNavigate();
  async function getCartDetails() {
    try {
      const res= await getCart();
      setCartdata(res.data);
      console.log(res ,"api");
      console.log("Cart data fetched:", res); 
      console.log("getCart function:", getCart);

    } catch (error) {
      console.error("Error fetching cart data:", error);
      alert("Failed to delete product. Please try again.");

    }
  }
  useEffect(() => {
    getCartDetails();
  }, []);
async function deleteCart(_id){
  
  try {
    console.log(
      "product id is",_id
    );
    
    const res=await deleteProduct(_id);
console.log(res.data);
setCartdata(res.data);
toast.success("Product Delted successfully ")
 getCartDetails();
  } catch (error) {
    console.log(error);
  }
  }
 async function updateCart(_id,count){
try {
  const res=await upDateCount(_id,count);
  console.log(res.data);
  console.log( _id,count);
  setCartdata(res.data);
} catch (error) {
  console.log(error,"cart not update");
}
  
}
  return (
    
    <div className=" sm:p-9 lg:py-5 lg:px-5  w-full">
      <div className="relative w-full overflow-x-auto container shadow-md sm:rounded-lg py-7">
        <h2 className="text-xl font-bold mb-4">My Cart</h2>

        {cartdata?.products && cartdata.products.length > 0 ? (
          
          <table className="w-full p-8 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">
{cartdata && cartdata.totalCartPrice !== undefined && (
  <h2 className="font-bold py-4">Total Price: <span>{cartdata.totalCartPrice} EGP</span></h2>
)}

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className= "sm:p-10 w-full lg:p-6 ">
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartdata.products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.name}
                    />
                    <p className="flex items-center gap-2">{product.product?.ratingsAverage} <FaStar className="text-yellow-200" /></p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product?.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button   onClick={() => updateCart(product._id, product.count - 1)}
  disabled={product.count <= 1} 
  className={`inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 
    ${product.count <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-100"} 
    border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-gray-200 
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 
    dark:hover:border-gray-600 dark:focus:ring-gray-700`}
  type="button"
>
                        <span className="sr-only">Decrease quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <p>{product.count}</p>
                      <button  onClick={()=>{updateCart(product.product._id,product.count +1)}}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Increase quantity

                        </span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4">
                    <a
                     onClick={()=>{deleteCart(product.product._id)}}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No products found in your cart.</p>
        )}
        <button  onClick={()=>{navigate("/checkout")}} className="btn w-full p-3 text-xl" >CheckOut</button>
      </div>
  <Footer />

    </div>
    
  );

}
