import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import Logo from "@components/ui/logo";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import Link from "@components/ui/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useCountriesQuery } from "@redux/services/utilities/api";
import { Constants } from "@utils/constants";
import { useSignUpMutation } from "@redux/services/auth/api";
import Modal from "@components/common/modal/modal";
import OtpVerifyForm from "@containers/auth/otp-verification-form";
import LoginForm from "./login-form";

const SignUpForm: React.FC<{ action?: () => void }> = (props) => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    countryId: "",
    phone: "",
    gender: "",
    accountType: "phone",
  };

  const countries = useCountriesQuery("");
  const [signUp, signUpParams] = useSignUpMutation();
  const [otpModal, setOtpModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);
  const [authModal, setAuthModal] = useState(false);

  const handleAuth = () => {
    setAuthModal(true);
  };

  useEffect(() => {
    // @ts-ignore
    if (signUpParams?.error?.data?.stack)
      setErrors(signUpParams?.error?.data?.stack);
  }, [signUpParams.error]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      phone: {
        countryId: formData.countryId,
        phone: formData.phone,
      },
      accountType: formData.accountType,
    };

    signUp({
      data,
      action: () => setOtpModal(true),
    });
  };

  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={() => console.log("clicked")}>
          <Logo />
        </div>
        {/* <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					By signing up, you agree to our{" "}
					<Link
						href="/frontend/pages/terms"
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						terms
					</Link>{" "}
					&amp;{" "}
					<Link
						href="/policy"
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						policy
					</Link>
				</p> */}
      </div>
      <form onSubmit={onSubmit} className="flex flex-col justify-center">
        <div className="flex flex-col space-y-4">
          <h5 className="text-sm font-semibold text-black">First Name</h5>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={({ target }) =>
              setFormData({ ...formData, firstName: target.value })
            }
            className="relative w-full"
            placeholderKey="First Name"
            required={true}
            errorKey={errors.firstName}
            variant="solid"
          />
          <h5 className="text-sm font-semibold text-black">Last Name</h5>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={({ target }) =>
              setFormData({ ...formData, lastName: target.value })
            }
            className="relative w-full"
            placeholderKey="Last Name"
            required={true}
            errorKey={errors.lastName}
            variant="solid"
          />
          <h5 className="text-sm font-semibold text-black">Email</h5>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={({ target }) =>
              setFormData({ ...formData, email: target.value })
            }
            className="relative w-full"
            placeholderKey="Email"
            required={true}
            errorKey={errors.email}
            variant="solid"
          />
          <h5 className="text-sm font-semibold text-black">Phone</h5>
          <div className="flex">
            <select
              name="countryId"
              required={true}
              value={formData.countryId}
              onChange={({ target }) =>
                setFormData({ ...formData, countryId: target.value })
              }
              className="w-15 flex items-center justify-center bg-blue-lighter border-t border-l border-b border-gray-300 rounded-l text-blue-dark"
            >
              <option value="">Code</option>
              {countries.data?.data.map((country, ci) => (
                <option key={ci} value={country._id}>
                  {country.code}
                </option>
              ))}
            </select>
            <Input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={({ target }) =>
                setFormData({ ...formData, phone: target.value })
              }
              className="w-full"
              inputClassName="rounded-l-none"
              placeholderKey="Phone"
              required={true}
              variant="solid"
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          {errors.phone && (
            <p className="my-2 text-xs text-red-500">{errors.phone}</p>
          )}
          <h5 className="text-sm font-semibold text-black">Gender</h5>
          <div className="w-full z-20">
            <select
              name="gender"
              required={true}
              value={formData.gender}
              onChange={({ target }) =>
                setFormData({ ...formData, gender: target.value })
              }
              className="py-2 px-4 md:px-5 w-full flex items-center justify-center h-12 bg-blue-lighter border border-gray-300 rounded text-blue-dark"
            >
              <option value="">Select One</option>
              {Constants.GENDERS.map((gender, gi) => (
                <option key={gi} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            {signUpParams.isLoading ? (
              <Button
                type="submit"
                className="h-11 md:h-12 w-full mt-2 disabled:opacity-75"
                disabled
              >
                Loading...
              </Button>
            ) : (
              <Button type="submit" className="h-11 md:h-12 w-full mt-2">
                Register
              </Button>
            )}
          </div>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-white">Or</span>
      </div>

      <Button
        type="submit"
        loading={false}
        disabled={false}
        className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
      >
        <ImFacebook2 className="text-sm sm:text-base me-1.5" />
        Login With Facebook
      </Button>
      <Button
        type="submit"
        loading={false}
        disabled={false}
        className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
      >
        <ImGoogle2 className="text-sm sm:text-base me-1.5" />
        Login With Google
      </Button>
      <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        Already have an account?{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleAuth}
        >
          Login
        </button>
      </div>

      {signUpParams.data ? (
        <Modal open={otpModal} onClose={() => setOtpModal(false)}>
          <OtpVerifyForm
            userId={
              signUpParams.data?.data?._id ? signUpParams.data?.data._id : ""
            }
            countryId={
              signUpParams.data?.data?.phone?.country?._id
                ? signUpParams.data?.data.phone.country._id
                : ""
            }
            phone={
              signUpParams.data?.data?.phone?.phone
                ? signUpParams.data?.data.phone.phone
                : ""
            }
            action={() => {
              setOtpModal(false);
              if (props.action) props.action();
            }}
          />
        </Modal>
      ) : null}
      <Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
        <LoginForm
          action={() => {
            setAuthModal(false);
            // if (props.action) props.action();
          }}
        />
      </Modal>
    </div>
  );
};

export default SignUpForm;
