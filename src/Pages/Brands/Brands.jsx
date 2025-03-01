import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer';

export default function Brands() {
    const [items, setItems] = useState([])
    function AllBrands(){

 axios.get('https://ecommerce.routemisr.com/api/v1/brands').then((response)=>{
    console.log(response.data);
    setItems(response.data.data)
 }).catch((error)=>{
    console.log(error ,"data faild");
 }
)
    }  
    useEffect(() => {
    
      AllBrands();
    }, [])
    
    return (
 <div className='container my-5 py-5 '>
    <div className="row">
        {items.length>0?items.map((item)=>(
<div className=' w-full p-4 md:w-1/2 lg:w-1/4 rounded-lg  shadow-lg '>
    <img className='w-full' src={item.image} alt="" />
<h4 className='text-center text-xl font-bold '>{item.name}</h4>
</div>
        )):"no data"}
    </div>
      <Footer />
    
 </div>
  )
}
