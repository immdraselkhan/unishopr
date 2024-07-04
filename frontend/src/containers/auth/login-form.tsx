import React, { FC, FormEvent, useEffect, useState } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Logo from "@components/ui/logo";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import { useCountriesQuery } from "@redux/services/utilities/api";
import { useSignInMutation, useSocialSignInMutation } from "@redux/services/auth/api";
import Modal from "@components/common/modal/modal";
import OtpVerifyForm from "@containers/auth/otp-verification-form";
import SignUpForm from "./sign-up-form";
import GoogleButton from "@components/ui/google-button";
import FacebookButton from "@components/ui/facebook-button";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiPhone } from "react-icons/hi";
import {useRouter} from "next/router";

const LoginForm: FC<{ action?: () => void }> = (props) => {
	const countries = useCountriesQuery("");
	const [signIn, signInParams] = useSignInMutation();
	const [socialSignIn, socialSignInParams] = useSocialSignInMutation();
	const initialFormData = { countryId: "", phone: "", email: "", uniAuth: "" }
	const [formData, setFormData] = useState(initialFormData)
	const [errors, setErrors] = useState(initialFormData)
	const [otpModal, setOtpModal] = useState(false);
	const [signUpModal, setSignUpModal] = useState(false);
	const [loginOptions, setLoginOptions] = useState("phone")

	const router = useRouter();
	const {uniAuth} = router.query;

	useEffect(() => {
		// @ts-ignore
		if (signInParams?.error?.data?.stack) setErrors(signInParams?.error?.data?.stack)
	}, [signInParams.error])

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		signIn({
			data: {...formData, uniAuth: uniAuth && typeof uniAuth === "string" ? uniAuth : ""},
			action: () => setOtpModal(true)
		});
	}

	// const handleSocialLogin = () => {
	// 	console.log("clicked");
	// }

	// @ts-ignore
	const handleSocialLogin = (user) => {
		console.log("here")
		console.log(user);
	};

	// @ts-ignore
	const handleSocialLoginFailure = (err) => {
		console.log("here")
		console.error(err);
	};

	const handleSignUp = () => {
		setSignUpModal(true)
	}

	const handleForgetPassword = () => {
		console.log("clicked")
	}

	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<div>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{loginOptions === "phone"
						? <span>Login with your phone</span>
						: <span>Login with your email</span>
					}
				</p>
			</div>
			<form
				onSubmit={onSubmit}
				className="flex flex-col justify-center"
			>
				<div className="flex flex-col space-y-3.5">
					{loginOptions === "phone"
						? <h5 className="text-sm font-semibold text-black">Phone</h5>
						: <h5 className="text-sm font-semibold text-black">Email</h5>
					}
					{loginOptions === "phone" ? (
						<div className="flex">
							<select
								name="countryId"
								required={true}
								value={formData.countryId}
								onChange={({ target }) => setFormData({ ...formData, countryId: target.value })}
								className="w-15 flex items-center justify-center bg-blue-lighter border-t border-l border-b border-gray-300 rounded-l text-blue-dark"
							>
								<option value="">Code</option>
								{countries.data?.data.map((country, ci) => (<option key={ci} value={country._id}>{country.code}</option>))}
							</select>
							<Input
								type="number"
								name="phone"
								value={formData.phone}
								onChange={({ target }) => setFormData({ ...formData, phone: target.value })}
								className="w-full"
								inputClassName="rounded-l-none"
								placeholderKey="Phone"
								required={true}
								variant="solid"
								onWheel={event => event.currentTarget.blur()}
							/>
						</div>
					) : (
						<div className="flex">
							<Input
								type="email"
								name="email"
								value={formData.email}
								onChange={({ target }) => setFormData({ ...formData, email: target.value })}
								className="w-full"
								placeholderKey="Email"
								required={true}
								variant="solid"
								onWheel={event => event.currentTarget.blur()}
							/>
						</div>
					)}
					{errors.phone && <p className="my-2 text-xs text-red-500">{errors.phone}</p>}
					<div className="relative">
						{signInParams.isLoading
							? <Button
								type="submit"
								className="h-11 md:h-12 w-full mt-1.5 disabled:opacity-75"
								disabled
							>
								Loading...
							</Button>
							: <Button
								type="submit"
								className="h-11 md:h-12 w-full mt-1.5"
							>
								Login
							</Button>
						}
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					Or
				</span>
			</div>
			<div className="relative">
				{loginOptions === "phone"
					? <Button
						type="submit"
						className="h-11 md:h-12 w-full mt-1.5 bg-red-600 hover:bg-red-700"
						onClick={() => setLoginOptions("email")}
					>
						<IoIosMail className="text-2xl me-1.5" />
						Login With Email
					</Button>
					: <Button
						type="submit"
						className="h-11 md:h-12 w-full mt-1.5 bg-red-600 hover:bg-red-700"
						onClick={() => setLoginOptions("phone")}
					>
						<HiPhone className="text-2xl me-1.5" />
						Login With Phone
					</Button>
				}
			</div>
			{/*<FacebookButton*/}
			{/*	provider="facebook"*/}
			{/*	autoLoad={true}*/}
			{/*	reauthenticate={true}*/}
			{/*	appId="444911117801928"*/}
			{/*	onLoginSuccess={handleSocialLogin}*/}
			{/*	onLoginFailure={handleSocialLoginFailure}*/}
			{/*/>*/}
			{/*<GoogleButton*/}
			{/*	provider="google"*/}
			{/*	appId="594194711462-qqbubg6qhf5c0hu040244d7p5uqs43j9.apps.googleusercontent.com"*/}
			{/*	onLoginSuccess={handleSocialLogin}*/}
			{/*	onLoginFailure={handleSocialLoginFailure}*/}
			{/*/>*/}
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				Don't have any account?{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					Register
				</button>
			</div>

			{signInParams.data ? (
				<Modal open={otpModal} onClose={() => setOtpModal(false)}>
					<OtpVerifyForm
						userId={signInParams.data?.data?._id ? signInParams.data?.data._id : ""}
						countryId={signInParams.data?.data?.phone?.country?._id ? signInParams.data?.data.phone.country._id : ""}
						phone={signInParams.data?.data?.phone?.phone ? signInParams.data?.data.phone.phone : ""}
						message={`An OTP has been sent to your ${loginOptions}, please input that here`}
						action={() => {
							setOtpModal(false)
							if (props.action) props.action();
						}}
					/>
				</Modal>
			) : null}

			<Modal
				open={signUpModal}
				onClose={() => setSignUpModal(!signUpModal)}
			>
				<SignUpForm action={() => {
					setSignUpModal(false)
					if (props.action) props.action();
				}} />
			</Modal>
		</div>
	);
};

export default LoginForm;
