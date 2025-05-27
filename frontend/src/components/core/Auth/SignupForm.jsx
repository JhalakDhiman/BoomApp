import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signup } from '../../../services/operations/authApis';

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    const { email, password, confirmPassword } = data;
    signup({ email, password, confirmPassword, navigate });
  };

  const password = watch('password');

  return (
    <div className="w-11/12 max-w-[450px]">
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Email Input */}
        <div>
          <label className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60" htmlFor='email'>
            Email Address<sup className="text-red-600">*</sup>
          </label>
          <input
            className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
            type="email"
            placeholder="Enter email address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password and Confirm Password */}
        <div className="flex gap-x-4">

          {/* Password */}
          <label className="w-full relative">
            <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-60">
              Create Password<sup className="text-red-600">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
            />
            <span className="absolute right-3 top-[42px] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf' /> : <AiOutlineEye fontSize={24} fill='#afb2bf' />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </label>

          {/* Confirm Password */}
          <label className="w-full relative">
            <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-60">
              Confirm Password<sup className="text-red-600">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
              placeholder="Enter password again"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
            />
            <span className="absolute right-3 top-[42px] cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf' /> : <AiOutlineEye fontSize={24} fill='#afb2bf' />}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </label>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-400 rounded-[8px] mt-7 font-medium text-[#000814] px-[12px] py-[8px] w-full"
        >
          Create Account
        </button>

      </form>
    </div>
  );
};

export default SignupForm;
