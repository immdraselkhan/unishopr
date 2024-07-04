import Button from "@components/ui/button";
import React, { FC, useEffect } from "react";
import { useCitiesQuery } from "@redux/services/utilities/api";
import { localCountry } from "@utils/auth";
import { Constants } from "@utils/constants";

const OrderStepFour: FC<{
    step: number,
    setStep: (step: number) => void,
    formData: any,
    setFormData: (value: any) => void,
    isLoading: boolean,
}> = (props) => {
    const country = localCountry();
    const cities = useCitiesQuery("");

    const getLocationName = (cityId: string) => {
        let locationName = null;
        const city = cities.data?.data.find((item) => item._id === cityId);
        if (city) locationName = `${city.name}, ${city.country.name}`
        return locationName;
    }

    const getProductPrice = () => {
        let productPrice = { label: `$ ${props.formData.price}`, value: props.formData.price };
        if (country) productPrice = { label: `${country.currencySymbol} ${(country.currencyFromDollar * productPrice.value).toFixed(2)}`, value: parseInt((country.currencyFromDollar * productPrice.value).toFixed(2)) }
        return productPrice;
    }

    const getTotalAmount = () => {
        let totalAmount = { label: `$ 0`, value: 0 }
        if (country) totalAmount = { label: `${country.currencySymbol} ${(getProductPrice().value * props.formData.quantity).toFixed(2)}`, value: parseInt((getProductPrice().value * props.formData.quantity).toFixed(2)) };
        return totalAmount;
    }

    useEffect(() => {
        props.setFormData({
            ...props.formData,
            currency: country?.currencySymbol ? country.currencySymbol : "USD",
            checkout: {
                ...props.formData.checkout,
                totalAmount: getTotalAmount().value
            }
        })
    }, [country._id])

    return (
        <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
            <div className=" flex h-full flex-col mx-auto w-full md:w-1/2 border-2 border-solid border-gray rounded-lg p-4 md:p-12">
                <div className="flex flex-col space-y-3">
                    <div>
                        <img src={Constants.S3_BASE_URL(props.formData.photo)} alt="" />
                        <h1 className="text-3xl">{props.formData.name}</h1>
                        <p>{props.formData.description}</p>
                    </div>
                    <div className="grid grid-cols-1 divide-gray-500 divide-y-2">
                        <div className="py-4">
                            <table className="w-full text-heading font-semibold text-sm lg:text-base">
                                <tr className="odd:bg-gray-150">
                                    <td className="p-2">Deliver from</td>
                                    <td className="p-2">{getLocationName(props.formData.route.fromCityId)}</td>
                                </tr>
                                <tr className="odd:bg-gray-150">
                                    <td className="p-2">Deliver to</td>
                                    <td className="p-2">{getLocationName(props.formData.route.toCityId)}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="py-4">
                            <table className="w-full text-heading font-semibold text-sm lg:text-base">
                                <tr className="odd:bg-gray-150">
                                    <td className="p-2">Quantity</td>
                                    <td className="p-2">{props.formData.quantity}</td>
                                </tr>
                                <tr className="odd:bg-gray-150">
                                    <td className="p-2">Packaging</td>
                                    <td className="p-2">{props.formData.isBoxNeeded ? `With` : `Without`} Box</td>
                                </tr>
                                <tr className="odd:bg-gray-150">
                                    <td className="p-2">Where to buy</td>
                                    <td className="p-2">{props.formData.url.match(/www.([A-Za-z_0-9.-]+)/i) ? props.formData.url.match(/www.([A-Za-z_0-9.-]+)/i)[0] : props.formData.url}</td>
                                </tr>
                            </table>
                            <h4 className="text-base font-bold pt-5">Cost & Charges:</h4>
                        </div>
                        <div className="py-4">
                            <table className="w-full text-heading text-sm lg:text-base">
                                <tr className="odd:bg-gray-150">
                                    <td className="p-2">Product Price</td>
                                    <td className="p-2 text-right">{getProductPrice().label}</td>
                                </tr>
                                <tr className="odd:bg-gray-150 font-semibold border-t-4 border-gray-500">
                                    <td className="p-2">Estimated total</td>
                                    <td className="p-2 text-right">{getTotalAmount().label}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="relative">
                        <Button
                            type="button"
                            className="h-10 lg:h-10 mt-1 text-sm lg:text-base sm:w-auto float-left"
                            onClick={() => props.setStep(props.step - 1)}
                        >
                            Back
                        </Button>
                        {props.isLoading
                            ? <Button
                                type="submit"
                                className="h-10 lg:h-10 mt-1 text-sm lg:text-base sm:w-auto float-right disabled:opacity-75"
                                onClick={() => props.setFormData({
                                    ...props.formData,
                                    price: getProductPrice().value,
                                })}
                                loading={props.isLoading}
                                disabled
                            >
                                Loading...
                            </Button>
                            : <Button
                                type="submit"
                                className="h-10 lg:h-10 mt-1 text-sm lg:text-base sm:w-auto float-right"
                                onClick={() => props.setFormData({
                                    ...props.formData,
                                    price: getProductPrice().value,
                                })}
                            >
                                Submit
                            </Button>
                        }
                    </div>
                    <h5>By publishing my order, I agree to Unishopr's Terms of Use. I understand that if the product price is incorrect, my order may be canceled.</h5>
                </div>
            </div>
        </div>
    )
}

export default OrderStepFour;