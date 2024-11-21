import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
  // Import the useAuth hook

function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin } = useAuth(); 

  // Form submission handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");  // Reset error message on each submission
    const { email, password } = data;

    const { error } = await handleLogin(email, password);
    if (error) {
      setErrorMessage(error);  // Display error if login fails
    }
    setIsLoading(false);  // Set loading to false after handling the login
  };

  return (
    <div className="flex justify-center">
      <div className=" bg-slate-100 w-1/2 h-screen hidden md:block">
        <div>
          <h1>Booking IO</h1>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className=" md:w-[370px] p-5 mt-20 h-[450px]">
          <header className=" mb-5">
            <h1 className=" font-bold text-3xl ">Welcome back</h1>
            <p className=" mt-5 text-gray-400">Welcome back! Please enter your details</p>
          </header>
          {errorMessage && <p className="text-red-500 my-3 text-sm">{errorMessage}</p>}

          <form onSubmit={handleSubmit(onSubmit)}> {/* onSubmit handler connected to react-hook-form */}
            {/* Email section */}
            <div className="mt-10">
              <label className="block mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="w-full px-2 py-1 mb-6 text-indigo-700 border border-gray-400 rounded-md focus:bg-gray-100 placeholder:text-sm"
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            {/* Password section */}
            <div>
              <label className="block mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="w-full px-2 py-1 mb-6 text-indigo-700 border border-gray-400 rounded-md focus:bg-gray-100 placeholder:text-sm"
                type="password"
                placeholder="............"
                id="password"
                name="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div className="flex text-sm gap-14">
              <div className="flex">
                <input type="checkbox" className="mr-2" />
                <p className="text-gray-600 text-sm">Remember for 30 days</p>
              </div>
              <div className="text-sm text-indigo-500">Forgot Password</div>
            </div>

            <button
              className={`w-full font-bold py-2 px-4 mb-6 rounded mt-5 text-sm ${isLoading ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-700 text-white hover:bg-indigo-500'}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </form>

          <footer>
            <p className="text-center text-sm">
              Don't have an account? <a href="/register" className="text-indigo-500">Sign Up</a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
