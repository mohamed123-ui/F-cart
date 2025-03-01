import { FaStar } from "react-icons/fa6";
import style from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function ProductItem({ product = {} ,AddProductToCart,AddWishlistItem}) {
  
  return (
    <div  className="inner  py-4 px-4 hover:border-green-500 border">
      <Link to={`/ProductDetails/${product.id}`}>
      <img className="w-full" src={product.imageCover} alt="product" />
      <small className="text-green-500">{product.category?.name}</small>
      <h5 className="font-semibold">
        {product.title ? product.title.split(" ").slice(0, 3).join(" ") : ""}
      </h5>
        <div className="price flex justify-between">
          <h6>{product.price} EGP</h6>
          <div className="flex items-center">
            <FaStar className="text-yellow-300 text-sm mr-1" />
            <span>{product.ratingsAverage}</span>
          </div>
        </div>
        </Link>
        <button onClick={()=>{AddProductToCart(product.id)}} className="btn p-2 text-xl bg-green-500 text-white rounded-md hover:bg-green-600">
          Add To Cart

        </button>
       <button onClick={()=>{AddWishlistItem(product.id)}} >
       <FaHeart  className="star"/>
       </button>
      </div>
  );
}
