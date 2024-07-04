import Button from "@components/ui/button";
import React, { FC, useState, Fragment } from "react";
import { Listbox, Combobox, Transition } from '@headlessui/react'
import { HiOutlineSelector } from "react-icons/hi";
import { useCitiesQuery } from "@redux/services/utilities/api";
import { Constants } from "@utils/constants";
import { localCountry } from "@utils/auth";

const OrderStepThree: FC<{
    step: number,
    setStep: (step: number) => void,
    formData: any,
    setFormData: (value: any) => void,
    isLoading: boolean,
}> = (props) => {
    const [query, setQuery] = useState('');
    const cities = useCitiesQuery("");
    const country = localCountry();

    const filteredCity =
        query === ''
            ? cities.data?.data
            : cities.data?.data.filter((city) => {
                return city.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
            <div className=" flex h-full flex-col mx-auto w-full md:w-1/2 border-2 border-solid border-gray rounded-lg p-4 md:p-12">
                <div className="flex flex-col space-y-3">
                    <h4 className="text-base font-bold">Delivery From</h4>
                    <div className="w-full z-20">
                        <Combobox value={cities?.data?.data.find((item) => item._id === props.formData.route.fromCityId)} onChange={(event) => props.setFormData({ ...props.formData, route: { ...props.formData.route, fromCityId: event?._id } })}>
                            <div className="relative mt-1">
                                <div className="relative">
                                    <Combobox.Input
                                        className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                                        displayValue={(city: any) => city?.name}
                                        onChange={(event) => setQuery(event.target.value)}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <HiOutlineSelector
                                            className="w-5 h-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>
                                </div>
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredCity?.length === 0 && query !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredCity?.filter(city => city.country._id != country?._id).map((city) => (
                                            <Combobox.Option
                                                key={city._id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-4 pr-2 ${active ? 'bg-gray-300' : 'text-gray-900'
                                                    }`
                                                }
                                                value={city}
                                            >
                                                <span className={`block truncate font-normal`}>{city.name}</span>
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </div>
                        </Combobox>
                    </div>
                    <h4 className="text-base font-bold">Delivery To</h4>
                    <div className="w-full z-10">
                        <Combobox value={cities?.data?.data.find((item) => item._id === props.formData.route.toCityId)} onChange={(event) => props.setFormData({ ...props.formData, route: { ...props.formData.route, toCityId: event?._id } })}>
                            <div className="relative mt-1">
                                <div className="relative">
                                    <Combobox.Input
                                        className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                                        displayValue={(city: any) => city?.name}
                                        onChange={(event) => setQuery(event.target.value)}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <HiOutlineSelector
                                            className="w-5 h-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>
                                </div>
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredCity?.length === 0 && query !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredCity?.filter(city => city.country._id == country?._id).map((city) => (
                                            <Combobox.Option
                                                key={city._id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-4 pr-2 ${active ? 'bg-gray-300' : 'text-gray-900'
                                                    }`
                                                }
                                                value={city}
                                            >
                                                <span className={`block truncate font-normal`}>{city.name}</span>
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </div>
                        </Combobox>
                    </div>
                    <h5>A Unishopr traveler going to your city will deliver your order. Enter the city your order is coming from and which city you want it to be delivered to.</h5>
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
                                disabled
                                loading={props.isLoading}
                            >
                                Loading...
                            </Button>
                            : <Button
                                type="submit"
                                className="h-10 lg:h-10 mt-1 text-sm lg:text-base sm:w-auto float-right"
                            >
                                Next
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStepThree;