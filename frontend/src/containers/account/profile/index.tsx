import Input from "@components/ui/input";
import React, { useState, FormEvent, useEffect, ChangeEvent, Fragment } from "react";
import Button from "@components/ui/button";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { useGetUserQuery } from "@redux/services/account/api";
import { useUpdateUserMutation, useUpdateProfilePictureMutation } from "@redux/services/account/api";
import { deleteFile, uploadPhoto } from "@utils/fileUpload";
import { Constants } from "@utils/constants";

const AccountDetails = () => {
    const user = useGetUserQuery("")
    const userData = user?.data?.data
    const [updateUser, updateUserParams] = useUpdateUserMutation();
    const [updateProfilePicture, updateProfilePictureParams] = useUpdateProfilePictureMutation();
    const [photoUploading, setPhotoUploading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        photo: "",
        social: {
            facebook: "",
            linkedin: "",
            instagram: "",
            twitter: ""
        },
        overview: "",
    });

    useEffect(() => {
        if (userData) setFormData({
            photo: userData.photo,
            firstName: userData.firstName,
            lastName: userData.lastName,
            social: {
                facebook: userData.social.facebook,
                linkedin: userData.social.linkedin,
                instagram: userData.social.instagram,
                twitter: userData.social.twitter
            },
            overview: userData.overview,
        })
    }, [userData])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        updateUser(formData)
    }

    const uploadProfilePhoto = (file: File) => {
        setPhotoUploading(true)
        // @ts-ignore
        uploadPhoto(file, Constants.S3_PROFILES(`${userData.firstName} ${userData.lastName}`), setPhotoUploading, (cb: any) => {
            updateProfilePicture({ photo: cb.key ? cb.key : cb.Key })
            setFormData({ ...formData, photo: cb.key ? cb.key : cb.Key })
            setPhotoUploading(false);
        }).then((r: any) => null)
    }

    const fileDelete = (key: string) => {
        deleteFile(key, () => {
            updateProfilePicture({ photo: null })
            setFormData({ ...formData, photo: "" })
        })
    }

    return (
        <motion.div
            layout
            initial="from"
            animate="to"
            exit="from"
            //@ts-ignore
            variants={fadeInTop(0.35)}
            className={`w-full `}
        >
            <div className="flex justify-center mx-auto">
                {formData.photo ? (<img className="w-36 h-36 rounded-full border-gray-900 border-2" src={Constants.S3_BASE_URL(formData.photo)} alt="Profile image" />) : null}
                <div className="mb-15">
                    {
                        formData.photo && !photoUploading ? (
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mb-5"
                            onClick={() => fileDelete(formData.photo)}
                        >
                            {photoUploading ? "Loading..." : <FiEdit />}
                        </button>
                    ) : (
                        <Fragment>
                            <label
                                className="w-36 h-36 rounded-full flex flex-col items-center px-4 py-6 bg-white text-gray-900 rounded-lg shadow-lg tracking-wide  border-2 border-gray-900 cursor-pointer hover:bg-blue hover:text-gray-400">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-sm text-center ">{photoUploading ? "Loading..." : "Upload Profile Photo"}</span>
                                <input
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => uploadProfilePhoto(event.target.files![0])}
                                    className={"hidden"} aria-describedby="file_input_help" id="file_input" type="file" />
                            </label>
                        </Fragment>
                    )}
                </div>
            </div>

            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                Account Details
            </h2>
            <form
                onSubmit={handleSubmit}
                className="w-full mx-auto flex flex-col justify-center "
                noValidate
            >
                <div className="flex flex-col space-y-4 sm:space-y-5">
                    <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
                        <Input
                            name="firstName"
                            value={formData.firstName}
                            labelKey="First Name"
                            onChange={({ target }) => setFormData({ ...formData, firstName: target.value })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                        />
                        <Input
                            name="lastName"
                            value={formData.lastName}
                            labelKey="Last Name"
                            onChange={({ target }) => setFormData({ ...formData, lastName: target.value })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
                        <Input
                            name="facebook"
                            value={formData.social.facebook?? ""}
                            labelKey="Facebook"
                            onChange={({ target }) => setFormData({ ...formData, social: { ...formData.social, facebook: target.value } })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                        />
                        <Input
                            name="linkedin"
                            value={formData.social.linkedin ?? ""}
                            labelKey="Linkedin"
                            onChange={({ target }) => setFormData({ ...formData, social: { ...formData.social, linkedin: target.value } })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
                        <Input
                            name="twitter"
                            value={formData.social.twitter ?? ""}
                            labelKey="Twitter"
                            onChange={({ target }) => setFormData({ ...formData, social: { ...formData.social, twitter: target.value } })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                        />
                        <Input
                            name="instagram"
                            value={formData.social.instagram ?? ""}
                            labelKey="Instagram"
                            onChange={({ target }) => setFormData({ ...formData, social: { ...formData.social, instagram: target.value } })}
                            variant="solid"
                            className="w-full sm:w-1/2"
                        />
                    </div>
                    <Input
                        name="overview"
                        value={formData.overview ?? ""}
                        labelKey="Overview"
                        onChange={({ target }) => setFormData({ ...formData, overview: target.value })}
                        variant="solid"
                        className="w-full"
                    />

                    <div className="relative">
                        <Button
                            type="submit"
                            className="h-12 mt-3 w-full sm:w-32"
                            onClick={(event) => handleSubmit(event)}
                            disabled={updateUserParams.isLoading}
                        >
                            {updateUserParams.isLoading ? 'Loading...' : 'Update'}
                        </Button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default AccountDetails;
