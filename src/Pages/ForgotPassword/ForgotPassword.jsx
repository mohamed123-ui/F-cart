import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // البريد الإلكتروني
  const [resetCode, setResetCode] = useState(""); // رمز التحقق
  const [newPassword, setNewPassword] = useState(""); // كلمة المرور الجديدة
  const [confirmPassword, setConfirmPassword] = useState(""); // تأكيد كلمة المرور
  const [isCodeSent, setIsCodeSent] = useState(false); // هل تم إرسال الكود؟
  const [isCodeVerified, setIsCodeVerified] = useState(false); // هل تم التحقق من الكود؟

  /** ✅ إرسال كود التحقق إلى البريد */
  async function SendCode() {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      console.log(response.data);
      toast.success("Reset code sent to your email.");
      setIsCodeSent(true); // عند نجاح الإرسال، نظهر إدخال الكود
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Failed to send code.");
      toast.error("Failed to send code. Please try again.");
    }
  }

  /** ✅ التحقق من كود إعادة التعيين */
  async function ResetPassword() {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      console.log(response.data, "Code success");
      toast.success("Code verified successfully! Now set your new password.");
      setIsCodeVerified(true); // عند نجاح التحقق، نظهر إدخال كلمة المرور
    } catch (error) {
      console.log(error, "Code doesn't reset");
      toast.error("Invalid code. Please try again.");
    }
  }

  /** ✅ تحديث كلمة المرور */
  async function UpdatePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword,
        }
      );
      console.log(response);
      toast.success("Password updated successfully! You can now log in.");
    } catch (error) {
      console.log(error, "Invalid new password");
      toast.error("Failed to update password. Try again.");
    }
  }

  return (
    <div>
        <div className="py-4 my-8 w-[60%] mx-auto shadow-lg p-6 ">
      <h2 className="text-center py-7 font-bold text-xl">Forget Password</h2>

      {/* ✅ إدخال البريد الإلكتروني */}
      {!isCodeSent && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SendCode();
          }}
        >
          <h3 className="mb-4 text-lg text-gray-900 font-bold">Send Code</h3>
          <div className="w-[100%] my-4">
            <label className="block mb-2 text-sm  text-gray-900 font-semibold">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Send Code
          </button>
        </form>
      )}

      {/* ✅ إدخال كود التحقق (يظهر بعد إرسال البريد) */}
      {isCodeSent && !isCodeVerified && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ResetPassword();
          }}
          className="mt-6"
        >
          <h3 className="mb-4 text-lg font-medium text-gray-900">Verify Reset Code</h3>
          <div className="w-[70%] my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Enter the reset code:
            </label>
            <input
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Enter reset code"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Verify Code
          </button>
        </form>
      )}

      {/* ✅ إدخال كلمة المرور الجديدة (يظهر بعد التحقق من الكود) */}
      {isCodeVerified && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            UpdatePassword();
          }}
          className="mt-6"
        >
          <h3 className="mb-4 text-lg font-medium text-gray-900">Set New Password</h3>
          <div className="w-[70%] my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              New Password:
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="w-[70%] my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Confirm Password:
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Update Password
          </button>
        </form>
      )}
      
    </div>
    <Footer/> 

    </div>
  

  );
}
