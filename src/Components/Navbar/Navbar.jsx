import style from './Navbar.module.css';
import freshcart from '../../assets/freshcart-logo.svg';
import { FaFacebook, FaHeart, FaInstagram, FaLinkedin, FaShoppingCart, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { data, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { tokenContext } from '../context/TokenContext';
import { CartContext } from '../context/CartContext';
import { FaSquareInstagram } from 'react-icons/fa6';
import { WishlistContext } from '../context/WishlistContext';

export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const {  numberfCartItems } = useContext(CartContext);
  const{numberOfWishlist}=useContext(WishlistContext)

const navigate= useNavigate()
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login")
  }

  return (
<nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
        aria-hidden="true"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>

    <div className="hidden flex-col md:flex md:flex-row w-full md:w-auto md:items-center" id="navbar-default">
      <div className="flex flex-col md:flex-row w-full justify-between gap-11 items-center">
        {token ? (
          <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-1/2">
            <NavLink to={"/"}>
              <img src={freshcart} alt="freshcart" />
            </NavLink>
            <ul className="flex flex-col md:flex-row gap-6 mt-4 md:mt-0">
              <li className="list-none">
                <NavLink
                  to={"/"}
                  className="block py-2 px-3 text-xl font-semibold text-gray-900 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                >
                  Home
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to={"/Product"}
                  className="block py-2 px-3 text-xl font-semibold text-gray-900 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                >
                  Products
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to={"/Categories"}
                  className="block py-2 px-3 text-xl font-semibold text-gray-900 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                >
                  Categories
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to={"/brands"}
                  className="block py-2 px-3 text-xl font-semibold text-gray-900 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          </div>
        ) : ""}

        <div className="w-full md:w-auto">
          <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token ? (
              <>
                <li className="list-none">
                  <NavLink
                    to={"/Cart"}
                    className="relative py-2 px-3 flex font-semibold text-gray-900 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                  >
                    <p className='absolute w-5 h-5 rounded-full -top-3 right-1'>{numberfCartItems}</p>
                    <FaShoppingCart className='text-xl top-0 right-2' />
                  </NavLink>
                </li>
                <NavLink
                  to={"/wishlist"}
                  className="relative py-2 px-3 flex font-semibold text-gray-900 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                >
                  <p className='absolute -top-3 right-1'>{numberOfWishlist}</p>
                  <FaHeart className='text-xl top-0 right-2' />
                </NavLink>
                <li>
                  <a href="#"><FaTwitter /></a>
                </li>
                <li>
                  <span
                    onClick={logOut}
                    className="block py-2 px-3 cursor-pointer text-gray-400 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white"
                  >
                    LogOut
                  </span>
                </li>
              </>
            ) : (
              <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-96 items-center w-full'>
                <div className="flex flex-col md:flex-row gap-5">
                  <li>
                    <NavLink
                      to={"Login"}
                      className="block py-2 px-3 text-gray-400 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                    >
                      LogIn
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"Register"}
                      className="block py-2 px-3 text-gray-400 hover:bg-gray-100 md:hover:text-green-500 dark:text-white"
                    >
                      Register
                    </NavLink>
                  </li>
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                  <li>
                    <a href="#" className="text-gray-900 md:hover:text-green-500 dark:text-white">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-900 md:hover:text-green-500 dark:text-white">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-900 md:hover:text-green-500 dark:text-white">
                      <FaTiktok />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-900 md:hover:text-green-500 dark:text-white">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-900 md:hover:text-green-500 dark:text-white">
                      <FaLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-900 md:hover:text-green-500 dark:text-white">
                      <FaYoutube />
                    </a>
                  </li>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>
  );
}
