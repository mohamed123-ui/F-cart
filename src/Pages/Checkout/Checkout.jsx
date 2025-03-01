import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { CartContext } from '../../Components/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Checkout() {
    const option={
        position:"bottom-right",
    
      }
      const [errMsg, seterrMsg] = useState(null)
  const [loading, setloading] = useState(false)
const{CashOrder,onlinePayment}= useContext(CartContext)
const [isonline, setIsonline] = useState(false)
   const navigate= useNavigate()
    const initialValues = {
        details: "",
        phone: "",
        city: "",
      
      };
      async function handelApi(data) {
        try {
            console.log(isonline);
            
            if (isonline) {
                const res=await onlinePayment({ shippingAddress: data })
                console.log(res,"online requset");
                if(res.status == "success"){
                    toast.success('The order was sent successfully!',option);
                    window.location.href=res.session.url
                    }
                                  return  res;
            } else {
                const res = await CashOrder({ shippingAddress: data });
                console.log("تم إرسال الطلب بنجاح:", res);
                if(res.status == "success"){
                    toast.success('The order was sent successfully',option);
                    }
                navigate("/allorders")
                return res;

            }
        } catch (error) {
          console.error("حدث خطأ أثناء تنفيذ الطلب:", error);
          console.log("خطأ في مكون الـ Check Out");
          throw error; 
        }
      }
      
    const validationSchema=Yup.object({
        details:Yup.string().required(),
        phone:Yup.string().required(),
        city:Yup.string().required(),
    })
      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handelApi,
      });
  return (
    <section className="bg--50 py-5 dark:bg-gray-900 w-1/2 mx-auto shadow-lg my-7 p-5 bg-white">
    <h1 className="text-xl text-center flex justify-center items-center gap-3  mb-6 font-semibold">CheckOut <span className=' text-2xl'>
    <MdOutlineShoppingCartCheckout /></span> </h1>
    <form className="relative" onSubmit={formik.handleSubmit}>
      <div>
       {errMsg&& <div className="text-red-600 bg-red-200 py-2 rounded text-center" >{errMsg}</div>}
        <label
          htmlFor="details"
          className="block mb-2 text-xm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          Details
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="details"
          value={formik.values.details}
          id="details"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Your details"
        />
        {(formik.touched.details&&formik.errors.details)&& (
          <small className="text-red-600">{formik.errors.details}</small>
        )}
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-xm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          phone:
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          type="tel"
          name="phone"
          id="phone"
          value={formik.values.phone}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Your phone"
        />
            {(formik.touched.phone&&formik.errors.phone)&& (
          <small className="text-red-600">{formik.errors.phone}</small>
        )}
      </div>
      <div>
        <label
          htmlFor="city"
          className="block mb-2 text-xm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          city:
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          type="text"
          name="city"
          value={formik.values.city}
          id="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Your city"
        />
         {(formik.touched.city&&formik.errors.city)&& (
          <small className="text-red-600">{formik.errors.city}</small>
        )}
      </div>
 <div>
    <input type="checkbox" className='py-2 my-2' value={"online"} onChange={()=>{
        setIsonline(true)
    }} />
    <label htmlFor="online">OnLine Payment</label>
 </div>

 <button 
    type="submit"

className='btn w-full p-2 text-xl'>PayNow</button>

    </form>
  </section>
  )
}
