import Slider from 'react-slick';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [categories, setCategory] = useState([])
async function getCategory(){
  await axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((response)=>{
    setCategory(response.data.data);    
  }).catch((err)=>{
    console.log(err);
  })
}
useEffect(() => {
  getCategory();
}, [])

  return (
    <div className='my-6 mx-10 '>
          <Slider {...settings}>
    {categories.map((category)=> (
      <div key={category._id} className=''>
<img src={ category.image} className=' h-[300px]' alt={category.name} />
<h3 className='text-center font-semibold'>{category.name} </h3>
      </div>
    ))}
    </Slider> </div>

  );
}

