import React, { FC, FormEvent, useState } from "react";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { usePartnerRequestMutation } from "@redux/services/account/api";

const PartnerForm: FC<{ setPartnerModal: any }> = ({ setPartnerModal }) => {
    const [formData, setFormData] = useState({
        overview: "",
    });
    const [partnerRequest, partnerRequestParams] = usePartnerRequestMutation();

    const placeOrder = (e: FormEvent) => {
        e.preventDefault();
        setPartnerModal({ show: false })
        console.log(formData.overview)
        partnerRequest({
            data: formData,
        });
    }

    return (
        <div className="bg-white rounded-lg w-full">
            <div className="px-5 md:px-20 py-20">

                <div className="flex flex-col justify-start items-start">
                    <h2 className="text-3xl sm:py-5">Partner Form</h2>
                    <p>Please tell us about your business and describe your experiences, tell us little bit about yourself. We will review your application.</p>
                </div>

                <div className="md:flex mt-8">
                    <div className="w-full">
                        <div className="pt-12 md:pt-0">
                            <form onSubmit={placeOrder} >
                                <TextArea
                                    name="overview"
                                    value={formData.overview}
                                    labelKey="Overview"
                                    onChange={({ target }) => setFormData({ ...formData, overview: target.value })}
                                    className="w-full"
                                />
                                <div className="flex flex-col justify-end items-end sm:justify-end sm:items-end mt-4">
                                    <Button
                                        className="w-full sm:w-auto"
                                        variant="slim"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerForm;
