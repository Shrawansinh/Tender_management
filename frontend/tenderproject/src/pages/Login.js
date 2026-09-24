import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handelClick = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

   const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/admin/login`,
  {
    email,
    password,
  }
);

      // save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // save admin
      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      toast.success("Login Successful");
      setTimeout(()=>{
        navigate("/dashboard");
      },2000)


    } catch (error) {

      toast.error(error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
   

    <div className="min-h-screen bg-gradient-to-br from-[#0A3D62] to-[#1B4F72] flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-4">

          <div className="bg-[#0A3D62] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg">

            🛡️

          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#0A3D62]">

          Admin Login

        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8 text-sm">

          Secure Tender Management Access

        </p>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handelClick}
        >

          {/* Email */}
          <div>

            <label className="block text-gray-700 font-semibold mb-2">

              Email Address

            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-gray-700 font-semibold mb-2">

              Password

            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3 text-gray-500 text-sm"
              >

                {showPassword
                  ? "Hide"
                  : "Show"}

              </button>

            </div>

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">

            <Link
              to="/forgot-password"
              className="text-sm text-[#0A3D62] hover:underline font-medium"
            >

              Forgot Password?

            </Link>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E67E22] hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-md"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-500">

          Back to{" "}

          <Link
            to="/"
            className="text-[#0A3D62] hover:underline font-semibold"
          >

            Home

          </Link>

        </p>

      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000}/>
     </>
  );
};

export default Login;
