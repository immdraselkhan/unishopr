import Input from "@components/ui/input";
import Button from "@components/ui/button";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { Carts, setLocalCart, localCountry, userInfo } from "@utils/auth";
import { useGetUserQuery, useManualPayMutation, useSslPayMutation } from "@redux/services/account/api";
import { Constants } from "@utils/constants";
import { useRouter } from "next/router";
import { CheckBox } from "@components/ui/checkbox";
import { RadioBox } from "@components/ui/radiobox";
import { FiTrash } from "react-icons/fi";
import { BsCamera } from "react-icons/bs";
import { deleteFile, uploadPhoto } from "@utils/fileUpload";
import { errorAlert } from "@utils/alert";
import { useCheckCouponMutation } from "@redux/services/order/api";
import Link from "@components/ui/link";
import TextArea from "@components/ui/text-area";

const Checkout = () => {
    const user = userInfo();
    const router = useRouter();
    const country = localCountry();
    const accountInfo = useGetUserQuery("");
    const [sslPay, sslPayParams] = useSslPayMutation();
    const [manualPay, manualPayParams] = useManualPayMutation();
    const [checkCoupon, checkCouponParams] = useCheckCouponMutation()

    const [cart, setCart] = useState<Carts>([]);
    const [selectedProduct, setSelectedProduct] = useState<Carts>([]);
    const [total, setTotal] = useState({ subTotal: 0, grandTotal: 0, adjustedGrandTotal: 0, discount: 0 });
    const [uploadState, setUploadState] = useState({ isUploading: false, percentage: 0 });
    const [orderButton, setOrderButton] = useState(true);
    const setPhotoUploading = (percentage: number) => setUploadState({ ...uploadState, percentage: percentage });

    const uploadProductPhoto = (file: File) => {
        setUploadState({ ...uploadState, isUploading: true })
        uploadPhoto(file, Constants.S3_SCREENSHOT(formData.firstName), setPhotoUploading, (cb: any) => {
            setFormData({ ...formData, screenshot: cb.key ? cb.key : cb.Key })
            setUploadState({ ...uploadState, isUploading: false })
        }).then(r => null)
    }

    const productPhotoDelete = (key: string) => {
        deleteFile(key, () => {
            setFormData({ ...formData, screenshot: "" })
        })
    }

    const [formData, setFormData] = useState({
        userId: user._id,
        phone: user.phone.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        address: "",
        gateway: "ssl",
        screenshot: "",
        code: "",
        agree: "",
    });

    useEffect(() => {
        if (accountInfo.data) setFormData({
            ...formData,
            userId: accountInfo.data ? accountInfo.data.data._id : "",
            phone: accountInfo.data?.data?.address?.length && accountInfo.data.data.address[0].phone ? accountInfo.data.data.address[0].phone : accountInfo.data ? `${accountInfo.data.data.phone?.country?.code}${accountInfo.data.data.phone?.phone}` : "",
            firstName: accountInfo.data?.data?.address?.length && accountInfo.data.data.address[0].firstName ? accountInfo.data.data.address[0].firstName : accountInfo.data ? accountInfo.data.data.firstName : "",
            lastName: accountInfo.data?.data?.address?.length && accountInfo.data.data.address[0].lastName ? accountInfo.data.data.address[0].lastName : accountInfo.data ? accountInfo.data.data.lastName : "",
            address: accountInfo.data?.data?.address?.length ? accountInfo.data.data.address[0].addressLine1 : "",
        });
    }, [accountInfo.data]);

    useEffect(() => {
        const localCart: any = typeof window !== "undefined" ? localStorage.getItem(Constants.LOCAL_CART) : null;
        const cart = JSON.parse(localCart);
        setSelectedProduct(cart);
        setCart(cart);
    }, [])

    const localCartChanged = () => {
        const localCart: any = typeof window !== "undefined" ? localStorage.getItem(Constants.LOCAL_CART) : null;
        const cart = JSON.parse(localCart);
        if (cart && localCart) {
            let total = 0;
            const selectedCart = cart.filter((c: any) => selectedProduct.find((s: any) => s._id === c._id));
            selectedCart.forEach((data: { total: number }) => total += data.total)
            setTotal({ subTotal: total, grandTotal: total, adjustedGrandTotal: total, discount: 0 })
            setCart(cart);
        }
    }

    const discountAmount = (coupon: any) => {
        if (coupon?.discount?.type === "percentage") {
            const percentageDiscount = (total.subTotal * (coupon?.discount?.value / 100))
            const price = (total.subTotal - (percentageDiscount > coupon.maxAmount ? coupon.maxAmount : Math.floor(percentageDiscount)))
            const discount = total.subTotal - price;
            setTotal({ ...total, grandTotal: price, adjustedGrandTotal: price, discount })
        }
        if (coupon?.discount?.type === "flat") {
            const price = (total.subTotal - (coupon?.discount?.value))
            const discount = total.subTotal - price;
            setTotal({ ...total, grandTotal: price, adjustedGrandTotal: price, discount })
        }
    }

    useEffect(() => {
        if (formData.gateway === "ssl") {
            const adjustedGrandTotal = Math.ceil(total.grandTotal + (total.grandTotal * 0.026))
            setTotal({ ...total, adjustedGrandTotal })
        }
        if (formData.gateway === "bKash") {
            const adjustedGrandTotal = Math.ceil(total.grandTotal + (total.grandTotal * 0.016))
            setTotal({ ...total, adjustedGrandTotal })
        }
        if (formData.gateway === "banking") {
            const adjustedGrandTotal = total.grandTotal
            setTotal({ ...total, adjustedGrandTotal })
        }
    }, [formData.gateway, total.grandTotal]);

    useEffect(() => {
        localCartChanged()
    }, [selectedProduct])

    const submitCoupon = async (e: FormEvent) => {
        e.preventDefault();
        await checkCoupon({
            data: { code: formData.code },
            action: (coupon: any) => discountAmount(coupon)
        });
    }

    const placeOrder = (e: FormEvent) => {
        e.preventDefault();

        setOrderButton(false)

        setTimeout(() => {
            setOrderButton(true)
        }, 5000);

        const params = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            address: formData.address,
            paymentFrom: 'web',
            amount: total.adjustedGrandTotal,
            price: total.subTotal,
            redirectUrl: `${window.location.origin}/account/orders/pending`,
            products: selectedProduct,
            couponId: checkCouponParams?.data?.data?._id ? checkCouponParams.data.data._id : "",
        }

        if (formData.gateway === "ssl") sslPay(params);
        else {
            if (formData.screenshot === "") {
                errorAlert({ title: "Please add the screenshot of your transaction!" });
                return;
            }
            manualPay({
                ...params,
                screenshot: formData.screenshot,
                gateway: formData.gateway
            })
        }
    }

    if (!sslPayParams.isError && sslPayParams.data) {
        window.history.pushState({}, '', `/account/orders/pending`)
        setTimeout(() => {
            router.replace(sslPayParams.data.data.GatewayPageURL);
            // router.reload();
        }, 500)
    }

    if (!manualPayParams.isError && manualPayParams.data) {
        window.history.pushState({}, '', `/account/orders/pending`)
        setTimeout(() => {
            // router.replace("/account/orders/pending");
            router.reload();
        }, 500)
    }

    const handleChange = (e: any) => {
        const { value } = e.target;
        if (selectedProduct.find((s: any) => s._id === value)) {
            setSelectedProduct(selectedProduct.filter((s: any) => s._id !== value))
        }
        else {
            const select = cart.find((c: any) => c._id === value);
            if (select) setSelectedProduct([...selectedProduct, select]);
        }
    };


    return (
        <div className="xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
            <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
                {
                    formData.gateway === "bKash" && (
                        <div className="mb-6">
                            <div className="flex">
                                <img
                                    src="/assets/images/bkash-merchant.jpeg"
                                    width={340}
                                    height={440}
                                    // loading={false}
                                    // quality={100}
                                    alt={"bkash"}
                                    className="bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                />
                            </div>
                            <h4 className="text-base font-bold">Screenshot</h4>
                            {formData.screenshot && (
                                <div>
                                    <img height="240" width="320" src={Constants.S3_BASE_URL(formData.screenshot)} alt="photo" />
                                    <div>
                                        <span
                                            className="text-sm font-bold text-white cursor-pointer"
                                            onClick={() => productPhotoDelete(formData.screenshot)}
                                        >
                                            <FiTrash className="w-10 h-10 bg-red-500 p-2 rounded-md" />
                                        </span>
                                    </div>
                                </div>
                            )}
                            {!formData.screenshot && (
                                <div className="flex justify-start">
                                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                                        <label htmlFor="photo">
                                            <div className="border-2 border-gray-300 p-4 py-6 rounded grid grid-cols-1 gap-1 place-items-center cursor-pointer">
                                                <BsCamera className="w-12 h-12" />
                                                <h1 className="text-sm">Upload Screenshot {uploadState.percentage ? `(${uploadState.percentage}%)` : null}</h1>
                                            </div>
                                        </label>
                                        <Input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            value={formData.screenshot}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => uploadProductPhoto(event.target.files![0])}
                                            className="relative w-full hidden"
                                            placeholderKey="Screenshot"
                                            errorKey={""}
                                            variant="solid"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                    )

                }{
                    formData.gateway === "banking" && (
                        <div className="mb-6 border-2 ">
                            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-2 xl:mb-6 text-center">
                                Pay Bia EFT
                            </h2>
                            <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
                                <span>Account Name</span>
                                <span className="ms-auto flex-shrink-0">UNISHOPR.COM</span>
                            </div>
                            <div className="flex p-4 rounded-md  text-sm font-semibold text-heading">
                                <span>Bank Name</span>
                                <span className="ms-auto flex-shrink-0">Eastern Bank Ltd. (EBL)</span>
                            </div>
                            <div className="flex p-4 rounded-md  bg-gray-150 text-sm font-semibold text-heading">
                                <span>Branch</span>
                                <span className="ms-auto flex-shrink-0">Mirpur Branch</span>
                            </div>
                            <div className="flex p-4 rounded-md   text-sm font-semibold text-heading">
                                <span>Account Number</span>
                                <span className="ms-auto flex-shrink-0">1071070377581</span>
                            </div>
                            <div className="flex p-4 rounded-md  bg-gray-150 text-sm font-semibold text-heading">
                                <span>Account Type</span>
                                <span className="ms-auto flex-shrink-0">CURRENT</span>
                            </div>
                            <div className="flex p-4 rounded-md  text-sm font-semibold text-heading">
                                <span>Routing</span>
                                <span className="ms-auto flex-shrink-0">095262987</span>
                            </div>
                            <h4 className="text-base font-bold">Screenshot</h4>
                            {formData.screenshot && (
                                <div>
                                    <img height="240" width="320" src={Constants.S3_BASE_URL(formData.screenshot)} alt="photo" />
                                    <div>
                                        <span
                                            className="text-sm font-bold text-white cursor-pointer"
                                            onClick={() => productPhotoDelete(formData.screenshot)}
                                        >
                                            <FiTrash className="w-10 h-10 bg-red-500 p-2 rounded-md" />
                                        </span>
                                    </div>
                                </div>
                            )}
                            {!formData.screenshot && (
                                <div className="flex justify-start">
                                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                                        <label htmlFor="photo">
                                            <div className="border-2 border-gray-300 p-4 py-6 rounded grid grid-cols-1 gap-1 place-items-center cursor-pointer">
                                                <BsCamera className="w-12 h-12" />
                                                <h1 className="text-sm">Upload Screenshot {uploadState.percentage ? `(${uploadState.percentage}%)` : null}</h1>
                                            </div>
                                        </label>
                                        <Input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            value={formData.screenshot}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => uploadProductPhoto(event.target.files![0])}
                                            className="relative w-full hidden"
                                            placeholderKey="Screenshot"
                                            errorKey={""}
                                            variant="solid"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                    Shipping Address
                </h2>
                <form
                    onSubmit={placeOrder}
                    className="w-full mx-auto flex flex-col justify-center "
                    noValidate
                >
                    <div className="flex flex-col space-y-4 lg:space-y-5">
                        <div className="flex flex-col sm:flex-row space-y-4 lg:space-y-0">
                            <Input
                                name="firstName"
                                value={formData.firstName}
                                labelKey="First Name"
                                onChange={({ target }) => setFormData({ ...formData, firstName: target.value })}
                                variant="solid"
                                className="w-full sm:w-1/2 sm:mt-4 lg:mt-0 lg:mr-3"
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
                        <Input
                            name="Phone"
                            value={formData.phone}
                            labelKey="Phone"
                            onChange={({ target }) => setFormData({ ...formData, phone: target.value })}
                            variant="solid"
                            className="w-full"
                        />
                        <TextArea
                            name="address"
                            value={formData.address}
                            labelKey="Address"
                            onChange={({ target }) => setFormData({ ...formData, address: target.value })}
                            className="w-full"
                        />
                        <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
                            <CheckBox
                                checked={formData.agree === "ok"}
                                onChange={() => setFormData({ ...formData, agree: formData.agree === "ok" ? "" : "ok" })}
                                labelKey={`Ordering, you agree to our `}
                            />
                            <Link
                                href="/about/terms"
                                className="text-heading underline hover:no-underline focus:outline-none"
                            >
                                terms
                            </Link>{" "}
                            &amp;{" "}
                            <Link
                                href="/about/order-policy"
                                className="text-heading underline hover:no-underline focus:outline-none"
                            >
                                policy
                            </Link>
                        </p>
                        {orderButton && selectedProduct.length !== 0 ? <div className="flex w-full">
                            <Button
                                className="w-full sm:w-auto"
                                loading={sslPayParams.isLoading}
                                disabled={formData.agree !== "ok"}
                            >
                                Place Order
                            </Button>
                        </div>
                            : <div className="flex w-full">
                                <Button
                                    className="w-full sm:w-auto"
                                    loading={sslPayParams.isLoading}
                                    disabled
                                >
                                    Place Order
                                </Button>
                            </div>
                        }
                    </div>
                </form>
            </div>
            <div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
                <div className="pt-12 md:pt-0 2xl:ps-4">
                    <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                        Your Order
                    </h2>
                    <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
                        <span>Product</span>
                        <span className="ms-auto flex-shrink-0">Total</span>
                    </div>

                    {cart.map((loopData, li) => (
                        <div className="border-b border-gray-300 py-4 items-center lg:px-3">
                            <div className="flex py-2" key={li}>
                                <div className="flex rounded-md w-16 h-16 flex-shrink-0 me-5">
                                    <input
                                        className="form-checkbox w-5 h-5 mr-1 border border-gray-600 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading"
                                        type="checkbox"
                                        name={loopData.name}
                                        value={loopData?._id}
                                        defaultChecked={true}
                                        id={loopData?._id}
                                        onChange={handleChange}
                                    />
                                    {loopData.type === "lead" && <img src={loopData.thumbnail ? loopData.thumbnail : "/assets/placeholder/order-product.svg"} width="64" height="64" className="object-cover" alt="" />}
                                    {loopData.type === "shop" && <img src={loopData.thumbnail ? Constants.S3_BASE_URL(loopData.thumbnail) : "/assets/placeholder/order-product.svg"} width="64" height="64" className="object-cover" alt="" />}
                                </div>
                                <div>
                                    <h6 className="text-sm ps-3 font-regular text-heading">
                                        {loopData.name}
                                    </h6>
                                </div>
                                <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                    {country?.currencySymbol}&nbsp;{loopData.price}&nbsp;x{loopData.quantity}
                                </div>
                            </div>

                            {loopData.extra?.map((extraData, ei) => (
                                <div className="flex" key={ei}>
                                    <h6 className="text-sm ps-3 font-regular text-heading">
                                        + {extraData.name}
                                    </h6>
                                    <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                        {country?.currencySymbol}&nbsp;{extraData.value}
                                    </div>
                                </div>
                            ))}

                            {loopData.additional?.map((additionalData, ai) => (
                                <div className="flex" key={ai}>
                                    <h6 className="text-sm ps-3 font-regular text-heading">
                                        + {additionalData.name}
                                    </h6>
                                    <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                        {country?.currencySymbol}&nbsp;{additionalData.value}
                                    </div>
                                </div>
                            ))}

                            {loopData.attributes?.map((attribute, ai) => (
                                <div className="flex" key={ai}>
                                    <h6 className="text-sm ps-3 font-regular text-heading">
                                        + {attribute.option}
                                    </h6>
                                    <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                        {country?.currencySymbol}&nbsp;{attribute.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    {!cart.length ? <p className="text-red-500 lg:px-3 py-4">Empty Cart</p> : null}

                    {total.discount ? (
                        <div className="border-b border-gray-300 py-4 items-center lg:px-3">
                            <div className="flex">
                                <h6 className="text-sm ps-3 font-regular text-heading">
                                    - Coupon Applied
                                </h6>
                                <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                    {country?.currencySymbol}&nbsp;{total.discount}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {
                        formData.gateway === "ssl" &&
                        <div className="border-gray-300 pt-5 pb-1">
                            <div className="flex items-center py-1 lg:py-1 lg:px-3 w-full text-heading last:border-b-0 last:text-base last:pb-0">
                                <span className="text-sm">SSL Charge (2.6%)</span>
                                <span className="ms-auto flex-shrink-0 text-sm">{country?.currencySymbol}&nbsp;{(total.adjustedGrandTotal - total.grandTotal)}</span>
                            </div>
                            <div className="flex items-center py-1 lg:py-1 lg:px-3 w-full text-heading last:border-b-0 last:text-base last:pb-0">
                                <span className="text-sm">Sub Total</span>
                                <span className="ms-auto flex-shrink-0 text-sm">{country?.currencySymbol}&nbsp;{total.grandTotal}</span>
                            </div>
                        </div>
                    }
                    {
                        formData.gateway === "bKash" &&
                        <div className="border-gray-300 pt-5 pb-1">
                            <div className="flex items-center py-1 lg:py-1 lg:px-3 w-full text-heading last:border-b-0 last:text-base last:pb-0">
                                <span className="text-sm">BKash Charge (1.6%)</span>
                                <span className="ms-auto flex-shrink-0 text-sm">{country?.currencySymbol}&nbsp;{(total.adjustedGrandTotal - total.grandTotal)}</span>
                            </div>
                            <div className="flex items-center py-1 lg:py-1 lg:px-3 w-full text-heading last:border-b-0 last:text-base last:pb-0">
                                <span className="text-sm">Sub Total</span>
                                <span className="ms-auto flex-shrink-0 text-sm">{country?.currencySymbol}&nbsp;{total.grandTotal}</span>
                            </div>
                        </div>
                    }
                    <div className="flex items-center py-1 lg:py-1 border-b border-gray-300 text-sm lg:px-3 w-full font-bold text-heading last:border-b-0 last:text-base last:pb-0">
                        Total
                        <span className="ms-auto flex-shrink-0">{country?.currencySymbol}&nbsp;{total.adjustedGrandTotal}</span>
                    </div>
                </div>

                {total.discount === 0 ? (
                    <div className="md:pt-0 2xl:ps-4">
                        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8 mt-8">
                            Coupon
                        </h2>
                        <div className="my-5">
                            <form
                                onSubmit={submitCoupon}
                                className="w-full mx-auto flex flex-col justify-center "
                                noValidate
                            >
                                <Input
                                    name="coupon"
                                    value={formData.code}
                                    placeholder="Coupon Code"
                                    onChange={({ target }) => setFormData({ ...formData, code: target.value })}
                                    variant="solid"
                                    className="w-full sm:mt-4 lg:mt-0 lg:mr-3"
                                />
                                <div className="flex w-full mt-3">
                                <Button
                                    variant={"slim"}
                                    className="w-auto"
                                    loading={checkCouponParams.isLoading}
                                    // disabled={checkCouponParams.isSuccess}
                                >
                                    Submit
                                </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : null}

                <div className="md:pt-0 2xl:ps-4">
                    <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8 mt-8">
                        Payment Method
                    </h2>
                    <div className="flex flex-col space-y-4 lg:space-y-5">
                        <RadioBox
                            checked={formData.gateway === "ssl"}
                            name="gateway"
                            value={"ssl"}
                            labelKey="SSL"
                            onChange={({ target }) => setFormData({ ...formData, gateway: target.value })}
                        />
                        <RadioBox
                            checked={formData.gateway === "bKash"}
                            name="gateway"
                            value={"bKash"}
                            labelKey="bKash"
                            onChange={({ target }) => setFormData({ ...formData, gateway: target.value })}
                        />
                        <RadioBox
                            checked={formData.gateway === "banking"}
                            name="gateway"
                            value={"banking"}
                            labelKey="Banking"
                            onChange={({ target }) => setFormData({ ...formData, gateway: target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;