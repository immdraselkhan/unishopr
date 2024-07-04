import Layout from "@components/layout/layout";
import PartnerForm from "@components/common/form/partner-form";
import Button from "@components/ui/button";
import Modal from "@components/common/modal/modal";
import { useState } from "react";
import Protected from "@components/layout/protected";
import { Constants } from "@utils/constants";
import LoginForm from "@containers/auth/login-form";

export default function AboutUsPage() {
    const [partnerModal, setPartnerModal] = useState({ show: false });
    const [authModal, setAuthModal] = useState(false);

    const handleOk = () => {
        const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
        if (accessToken) {
            setPartnerModal({ show: true })
        } else {
            setAuthModal(true)
        }
    }

    return (
        <>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover mt-20">
                <div className="w-full flex items-center justify-center relative z-10 pt-10 pb-1">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
                        <span className="font-satisfy block font-normal mb-3">
                            Join
                        </span>
                        Unishopr for Business
                    </h2>
                </div>
            </div>
            <div className="my-8 lg:my-10 xl:my-12 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-4/7">
                <div className="flex flex-col md:flex-row">
                    <div className="mb-10">
                        <div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose text-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, ab? Numquam accusantium eaque adipisci rem ut tempore nobis. Maiores aperiam dignissimos possimus molestiae cum recusandae sed vel atque earum blanditiis ut voluptatum, eum necessitatibus, quas ex! Voluptatum repellat eligendi eius vel culpa ea mollitia dolorem minus hic numquam vitae autem, corrupti aliquid incidunt unde nihil similique ut est ducimus ullam nam magnam. Saepe molestias incidunt similique dignissimos, nam ratione voluptate.
                        </div>
                        <img
                            src="https://dummyimage.com/16:9x1080/"
                            // width={width < 480 ? 450 : 1190}
                            // height={width < 480 ? 150 : 450}
                            // alt={bannerStaticOne?.name}
                            className="bg-gray-300 object-cover w-full mt-10"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover mt-10">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
                    Lorem Ipsum Dolorsit
                </h2>
            </div>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover mt-10">
                <Button
                    onClick={() => handleOk()}
                >Get Started
                </Button>
            </div>
            <div className="my-8 lg:my-10 xl:my-12 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-4/7">
                <div className="flex flex-col md:flex-row">
                    <div className="flex mb-10">
                        <div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose px-4">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-6">Title</h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quo dolorem eveniet itaque ratione eum, dignissimos voluptate est voluptas soluta vel doloribus libero enim ipsa odio voluptatum dolores nobis perspiciatis incidunt laboriosam. Error officia minima veritatis fugit ut ratione dolore!
                        </div>
                        <div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose px-4">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-6">Title</h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quo dolorem eveniet itaque ratione eum, dignissimos voluptate est voluptas soluta vel doloribus libero enim ipsa odio voluptatum dolores nobis perspiciatis incidunt laboriosam. Error officia minima veritatis fugit ut ratione dolore!
                        </div>
                    </div>
                </div>
            </div>

            <Modal open={partnerModal.show} onClose={() => setPartnerModal({ show: false })}>
                <Protected>
                    <PartnerForm setPartnerModal={setPartnerModal} />
                </Protected>
            </Modal>
            <Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
                <LoginForm action={() => {
                    setAuthModal(false);
                }} />
            </Modal>

            {/* <Subscription /> */}
        </>
    );
}

AboutUsPage.Layout = Layout;
