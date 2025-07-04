import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../Components/context/TokenContext";
import { NavLink } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Helmet } from "react-helmet";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [errMsg, seterrMsg] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(tokenContext);

  async function handelApi(data) {
    console.log("Data being sent to the server:", data); 
    setloading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
      .then((response) => {
        console.log("Response from the server:", response); 
       setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        seterrMsg(null);
        setloading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log("Full error response:", err.response); 
        seterrMsg(err.response?.data?.message || "An error occurred during login.");
        
        setloading(false);
      });
  }
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required").matches(/^[A-Za-z\d]{8,20}$/, "Password must be 8-20 characters and contain only letters and numbers"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handelApi,
  });

  return (
    <div>
       <Helmet>
        <title>Login </title>
        <meta
          name="description"
          content="Log in to you account to view your orders, cart, and personal settings."
        />
        <meta
          name="keywords"
          content="login, sign in, ecommerce login, user login"
        />
        <meta property="og:title" content="Login to Your Account" />
        <meta
          property="og:description"
          content="Access your personal dashboard and continue shopping o."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

 <section className="bg-gray-50 w-full py-10 my-9 px-6 min-h-full dark:bg-gray-900 lg:w-1/2 mx-auto shadow-lg">
      <h1 className="text-xl text-center font-bold">Login Now</h1>
      <form className="relative" onSubmit={formik.handleSubmit}>
        {errMsg && <div className="text-red-600 bg-red-200 py-2 rounded text-center">{errMsg}</div>}

        <div className="w-full">
          <label htmlFor="email" className="block mb-2 text-xm font-medium text-gray-900 dark:text-white">Email:</label>
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
          {(formik.touched.email && formik.errors.email) && (
            <small className="text-red-600">{formik.errors.email}</small>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-xm font-medium text-gray-900 dark:text-white">Password:</label>
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
          {(formik.touched.password && formik.errors.password) && (
            <small className="text-red-600">{formik.errors.password}</small>
          )}
        </div>

        {loading ? (
          <button type="button" className="bg-blue-500 text-white transition-all ps-2 pe-2 disabled:bg-blue-300 pt-2 pb-2 rounded-lg mt-2" disabled>
            Loading...
          </button>
        ) : (
          <>
           <button type="submit" className="bg-blue-500 text-white transition-all ps-2 pe-2 disabled:bg-blue-300 pt-2 pb-2 rounded-lg mt-2" disabled={!formik.isValid}>
            Login
            
          </button>
           <div className="flex justify-between items-center">
           <small className="ms-2 ">
            {" "}
             <NavLink to={"/Register"} className="hover:text-blue-500 ">Register ?</NavLink>
            
           </small>
           <NavLink to={"/forgotpassword"} className="hover:text-green-400 cursor-pointer border-b">
           Forgot Password
           </NavLink>
           </div>
          </>
         
         
        )}

      
      </form>
      
    </section>
  <Footer />
    </div>
   
  );
}