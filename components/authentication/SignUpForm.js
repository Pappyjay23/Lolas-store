import React, { useState } from "react";
import Link from "next/link";
import InputForm from "../InputForm";
import PasswordForm from "../PasswordForm";
import CpasswordForm from "../CpasswordForm";
import { Form } from "formik";

const SignUpForm = () => {
	// Logic
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);
	const togglePassword = () => {
		setShowPassword(!showPassword);
	};
	const toggleCPassword = () => {
		setShowCPassword(!showCPassword);
	};
	return (
		<Form className='z-10'>
			<div className='flex flex-col mb-4'>
				<label htmlFor='text' className={"text-sm mb-2 font-semibold"}>
					Username
				</label>
				<InputForm
					name='username'
					type='text'
					id='text'
					placeholder='@Username'
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<label htmlFor='email' className='text-sm mb-2 font-semibold'>
					Email
				</label>
				<InputForm
					name='email'
					type='email'
					id='email'
					placeholder='youremail@gmail.com'
				/>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<div className='flex flex-col mb-4 mx-1 w-full'>
					<label htmlFor='password' className='text-sm mb-2 font-semibold'>
						Password
					</label>
					<div className='relative'>
						<PasswordForm
							name='password1'
							type={showPassword ? "text" : "password"}
							id='password'
							placeholder='Password'
							showPassword={showPassword}
							togglePassword={togglePassword}
						/>
					</div>
				</div>
				<div className='flex flex-col mb-4 mx-1 w-full'>
					<label htmlFor='cpassword' className='text-sm mb-2 font-semibold'>
						Confirm Password
					</label>
					<div className='relative'>
						<CpasswordForm
							name='password2'
							type={showCPassword ? "text" : "password"}
							id='cpassword'
							placeholder='Confirm Password'
							showCPassword={showCPassword}
							toggleCPassword={toggleCPassword}
						/>
					</div>
				</div>
			</div>
			<div className='flex justify-between items-center mb-6'>
				<div className='flex flex-row items-center justify-center invisible'>
					<input className='mr-1' type='checkbox' />
					<span className='text-xs font-semibold'>Remember Me</span>
				</div>
				<div className='flex items-center justify-center '>
					<p className='text-xs font-medium'>Already have an account?</p>
					<Link href='/login' as='/login'>
						<a className='text-xs font-medium text-blue-600 ml-1'>Login</a>
					</Link>
				</div>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<button
					type='submit'
					className=' mb-4 w-full bg-input-border text-white px-2 py-4 rounded-md'>
					Create Account
				</button>
			</div>
		</Form>
	);
};

export default SignUpForm;
