import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Logo from "@components/ui/logo";
import React, { FormEvent, useEffect, useState } from "react";
import { useOtpVerifyMutation } from "@redux/services/auth/api";

const OtpVerifyForm: React.FC<{
  userId: string;
  countryId: string;
  phone: string;
  message?: string;
  action?: () => void;
}> = (props) => {
  const [otpVerify, otpVerifyParams] = useOtpVerifyMutation();

  const [formData, setFormData] = useState({
    userId: props?.userId,
    otp: "",
    phone: {
      countryId: props?.countryId,
      phone: props?.phone,
    },
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    // @ts-ignore
    if (otpVerifyParams?.error?.data?.message)
      setErrors(otpVerifyParams?.error?.data?.message);
  }, [otpVerifyParams.error]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    otpVerify({
      data: formData,
      action: props.action
        ? props.action
        : () => console.log("no action after otp verify"),
    });
  };

  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={() => console.log("clicked")}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {props.message}{" "}
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col justify-center">
        <div className="flex flex-col space-y-4">
          <h5 className="text-sm font-semibold text-black">OTP</h5>
          <Input
            name="otp"
            value={formData.otp}
            onChange={({ target }) =>
              setFormData({ ...formData, otp: target.value })
            }
            className="relative w-full"
            placeholderKey="OTP"
            required={true}
            errorKey={errors}
            variant="solid"
          />
          <div className="relative">
            {otpVerifyParams.isLoading ? (
              <Button
                type="submit"
                className="h-11 md:h-12 w-full mt-2 disabled:opacity-75"
                disabled
              >
                Loading...
              </Button>
            ) : (
              <Button type="submit" className="h-11 md:h-12 w-full mt-2">
                Submit
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpVerifyForm;
