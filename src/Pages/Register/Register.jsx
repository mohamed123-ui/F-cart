import { Formik, useFormik } from "formik";
import style from "./Register.module.css";
import { data, NavLink, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const [errMsg, seterrMsg] = useState(null)
  const [loading, setloading] = useState(false)
  
  const navigate=useNavigate()
  async function handelApi(data) {
    console.log(data);
    setloading(true)
axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data).then((response)=>console.log(response),
seterrMsg(null),
navigate("/login")
)
.catch((err)=>{
  seterrMsg(err.response.data.message)
setloading(false)

})
  }
  /*function validation(data) {
    let errors = {};
    console.log(data);
    const nameRegax = /^[A-Z][a-z]{1,15} $/;
    const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegax = /^[A-Za-z1-9]{1,8}$/;
    const phoneRegax = /^01[125]{0,9}$/;

    if (data.name === "") {
      errors.name = "name is requaird";
    } else if (!nameRegax.test(data.name)) {
      errors.name = " name must be start Capital Letter";
    }

    if (data.email === "") {
      errors.email = "email is requaird";
    } else if (!emailRegax.test(data.email)) {
      errors.name = "email must be start Capital Letter";
    }

    if (data.password === "") {
      errors.password = "password is requaird";
    } else if (!passwordRegax.test(data.email)) {
      errors.password = "password not invalide ";
    }

    if (data.repassword === "") {
      errors.repassword = "repassword is requaird";
    } else if (!data.rePassword == data.password) {
      errors.rePassword = "rePassword must be match paswword ";
    }

    if (data.phone === "") {
      errors.phone = "phone is requaird";
    } else if (!phoneRegax.test(data.email)) {
      errors.phone = "phone NOT invalide ";
    }
    console.log(formik);
    return errors;
    
  }
*/
const validationSchema=Yup.object({
  name:Yup.string().required().max(20).min(2),
  email:Yup.string().required().email(),
  password:Yup.string().required().matches(/^[A-Za-z\d]{8,20}$/,'password is not valide'),
  rePassword:Yup.string().required().oneOf([Yup.ref("password")],'rePassword not match')
})
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handelApi,
  });
  return (
  <div>
      <section className="bg--50 py-5 dark:bg-gray-900 w-1/2 mx-auto">
      <h1 className="text-xl text-center font-semibold"> Register Now </h1>
      <form className="relative shadow-xl p-6" onSubmit={formik.handleSubmit}>
        <div>
         {errMsg&& <div className="text-red-600 bg-red-200 py-2 rounded text-center" >{errMsg}</div>}
          <label
            htmlFor="name"
            className="block mb-2 text-xm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            name:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            value={formik.values.name}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Name"
          />
          {(formik.touched.name&&formik.errors.name)&& (
            <small className="text-red-600">{formik.errors.name}</small>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-xm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            email:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your email"
          />
              {(formik.touched.email&&formik.errors.email)&& (
            <small className="text-red-600">{formik.errors.email}</small>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-xm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            password:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            type="password"
            name="password"
            value={formik.values.password}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your password"
          />
           {(formik.touched.password&&formik.errors.password)&& (
            <small className="text-red-600">{formik.errors.password}</small>
          )}
        </div>
        <div>
          <label
            htmlFor="rePassword"
            className="block mb-2 text-xm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            rePassword:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your rePassword"
          />
            {(formik.touched.rePassword&&formik.errors.rePassword)&& (
            <small className="text-red-600">{formik.errors.rePassword}</small>
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
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

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
        {loading ? (
        <button
          type=""
          className="bg-blue-500 text-white transition-all ps-2 pe-2 disabled:bg-blue-300 pt-2 pb-2 rounded-lg mt-2 "

>loading...
          
        </button>):(
          
        <button
        type="submit"
        className="bg-blue-500 text-white transition-all ps-2 pe-2 disabled:bg-blue-300 pt-2 pb-2 rounded-lg mt-2 "
     disabled=  {!formik.isValid}
     >
        Register
      </button>
        )}

        <small className="ms-2">
          Already have Acount....{" "}
          <NavLink to={"/login"} className="hover:text-blue-500">
            {" "}
            Login
          </NavLink>{" "}
        </small>
      </form>
      
    </section>
    <Footer/> 
  </div>
  );
}
