import Head from "next/head";
import Link from "next/link";
import Splash from "../public/images/Splash.png";
import Ellipse from "../public/images/Ellipse.png";
import Logo from "../public/images/WebLogo.png";
import Image from "next/image";
import { SidePage } from "../components/authentication/SidePage";
import SignUpForm from "../components/authentication/SignUpForm";
import { Formik } from "formik";
import * as Yup from "yup";

const signUp = () => {
	// Validation
	let yup = require("yup");
	const validate = Yup.object({
		username: Yup.string()
			.matches(/^\S*$/, "There should be no space between username")
			.max(15, "Must be 15 characters or less")
			.required("Username is required"),
		email: Yup.string().email("Email is invalid").required("Email is required"),
		password1: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		password2: Yup.string()
			.oneOf([Yup.ref("password1"), null], "Password must match")
			.required("Password is required"),
	});

	return (
		<div>
			<Head>
				<title>Sign Up Page</title>
				<meta
					name='description'
					content='Sign up page to be able to create your account'
				/>
				<link
					rel='shortcut icon'
					href='images/LogoFavicon.png'
					type='image/x-icon'
				/>
			</Head>
			<section className='font-Roboto flex flex-col md:flex-row md:flex-1 h-full md:h-screen'>
				<div className='pb-6 p-4 pt-2 w-full md:w-6/12 lg:p-10 lg:pt-6 md:p-8 md:pt-4'>
					<Formik
						initialValues={{
							username: "",
							email: "",
							password1: "",
							password2: "",
						}}
						validationSchema={validate}
						onSubmit={(values, {resetForm}) => {
							// Post Request Function
							const axios = require("axios").default;
							const sendSignUp = async () => {
								try {
									const response = await axios.post(
										"https://losales.herokuapp.com/auth/registration/",
										values
									);
									if (response.status == 201) {
										alert(
											"Account successfully " +
												response.statusText +
												". You can now proceed to the login page."
										);
									}
								} catch (error) {
									if (error.response.status == 400) {
										alert(
											error.response.data.email +
												" " +
												error.response.data.username
										);
									}
								}
							resetForm({values: ''})
							};
							sendSignUp();
						}}>
						{(formik) => (
							<div>
								<div className='md:hidden fixed -bottom-6 -left-16 -z-10'>
									<Image
										src={Ellipse}
										alt='Ellipse'
										width={100}
										height={100}
										objectFit='contain'
									/>
								</div>
								<Link href='/'>
									<a className='cursor-pointer'>
										<Image
											src={Logo}
											alt='Logo'
											width={50}
											height={50}
											objectFit='contain'
										/>
									</a>
								</Link>
								<div className='mb-8 relative'>
									<div className='md:hidden absolute right-0'>
										<Image
											src={Splash}
											alt='Splash'
											width={70}
											height={70}
											objectFit='contain'
										/>
									</div>
									<h1 className='font-semibold text-input-border text-[1.9rem] sm:text-4xl mb-1 tracking-normal'>
										Create Account
									</h1>
									<p className='text-xs font-semibold'>
										Sign up to start setting up your store.
									</p>
								</div>
								<SignUpForm />
							</div>
						)}
					</Formik>
				</div>
				<SidePage />
			</section>
		</div>
	);
};

export default signUp;
