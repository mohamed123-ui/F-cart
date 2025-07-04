import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { CartContext } from '../context/CartContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const { productId } = useParams();
  const [details, setDetails] = useState({});
  const {addCart} = useContext(CartContext);

  async function AddProductToCart(id) {
    if (!id) {
      alert("Product ID is missing!");
      return;
    }
  
    try {
      const res = await addCart(id); // إرسال المنتج إلى السلة
      console.log("Product added to cart:", res);
      if(res.status == "success"){
      toast.success('Product added successfully to your cart!');
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart. Please try again."); 
      console.log(details.id);
      
    }
  }
  async function getProductDetails() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setDetails(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className='row my-16 min-h-[300px]'>
       <Helmet>
        <meta
          name="description"
          content={details.description}
        />
        <title>{details.title}</title>
        <meta
          name="keywords"
          content={`${details.title}, product details, ecommerce product`}
        />
        <meta property="og:title" content={details.title} />
        <meta
          property="og:description"
          content={details.description}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className=' w-full  md:w-1/4 '>
        {details.images?.length > 0 ? (
          <Slider {...settings}>
            {details.images.map((img, i) => (
              <img className='w-[150px] p-5 rounded-3xl' src={img} alt={`Product Image ${i}`} key={i} />
            ))}
          </Slider>
        ) : (<>
        
        <Loader />
          <p>No images available</p></>
        )}
      </div>
      <div className= 'sm:w-full  md:w-3/4'>

      {details.length}
        <div className="inner ">
          <h4 className='text-2xl font-semibold py-2'>{details.title}</h4>
          <p className='mb-2'>{details.description}</p>
          <h5>{details.category?.name}</h5>
          <div className='flex justify-between'>
            <h6>{details.price} EGP</h6>
            <span className='flex items-center'>
              <FaStar className="text-yellow-300 text-sm mr-1" />
              {details.ratingsAverage}
            </span>
          </div>
          <div className="btn p-1 text-xl my-2" onClick={() => AddProductToCart(details.id)}>
            Add To Cart
          </div>
        </div>
      </div>
    </div>
  )
  
}
