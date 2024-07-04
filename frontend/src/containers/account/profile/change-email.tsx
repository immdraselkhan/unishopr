import React, { FC, FormEvent, useEffect, useState } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useCountriesQuery } from "@redux/services/utilities/api";
import {useGetUserQuery, useOtpVerifyMutation, useUpdatePhoneOrEmailMutation} from "@redux/services/account/api";

const EmailForm: FC = (props) => {
    const user = useGetUserQuery("")
    const userData = user?.data?.data
    const initialFormData = { countryId: "", phone: "", otp: "",email:"" }
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialFormData)
    const [emailOtpInput, setEmailOtpInput] = useState(false);

    const [updateEmail, updateEmailParams] = useUpdatePhoneOrEmailMutation();
    const [otpVerify, otpVerifyParams] = useOtpVerifyMutation();


    useEffect(() => {
        // @ts-ignore
        if (otpVerifyParams?.error?.data?.message) setErrors(otpVerifyParams?.error?.data?.message)
    }, [otpVerifyParams.error])


    const onSubmitEmail = (event: FormEvent) => {
        event.preventDefault();
        updateEmail({
            data: { ...formData },
            action: () => setEmailOtpInput(true)
        });
    }

    const onSubmitVerify = (event: FormEvent) => {
        event.preventDefault();
        otpVerify({
            data: formData,
            action:  () =>  setEmailOtpInput(false)
        });
        setFormData({...formData, otp: ""})
    }

    return (
        <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px  py-5 px-5 sm:px-8">
            {
                emailOtpInput ? (
                    <>
                        <div className="text-center mb-6 pt-2.5">
                            <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
                                {"An OTP has been sent to your Email, please input that here"} {" "}
                            </p>
                        </div>
                        <form
                            onSubmit={onSubmitVerify}
                            className="flex flex-col justify-center"
                        >
                            <div className="flex flex-col space-y-4">
                                <h5 className="text-sm font-semibold text-black">OTP</h5>
                                <Input
                                    name="otp"
                                    value={formData.otp}
                                    onChange={({ target }) => setFormData({ ...formData, otp: target.value })}
                                    className="relative w-full"
                                    placeholderKey="OTP"
                                    required={true}
                                    variant="solid"
                                />
                                <div className="relative">
                                    {otpVerifyParams.isLoading
                                        ? <Button
                                            type="submit"
                                            className="h-11 md:h-12 w-full mt-2 disabled:opacity-75"
                                            disabled
                                        >
                                            Loading...
                                        </Button>
                                        : <Button
                                            type="submit"
                                            className="h-11 md:h-12 w-full mt-2"
                                        >
                                            Submit
                                        </Button>
                                    }
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <form
                        onSubmit={onSubmitEmail}
                        className="flex flex-col justify-center"
                    >
                        <div className="flex flex-col space-y-3.5">
                            <h5 className="text-sm font-semibold text-black text-center"> Change Email</h5>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={({ target }) => setFormData({ ...formData, email: target.value })}
                                    className="w-full"
                                    inputClassName="rounded-l-none"
                                    placeholderKey="Email"
                                    required={true}
                                    variant="solid"
                                    onWheel={event => event.currentTarget.blur()}
                                />
                            {errors.email && <p className="my-2 text-xs text-red-500">{errors.email}</p>}
                            <div className="relative">
                                <Button
                                    type="submit"
                                    className="h-11 md:h-12 w-full mt-1.5"
                                >
                                    Send OTP
                                </Button>
                            </div>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default EmailForm;
