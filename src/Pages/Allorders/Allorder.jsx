import React, { useEffect, useState } from "react";
import axios from "axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserOrders = async () => {
    try {
      const userId = "6407cf6f515bdcf347c09f17";
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      console.log(response.data);
      
      setOrders(response.data);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4" >
      <h1 className="text-2xl font-bold text-center mb-6">User Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border w-[70%] mx-auto p-4 rounded-lg shadow-md mb-6"
          > 
         <div className="flex justify-between items-center">
         <div>
          <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
            <p className="text-gray-600">Total Price: ${order.totalOrderPrice}</p>
            <p className="text-gray-600">Payment Method: {order.paymentMethodType}</p>
            <p className="text-gray-600">Shipping Address: {order.shippingAddress?.details}</p>
          </div>
          <div className="border p-2">
            <h6 className="py-3 border-b">shippingAddress: </h6>
          <p className="text-gray-600"> <span className="font-bold">City</span>: {order.shippingAddress?.city}</p>
          <p className="text-gray-600"><span className="font-bold">phone</span>: {order.shippingAddress?.phone}</p>
          <p className="text-gray-600"><span className="font-bold">taxPrice :</span> {order.shippingAddress?.taxPrice}</p>
          <p className="text-gray-600"><span className="font-bold">shippingPrice :</span>:0$ {order.shippingAddress?.shippingPrice}</p>
          </div>

          
         </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Products:</h3>
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border-b py-2"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item.product.title}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;