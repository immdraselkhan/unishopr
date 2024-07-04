import React, { FormEvent, useEffect, useState } from "react";
import Container from "@components/ui/container";
import Router, { useRouter } from "next/router";
import { useAddLeadMutation } from "@redux/services/order/api";
import OrderStepOne from "./steps/stepOne";
import OrderStepTwo from "./steps/stepTwo";
import OrderStepThree from "./steps/stepThree";
import OrderStepFour from "./steps/stepFour";
import Modal from "@components/common/modal/modal";
import LoginForm from "@containers/auth/login-form";
import { Constants } from "@utils/constants";
import { useScrapperMutation } from "@redux/services/scraping/api";
import {uploadBase64} from "@utils/fileUpload";

const Order = () => {
    const router = useRouter();
    const { url } = router.query;
    const [addLead, { isLoading }] = useAddLeadMutation();
    const [step, setStep] = useState(1);
    const [authModal, setAuthModal] = useState(false);
    const [scrapper, scrapperParam] = useScrapperMutation();
    const [formData, setFormData] = useState({
        leadId: "",
        url: "",
        name: "",
        photo: "",
        productId: "",
        currency: "BDT",
        price: 0,
        quantity: 0,
        weight: 0,
        isBoxNeeded: false,
        description: "",
        route: {
            fromCityId: "",
            toCityId: ""
        },
        checkout: {
            shipmentCost: 0,
            travelerCharge: 0,
            deliveryCharge: 0,
            unishoprCharge: 0,
            totalAmount: 0
        },
    })

    useEffect(() => {
        if (url && typeof url === "string") {
            setFormData({ ...formData, url });
            if (step < 4) setStep(step + 1)
        }
    }, [url])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
        if (step === 1) {
            if (accessToken) {
                router.push(`/order?url=${formData.url}`)
                // scrapper({
                //     url: formData.url,
                //     action: async (data: any) => {
                //         await Router.push(`${window.location.origin}${window.location.pathname}?url=${formData.url}`);
                //         if (data?.title) await setFormData({...formData, name: data.title})
                //         if (data?.title && data?.img) await uploadImage({name: data?.title ? data?.title : formData.name, base64: data?.img ? data?.img : ""})
                //         await updateLead({name: data?.title ? data?.title : formData.name})
                //     }
                // }).then((res: any) => {
                //     if (res?.error) updateLead()
                // })
            }
            else setAuthModal(true)
        } else updateLead()
    }

    const updateLead = (params?: {name?: string}) => {
        const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
        if (accessToken) addLead({
            data: {...formData, name: params?.name ? params?.name : formData.name},
            action: (leadId: string) => {
                setFormData({ ...formData, name: params?.name ? params?.name : formData.name, leadId });
                (step < 2) ? setStep(step + 1) : Router.push("/account/orders/pending");
            }
        })
    }

    const uploadImage = async (params: {name: string, base64: string}) => {
        if (params.base64) await uploadBase64(params.base64, params.name, Constants.S3_LEADS(params.name), () => console.log("uploading"), (cb: any) => {
            setFormData({ ...formData, photo: cb.key ? cb.key : cb.Key, name: params.name })
            // setUploadState({ ...uploadState, isUploading: false })
        }).then((r: any) => null)
    }

    return (
        <Container>
            <form onSubmit={handleSubmit} autoComplete="off">
                {step === 1 ? (<OrderStepOne step={step} setStep={setStep} formData={formData} setFormData={setFormData} isLoading={scrapperParam.isLoading} />) : null}
                {step === 2 ? (<OrderStepTwo step={step} setStep={setStep} formData={formData} setFormData={setFormData} isLoading={isLoading} />) : null}
                {step === 3 ? (<OrderStepThree step={step} setStep={setStep} formData={formData} setFormData={setFormData} isLoading={isLoading} />) : null}
                {step === 4 ? (<OrderStepFour step={step} setStep={setStep} formData={formData} setFormData={setFormData} isLoading={isLoading} />) : null}
            </form>

            <Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
                <LoginForm action={() => {
                    setAuthModal(false)
                    if (step === 1) Router.push(`${window.location.origin}${window.location.pathname}?url=${formData.url}`)
                    else {
                        // @ts-ignore
                        document.getElementById("step-one-submit-button").click();
                    }
                }} />
            </Modal>
        </Container >
    )
}

export default Order;