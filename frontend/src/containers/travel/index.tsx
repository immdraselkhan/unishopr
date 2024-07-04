import Button from "@components/ui/button";
import React, { FC, useState, Fragment } from "react";
import { Listbox, Combobox, Transition } from '@headlessui/react'
import { HiOutlineSelector } from "react-icons/hi";
import { useCitiesQuery } from "@redux/services/utilities/api";
import { Constants } from "@utils/constants";
import { localCountry } from "@utils/auth";
import Input from "@components/ui/input";
import Modal from "@components/common/modal/modal";
import LoginForm from "@containers/auth/login-form";
import Router from "next/router";
import { useAddTravelMutation } from "@redux/services/travel/api";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsArrowRightCircle } from "react-icons/bs";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const Travel = () => {
    const [query, setQuery] = useState('');
    const cities = useCitiesQuery("");
    const country = localCountry();
    const [authModal, setAuthModal] = useState(false);
    const [addTravel, { isLoading }] = useAddTravelMutation();
    const [formData, setFormData] = useState({
        weight: 0,
        route: {
            fromCityId: "",
            toCityId: ""
        },
        travelDate: "",
    })

    const filteredCity =
        query === ''
            ? cities.data?.data
            : cities.data?.data.filter((city) => {
                return city.name.toLowerCase().includes(query.toLowerCase())
            })

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);

        if (accessToken) {
            addTravel({
                data: formData,
                action: () => {
                    Router.push("/account/travels");
                }
            })
        } else {
            setAuthModal(true)
        }
    }

    const [isOpen, setOpen] = useState(false);
    const openVideo = (e: any) => {
        e.preventDefault();
        setOpen(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="my-8 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
                    <div className=" flex h-full flex-col mx-auto w-full md:w-3/5 p-4 md:p-12">
                        <div className="flex flex-col space-y-3 text-semibold">
                            <h1 className="text-2xl md:text-5xl 2xl:text-3xl font-bold pb-4 text-black">Add your travel details</h1>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                                <div className="flex items-center justify-start text-sm md:text-base">
                                    <span className="w-6 h-6 me-2 lg:me-2 flex items-center justify-center flex-shrink-0">
                                        <IoCheckmarkCircleOutline className="w-5 h-5" />
                                    </span>
                                    Receive your product in 1-2 weeks
                                </div>
                                <div className="flex items-center justify-start text-sm md:text-base">
                                    <span className="w-6 h-6 lg:ml-2 me-2 lg:me-2 flex items-center justify-center flex-shrink-0">
                                        <IoCheckmarkCircleOutline className="w-5 h-5" />
                                    </span>
                                    Delivered by verified trusted travelers
                                </div>
                            </div>
                            <h4 className="text-base pt-4 font-bold">Travel From</h4>
                            <div className="w-full z-10">
                                {/* @ts-ignore */}
                                <Combobox value={cities?.data?.data.find((item) => item._id === formData.route.fromCityId)} onChange={(event) => setFormData({ ...formData, route: { ...formData.route, fromCityId: event?._id } })}>
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
                            <h4 className="text-base font-bold">Travel To</h4>
                            <div className="w-full z-10">
                                {/* @ts-ignore */}
                                <Combobox value={cities?.data?.data.find((item) => item._id === formData.route.toCityId)} onChange={(event) => setFormData({ ...formData, route: { ...formData.route, toCityId: event?._id } })}>
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
                            <h4 className="text-base font-bold">Weight (kg)</h4>
                            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                                <Input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={({ target }) => setFormData({ ...formData, weight: parseInt(target.value) })}
                                    className="relative w-full"
                                    placeholderKey="Weight"
                                    required={true}
                                    errorKey={""}
                                    variant="solid"
                                    onWheel={event => event.currentTarget.blur()}
                                    min="0"
                                />
                            </div>
                            <h4 className="text-base font-bold">Date</h4>
                            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                                <Input
                                    type="date"
                                    name="date"
                                    value={formData.travelDate}
                                    onChange={({ target }) => setFormData({ ...formData, travelDate: target.value })}
                                    className="relative w-full"
                                    placeholderKey="Weight"
                                    required={true}
                                    errorKey={""}
                                    variant="solid"
                                    id="date"
                                />
                            </div>
                            <div className="flex items-center justify-start text-sm md:text-base pt-4">
                                <span className="w-6 h-6 me-2 lg:me-2 flex items-center justify-center flex-shrink-0">
                                    <BsArrowRightCircle className="w-4 h-4" />
                                </span>
                                <a href="https://www.youtube.com/watch?v=MnKRdirIbbc&ab_channel=UniShoprInc" onClick={openVideo}>
                                    <u>
                                        <span> How to order from abroad with Unishopr </span>
                                    </u>
                                </a>
                            </div>
                            <div className="relative">
                                {isLoading
                                    ? <Button
                                        type="submit"
                                        className="h-10 lg:h-10 mt-1 text-sm lg:text-base sm:w-auto float-right disabled:opacity-75"
                                        disabled
                                    >
                                        Loading...
                                    </Button>
                                    : <Button
                                        type="submit"
                                        className="h-10 lg:h-10 mt-1 text-sm lg:text-base sm:w-auto float-right"
                                    >
                                        Add Travel
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
                <LoginForm action={() => { setAuthModal(false) }} />
            </Modal>

            {
                typeof window !== "undefined" &&
                (
                    <ModalVideo
                        channel="youtube"
                        // autoplay
                        isOpen={isOpen}
                        videoId="MnKRdirIbbc"
                        onClose={() => setOpen(false)}
                    />
                )
            }
        </>
    )
}

export default Travel;