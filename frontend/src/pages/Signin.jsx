import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../stores/user";
import { useForm } from "react-hook-form";
import auth from "../apiManager/auth";
import { setToken } from "../helper";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();

  // Initialize form methods using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Form submit handler
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Login API call
      const response = await auth.signin(data);
      reset();

      //Set User and Token
      setUser(response.data.user);
      setToken(response.data.token);

      //Navigate to dashboard
      navigate("/dashboard");
      toast.success("Login Successfull!");
    } catch (error) {
      console.log("SignIn Error : ", error);
      toast.error("Login failed! Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Navigation Bar Component */}
      <NavBar />
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white px-4'>
        <div className='w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-xl'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Welcome Back</h2>
          {/* Sign In Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4'
          >
            {/* Email Input */}
            <input
              type='email'
              placeholder='Email'
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}

            {/* Password Input */}
            <input
              type='password'
              placeholder='Password'
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300'
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {/* Link to Signup */}
          <p className='mt-4 text-center text-sm text-gray-400'>
            Don't have an account?{" "}
            <NavLink
              to='/signup'
              className='text-indigo-400 hover:underline'
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
