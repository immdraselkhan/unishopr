import React, { FC, FormEvent, useEffect, useState } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useCountriesQuery } from "@redux/services/utilities/api";
import {useGetUserQuery, useOtpVerifyMutation, useUpdatePhoneOrEmailMutation} from "@redux/services/account/api";

const PhoneForm: FC = (props) => {
    const user = useGetUserQuery("")
    const userData = user?.data?.data
    const countries = useCountriesQuery("");
    const initialFormData = { countryId: "", phone: "", otp: "",email:"" }
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialFormData)
    const [phoneOtpInput, setPhoneOtpInput] = useState(false);

    const [updatePhone, updatePhoneParams] = useUpdatePhoneOrEmailMutation();
    const [otpVerify, otpVerifyParams] = useOtpVerifyMutation();

    useEffect(() => {
        // @ts-ignore
        if (updatePhoneParams?.error?.data?.message) setErrors({ ...errors, phone: updatePhoneParams?.error?.data?.message })
    }, [updatePhoneParams.error])


    const onSubmitPhone = (event: FormEvent) => {
        event.preventDefault();
        updatePhone({
            data: {...formData},
            action: () => setPhoneOtpInput(true)
        });
    }

    const onSubmitVerify = (event: FormEvent) => {
        event.preventDefault();
        setErrors(initialFormData)
        otpVerify({
            data: formData,
            action:  () =>  setPhoneOtpInput(false)
        });
        setFormData({...formData, otp: ""})
    }

    return (
        <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px  py-5 px-5 sm:px-8">
            {
                phoneOtpInput ? (
                    <>
                        <div className="text-center mb-6 pt-2.5">
                            <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
                                {"An OTP has been sent to your Phone, please input that here"} {" "}
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
                        onSubmit={onSubmitPhone}
                        className="flex flex-col justify-center"
                    >
                        <div className="flex flex-col space-y-3.5">
                            <h5 className="text-sm font-semibold text-black text-center"> Change Phone</h5>
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
                            {errors.phone && <p className="my-2 text-xs text-red-500">{errors.phone}</p>}
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

export default PhoneForm;
