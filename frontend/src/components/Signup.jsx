import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import auth from "../apiManager/auth";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      setIsLoading(false);
      return toast.error("Password mismatch! Try again");
    }

    const formData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
    };

    try {
      const response = await auth.signup(formData);
      reset();
      toast.success("Account created successfully"); setIsLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log("SignUp Error : ", error);
      toast.error("SignUp failed! Try again...")
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <>
      <NavBar />
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white px-4'>
        <div className='w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-xl'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Create Your Account</h2>
          <form
            className='space-y-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type='text'
              placeholder='Full Name'
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              {...register("name", { required: "*Name is Required" })}
            />
            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}

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
            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}

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

            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              {...register("confirmPassword", { required: "*Confirm password is Required" })}
            />
            {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300'
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <p className='mt-4 text-center text-sm text-gray-400'>
            Already have an account?{" "}
            <NavLink
              to='/signin'
              className='text-indigo-400 hover:underline'
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
