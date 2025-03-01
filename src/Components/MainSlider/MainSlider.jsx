import Slider from "react-slick";
import imge1 from "../../assets/slider-image-1.jpeg"
import imge2 from "../../assets/slider-image-2.jpeg"
import imge3 from "../../assets/slider-image-3.jpeg"


export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
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
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  return (
<div className="row w-full flex-wrap ">
  <div className="w-3/4">
<Slider {...settings}>
<div>
<img className="w-full h-[500px]" src={imge1} alt="" />
</div>
  <div className="w-1/4">
    <img  className="w-full h-[500px]" src={imge2} alt="" />
  </div>
  <div className="w-1/4">
    <img  className="w-full h-[500px]" src={imge3} alt="" />
  </div>
  </Slider>
</div>
<div className="w-1/4 ">
<img src={imge2} className=" h-[250px]" alt="" />
<div>
<img src={imge3} className=" h-[250px]"  alt="" />
</div>

</div>
</div>

  )
}
