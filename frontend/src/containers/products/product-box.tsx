import {Constants} from "@utils/constants";
import Link from "next/link";
import {getProductDiscount} from "@utils/utilities";
import cn from "classnames";
import Counter from "@components/common/counter";
import Button from "@components/ui/button";
import {addToCart} from "@utils/addToCart";
import {FC, useEffect, useState} from "react";
import {Product} from "@redux/services/landing/type";

import {useAddLeadMutation} from "@redux/services/order/api";
import Router from "next/router";
import Modal from "@components/common/modal/modal";
import LoginForm from "@containers/auth/login-form";

type AttributeType = {
    attribute: string,
    option: string,
    price: number
}[]

const ProductBox: FC<{product: Product | null}> = ({product}) => {
    const [attributes, setAttributes] = useState<AttributeType>([]);
    const [productPrice, setProductPrice] = useState({regular: 0, new: 0, isDiscount: false});
    const [quantity, setQuantity] = useState(1);
    const [authModal, setAuthModal] = useState(false);
    const [leadData, setLeadData] = useState({
        leadId: "",
        url: "",
        name: "",
        photo: "",
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
        if (product?._id) setProductPrice({
            regular: product.price.regular,
            new: product.price.new,
            isDiscount: getProductDiscount(product.price, product.discount).availability
        })
        const photo = product?.file?.cover ? Constants.S3_BASE_URL(product?.file.cover) : ""
        setLeadData({
            ...leadData,
            name: product?.name ?? "",
            photo: photo ,
            price: product ? getProductDiscount(product?.price, product?.discount).availability ? product.price.new : product?.price.regular : 0,
            quantity: quantity,
            description: product?.description.short ?? "",
            url: product?.url || "#",
        })
    }, [product, quantity])

    useEffect(() => {
        const sumAttr = attributes.reduce((a, b) => +a + +b.price, 0);
        if (sumAttr && product?._id) setProductPrice({
            ...productPrice,
            regular: product.price.regular + sumAttr,
            new: getProductDiscount(product.price, product.discount).availability ? getProductDiscount({regular: product.price.regular + sumAttr, new: product.price.new + sumAttr}, product.discount).regularDiscount : product.price.new + sumAttr,
        })
    }, [attributes])

    const attributeSelected = (attribute: any, option: any) => {
        let tempAttr = JSON.parse(JSON.stringify(attributes));

        const prevIndex = tempAttr.findIndex((item: any) => item.attribute === attribute.title);
        if (prevIndex !== -1) tempAttr.splice(prevIndex, 1)
        setAttributes([...tempAttr, {attribute: attribute.title, option: option.title, price: option.price}])
    }

    const isAttributeSelected = (attribute: any, option: any) => {
        const prevAttr = attributes.find((item: any) => item.attribute === attribute.title);
        return prevAttr && prevAttr.option === option.title
    }

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
                        src={product?.file?.cover ? Constants.S3_BASE_URL(product?.file.cover) : "/assets/placeholder/order-product.svg"}
                        alt={product?.name}
                        className="lg:object-cover lg:w-full lg:h-full"
                    />
                </div>

                <div className="flex flex-col p-5 md:p-8 w-full ">
                    <div className="pb-5 block max-w-[400px]">
                        <Link
                            href={`/product/${product?._id}`}
                            className="mb-2 md:mb-2.5 block -mt-1.5"
                            role="button"
                        >
                            <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                                {product?.name}
                            </h2>
                        </Link>
                        <Link
                            href={product?.url ?? "#"}
                            className="mb-2 md:mb-2.5 "
                            role="button"
                        >
                            <a target="_blank">
                                <h2 className="text-sm md:sm lg:text-sm hover:text-black text-blue-400 mb-2 break-words whitespace-normal">
                                    {product?.url}
                                </h2>
                            </a>

                        </Link>

                        <div className="flex items-center mt-3">
                            {product &&
                            getProductDiscount(product?.price, product?.discount).availability ?
                                <>
                                    <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                                        ৳ {productPrice.new}
                                    </div>
                                    <del className="font-segoe text-gray-400 text-base lg:text-xl ps-2.5 -mt-0.5 md:mt-0">
                                        ৳ {productPrice.regular}
                                    </del>
                                </>
                                :
                                <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                                    ৳ {productPrice.regular}
                                </div>
                            }
                        </div>
                    </div>

                    {product?.attributes?.map((attribute: any, ai: number) => (
                        <div className="mb-4" key={ai}>
                            <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
                                {attribute?.title}
                            </h3>
                            <ul className="colors flex flex-wrap -me-3">
                                {attribute?.options?.map((option: any, oi: number) => (
                                    <li
                                        key={oi}
                                        className={cn(
                                            "cursor-pointer rounded border border-gray-100 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
                                            {
                                                "border-black": isAttributeSelected(attribute, option),
                                            }
                                        )}
                                        onClick={() => attributeSelected(attribute, option)}
                                    >
                                        {option?.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

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
                                className={`w-full h-11 md:h-12 px-1.5 ${
                                    !product?.stock?.quantity && "bg-gray-400 hover:bg-gray-400"
                                }`}
                                disabled={!product?.stock?.quantity}
                                loading={false}
                            >
                                {!product?.stock?.quantity ? "Out of Stock" : "Request"}
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

export default ProductBox;