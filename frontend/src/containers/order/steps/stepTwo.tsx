import Button from "@components/ui/button";
import Input from "@components/ui/input";
import TextArea from "@components/ui/text-area";
import React, { FC, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { Constants } from "@utils/constants";
import { deleteFile, uploadPhoto, } from "@utils/fileUpload";

const OrderStepTwo: FC<{
    step: number,
    setStep: (step: number) => void,
    formData: any,
    setFormData: (value: any) => void,
    isLoading: boolean,
}> = (props) => {
    const [uploadState, setUploadState] = useState({ isUploading: false, percentage: 0 });
    const setPhotoUploading = (percentage: number) => setUploadState({ ...uploadState, percentage: percentage });

    const uploadProductPhoto = (file: File) => {
        setUploadState({ ...uploadState, isUploading: true })
        uploadPhoto(file, Constants.S3_LEADS(props.formData.name), setPhotoUploading, (cb: any) => {
            props.setFormData({ ...props.formData, photo: cb.key ? cb.key : cb.Key })
            setUploadState({ ...uploadState, isUploading: false })
        }).then(r => null)
    }

    const productPhotoDelete = (key: string) => {
        deleteFile(key, () => {
            props.setFormData({ ...props.formData, photo: "" })
        })
    }

    const preventMinus = (e: any) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    return (
        <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
            <div className="flex h-full flex-col mx-auto w-full md:w-1/2 border-2 border-solid border-gray rounded-lg p-4 md:p-12">
                <div className="flex flex-col space-y-3">
                    <h4 className="text-base font-bold">Product link</h4>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                        <Input
                            name="url"
                            value={props.formData.url}
                            onChange={({ target }) => props.setFormData({ ...props.formData, url: target.value })}
                            className="relative w-full text-red-900"
                            placeholderKey="Product link"
                            required={true}
                            errorKey={""}
                            variant="disabled"
                            disabled
                        />
                    </div>
                    {/*<h4 className="text-base font-bold">Product name</h4>*/}
                    {/*<div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">*/}
                    {/*    <Input*/}
                    {/*        name="name"*/}
                    {/*        value={props.formData.name}*/}
                    {/*        onChange={({ target }) => props.setFormData({ ...props.formData, name: target.value })}*/}
                    {/*        className="relative w-full"*/}
                    {/*        placeholderKey="Product Name"*/}
                    {/*        required={true}*/}
                    {/*        errorKey={""}*/}
                    {/*        variant="solid"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<h4 className="text-base font-bold">Product image</h4>*/}
                    {/*{props.formData.photo && (*/}
                    {/*    <div>*/}
                    {/*        <img height="240" width="320" src={Constants.S3_BASE_URL(props.formData?.photo)} alt="photo" />*/}
                    {/*        <div>*/}
                    {/*            <span*/}
                    {/*                className="text-sm font-bold text-white cursor-pointer"*/}
                    {/*                onClick={() => productPhotoDelete(props.formData.photo)}*/}
                    {/*            >*/}
                    {/*                <FiTrash className="w-10 h-10 bg-red-500 p-2 rounded-md" />*/}
                    {/*            </span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {/*{!props.formData.photo && (*/}
                    {/*    <div className="flex justify-start">*/}
                    {/*        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">*/}
                    {/*            <label htmlFor="photo">*/}
                    {/*                <div className="border-2 border-gray-300 p-4 py-6 rounded grid grid-cols-1 gap-1 place-items-center cursor-pointer">*/}
                    {/*                    <BsCamera className="w-12 h-12" />*/}
                    {/*                    <h1 className="text-sm">Upload image {uploadState.percentage ? `(${uploadState.percentage}%)` : null}</h1>*/}
                    {/*                </div>*/}
                    {/*            </label>*/}
                    {/*            <Input*/}
                    {/*                type="file"*/}
                    {/*                id="photo"*/}
                    {/*                name="photo"*/}
                    {/*                value={props.formData.photo}*/}
                    {/*                onChange={(event: React.ChangeEvent<HTMLInputElement>) => uploadProductPhoto(event.target.files![0])}*/}
                    {/*                className="relative w-full hidden"*/}
                    {/*                placeholderKey="Product Image"*/}
                    {/*                errorKey={""}*/}
                    {/*                variant="solid"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {/*<h4 className="text-base font-bold">Price on {props.formData.url.match(/www.([A-Za-z_0-9.-]+)/i) ? props.formData.url.match(/www.([A-Za-z_0-9.-]+)/i)[0] : props.formData.url}</h4>*/}
                    {/*<div className="flex">*/}
                    {/*    <div className="w-8 flex items-center justify-center bg-blue-lighter border-t border-l border-b border-gray-300 rounded-l text-blue-dark">$</div>*/}
                    {/*    <Input*/}
                    {/*        type="number"*/}
                    {/*        name="price"*/}
                    {/*        value={props.formData.price}*/}
                    {/*        onChange={({ target }) => props.setFormData({ ...props.formData, price: target.value })}*/}
                    {/*        className="w-full"*/}
                    {/*        inputClassName="rounded-l-none"*/}
                    {/*        placeholderKey="Price"*/}
                    {/*        required={true}*/}
                    {/*        errorKey={""}*/}
                    {/*        variant="solid"*/}
                    {/*        min="0"*/}
                    {/*        onKeyPress={preventMinus}*/}
                    {/*        onWheel={event => event.currentTarget.blur()}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<h5>Confirm the retail price of your item (does not include cost of delivery).</h5>*/}
                    <h4 className="text-base font-bold">Quantity</h4>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                        <Input
                            type="number"
                            name="quantity"
                            value={props.formData.quantity}
                            onChange={({ target }) => props.setFormData({ ...props.formData, quantity: target.value })}
                            className="relative w-full"
                            placeholderKey="Quantity"
                            required={true}
                            errorKey={""}
                            variant="solid"
                            onKeyPress={preventMinus}
                            onWheel={event => event.currentTarget.blur()}
                        />
                    </div>
                    {/*<h4 className="text-base font-bold">Weight (kg)</h4>*/}
                    {/*<div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">*/}
                    {/*    <Input*/}
                    {/*        type="number"*/}
                    {/*        name="weight"*/}
                    {/*        value={props.formData.weight}*/}
                    {/*        onChange={({ target }) => props.setFormData({ ...props.formData, weight: target.value })}*/}
                    {/*        className="relative w-full"*/}
                    {/*        placeholderKey="Weight"*/}
                    {/*        required={true}*/}
                    {/*        errorKey={""}*/}
                    {/*        variant="solid"*/}
                    {/*        onKeyPress={preventMinus}*/}
                    {/*        onWheel={event => event.currentTarget.blur()}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <h5>Tell us how many you want.</h5>
                    <h4 className="text-base font-bold">Product details</h4>
                    <TextArea
                        name="description"
                        value={props.formData.description}
                        onChange={({ target }) => props.setFormData({ ...props.formData, description: target.value })}
                        className="relative mb-4"
                        placeholderKey="Product details"
                    />
                    <h5>Provide as much information about the product as you can, so that the traveler buys the correct item.</h5>
                    <h4 className="text-base font-bold">With Box?</h4>
                    <div className="flex items-center justify-center w-full mb-12">
                        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                            <div>Requiring the box may reduce the number of offers you receive. Travelers generally prefer to deliver orders without the box, to save space.</div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={props.formData.isBoxNeeded}
                                    onChange={({ target }) => props.setFormData({ ...props.formData, isBoxNeeded: !props.formData.isBoxNeeded })}
                                    id="toggleB"
                                    className="sr-only"
                                />
                                <div className="block bg-gray-300 w-14 h-8 rounded-full" />
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
                            </div>
                        </label>
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
                                disabled
                                loading={props.isLoading}
                            >
                                Loading...
                            </Button>
                            : <Button
                                type="submit"
                                className="h-10 lg:h-10 mt-1 text-sm lg:text-base sm:w-auto float-right"
                            >
                                Submit
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStepTwo;