import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Categories.module.css"; 
import Footer from "../../Components/Footer/Footer";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  function getAllCategory() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        console.log("API Response:", response.data); 
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again.");
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="my-6 py-5">
   <Helmet>
        <title>Categories</title>
      
      </Helmet>

      {loading && <p className="text-center text-gray-500">Loading categories...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="row gap-9 ms-6">
          {data.length > 0 ? (
            data.map((category) => (
              <div key={category._id} className="bg-white shadow-md rounded-lg  sm:w-full md:w-1/2 lg:w-1/6 ">
             <div className="inner  ">
             <img
                  src={category.image}
                  className="w-full h-[350px]"
                  alt={category.name || "Category Image"}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
             </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No categories found.</p>
          )}
        </div>
      )}
        <Footer />
      
    </div>
  );
}

