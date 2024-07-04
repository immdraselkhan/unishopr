import Button from "@components/ui/button";
import Input from "@components/ui/input";
import React, { FC, useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import { BsArrowRightCircle, BsFillPlayCircleFill } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const OrderStepOne: FC<{
    step: number,
    setStep: (step: number) => void,
    formData: any,
    setFormData: (value: any) => void,
    isLoading: boolean,
}> = (props) => {
    const checkURL = (target: HTMLInputElement) => {
        if (!/^https?:\/\//i.test(target.value)) {
            return target.value = "https://" + target.value;
        }
        else {
            return target.value;
        }
    }

    const [isOpen, setOpen] = useState(false);
    const openVideo = (e: any) => {
        e.preventDefault();
        setOpen(true);
    }

    return (
        <>
            <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
                <div className=" flex h-full flex-col mx-auto lg:w-3/4 ">
                    <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
                        <h4 className="text-2xl md:text-5xl 2xl:text-3xl font-bold text-heading">
                            Request products from USA, India and Malaysia
                        </h4>
                    </div>
                    <div className="flex flex-col space-y-5 text-semibold">
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                            <div className="flex items-center me-2 justify-start text-sm md:text-base">
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
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                            <Input
                                name="url"
                                value={props.formData.url}
                                onChange={({ target }) => props.setFormData({ ...props.formData, url: target.value })}
                                className="relative w-full"
                                placeholderKey="Paste the URL of the product"
                                required={true}
                                errorKey={""}
                                type="url"
                                /*pattern="https://www.*|http://www.*"*/
                                variant="solid"
                            />
                            <div className="relative">
                                {props.isLoading
                                    ? <Button
                                        type="submit"
                                        id="step-one-submit-button"
                                        className="h-11 lg:h-11 text-sm lg:text-base w-full sm:w-auto disabled:opacity-75"
                                        disabled
                                        loading={props.isLoading}
                                    >
                                        Loading...
                                    </Button>
                                    : <Button
                                        type="submit"
                                        id="step-one-submit-button"
                                        className="h-11 lg:h-11 text-sm lg:text-base w-full sm:w-auto flex"
                                    >
                                        Request
                                    </Button>
                                }
                            </div>
                        </div>
                        <div className="flex items-center justify-start text-sm md:text-base">
                            <span className="w-6 h-6 me-2 lg:me-2 flex items-center justify-center flex-shrink-0">
                                <BsArrowRightCircle className="w-4 h-4" />
                            </span>

                            <a href="https://www.youtube.com/watch?v=MnKRdirIbbc&ab_channel=UniShoprInc" onClick={openVideo}>
                                <u>
                                    <span> How to order from abroad with Unishopr </span>
                                </u>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
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

export default OrderStepOne;