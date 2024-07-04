import {Constants} from "@utils/constants";
import Link from "next/link";
import {getProductDiscount} from "@utils/utilities";
import cn from "classnames";
import Counter from "@components/common/counter";
import Button from "@components/ui/button";
import {addToCart} from "@utils/addToCart";
import {FC, useEffect, useState} from "react";
import {LeadProduct, Product} from "@redux/services/landing/type";

import {useAddLeadMutation} from "@redux/services/order/api";
import Router from "next/router";
import Modal from "@components/common/modal/modal";
import LoginForm from "@containers/auth/login-form";

const OrderProductBox: FC<{product: LeadProduct | null}> = ({product}) => {
    const [quantity, setQuantity] = useState(1);
    const [authModal, setAuthModal] = useState(false);
    const [leadData, setLeadData] = useState({
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
    });

    const [addLead, { isLoading }] = useAddLeadMutation();

    useEffect(() => {
        setLeadData({
            ...leadData,
            name: product?.name || "",
            photo: product?.photo || "",
            price: product?.price || 0,
            quantity: quantity,
            description: product?.description || "",
            url: product?.url || "#",
        })
    }, [product])

    const leadRequest = () => {
        const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
        if (accessToken) {
            addLead({data:{...leadData},
                action: (leadId: string) => {
                    setLeadData({ ...leadData,  });
                    setAuthModal(false);
                    Router.push("/account/orders/pending");
                }}
            )
        } else setAuthModal(true);
    }
    
    return (
        <div className="rounded-lg bg-white">
            <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
                <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
                    <img
                        src={product?.photo ? Constants.S3_BASE_URL(product?.photo) : "/assets/placeholder/order-product.svg"}
                        alt={product?.name}
                        className="lg:object-cover lg:w-full lg:h-full"
                    />
                </div>

                <div className="flex flex-col p-5 md:p-8 w-full">
                    <div className="pb-5">
                        <Link
                            href={`/product/${product?.url}`}
                            className="mb-2 md:mb-2.5 block -mt-1.5"
                            role="button"
                        >
                            <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                                {product?.name}
                            </h2>
                        </Link>
                        <p className="text-sm leading-6 md:text-body md:leading-7">
                            {product?.description}
                        </p>

                        <div className="flex items-center mt-3">
                                <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                                    ৳ {product?.price}
                                </div>
                        </div>
                    </div>
                    <div className="pt-2 md:pt-4">
                        <div className="flex items-center justify-between mb-4 space-s-3 sm:space-s-4">
                            <Counter
                                quantity={quantity}
                                onIncrement={() => setQuantity((prev) => prev + 1)}
                                onDecrement={() =>
                                    setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                                }
                                disableDecrement={quantity === 1}
                            />
                            {/*<Button*/}
                            {/*    onClick={() => addToCart(product, attributes, productPrice, quantity)}*/}
                            {/*    variant="flat"*/}
                            {/*    className={`w-full h-11 md:h-12 px-1.5 ${*/}
                            {/*        !product?.stock?.quantity && "bg-gray-400 hover:bg-gray-400"*/}
                            {/*    }`}*/}
                            {/*    disabled={!product?.stock?.quantity}*/}
                            {/*    loading={false}*/}
                            {/*>*/}
                            {/*    {!product?.stock?.quantity ? "Out of Stock" : "Add to Cart"}*/}
                            {/*</Button>*/}
                            <Button
                                onClick={() => leadRequest()}
                                variant="flat"
                                className={`w-full h-11 md:h-12 px-1.5 `}
                                // disabled={!product?.stock?.quantity}
                                loading={false}
                            >
                                {"Request"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
                <LoginForm action={() => {
                    setAuthModal(false);
                }} />
            </Modal>
        </div>
    )
}

export default OrderProductBox;